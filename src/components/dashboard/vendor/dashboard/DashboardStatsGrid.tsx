'use client';

import React from 'react';
import { DollarSign, Truck, ClipboardList } from 'lucide-react';

interface DashboardStatsGridProps {
  totalEarnings?: string;
  activeRentals?: string;
  fleetCount?: string;
  pendingRequests?: string;
}

export default function DashboardStatsGrid({
  totalEarnings = '$67,850',
  activeRentals = '18',
  fleetCount = '33',
  pendingRequests = '3',
}: DashboardStatsGridProps) {
  const stats = [
    {
      label: 'Total Earnings',
      value: totalEarnings,
      trend: '↗ +12.5% from last month',
      trendColor: 'text-[#22C55E]',
      icon: DollarSign,
      iconColor: 'text-[#22C55E]',
      iconBorder: 'border-[#22C55E]/20',
      glowColor: 'bg-[#22C55E]/20',
      glowColorHex: '#22C55E',
      hoverBorder: 'hover:border-[#22C55E]/30',
    },
    {
      label: 'Active Rentals',
      value: activeRentals,
      trend: `of ${fleetCount} vehicles`,
      trendColor: 'text-white',
      icon: Truck,
      iconColor: 'text-[#F59E0B]',
      iconBorder: 'border-[#F59E0B]/20',
      glowColor: 'bg-[#F59E0B]/20',
      glowColorHex: '#F59E0B',
      hoverBorder: 'hover:border-[#F59E0B]/30',
    },
    {
      label: 'Fleet Count',
      value: fleetCount,
      trend: 'Total vehicles',
      trendColor: 'text-white',
      icon: Truck,
      iconColor: 'text-[#22C55E]',
      iconBorder: 'border-[#22C55E]/20',
      glowColor: 'bg-[#22C55E]/20',
      glowColorHex: '#22C55E',
      hoverBorder: 'hover:border-[#22C55E]/30',
    },
    {
      label: 'Pending Requests',
      value: pendingRequests,
      trend: 'Need attention',
      trendColor: 'text-white',
      icon: ClipboardList,
      iconColor: 'text-[#EF4444]',
      iconBorder: 'border-[#EF4444]/20',
      glowColor: 'bg-[#EF4444]/20',
      glowColorHex: '#EF4444',
      hoverBorder: 'hover:border-[#EF4444]/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-[#0B2337] border-[0.97px] border-[#2A2F38] p-6 rounded-[24px] relative overflow-hidden transition-all duration-300 ${stat.hoverBorder} min-h-[180px] flex flex-col justify-between`}
        >
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <span className="text-white font-medium text-[15px] tracking-wide pt-1 font-inter">
              {stat.label}
            </span>
            <div className="relative shrink-0">
              {/* Glow */}
              <div className={`absolute inset-0 rounded-2xl blur-lg ${stat.glowColor}`} />
              {/* Icon Container */}
              <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border bg-[#0B2337]/90 ${stat.iconBorder}`}>
                <stat.icon
                  className={`w-5 h-5 ${stat.iconColor}`}
                  style={{
                    filter: `drop-shadow(0px 0px 3px ${stat.glowColorHex}) drop-shadow(0px 0px 10px ${stat.glowColorHex})`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="space-y-1.5 mt-auto">
            <h4 className="text-3xl lg:text-[38px] font-semibold text-white tracking-tight leading-none font-inter">
              {stat.value}
            </h4>
            <p className={`text-xs font-semibold ${stat.trendColor} tracking-wide font-inter`}>
              {stat.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
