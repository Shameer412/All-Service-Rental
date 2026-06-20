'use client';

import React from 'react';
import { DollarSign, Car, AlertTriangle, Building, TrendingUp, TrendingDown } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: any;
  iconColor: string;
  bgColor: string;
}

export default function AdminStatsGrid() {
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
      label: 'Active Rentals',
      value: '182',
      trend: '+8.2%',
      isPositive: true,
      icon: Car,
      iconColor: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
    },
    {
      label: 'Urgent Alerts',
      value: '7',
      trend: '-3',
      isPositive: false,
      icon: AlertTriangle,
      iconColor: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
    },
    {
      label: 'Active Vendors',
      value: '42',
      trend: '+5',
      isPositive: true,
      icon: Building,
      iconColor: 'text-[#A855F7]',
      bgColor: 'bg-[#A855F7]/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="flex items-center gap-1">
                {stat.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                )}
                <span
                  className={`text-xs font-bold ${
                    stat.isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-1.5 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-white text-sm font-medium font-inter">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
