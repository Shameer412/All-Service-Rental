'use client';

import React from 'react';
import { DollarSign, Clock } from 'lucide-react';

interface PaymentsStatsGridProps {
  totalEarnings?: string;
  commission?: string;
  netEarnings?: string;
  pendingPayout?: string;
}

export default function PaymentsStatsGrid({
  totalEarnings = '$23,950',
  commission = '$2,395',
  netEarnings = '$21,555',
  pendingPayout = '$6,750',
}: PaymentsStatsGridProps) {
  const stats = [
    {
      label: 'Total Earnings',
      value: totalEarnings,
      subtext: '↗ +15.3% from last month',
      subtextColor: 'text-[#28a745]',
      icon: DollarSign,
      iconColor: 'text-[#28a745]',
      valueColor: 'text-[#28a745]',
    },
    {
      label: 'Platform Commission',
      value: commission,
      subtext: '10% of gross',
      subtextColor: 'text-slate-400',
      icon: DollarSign,
      iconColor: 'text-[#28a745]',
      valueColor: 'text-[#28a745]',
    },
    {
      label: 'Net Earnings',
      value: netEarnings,
      subtext: 'After commission',
      subtextColor: 'text-slate-400',
      icon: DollarSign,
      iconColor: 'text-[#28a745]',
      valueColor: 'text-[#28a745]',
    },
    {
      label: 'Pending Payout',
      value: pendingPayout,
      subtext: 'Processing...',
      subtextColor: 'text-slate-400',
      icon: Clock,
      iconColor: 'text-[#F59E0B]',
      valueColor: 'text-[#F59E0B]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#0B2337] border border-[#1A2E42] rounded-2xl p-6 flex flex-col gap-4 min-h-[150px]"
        >
          {/* Label + Icon row */}
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold tracking-wide">
              {stat.label}
            </span>
            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
          </div>

          {/* Value + subtext */}
          <div className="flex flex-col gap-1 mt-auto">
            <span className={`text-3xl font-bold tracking-tight ${stat.valueColor}`}>
              {stat.value}
            </span>
            <span className={`text-xs font-medium ${stat.subtextColor}`}>
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
