'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#111511] pt-32 pb-20">
      <div className="max-w-[600px] mx-auto bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-8 border border-[#B9FD50]/20">
        <div className="text-center">
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">
          Payment cancelled
          </h1>
          <p className="text-gray-300 mb-6">
          Your payment has been canceled. If it's a mistake, you can try again.
          </p>
          <Link 
            href="/"
            className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-6 py-2.5 rounded-lg font-medium transition inline-block"
          >
            Return to home page
          </Link>
        </div>
      </div>
    </div>
  );
} 