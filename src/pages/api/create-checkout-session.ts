import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { sendDiscordMessage } from '@/services/discordService';

// Sprawdzenie czy klucz jest zdefiniowany
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Inicjalizacja Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { amount, orderDetails } = req.body;
    const origin = req.headers.origin || '';

    // Określ walutę na podstawie domeny
    const currency = origin.includes('en.primes.cc') ? 'usd' : 'pln';
    const currencySymbol = currency === 'usd' ? '$' : 'PLN';

    // Logowanie rozpoczęcia procesu płatności
    await sendDiscordMessage('🛒 Nowe zamówienie rozpoczęte', {
      'ID zamówienia': orderDetails.orderId,
      'Platforma': orderDetails.platform,
      'Usługa': orderDetails.service,
      'Ilość': orderDetails.quantity,
      'Kwota': `${amount} ${currencySymbol}`,
      'Email klienta': orderDetails.email,
      'Waluta': currency.toUpperCase()
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `${orderDetails.platform} ${orderDetails.service}`,
              description: `ID usługi: ${orderDetails.japServiceId}\nIlość: ${orderDetails.quantity}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderDetails.orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        orderId: orderDetails.orderId,
        japServiceId: orderDetails.japServiceId,
        orderDate: orderDetails.orderDate,
        platform: orderDetails.platform,
        service: orderDetails.service,
        quantity: orderDetails.quantity.toString(),
        accountInfoValue: orderDetails.accountInfo?.value || '',
        email: orderDetails.email || '',
        premiumGuarantee: orderDetails.extras && orderDetails.extras.premiumGuarantee ? 'true' : 'false',
        currency: currency
      },
    });

    // Logowanie utworzenia sesji płatności
    await sendDiscordMessage('💳 Utworzono sesję płatności', {
      'ID zamówienia': orderDetails.orderId,
      'ID sesji Stripe': session.id,
      'Email klienta': orderDetails.email,
      'Waluta': currency.toUpperCase()
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    
    // Logowanie błędu
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await sendDiscordMessage(`❌ Błąd tworzenia sesji płatności: ${errorMessage}`);
    
    res.status(500).json({ error: 'Internal server error' });
  }
} 