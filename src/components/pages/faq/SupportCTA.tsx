'use client';

import React from 'react';

const SupportCTA = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto max-w-4xl bg-gradient-to-br from-[#1A2634] to-[#0F1722] p-16 rounded-sm text-center border border-slate-800/80">
        <h2 className="text-white text-3xl font-black tracking-tight mb-4 uppercase">
          Still Need Assistance?
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-[90%] lg:max-w-[65%] mx-auto">
          Our Command Center technicians are available for manual override and direct operational support 24/7/365.
        </p>
        <button className="bg-[#4ADE80] text-black px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors rounded-sm shadow-[0_0_15px_rgba(74,222,128,0.2)]">
          Initiate Comms
        </button>
      </div>
    </section>
  );
};

export default SupportCTA;
