'use client';

import React from 'react';
import Link from 'next/link';

const PasswordUpdatedPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-sans overflow-hidden">
      {/* Background: Blurred Reset Password Screen Simulation */}
      <div className="absolute inset-0 flex bg-[#001b2c] pointer-events-none">
        <div className="hidden md:block w-1/2 p-24 opacity-20 blur-md">
          <div className="w-12 h-12 bg-[#2ea44f] rounded-full mb-12" />
          <div className="h-8 w-48 bg-white rounded mb-4" />
          <div className="h-4 w-64 bg-white rounded mb-12" />
          <div className="space-y-8">
            <div className="h-14 w-full bg-white/10 rounded-lg" />
            <div className="h-14 w-full bg-white/10 rounded-lg" />
            <div className="h-14 w-full bg-[#2ea44f]/30 rounded-xl mt-12" />
          </div>
        </div>
        <div className="w-1/2 bg-gray-900/40 blur-md" />
      </div>

      {/* Modal Backdrop / Dimmer */}
      <div className="absolute inset-0 bg-black/70 z-20 backdrop-blur-[2px]" />

      {/* Actual Modal Content */}
      <div className="relative z-30 w-[90%] max-w-[440px] bg-[#001b2c] rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/10">
        <h2 className="text-[#2ea44f] text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Password Updated
        </h2>
        
        <p className="text-white text-base md:text-xl leading-relaxed mb-8 md:mb-10 opacity-90">
          Your password has been updated successfully.
        </p>

        <Link href="/login">
          <button className="w-full bg-[#2ea44f] hover:bg-[#268a42] text-[#001b2c] font-bold py-3.5 md:py-4 rounded-xl text-lg md:text-xl transition-all shadow-lg active:scale-[0.98]">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordUpdatedPage;
