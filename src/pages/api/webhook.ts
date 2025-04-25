import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { placeJAPOrder, checkJAPBalance } from '@/services/japService';
import { sendDiscordMessage } from '@/services/discordService';

// Wyłączenie parsowania body przez Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Inicjalizacja Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

// Webhook secret do weryfikacji zdarzeń
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // Dodaj log o otrzymaniu żądania
    console.log('Webhook request received');
    await sendDiscordMessage('🔄 Otrzymano żądanie webhook');
    
    // Pobranie surowego body
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event;

    // Weryfikacja podpisu Stripe
    try {
      if (!webhookSecret) {
        throw new Error('Missing Stripe webhook secret');
      }
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      await sendDiscordMessage(`❌ Błąd weryfikacji webhook Stripe: ${errorMessage}`);
      return res.status(400).send(`Webhook Error: ${errorMessage}`);
    }

    // Obsługa zdarzenia płatności
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Pobierz metadane zamówienia
      const metadata = session.metadata || {};
      const orderId = metadata.orderId || 'unknown';
      const japServiceId = metadata.japServiceId || '';
      const quantity = parseInt(metadata.quantity || '0', 10);
      const accountInfoValue = metadata.accountInfoValue || '';
      const email = metadata.email || '';
      const platform = metadata.platform || '';
      const service = metadata.service || '';
      
      // Logowanie udanej płatności
      await sendDiscordMessage('💰 Otrzymano płatność', {
        'ID zamówienia': orderId,
        'ID sesji Stripe': session.id,
        'Platforma': platform,
        'Usługa': service,
        'ID usługi JAP': japServiceId,
        'Ilość': quantity.toString(),
        'Kwota': `${(session.amount_total || 0) / 100} PLN`,
        'Email klienta': email,
        'Status płatności': 'Zakończona pomyślnie'
      });
      
      // Sprawdź saldo JAP przed złożeniem zamówienia
      const balance = await checkJAPBalance();
      
      if (balance === null) {
        await sendDiscordMessage('⚠️ Nie udało się sprawdzić salda JAP przed złożeniem zamówienia', {
          'ID zamówienia': orderId,
          'Email klienta': email
        });
      } else if (balance <= 5) {  // Zakładamy, że 5 jednostek to minimalny próg
        await sendDiscordMessage('⚠️ Niskie saldo na koncie JAP! Doładuj konto, aby zamówienia były realizowane', {
          'Aktualne saldo': `${balance}`,
          'ID zamówienia': orderId,
          'Email klienta': email
        });
      }
      
      // Złóż zamówienie w JAP
      if (japServiceId && quantity > 0 && accountInfoValue) {
        const japOrder = await placeJAPOrder(
          orderId,
          {
            service: japServiceId,
            link: accountInfoValue,
            quantity: quantity
          },
          email
        );
        
        if (japOrder && japOrder.status === 'success') {
          await sendDiscordMessage('🎉 Zamówienie zostało w pełni zrealizowane', {
            'ID zamówienia': orderId,
            'ID zamówienia JAP': japOrder.order.toString(),
            'Email klienta': email
          });
        } else {
          await sendDiscordMessage('⚠️ Płatność została zrealizowana, ale wystąpił problem z zamówieniem w JAP', {
            'ID zamówienia': orderId,
            'Błąd': japOrder?.error || 'Nieznany błąd',
            'Email klienta': email
          });
        }
      } else {
        await sendDiscordMessage('⚠️ Brak wymaganych danych do złożenia zamówienia w JAP', {
          'ID zamówienia': orderId,
          'ID usługi JAP': japServiceId || 'brak',
          'Ilość': quantity.toString() || 'brak',
          'Link': accountInfoValue || 'brak',
          'Email klienta': email
        });
      }
    }

    // Odpowiedź dla Stripe
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await sendDiscordMessage(`❌ Błąd przetwarzania webhook: ${errorMessage}`);
    res.status(500).json({ error: 'Webhook processing error' });
  }
} 