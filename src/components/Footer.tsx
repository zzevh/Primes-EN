"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Footer = () => {
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated) return;
      const windowHeight = window.innerHeight;
      const footerElement = document.getElementById('footer');
      if (!footerElement) return;
      const footerPosition = footerElement.getBoundingClientRect().top;
      if (footerPosition < windowHeight * 0.8) {
        controls.start('visible');
        setHasAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <footer id="footer" className="bg-[#111204] py-8 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Call to action section */}
        <div className="bg-[#1A1A1A]/40 backdrop-blur-sm rounded-[20px] md:rounded-[32px] p-6 md:p-16 text-center mb-12 md:mb-16 border border-[#ffffff]/[0.08]">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight">
            <span>Strengthen your presence</span>
            <span className="block">In social media!</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg mb-6 max-w-[600px] mx-auto">
          Join Primes today and take your social media presence to the next level. Gain likes, followers and engagement effortlessly with our reliable and instant services!
          </p>
          <a href="/offers" title="Zobacz wszystkie usługi" aria-label="Zobacz wszystkie oferty">
            <button className="w-full sm:w-auto bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-6 md:px-10 py-4 rounded-lg font-medium transition-all duration-300 group">
            Check All Boosting Services
              <svg
                className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M1.16663 7H12.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 1.16669L12.8333 7.00002L7 12.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </a>
        </div>

        {/* Big Primes text */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative flex flex-col items-center w-full mb-16"
        >
          <div className="text-[125px] text-[#2e2f23] md:text-[345px] -mb-16 md:-mb-48 font-extrabold text-center leading-none select-none pointer-events-none" aria-hidden="true">
            Primes
          </div>
          <div className="w-full h-[1px] bg-[#ffffff]/[0.08] mt-16 md:mt-40 md:-mb-3"></div>
        </motion.div>

        {/* Footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {/* Column 1 - Logo and Description */}
          <div className="md:col-span-1">
            <h3 className="text-white text-2xl font-bold mb-4">Primes</h3>
            <p className="text-gray-400 text-sm mb-4">
            Primes is a premium social media service. The best choice for online development. Let yourself buy and enjoy it now
            </p>
          </div>

          {/* Column 2 - Information */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#a3fc3b]" title="Strona Główna Primes">Home Page</Link></li>
              <li><Link href="#benefits" className="text-gray-400 hover:text-[#a3fc3b]" title="Korzyści z korzystania z Primes">Benifits</Link></li>
              <li><Link href="#faq" className="text-gray-400 hover:text-[#a3fc3b]" title="Często zadawane pytania">FAQ</Link></li>
              <li><Link href="/offers" className="text-gray-400 hover:text-[#a3fc3b]" title="Wszystkie oferty Primes">All offers</Link></li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Extras</h3>
            <ul className="space-y-2">
              <li><Link target="_blank" href="https://dc.primes.cc" className="text-gray-400 hover:text-[#a3fc3b]" title="Primes affiliate program">Affiliate Marketing</Link></li>
              <li><Link target="_blank" href="https://dc.primes.cc" className="text-gray-400 hover:text-[#a3fc3b]" title="Konkursy i nagrody Primes">Giveaways</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Information & Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legals" className="hover:text-[#a3fc3b] transition-colors">
                Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legals" className="hover:text-[#a3fc3b] transition-colors">
                Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legals" className="hover:text-[#a3fc3b] transition-colors">
                Promotion Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line and copyright */}
        <div className="mt-8">
          <div className="w-full h-[1px] bg-[#ffffff]/[0.08] mb-8"></div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Primes - All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
