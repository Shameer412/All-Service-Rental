'use client';

import React from 'react';
import { Car, Building, Users } from 'lucide-react';

interface ActivityItem {
  text: string;
  time: string;
  icon: any;
  color: string;
  bgColor: string;
}

export default function AdminRecentActivity() {
  const activities: ActivityItem[] = [
    {
      text: 'New rental started - Tesla Model 3',
      time: '5 min ago',
      icon: Car,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
    },
    {
      text: 'Vendor approved - EcoDrive Solutions',
      time: '12 min ago',
      icon: Building,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[#22C55E]/10',
    },
    {
      text: 'New user registered - John Smith',
      time: '25 min ago',
      icon: Users,
      color: 'text-[#A855F7]',
      bgColor: 'bg-[#A855F7]/10',
    },
    {
      text: 'Rental completed - BMW X5',
      time: '2 hours ago',
      icon: Car,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
    },
  ];

  return (
    <div className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white font-inter">Recent Activity</h2>
        <p className="text-white text-xs mt-1 font-inter">Latest system events</p>
      </div>
      <div className="space-y-5">
        {activities.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.bgColor}`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-snug break-words font-inter">
                  {item.text}
                </p>
                <p className="text-white text-xs font-medium font-inter">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
