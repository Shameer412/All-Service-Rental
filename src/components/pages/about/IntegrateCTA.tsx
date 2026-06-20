import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

const IntegrateCTA = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      
      {/* Background Image with Heavy Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg3.png"
          alt="Ready to Integrate"
          fill
          className="object-cover"
        />
        {/* High-contrast black overlay */}
        <div className="absolute inset-0 bg-black-90" />
      </div>

      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto relative z-10">
        <div className="max-w-[90%] lg:max-w-[75%] flex flex-col gap-8">

          {/* Main Heading */}
          <h2 className="text-white text-[36px] sm:text-[56px] md:text-[72px] font-[700] leading-[1.1] uppercase tracking-tight">
            Ready to <br />
            <span className="text-[#28A745]">Integrate?</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-300 text-[18px] md:text-[20px] leading-relaxed max-w-[90%] lg:max-w-[60%]">
            Connect your enterprise to the kinetic monolith.
            Deploy our infrastructure in minutes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-4">
            <Button size="lg" variant="primary">
              Deploy Solution
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent backdrop-blur-none btn-border-light"
            >
              View Network
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntegrateCTA;
