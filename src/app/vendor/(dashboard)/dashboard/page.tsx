'use client';

import React from 'react';
import EarningsChart from '@/components/dashboard/vendor/dashboard/EarningsChart';
import FleetStatusChart from '@/components/dashboard/vendor/dashboard/FleetStatusChart';
import RecentAlerts from '@/components/dashboard/vendor/dashboard/RecentAlerts';
import DashboardStatsGrid from '@/components/dashboard/vendor/dashboard/DashboardStatsGrid';

export default function VendorDashboard() {
  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-10 bg-[#001C2F] font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-inter">
            Welcome Back, <span className="text-[#22C55E]">Fleet Master</span>
          </h1>
          <p className="text-white font-inter">{"Here's what's happening with your fleet today"}</p>
        </div>
      </div>

      {/* Modular Stats Grid */}
      <DashboardStatsGrid />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Overview */}
        <div className="lg:col-span-2 bg-[#0B2337] border-[0.97px] border-[#2A2F38] p-6 rounded-[24px] space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white font-inter">Earnings Overview</h2>
            <p className="text-white text-xs font-light">Last 6 months performance</p>
          </div>
          <div className="w-full h-[360px]">
            <EarningsChart />
          </div>
        </div>

        {/* Fleet Status */}
        <div className="bg-[#0B2337] border-[0.97px] border-[#2A2F38] p-6 rounded-[24px] space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white font-inter">Fleet Status</h2>
            <p className="text-white text-xs font-light">Current availability</p>
          </div>
          <div className="w-full h-[360px]">
            <FleetStatusChart />
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <RecentAlerts />
    </div>
  );
}
