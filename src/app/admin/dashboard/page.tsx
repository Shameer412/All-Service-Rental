'use client';

import React, { useState, useEffect } from 'react';
import AdminStatsGrid from '@/components/dashboard/admin/overview/AdminStatsGrid';
import AdminRevenueTrend from '@/components/dashboard/admin/overview/AdminRevenueTrend';
import AdminVendorPerformance from '@/components/dashboard/admin/overview/AdminVendorPerformance';
import AdminFleetStatus from '@/components/dashboard/admin/overview/AdminFleetStatus';
import AdminRecentActivity from '@/components/dashboard/admin/overview/AdminRecentActivity';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#001C2F]" />;
  }

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-8 pb-12 font-inter">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-white text-sm md:text-base font-inter">
          Real-time fleet management analytics
        </p>
      </div>

      {/* Stats Grid */}
      <AdminStatsGrid />

      {/* Main Content Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Line and Bar Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Trend Line Chart */}
          <AdminRevenueTrend />

          {/* Top Performing Vendors Bar Chart */}
          <AdminVendorPerformance />
        </div>

        {/* Right Column - Donut Chart and Recent Activity */}
        <div className="space-y-8">
          {/* Fleet Status Donut Chart */}
          <AdminFleetStatus />

          {/* Recent Activity Log */}
          <AdminRecentActivity />
        </div>
      </div>
    </div>
  );
}

