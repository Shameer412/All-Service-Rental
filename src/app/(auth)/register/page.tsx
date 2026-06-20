'use client';

import React from 'react';
import { User, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


import Navbar from '@/components/layout/Navbar';

const OnboardingScreen = () => {
  const roles = [
    {
      title: "I'm a Customer",
      description: "I want to rent or lease equipment",
      icon: <User size={24} className="text-[#0d2137]" />,
      features: ["Browse Available Trucks", "Book Rentals Instantly", "Manage Your Bookings", "Quick Registration"],
      buttonText: "Get Started",
      href: "/register/customer"
    },
    {
      title: "I'm a Vendor",
      description: "I want to list my equipment for rent",
      icon: <Truck size={24} className="text-[#0d2137]" />,
      features: ["List Unlimited Trucks", "Set Your Own Rates", "Manage Bookings", "Track Earnings"],
      buttonText: "List Your Trucks",
      href: "/register/vendor"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#011428] text-white flex flex-col items-center justify-center p-6 pt-[120px] font-sans relative overflow-hidden">
        
        
      {/* Decorative background elements */}

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#28a745]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#28a745]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header Section */}
      <div 
        className="text-center mb-10 md:mb-16 relative z-10"
      >
        <div className="mb-6 md:mb-8 flex justify-center">
          <Link href="/">
            <Image 
              src="/icons/logo1.svg" 
              alt="All Service Rental Logo" 
              width={140}
              height={60}
              className="object-contain md:w-[160px] md:h-[70px]"
            />
          </Link>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight px-4">
          How will you use <span className="text-[#28a745]">All Service Rental</span>?
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light px-6">
          Select your role to get started with a personalized experience tailored to your needs.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl relative z-10 px-4">
        {roles.map((role, idx) => (
          <div 
            key={idx} 
            className="flex-1 bg-[#192E4366] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col items-start transition-all group"
          >
            {/* Icon Square */}
            <div className="bg-[#28a745] p-4 md:p-5 rounded-xl md:rounded-2xl mb-6 md:mb-10 shadow-lg shadow-[#28a745]/20 group-hover:scale-110 transition-transform">
              {role.icon}
            </div>

            {/* Content */}
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{role.title}</h2>
            <p className="text-gray-400 text-xs md:text-sm mb-6 md:mb-10 leading-relaxed font-light">{role.description}</p>

            {/* Feature List */}
            <ul className="space-y-3 md:space-y-5 mb-8 md:mb-14 flex-grow w-full">
              {role.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-200 pb-1 last:border-none">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#28a745]" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link href={role.href} className="w-full">
              <button className="w-full bg-[#28a745] hover:bg-[#218838] text-black font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all text-sm md:text-base shadow-xl shadow-black/20 active:scale-95">
                {role.buttonText}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </>
);
};

export default OnboardingScreen;
