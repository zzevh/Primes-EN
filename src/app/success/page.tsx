'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Suspense } from 'react';

// Komponent wewnętrzny, który używa useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!searchParams) return;
        
        const sessionId = searchParams.get('session_id');
        const orderId = searchParams.get('order_id');
        
        if (!sessionId) {
          console.error('No session ID provided');
          setLoading(false);
          return;
        }
        
        const response = await fetch(`/api/get-order-details?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        
        const data = await response.json();
        setOrderDetails({
          ...data,
          orderId: orderId || data.orderId
        });
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [searchParams]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111204] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a3fc3b] mx-auto"></div>
          <p className="mt-4">Ładowanie szczegółów zamówienia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111204] py-16 px-4">
      <div className="max-w-2xl mx-auto bg-[#1A1A1A]/40 backdrop-blur-sm rounded-2xl p-8 border border-[#B9FD50]/20">
        <div className="text-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-[#a3fc3b] text-6xl mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Dziękujemy za zamówienie!</h1>
          <p className="text-gray-300 mb-8">
            Twoje zamówienie zostało przyjęte i jest przetwarzane.
          </p>
          
          {orderDetails && (
            <div className="bg-[#111204] rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-white mb-4">Szczegóły zamówienia</h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium">ID zamówienia:</span> {String(orderDetails.orderId || '')}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Usługa:</span> {String(orderDetails.platform || '')} {String(orderDetails.service || '')}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Ilość:</span> {String(orderDetails.quantity || '')}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">ID usługi JAP:</span> {String(orderDetails.japServiceId || '')}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Status:</span> <span className="text-[#a3fc3b]">Przyjęte do realizacji</span>
                </p>
              </div>
            </div>
          )}
          
          <p className="text-gray-300 mb-6">
            Realizacja zamówienia rozpocznie się wkrótce. W przypadku pytań, skontaktuj się z nami przez Discord lub email!
          </p>
          
          <Link 
            href="/"
            className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-6 py-2.5 rounded-lg font-medium transition inline-block"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#111204] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a3fc3b] mx-auto"></div>
          <p className="mt-4">Ładowanie...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
} 