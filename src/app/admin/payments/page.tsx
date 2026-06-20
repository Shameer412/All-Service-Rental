'use client';

import React, { useState, useEffect } from 'react';
import PaymentsStats from '@/components/dashboard/admin/payments/PaymentsStats';
import PaymentsCharts from '@/components/dashboard/admin/payments/PaymentsCharts';
import PaymentsTable from '@/components/dashboard/admin/payments/PaymentsTable';

export default function PaymentsPage() {
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
          Payment & Commission Overview
        </h1>
        <p className="text-white text-sm md:text-base font-inter">
          Track revenue and vendor payouts
        </p>
      </div>

      {/* KPI Stats Cards */}
      <PaymentsStats />

      {/* Charts Section */}
      <PaymentsCharts />

      {/* Payments Transactions Table */}
      <div className="space-y-4">
        <PaymentsTable />
      </div>
    </div>
  );
}
