"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`mt-5 w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[rgba(17,21,17,0.7)] backdrop-blur-md' : 'bg-transparent'
      }`}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - tylko na desktop */}
          <div className="flex-shrink-0 ml-2 hidden md:block">
            <Link href="/" className="flex items-center">
              <span className="text-[#a3fc3b] text-2xl font-bold">Pri</span>
              <span className="text-white text-2xl font-bold">mes</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-grow hidden md:flex justify-center">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-white hover:text-[#a3fc3b] transition">Home</Link>
              <Link href="#benefits" className="text-white hover:text-[#a3fc3b] transition">Benifits</Link>
            </div>
          </div>

          {/* Auth Buttons - zawsze widoczne */}
          <div className="flex items-center space-x-2 mr-2">
            <Link href="/offers">
              <button className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-6 py-2.5 rounded-lg transition">
              Check All Boosting Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
