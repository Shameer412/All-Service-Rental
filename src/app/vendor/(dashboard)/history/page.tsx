'use client';

import React, { useRef } from 'react';
import StatsGrid from '@/components/dashboard/vendor/shared/StatsGrid';
import HistoryTable from '@/components/dashboard/vendor/history/HistoryTable';
import { Download } from 'lucide-react';

interface HistoryTableRef {
  exportData: () => void;
}

// Mock initial data with updated dates relative to current date (May 2026)
const HISTORY_DATA = [
  {
    id: 'RNT-0001',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Peterbilt 579',
    startDate: '31/05/2026',
    endDate: '10/06/2026',
    totalAmount: 1750,
    status: 'Active'
  },
  {
    id: 'RNT-0002',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Kenworth T680',
    startDate: '31/05/2026',
    endDate: '10/06/2026',
    totalAmount: 2800,
    status: 'Active'
  },
  {
    id: 'RNT-0003',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Freightliner M2',
    startDate: '10/05/2026',
    endDate: '15/05/2026',
    totalAmount: 2800,
    status: 'Complete'
  },
  {
    id: 'RNT-0004',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Peterbilt 389',
    startDate: '29/05/2026',
    endDate: '30/05/2026',
    totalAmount: 2800,
    status: 'Pending'
  },
  {
    id: 'RNT-0005',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Peterbilt 579',
    startDate: '15/05/2026',
    endDate: '20/05/2026',
    totalAmount: 2800,
    status: 'Completed'
  }
];

export default function RentalHistoryPage() {
  const tableRef = useRef<HistoryTableRef>(null);

  const totalRentals = HISTORY_DATA.length;
  const activeRentals = HISTORY_DATA.filter(item => item.status === 'Active').length;
  const totalEarnings = HISTORY_DATA.reduce((sum, item) => sum + item.totalAmount, 0);

  const handleExport = () => {
    tableRef.current?.exportData();
  };

  return (
    <div className="w-full space-y-8 bg-[#001C2F] font-inter">
      {/* Header Section with Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Rentals History</h1>
          <p className="text-slate-400 text-sm md:text-base mt-1">View past and active rental bookings</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg text-sm self-start sm:self-auto"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Reusable Stats Grid */}
      <StatsGrid 
        totalRentals={totalRentals} 
        activeRentals={activeRentals} 
        totalEarnings={totalEarnings} 
      />

      {/* History Table Component */}
      <HistoryTable ref={tableRef} initialHistory={HISTORY_DATA} />
    </div>
  );
}

// Hot reload retrigger cache invalidate


