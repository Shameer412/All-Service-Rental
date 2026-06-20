'use client';

import React from 'react';
import { Building2, Star, Check, X } from 'lucide-react';
import { Vendor } from '@/types/vendor';

interface VendorCardProps {
  vendor: Vendor;
  onApprove: (id: string, name: string) => void;
  onReject: (id: string, name: string) => void;
}

export default function VendorCard({
  vendor,
  onApprove,
  onReject,
}: VendorCardProps): React.ReactNode {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-[#0B2337] border border-white/5 rounded-[16px] transition-all duration-300 hover:border-white/10">
      {/* Left Side: Store icon + details */}
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-14 h-14 bg-[#28A745]/10 border border-[#28A745]/20 rounded-[12px] shrink-0">
          <Building2 className="w-6 h-6 text-[#28A745]" />
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {vendor.name}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider capitalize ${
                vendor.status === 'verified'
                  ? 'bg-[#28A745]/10 text-[#28A745]'
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}
            >
              {vendor.status}
            </span>
          </div>

          {/* Contact person & email */}
          <p className="text-sm font-medium text-[#94A3B8] font-inter">
            {vendor.contactName} <span className="text-slate-600 mx-1.5">•</span> {vendor.email}
          </p>

          {/* Stats details */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-6 text-xs font-medium text-[#94A3B8] font-inter">
            <span>Fleet: {vendor.fleetSize} vehicles</span>
            <span>Rentals: {vendor.rentalsCount}</span>
            {vendor.status === 'verified' && vendor.rating !== undefined && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{vendor.rating.toFixed(1)}</span>
              </span>
            )}
            <span>Since: {vendor.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Right Side: Earnings or CTA Buttons */}
      <div className="flex items-center justify-end shrink-0 w-full md:w-auto">
        {vendor.status === 'verified' ? (
          <span className="text-lg font-bold text-[#28A745] tracking-wide">
            ${(vendor.earnings ?? 0).toLocaleString()} earned
          </span>
        ) : (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onApprove(vendor.id, vendor.name)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#28A745] hover:bg-[#218838] active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex-1 md:flex-initial"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => onReject(vendor.id, vendor.name)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-100 active:scale-95 text-[#001C2F] text-sm font-semibold rounded-xl transition-all duration-200 flex-1 md:flex-initial"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
