import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Primes – Agencja Promocji Online | Większy Zasięg, Więcej Klientów",
  description = "Zwiększ widoczność swojego profilu dzięki naszej usłudze promocji online. Więcej zasięgów, więcej lajków, większe zaangażowanie – szybki start!",
  keywords = "lajki, obserwacje, wyświetlenia,zwiększenie zasięgu profilu,agencja social media,pozycjonowanie, subskrypcje, followers, likes, views, primes",
  ogImage = "/images/og-image.png",
  ogUrl = "https://primes.cc",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Dodatkowe meta tagi dla lepszego SEO */}
      <meta name="author" content="Primes" />
      <meta name="geo.region" content="PL" />
      <meta name="geo.placename" content="Polska" />
      <meta name="language" content="pl-PL" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      
      {/* Schema.org markup dla wyszukiwarek */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Primes",
            "url": "https://primes.cc",
            "description": "${description}",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://primes.cc/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </script>
    </Head>
  );
};

export default SEO; 