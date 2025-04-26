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
    const originalTitle = document.title || "Primes - Online Promotion Agency | More Reach, More Clients";
    
    // Funkcja zmieniająca tytuł gdy użytkownik opuszcza stronę
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back to us! | Promote yourself with us!";
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
        <meta name="description" content="Increase the visibility of your profile with our online promotion service. More reach, more likes, more engagement - get started fast!" />
        <meta name="keywords" content="social media account promotion, increase profile reach, social media agency, social media packages, online video promotion, social media visibility, quick account launch" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <title>Primes - Online Promotion Agency | More Reach, More Clients</title>
        
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
