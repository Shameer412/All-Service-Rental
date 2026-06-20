'use client';

import React from 'react';

interface StatsGridProps {
  totalRentals: number;
  activeRentals: number;
  totalEarnings: number;
}

export default function StatsGrid({ totalRentals, activeRentals, totalEarnings }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Rentals */}
      <div className="bg-[#0B2337] p-8 rounded-[24px] flex flex-col justify-between min-h-[160px] transition-all hover:bg-[#0e2c46]/80">
        <span className="text-slate-300 text-[14px] font-semibold tracking-wide font-inter">Total Rentals</span>
        <h2 className="text-[40px] font-bold text-[#28a745] font-inter leading-none">{totalRentals}</h2>
      </div>

      {/* Active Rentals */}
      <div className="bg-[#0B2337] p-8 rounded-[24px] flex flex-col justify-between min-h-[160px] transition-all hover:bg-[#0e2c46]/80">
        <span className="text-slate-300 text-[14px] font-semibold tracking-wide font-inter">Active Rentals</span>
        <h2 className="text-[40px] font-bold text-[#28a745] font-inter leading-none">{activeRentals}</h2>
      </div>

      {/* Total Earnings */}
      <div className="bg-[#0B2337] p-8 rounded-[24px] flex flex-col justify-between min-h-[160px] transition-all hover:bg-[#0e2c46]/80">
        <span className="text-slate-300 text-[14px] font-semibold tracking-wide font-inter">Total Earnings</span>
        <h2 className="text-[40px] font-bold text-[#28a745] font-inter leading-none">${totalEarnings.toLocaleString()}</h2>
      </div>
    </div>
  );
}

