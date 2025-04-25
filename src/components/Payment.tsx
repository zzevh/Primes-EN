import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { platformsConfig } from '@/config/japConfig';
import { ServiceDetails, PlatformKey, ServiceType } from '@/types';

// Używamy operatora ?? do zapewnienia wartości domyślnej
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

// Funkcja pomocnicza do bezpiecznego pobierania usługi
const getService = (platform: PlatformKey, serviceName: string): ServiceType | null => {
  if (!platformsConfig[platform]?.services || !(serviceName in platformsConfig[platform].services)) {
    return null;
  }
  return platformsConfig[platform].services[serviceName as keyof typeof platformsConfig[typeof platform]['services']];
};

// Aktualizujemy interfejs props
interface PaymentProps {
  serviceDetails: ServiceDetails;
  amount?: number; // Dodajemy opcjonalną właściwość amount
}

const Payment = ({ serviceDetails, amount }: PaymentProps) => {
  const totalPrice = amount !== undefined ? amount : serviceDetails.totalPrice;
  
  const currentService = getService(serviceDetails.platform, serviceDetails.service);
  
  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Generowanie ID zamówienia
    const generateOrderId = () => {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';  
      let result = 'PRIMES_ID_';
      for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const orderId = generateOrderId();
    
    // Pobierz prawidłowe ID usługi z konfiguracji
    const japServiceId = currentService?.japServiceId || '';

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: totalPrice,
        orderDetails: {
          ...serviceDetails,
          orderId: orderId,
          japServiceId: japServiceId,
          orderDate: new Date().toISOString()
        }
      }),
    });

    const { sessionId } = await response.json();

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  return (
    <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#B9FD50]/20">
      <h3 className="text-xl font-semibold text-white mb-4">Podsumowanie zamówienia:</h3>
      <div className="space-y-2 mb-6">
        <p className="text-gray-300">
          <span className="font-medium">Platforma:</span> {serviceDetails.platform}
        </p>
        <p className="text-gray-300">
          <span className="font-medium">Usługa:</span> {serviceDetails.service}
        </p>
        <p className="text-gray-300">
          <span className="font-medium">Ilość:</span> {serviceDetails.quantity}
        </p>
        <p className="text-gray-300">
          <span className="font-medium">ID usługi:</span> {currentService?.japServiceId || ''}
        </p>
        <p className="text-gray-300">
          <span className="font-medium">Cena:</span> {totalPrice.toFixed(2)} zł
        </p>
      </div>
      <button 
        onClick={handlePayment}
        className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-8 py-3 rounded-lg font-medium transition w-full"
      >
        Zapłać
      </button>
    </div>
  );
};

export default Payment; 