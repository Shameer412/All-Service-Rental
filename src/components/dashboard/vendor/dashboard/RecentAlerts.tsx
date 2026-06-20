'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    message: 'Truck #1234 due for maintenance',
    time: '2 days ago',
    color: 'bg-[#F59E0B]', // Yellow
    glow: 'shadow-[0_0_10px_#F59E0B]',
  },
  {
    id: 2,
    message: 'New rental request for Semi-Truck',
    time: '1 hour ago',
    color: 'bg-[#22C55E]', // Green
    glow: 'shadow-[0_0_10px_#22C55E]',
  },
  {
    id: 3,
    message: 'Truck #5678 service completed',
    time: 'Today',
    color: 'bg-[#F59E0B]', // Yellow
    glow: 'shadow-[0_0_10px_#F59E0B]',
  },
];

export default function RecentAlerts() {
  return (
    <div className="bg-[#0B2337] border-[0.97px] border-[#2A2F38] rounded-[24px] p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-[#EAB308]" />
          <div>
            <h2 className="text-xl font-bold text-white font-inter">Recent Alerts</h2>
            <p className="text-white text-xs">Latest updates and notifications</p>
          </div>
        </div>
        <Link href="/vendor/dashboard/alerts">
          <button className="bg-[#22C55E] hover:bg-[#1eb050] text-white px-5 py-2.5 rounded-[12px] font-bold text-sm transition-all active:scale-95 shadow-lg shadow-[#22C55E]/10 cursor-pointer">
            View All
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-[#001C2F]/40 border border-[#2A2F38] p-4 rounded-xl flex items-center gap-4 hover:border-white/10 transition-colors">
            <span className={`w-2.5 h-2.5 rounded-full ${alert.color} ${alert.glow} shrink-0`} />
            <div className="space-y-0.5">
              <p className="text-white font-medium text-sm">{alert.message}</p>
              <p className="text-white text-xs">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
