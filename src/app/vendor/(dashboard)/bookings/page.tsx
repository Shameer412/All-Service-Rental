'use client';

import React, { useRef } from 'react';
import StatsGrid from '@/components/dashboard/vendor/shared/StatsGrid';
import BookingsTable from '@/components/dashboard/vendor/bookings/BookingsTable';
import { Download } from 'lucide-react';

interface BookingsTableRef {
  exportData: () => void;
}

// Mock initial data with corrected start/end order and current dates matching local system year (2026)
const BOOKINGS_DATA = [
  {
    id: 'RNT-0001',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Peterbilt 579',
    startDate: '20/12/2025',
    endDate: '30/12/2025',
    earnings: 1750,
    status: 'Complete'
  },
  {
    id: 'RNT-0002',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Kenworth T680',
    startDate: '15/04/2026',
    endDate: '25/04/2026',
    earnings: 2800,
    status: 'Complete'
  },
  {
    id: 'RNT-0003',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Freightliner M2',
    startDate: '15/05/2026',
    endDate: '20/05/2026',
    earnings: 2800,
    status: 'Complete'
  },
  {
    id: 'RNT-0004',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Peterbilt 389',
    startDate: '29/05/2026',
    endDate: '30/05/2026',
    earnings: 2800,
    status: 'Complete'
  },
  {
    id: 'RNT-0005',
    customerName: 'John',
    customerId: 'CUST-001',
    vehicle: 'Peterbilt 579',
    startDate: '31/05/2026',
    endDate: '10/06/2026',
    earnings: 2800,
    status: 'Active'
  }
];

export default function IncomingRentalsPage() {
  const tableRef = useRef<BookingsTableRef>(null);

  const totalRentals = BOOKINGS_DATA.length;
  const activeRentals = BOOKINGS_DATA.filter(b => b.status === 'Active').length;
  const totalEarnings = BOOKINGS_DATA.reduce((sum, b) => sum + b.earnings, 0);

  const handleExport = () => {
    tableRef.current?.exportData();
  };

  return (
    <div className="w-full space-y-8 bg-[#001C2F] font-inter">
      {/* Header Section with Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Incoming Rentals</h1>
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

      {/* Bookings Table Component */}
      <BookingsTable ref={tableRef} initialBookings={BOOKINGS_DATA} />
    </div>
  );
}

// Stale refresh trigger comment


