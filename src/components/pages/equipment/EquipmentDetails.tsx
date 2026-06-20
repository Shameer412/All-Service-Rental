'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import EquipmentHero from './detail/EquipmentHero';
import EquipmentHeader from './detail/EquipmentHeader';
import EquipmentSpecs from './detail/EquipmentSpecs';
import TechnicalSpecs from './detail/TechnicalSpecs';
import EquipmentFeatures from './detail/EquipmentFeatures';
import BookingSidebar from './detail/BookingSidebar';

const EquipmentDetails = () => {
  return (
    <div className="min-h-screen bg-[#001c2f] text-white pt-24 md:pt-32 pb-12 md:pb-20 font-jakarta">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">

        {/* Back Button */}
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Fleet</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Column: Details */}
          <div className="flex-1 space-y-10">
            <EquipmentHero
              title="Freightliner Cascadia"
              subTitle="Semi-Truck"
              image="/Login.png"
            />

            <EquipmentHeader
              title="FREIGHTLINER CASCADIA"
              type="Semi-Truck"
              modelYear="2023"
              rating="4.8"
              reviewsCount="156"
              location="Houston, TX"
            />

            <div
              className="rounded-[2rem] p-6 md:p-10 specs-container"
            >
              <h2 className="text-2xl font-black mb-8 tracking-tight">About This Truck</h2>
              <p className="text-gray-400 leading-relaxed text-base font-light">
                Premium Freightliner Cascadia with advanced safety features, excellent fuel economy, and comfortable
                sleeper cab. Perfect for long-haul operations. Well-maintained and DOT compliant. Features the latest
                Detroit Diesel DD15 engine for maximum reliability and power.
              </p>
            </div>

            <EquipmentSpecs />

            <TechnicalSpecs />

            <EquipmentFeatures />
          </div>

          {/* Right Column: Booking Sidebar */}
          <BookingSidebar price="299" />
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
