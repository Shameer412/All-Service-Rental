'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface RentalItem {
  id: string;
  equipment: string;
  customer: string;
  vendor: string;
  location: string;
  dates: string;
  amount: string;
  status: 'Pending' | 'Suspended' | 'Complete' | 'Active';
}

interface ActiveRentalsTableProps {
  rentals: RentalItem[];
  onGPSClick: (rental: RentalItem) => void;
}

export default function ActiveRentalsTable({ rentals, onGPSClick }: ActiveRentalsTableProps) {
  // Helper to get status badge classes matching the mockup colors
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
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Equipment</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Customer</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Vendor</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Location</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Dates</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Amount</th>
              <th className="px-6 py-4.5 text-white font-bold text-sm tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.length > 0 ? (
              rentals.map((rental, index) => (
                <tr
                  key={rental.id}
                  className={`${
                    index % 2 === 0 ? 'bg-[#0B2337]' : 'bg-[#001C2F]'
                  } hover:bg-white/[0.02] transition-colors`}
                >
                  {/* Equipment */}
                  <td className="px-6 py-5 text-white font-bold text-sm font-inter">
                    {rental.equipment}
                  </td>
                  
                  {/* Customer */}
                  <td className="px-6 py-5 text-white text-sm font-medium font-inter">
                    {rental.customer}
                  </td>
                  
                  {/* Vendor */}
                  <td className="px-6 py-5 text-white text-sm font-medium font-inter">
                    {rental.vendor}
                  </td>
                  
                  {/* Location */}
                  <td className="px-6 py-5 text-white text-sm font-medium font-inter">
                    {rental.location}
                  </td>
                  
                  {/* Dates */}
                  <td className="px-6 py-5 text-white text-sm font-medium font-inter font-mono">
                    {rental.dates}
                  </td>
                  
                  {/* Amount */}
                  <td className="px-6 py-5 text-white text-sm font-semibold font-inter">
                    {rental.amount}
                  </td>
                  
                  {/* Status & GPS Action Button */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide font-inter ${getStatusStyle(rental.status)}`}>
                        {rental.status === 'Suspended' ? 'Suspensed' : rental.status}
                      </span>
                      
                      {rental.status === 'Active' && (
                        <button
                          onClick={() => onGPSClick(rental)}
                          className="bg-[#22C55E] hover:bg-[#16a34a] text-white text-[11px] font-bold px-3 py-1 rounded-[8px] transition-all duration-200 active:scale-95 shadow-md shadow-[#22C55E]/10 cursor-pointer flex items-center gap-1"
                          title="Open GPS Live tracking"
                        >
                          GPS
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-white text-sm font-medium font-inter">
                  No active rentals matching current selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
