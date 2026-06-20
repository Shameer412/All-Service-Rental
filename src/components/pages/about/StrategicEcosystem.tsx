import React from 'react';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';

const ecosystems = [
  {
    name: "GLOBALFLOW",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
    ),
  },
  {
    name: "STRATUM AI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
      </svg>
    ),
  },
  {
    name: "VANTAGEPORT",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3M7 8l5-5 5 5" />
      </svg>
    ),
  },
];

const StrategicEcosystem = () => {
  return (
    <Section className="bg-[#000F20]" containerClassName="flex flex-col items-center">

      {/* Section Label */}
      <Badge variant="simple" className="mb-16 tracking-[0.4em]">
        Strategic Ecosystem
      </Badge>

      {/* Logos Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2 items-center justify-items-center">
        {ecosystems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default">
            <div className="text-gray-400">
              {item.icon}
            </div>
            <span className="text-gray-400 text-[24px] md:text-[28px] font-[600] tracking-tight uppercase">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default StrategicEcosystem;

