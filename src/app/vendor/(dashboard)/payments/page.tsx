'use client';

import React from 'react';
import PaymentsStatsGrid from '@/components/dashboard/vendor/payments/PaymentsStatsGrid';
import PayoutAccount from '@/components/dashboard/vendor/payments/PayoutAccount';
import PayoutHistory from '@/components/dashboard/vendor/payments/PayoutHistory';
import CommissionBreakdown from '@/components/dashboard/vendor/payments/CommissionBreakdown';

const PAYOUT_LOGS = [
  { date: '20/01/2024', gross: 5450, commission: 545, net: 4905, bank: '****1234', status: 'Complete' },
  { date: '20/01/2024', gross: 5450, commission: 545, net: 4905, bank: '****1234', status: 'Complete' },
  { date: '20/01/2024', gross: 5450, commission: 545, net: 4905, bank: '****1234', status: 'Complete' },
  { date: '20/01/2024', gross: 5450, commission: 545, net: 4905, bank: '****1234', status: 'Complete' },
  { date: '20/01/2024', gross: 5450, commission: 545, net: 4905, bank: '****1234', status: 'Pending' },
];

export default function VendorPaymentsPage() {
  return (
    <div className="w-full space-y-8 bg-[#001C2F] font-inter">

      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Payments &amp; <span className="text-[#28a745]">Payouts</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-1">Track your earnings and payout history</p>
      </div>

      {/* Stats Grid */}
      <PaymentsStatsGrid />

      {/* Payout Account */}
      <PayoutAccount />

      {/* Payout History Table */}
      <PayoutHistory logs={PAYOUT_LOGS} />

      {/* Commission Breakdown */}
      <CommissionBreakdown
        netEarnings={21555}
        platformFee={2395}
        grossEarnings={23950}
      />

    </div>
  );
}
