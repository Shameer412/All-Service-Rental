'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-[#001b2c] font-sans text-white">
      {/* Left Side: Form Content */}
      <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center px-4 sm:px-12 md:px-16 lg:px-20 relative min-h-screen py-10 lg:py-0">
        
        <div className="max-w-md w-full mx-auto flex flex-col items-start">
          {/* Back Button */}
          <div className="mb-8 md:mb-12 self-start lg:self-auto">
            <Link 
              href="/forgot-password" 
              className="w-10 h-10 md:w-12 md:h-12 bg-[#2ea44f] rounded-full flex items-center justify-center text-[#001b2c] hover:bg-[#268a42] transition-colors"
            >
              <ArrowLeft size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Header */}
          <div className="text-left mb-8 md:mb-10 w-full">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Verify OTP</h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              We have sent an OTP to <span className="text-[#2ea44f] font-medium">xyz@gmail.com</span>
            </p>
          </div>

          {/* OTP Input Grid */}
          <div className="flex justify-between gap-2 sm:gap-3 mb-6 md:mb-8 w-full">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#0a2538] border border-gray-600 rounded-lg md:rounded-xl text-white text-center text-lg md:text-2xl font-bold focus:border-[#2ea44f] focus:outline-none transition-colors"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          {/* Resend Logic */}
          <div className="flex justify-between items-center mb-12 w-full">
            <p className="text-gray-400 text-sm">
              Didn't you receive the OTP? <button className="text-white font-semibold hover:underline ml-1">Resend OTP</button>
            </p>
            <span className="text-[#2ea44f] font-mono font-bold text-lg">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>

          {/* Action Button */}
          <Link 
            href="/forgot-password/reset"
            className="w-full bg-[#2ea44f] hover:bg-[#268a42] text-[#001b2c] font-bold py-3.5 md:py-4 rounded-xl text-lg md:text-xl transition-all block text-center"
          >
            Verify
          </Link>
        </div>
      </div>

      {/* Right Side: Visual Image */}
      <div className="hidden lg:block lg:col-span-6 relative">
        <Image 
          src="/Login.png" 
          alt="Heavy Duty Truck" 
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default VerifyOTP;
