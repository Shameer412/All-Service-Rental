import React from 'react';
import Image from 'next/image';
import Badge from '@/components/common/Badge';
import Heading from '@/components/common/Heading';

const ContactHero = () => {
  return (
    <section className="relative w-full h-[100dvh] flex items-end overflow-hidden font-outfit pb-[8vh] sm:pb-[10vh]">

      {/* Background Image with High Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/contact1.png"
          alt="Contact Logistics"
          fill
          className="object-cover"
          priority
        />
        {/* Dark linear gradient overlay (Defined in global.css) */}
        <div className="absolute inset-0 z-[1] contact-hero-gradient" />
        {/* Additional black overlay for depth */}
        <div className="absolute inset-0 z-[2] bg-black/40" />


      </div>

      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto relative z-10">
        <div className="max-w-[90%] lg:max-w-[75%] flex flex-col gap-4 md:gap-6">

          {/* Top Label: Global Communication Protocol */}
          <Badge variant="simple" className="with-line text-[12px] md:text-[14px]">
            Global Communication Protocol
          </Badge>

          {/* Main Heading */}
          <Heading
            as="h1"
            className="uppercase contact-hero-title"
          >
            Contact <span className="text-[#28A745]">Us</span>
          </Heading>

          {/* Description Text */}
          <p
            className="text-gray-300 hero-description-custom max-w-[90%] lg:max-w-[60%] opacity-90 font-manrope"
          >
            Our neural infrastructure spans continents. Reach out to coordinate
            high-velocity deployments or integrate with our kinetic logistics network.
          </p>

        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#00080D] to-transparent z-10" />
    </section>
  );
};

export default ContactHero;
