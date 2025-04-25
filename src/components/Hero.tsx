import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faClock, faRepeat, faMoneyBill, faDollar, faMoneyBill1Wave, faLock } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden mt-10">
      
      <div className="max-w-[1200px] mx-auto px-4">



        {/* Main content */}
        <div className="max-w-[900px] mx-auto text-center">
          
          

          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6">
          Boost your social media presence <br /><span className="text-[#a3fc3b] font-extrabold italic text-7xl md:text-8xl">the smart way</span>
          </h1>

          <p className="text-gray-300 text-base md:text-xl mb-8 max-w-[600px] mx-auto">
          Get real exposure and engagement with fast, secure promotional tools.
          Perfect for creators, influencers, and small businesses.        </p>

          <a href="/offers">
          <button className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium transition">
          Check All Boosting Services
          </button>
          </a>
        </div>

        {/* Nowa sekcja statystyk */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center">
            <div className="border-t border-[#B9FD50] mr-2 w-12"></div>
            <h2 className="text-white text-xs md:text-base font-bold uppercase tracking-wider mx-4">
            Statistics & Benefits
            </h2>
            <div className="border-t border-[#B9FD50] ml-2 w-12"></div>
          </div>

          <div className="bg-[#2c3718] border border-[#B9FD50] mt-8 rounded-2xl p-8 max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faMoneyBill1Wave}
                  className="text-[#a3fc3b] w-8 h-8 mb-4"
                />
                <p className="text-white font-bold text-2xl mb-2">Fair Pricing</p>
                <p className="text-gray-300 text-sm">
                Transparent pricing – no subscriptions no hidden fees.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#a3fc3b] w-8 h-8 mb-4"
                />
                <p className="text-white font-bold text-2xl mb-2">Fast Delivery</p>
                <p className="text-gray-300 text-sm">
                Most services are delivered within minutes, 100% automatically.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-[#a3fc3b] w-8 h-8 mb-4"
                />
                <p className="text-white font-bold text-2xl mb-2">Secure & Private</p>
                <p className="text-gray-300 text-sm">
                No login needed. All payments are processed via trusted providers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-32 right-20 hidden md:block">
          <Image src="/bigstar.png" alt="Big Star" width={96} height={96} className="w-24 h-auto" />
        </div>
        <div className="absolute bottom-32 left-20 hidden md:block">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.25)">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

      </div>

      {/* Nowe gwiazdki */}
      <div className="absolute top-20 right-[15%] hidden md:block">
        <Image src="/bigstar.png" alt="Star" width={64} height={64} className="w-16 h-auto opacity-30" />
      </div>

      <div className="absolute top-40 left-[10%] hidden md:block">
        <Image src="/bigstar.png" alt="Star" width={48} height={48} className="w-12 h-auto opacity-20" />
      </div>

      <div className="absolute bottom-40 right-[5%] hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.15)">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="absolute top-60 right-[30%] hidden md:block">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.2)">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-[25%] hidden md:block">
        <Image src="/bigstar.png" alt="Star" width={32} height={32} className="w-8 h-auto opacity-25" />
      </div>

      <div className="absolute top-32 left-[40%] hidden md:block">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.1)">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="absolute bottom-60 right-[45%] hidden md:block">
        <Image src="/bigstar.png" alt="Star" width={40} height={40} className="w-10 h-auto opacity-15" />
      </div>

      {/* Mobilne gwiazdki */}
      <div className="absolute top-20 right-10 md:hidden">
        <Image src="/bigstar.png" alt="Star" width={32} height={32} className="w-8 h-auto opacity-20" />
      </div>

      <div className="absolute bottom-40 left-5 md:hidden">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.15)">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="absolute top-40 left-[20%] md:hidden">
        <Image src="/bigstar.png" alt="Star" width={24} height={24} className="w-6 h-auto opacity-15" />
      </div>
    </section>
  );
};

export default Hero;
