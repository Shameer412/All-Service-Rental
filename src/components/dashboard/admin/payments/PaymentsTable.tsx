'use client';

import React from 'react';

interface PaymentItem {
  id: string;
  date: string;
  customer: string;
  vendor: string;
  gross: string;
  commission: string;
  net: string;
  status: 'Pending' | 'Suspended' | 'Complete' | 'Active';
}

const mockPayments: PaymentItem[] = [
  {
    id: '1',
    date: '2025-02-10',
    customer: 'Jhon Smith',
    vendor: 'NYC Fleet Co.',
    gross: '$1,322',
    commission: '2024-01-15',
    net: '$1,322',
    status: 'Pending',
  },
  {
    id: '2',
    date: '2025-02-10',
    customer: 'Sarah Johnson',
    vendor: 'West Coast Trucks',
    gross: '$3,150',
    commission: '2024-01-15',
    net: '$1,322',
    status: 'Suspended',
  },
  {
    id: '3',
    date: '2025-02-10',
    customer: 'Jhon Smith',
    vendor: 'Midwest Heavy Equip',
    gross: '$3,150',
    commission: '2024-01-15',
    net: '$1,322',
    status: 'Complete',
  },
  {
    id: '4',
    date: '2025-02-10',
    customer: 'Sarah Johnson',
    vendor: 'NYC Fleet Co.',
    gross: '$3,150',
    commission: '2024-01-15',
    net: '$1,322',
    status: 'Active',
  },
];

export default function PaymentsTable() {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]';
      case 'Suspended':
        return 'bg-[#ECFEFF] text-[#0E7490] border border-[#CFFAFE]';
      case 'Complete':
        return 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]';
      case 'Active':
        return 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]';
      default:
        return 'bg-white/5 text-white border border-white/10';
    }
  };

  return (
    <div className="rounded-t-lg overflow-hidden font-inter">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] border-collapse text-left">
          <thead>
            <tr className="bg-[#22C55E]">
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Date</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Customer</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Vendor</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Gross</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Commission</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Net</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment, index) => (
              <tr
                key={payment.id}
                className={`${
                  index % 2 === 0 ? 'bg-[#0B2337]' : 'bg-[#001C2F]'
                } hover:bg-white/[0.02] transition-colors`}
              >
                {/* Date */}
                <td className="px-6 py-5 text-white font-bold text-sm font-inter">
                  {payment.date}
                </td>
                
                {/* Customer */}
                <td className="px-6 py-5 text-white text-sm font-medium font-inter">
                  {payment.customer}
                </td>
                
                {/* Vendor */}
                <td className="px-6 py-5 text-white text-sm font-medium font-inter">
                  {payment.vendor}
                </td>
                
                {/* Gross */}
                <td className="px-6 py-5 text-white text-sm font-semibold font-inter">
                  {payment.gross}
                </td>
                
                {/* Commission */}
                <td className="px-6 py-5 text-white text-sm font-medium font-inter font-mono">
                  {payment.commission}
                </td>
                
                {/* Net */}
                <td className="px-6 py-5 text-white text-sm font-semibold font-inter">
                  {payment.net}
                </td>
                
                {/* Status */}
                <td className="px-6 py-5">
                  <span className={`inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide font-inter ${getStatusStyle(payment.status)}`}>
                    {payment.status === 'Suspended' ? 'Suspensed' : payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
