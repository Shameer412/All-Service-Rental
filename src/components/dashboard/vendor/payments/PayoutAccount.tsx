'use client';

import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function PayoutAccount() {
  return (
    <div className="bg-[#0B2337] border border-[#1A2E42] rounded-2xl px-6 py-8 md:py-10 flex flex-col gap-8">
      {/* Top row: icon + title + subtitle  |  Verified badge */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#28a745]" />
            <h3 className="text-white font-bold text-base leading-none">Payout Account</h3>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 pl-7">Auto-payout enabled • Weekly schedule</p>
        </div>

        {/* Verified badge — top right */}
        <span className="flex items-center gap-1.5 bg-[#28a745] text-black text-xs font-semibold rounded-full px-3 py-1 whitespace-nowrap">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified
        </span>
      </div>

      {/* Account details row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1">Bank Name</p>
          <p className="text-white font-bold text-sm">Chase Bank</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1">Account Number</p>
          <p className="text-white font-bold text-sm">****1234</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1">Account Type</p>
          <p className="text-white font-bold text-sm">Business Checking</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1">Next Payout</p>
          <p className="text-[#28a745] font-bold text-sm">Jan 27, 2024</p>
        </div>
      </div>
    </div>
  );
}
