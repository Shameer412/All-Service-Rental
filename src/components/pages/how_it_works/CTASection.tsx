"use client";
import React from 'react';
import Image from 'next/image';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';

const CTASection = () => {
  return (
    <section className="relative min-h-[500px] lg:h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#011428] py-20 lg:py-0">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none grayscale opacity-20">
        <Image 
          src="/images/work5.png" 
          alt="CTA Background" 
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient Vignette for that "Moody" look */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#011428] via-transparent to-[#011428]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <Heading as="h2" size="xl" className="text-white mb-12">
          Ready to Initialize?
        </Heading>

          <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary Button */}
          <Button variant="primary" size="lg" className="w-full sm:w-auto px-14 py-6 !rounded-sm !font-extrabold tracking-widest shadow-[0_0_20px_rgba(102,223,117,0.2)] !text-black">
            Start Your Rental
          </Button>

          {/* Secondary Button */}
          <Button 
            size="lg" 
            className="w-full sm:w-auto px-14 py-6 !rounded-sm !font-extrabold tracking-widest bg-transparent btn-border-light"
          >
            Consult Fleet Spec
          </Button>
          </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default CTASection;
