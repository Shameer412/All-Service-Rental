'use client';

import React from 'react';

const vendorData = [
  { rank: '#1', name: 'AutoFleet Co', rentals: 145, rating: 4.8, revenue: '$24,500', trend: '+15%', badgeColor: 'bg-[#10B981]/10 text-[#10B981]' },
  { rank: '#2', name: 'DriveShare Ltd', rentals: 128, rating: 4.6, revenue: '$21,300', trend: '+12%', badgeColor: 'bg-[#06B6D4]/10 text-[#06B6D4]' },
  { rank: '#3', name: 'RentPro Group', rentals: 112, rating: 4.7, revenue: '$18,700', trend: '+8%', badgeColor: 'bg-[#06B6D4]/10 text-[#06B6D4]' },
  { rank: '#4', name: 'QuickCar Inc', rentals: 95, rating: 4.5, revenue: '$15,200', trend: '+10%', badgeColor: 'bg-[#10B981]/10 text-[#10B981]' },
  { rank: '#5', name: 'EcoDrive Solutions', rentals: 78, rating: 4.4, revenue: '$12,800', trend: '+18%', badgeColor: 'bg-[#10B981]/10 text-[#10B981]' },
  { rank: '#6', name: 'Premium Motors', rentals: 67, rating: 4.6, revenue: '$11,200', trend: '+5%', badgeColor: 'bg-[#10B981]/10 text-[#10B981]' },
];

export default function TopVendorPerformance() {
  return (
    <div className="p-6 bg-[#0B2337] border border-[#2A2F38] rounded-[24px] space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white tracking-wide font-inter">Top Vendor Performance</h2>
        <p className="text-white/60 text-xs mt-1 font-inter">Revenue and efficiency metrics</p>
      </div>

      <div className="space-y-4">
        {vendorData.map((vendor) => (
          <div
            key={vendor.rank}
            className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 last:pb-0 font-inter"
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${vendor.badgeColor}`}>
                {vendor.rank}
              </div>

              {/* Vendor Details */}
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm leading-snug">{vendor.name}</h4>
                <p className="text-white/60 text-xs font-medium">
                  {vendor.rentals} rentals <span className="opacity-45">•</span> ⭐ {vendor.rating}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="text-right space-y-1">
              <span className={`font-bold text-sm leading-snug block ${vendor.rank === '#1' ? 'text-[#22C55E]' : 'text-white'}`}>
                {vendor.revenue}
              </span>
              <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-[#22C55E]/10 text-[#22C55E]">
                {vendor.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
