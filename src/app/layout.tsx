"use client";
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationBar from '@/components/NotificationBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Zapisz oryginalny tytuł
    const originalTitle = document.title || "Primes – Agencja Promocji Online | Większy Zasięg, Więcej Klientów";
    
    // Funkcja zmieniająca tytuł gdy użytkownik opuszcza stronę
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Wróć do nas! | Wypromuj się z nami!";
      } else {
        document.title = originalTitle;
      }
    };
    
    // Dodaj nasłuchiwanie na zmianę widoczności strony
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Usuń nasłuchiwanie przy odmontowaniu komponentu
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111204" />
        <meta name="description" content="Zwiększ widoczność swojego profilu dzięki naszej usłudze promocji online. Więcej zasięgów, więcej lajków, większe zaangażowanie – szybki start!" />
        <meta name="keywords" content="promocja konta social media, zwiększenie zasięgu profilu, agencja social media, pakiety lajków, promowanie filmów online, widoczność social media, szybki start konta" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <title>Primes – Agencja Promocji Online | Większy Zasięg, Więcej Klientów</title>
        
        {/* Kod Piksela Facebooka */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '973573201419440');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=973573201419440&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Koniec kodu Piksela Facebooka */}
      </head>
      <body className={inter.className}>
        <NotificationBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
