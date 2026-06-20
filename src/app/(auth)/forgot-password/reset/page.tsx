'use client';

import React from 'react';
import { ArrowLeft, Lock, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ResetPassword = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-[#001b2c] font-sans">
      {/* Left Side: Form Content */}
      <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center px-4 sm:px-12 md:px-16 lg:px-20 relative min-h-screen py-10 lg:py-0">
        
        <div className="max-w-md w-full mx-auto flex flex-col items-start">
          {/* Back Button */}
          <div className="mb-8 md:mb-12 self-start lg:self-auto">
            <Link 
              href="/forgot-password/verify" 
              className="w-10 h-10 md:w-12 md:h-12 bg-[#2ea44f] rounded-full flex items-center justify-center text-[#001b2c] hover:bg-[#268a42] transition-colors"
            >
              <ArrowLeft size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Header */}
          <div className="text-left mb-8 md:mb-10 w-full">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-3 md:mb-4">Reset Password</h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              You can now reset your password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[#2ea44f] text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2ea44f]">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="*********"
                  className="block w-full bg-[#0a2538] border border-[#1a3a4f] text-gray-300 py-3.5 pl-12 pr-12 rounded-lg focus:outline-none focus:border-[#2ea44f] transition-colors placeholder:text-gray-600"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-[#2ea44f]">
                  <Eye size={20} />
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-[#2ea44f] text-sm font-medium" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2ea44f]">
                  <Lock size={20} />
                </div>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="*********"
                  className="block w-full bg-[#0a2538] border border-[#1a3a4f] text-gray-300 py-3.5 pl-12 pr-12 rounded-lg focus:outline-none focus:border-[#2ea44f] transition-colors placeholder:text-gray-600"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-[#2ea44f]">
                  <Eye size={20} />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 md:pt-6">
              <Link 
                href="/forgot-password/success"
                className="w-full bg-[#f1f1f1] hover:bg-white text-[#333] font-bold py-3.5 md:py-4 rounded-xl text-lg md:text-xl transition-all block text-center"
              >
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Visual Image */}
      <div className="hidden lg:block lg:col-span-6 relative">
        <Image 
          src="/Login.png" 
          alt="Fleet Truck" 
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
