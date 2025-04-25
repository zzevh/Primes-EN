"use client";

import React from 'react';
import Image from 'next/image';

const HowWeWork = () => {
  return (
    <section className="py-24 px-4 ">
      <div className="max-w-[1200px] mx-auto">
        {/* Header section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-x-20 mb-32">
          <div>
            <p className="text-[#a3fc3b] text-sm uppercase tracking-wider mb-4">HOW WE WORK</p>
            <h2 className="text-4xl md:text-[54px] font-semibold text-white leading-tight max-w-[800px]">
            Experience the highest quality service at low prices.
            </h2>
          </div>

          <div className="lg:max-w-[400px] mt-6 lg:mt-12">
            <p className="text-gray-300 text-lg">
            Strengthen your brand with high-quality design at your fingertips. Simply choose what you need and enjoy fast delivery!
            </p>
            <a href="/offers">
            <button className="mt-6 bg-[#a3fc3b] hover:bg-[#8fe032] text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300">
            Check All Boosting Services
            </button>
            </a>
          </div>
        </div>

        {/* Dodaj obrazek */}
        <div className="mt-6 flex justify-center">
          <Image
            src="/howwework.png"
            alt="How We Work"
            width={1200}
            height={500}
            className="max-w-[1200px] max-h-[500px] w-auto h-auto hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
