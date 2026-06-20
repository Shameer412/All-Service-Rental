'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const allAlerts = [
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
  {
    id: 4,
    message: 'Truck #1234 due for maintenance',
    time: '2 days ago',
    color: 'bg-[#F59E0B]', // Yellow
    glow: 'shadow-[0_0_10px_#F59E0B]',
  },
  {
    id: 5,
    message: 'New rental request for Semi-Truck',
    time: '1 hour ago',
    color: 'bg-[#22C55E]', // Green
    glow: 'shadow-[0_0_10px_#22C55E]',
  },
  {
    id: 6,
    message: 'Truck #5678 service completed',
    time: 'Today',
    color: 'bg-[#F59E0B]', // Yellow
    glow: 'shadow-[0_0_10px_#F59E0B]',
  },
];

export default function AlertsPage() {
  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-6 bg-[#001C2F] font-inter">
      {/* Back Link */}
      <div>
        <Link 
          href="/vendor/dashboard" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-inter">Alerts</h1>
        <p className="text-white font-inter text-sm font-light">Latest updates and notifications</p>
      </div>

      {/* Alerts Container */}
      <div className="bg-[#0B2337] border-[0.97px] border-[#2A2F38] rounded-[24px] p-8 space-y-4">
        {allAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className="bg-[#001C2F]/40 border border-[#2A2F38] p-5 rounded-xl flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${alert.color} ${alert.glow} shrink-0`} />
            <div className="space-y-1">
              <p className="text-white font-medium text-sm md:text-base">{alert.message}</p>
              <p className="text-white text-xs">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
