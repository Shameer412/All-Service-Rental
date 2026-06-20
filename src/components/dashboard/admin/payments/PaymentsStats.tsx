'use client';

import React from 'react';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: any;
  iconColor: string;
  bgColor: string;
  trendColor?: string;
}

export default function PaymentsStats() {
  const stats: StatItem[] = [
    {
      label: 'Total Revenue',
      value: '$67,400',
      trend: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      iconColor: 'text-[#22C55E]',
      bgColor: 'bg-[#22C55E]/10',
    },
    {
      label: 'Platform Fee',
      value: '$12,600',
      trend: '+15.2%',
      isPositive: true,
      icon: TrendingUp,
      iconColor: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
    },
    {
      label: 'Vendor Payouts',
      value: '$54,800',
      trend: '+11.8%',
      isPositive: true,
      icon: CreditCard,
      iconColor: 'text-[#A855F7]',
      bgColor: 'bg-[#A855F7]/10',
    },
    {
      label: 'Pending Payouts',
      value: '$40,190',
      trend: 'Due Feb 15',
      isPositive: true, // Special display text
      icon: CreditCard,
      iconColor: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
      trendColor: 'text-[#F59E0B]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] flex flex-col justify-between hover:border-[#22C55E]/20 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className={`text-xs font-bold ${stat.trendColor || 'text-[#22C55E]'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-1.5 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-white text-sm font-semibold tracking-wide font-inter">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
