'use client';

import React from 'react';

interface CommissionBreakdownProps {
  netEarnings: number;
  platformFee: number;
  grossEarnings: number;
}

export default function CommissionBreakdown({ netEarnings, platformFee, grossEarnings }: CommissionBreakdownProps) {
  return (
    <div className="bg-[#0B2337] border border-[#1A2E42] rounded-2xl p-6 md:p-8 space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-white">Commission Breakdown</h3>
        <p className="text-slate-400 text-xs mt-1">Platform takes 10% of gross earnings</p>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {/* Your Earnings */}
        <div className="flex justify-between items-center bg-[#001C2F] border border-[#1A2E42] px-6 py-4 rounded-xl">
          <span className="text-slate-300 font-medium text-sm">Your Earnings (90%)</span>
          <span className="text-white font-bold text-base">${netEarnings.toLocaleString()}</span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center bg-[#001C2F] border border-[#1A2E42] px-6 py-4 rounded-xl">
          <span className="text-slate-300 font-medium text-sm">Platform Fee (10%)</span>
          <span className="text-white font-bold text-base">${platformFee.toLocaleString()}</span>
        </div>

        {/* Total Gross Earnings — green border accent */}
        <div className="flex justify-between items-center bg-[#001C2F] border border-[#28a745] px-6 py-4 rounded-xl">
          <span className="text-white font-semibold text-sm">Total Gross Earnings</span>
          <span className="text-[#28a745] font-bold text-lg">${grossEarnings.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
