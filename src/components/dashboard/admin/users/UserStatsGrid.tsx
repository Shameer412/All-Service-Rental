'use client';

import React from 'react';

interface UserStatItem {
  label: string;
  value: string;
  trend: string;
  color: string;
}

export default function UserStatsGrid() {
  const stats: UserStatItem[] = [
    { label: 'Active Users', value: '1,089', trend: '+8%', color: 'text-[#22C55E]' },
    { label: 'Total Users', value: '1,247', trend: '+12%', color: 'text-[#22C55E]' },
    { label: 'New This Month', value: '43', trend: '+23%', color: 'text-[#22C55E]' },
    { label: 'Suspended', value: '15', trend: '-5%', color: 'text-[#22C55E]' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#0B2337] border border-[#2A2F38] p-5 md:p-6 rounded-2xl md:rounded-[24px] flex flex-col justify-between min-h-[120px] md:min-h-[140px] hover:border-[#22C55E]/20 transition-all duration-300"
        >
          <span className="text-white text-sm font-medium font-inter">{stat.label}</span>
          <div className="flex justify-between items-baseline mt-4">
            <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {stat.value}
            </span>
            <span className={`text-sm font-bold ${stat.color}`}>
              {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
