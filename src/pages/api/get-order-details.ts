import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'Missing session_id parameter' });
    }

    // Pobierz szczegóły sesji z Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Pobierz metadane zamówienia
    const metadata = session.metadata || {};

    // Zwróć szczegóły zamówienia
    res.status(200).json({
      orderId: metadata.orderId,
      platform: metadata.platform,
      service: metadata.service,
      quantity: metadata.quantity,
      japServiceId: metadata.japServiceId,
      accountInfoValue: metadata.accountInfoValue,
      email: metadata.email,
      orderDate: metadata.orderDate,
      premiumGuarantee: metadata.premiumGuarantee === 'true',
      amount: session.amount_total ? session.amount_total / 100 : 0,
      paymentStatus: session.payment_status
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
} 