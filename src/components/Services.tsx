"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Services = () => {
  const [hovered, setHovered] = useState(false);

  const services = [
    'Facebook',
    'Instagram',
    'TikTok',
    'YouTube',
    'X (twitter)',
    'Spotify',
    'Linkedin',
    'Google',
    'Telegram',
    'Discord',
    'Snapchat',
    'Twitch',
    'Website traffic'
  ];

  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <p className="text-[#a3fc3b] text-sm uppercase tracking-wider text-left mb-3">
        OUR SERVICES
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-left mb-12">
        We can help you with...
        </h2>

        {/* Services buttons */}
        <div className="flex flex-wrap justify-start gap-3 mb-6">
          {services.map((service, index) => (
            <button
              key={index}
              className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-6 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium"
            >
              {service}
            </button>
          ))}
        </div>

        {/* And more text */}
        <div className="text-left mt-6 flex items-center justify-start">
          <Image src="/moreico.png" alt="More Icon" width={24} height={24} className="h-6 w-6 mr-2" />
          <button
            className={`text-[#fff] hover:text-[#8fe032] transition transform ${hovered ? 'translate-y-[-5px]' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? 'Seriously!  Check it out for yourself! We frequently add news' : 'And more!'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
