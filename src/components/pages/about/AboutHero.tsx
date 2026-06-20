import React from 'react';
import Image from 'next/image';
import Badge from '@/components/common/Badge';

const AboutHero = () => {
  return (
    <section className="relative w-full h-[100dvh] flex items-end overflow-hidden pb-[8vh] sm:pb-[10vh]">

      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about1.png"
          alt="All Service Rental Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />


        {/* Multi-directional Gradient Overlay for Premium Look & Readability */}
        <div
          className="absolute inset-0 z-[2] about-hero-gradient"
        />
        {/* Additional black overlay for depth */}
        <div className="absolute inset-0 z-[3] bg-black/40" />
      </div>

      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto relative z-10">
        <div className="max-w-[90%] lg:max-w-[75%] flex flex-col gap-4">

          {/* Top Badge: Since 1994 */}
          <Badge variant="simple" className="with-line">
            Since 1994
          </Badge>

          {/* Main Heading */}
          <h1
            className="text-white uppercase about-hero-title"
          >
            About <span className="text-[#28A745]">Us</span>
          </h1>

          {/* Description Text */}
          <p className="text-gray-300 hero-description-custom max-w-[90%] lg:max-w-[60%] font-[400]">
            All Service Rental was founded on a singular architectural vision:
            to build the invisible engine of the global economy through
            unyielding kinetic precision.
          </p>

        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#00080D] to-transparent z-10" />
    </section>
  );
};

export default AboutHero;
