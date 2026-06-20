'use client';

import React from 'react';
import { Search } from 'lucide-react';

const SupportHero = () => {
  return (
    <div className="bg-[#011428]">
      <section className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto pt-24 pb-16">
        <div className="max-w-[90%] lg:max-w-[75%]">
          <p className="text-[#4ADE80] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Support Infrastructure
          </p>
          <h1 
            className="text-white text-5xl md:text-7xl font-[900] leading-[0.9] tracking-tight mb-8 support-hero-title"
          >
            GLOBAL SUPPORT<br />
            MATRIX.
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-10 max-w-[90%] lg:max-w-[60%]">
            Navigate the kinetic architecture of All Service Rental's global logistics network. 
            Resolve protocols, access API endpoints, and optimize your operational flow.
          </p>

          {/* Search Input */}
          <div 
            className="flex items-center bg-[#24364B] border-solid border-[#3E4A3C] rounded-sm relative support-search-wrapper"
          >
            <div className="absolute left-6">
              <Search className="text-[#4ADE80] w-5 h-5 shrink-0" />
            </div>
            <input 
              type="text" 
              placeholder="QUERY PROTOCOLS (E.G. 'API ENCRYPTION')" 
              className="bg-transparent text-gray-300 text-xs tracking-wider outline-none w-full placeholder:text-gray-500 uppercase"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportHero;
