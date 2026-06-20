"use client";
import React from 'react';
import Image from 'next/image';
import { stats } from '@/components/data/statsData';
import Heading from '@/components/common/Heading';
import { StatCard } from '@/components/ui';

const StatsSection = () => {
  return (
    <section className="relative bg-[#011428] text-white py-16 md:py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/images/work5.png" alt="Technical Background" fill className="object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#011428]/80 via-transparent to-[#011428]/80" />
      </div>

      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto text-center relative z-10">
        {/* Header */}
        <div
          className="mb-12 md:mb-20 space-y-4"
        >
          <Heading as="h2" size="md">
            Precision Engineering<span className="text-[#66DF75]">.</span>
          </Heading>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            The technical backbone of the All Service Rental ecosystem.
          </p>
        </div>

        {/* Stats Grid — uses StatCard UI primitive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
            >
              <StatCard value={item.value} title={item.title} description={item.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
