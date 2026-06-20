'use client';

import React from 'react';

interface AccountStepProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: (e: React.FormEvent) => void;
}

export default function AccountStep({ formData, onChange, onNext }: AccountStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="e.g. Sarah"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="e.g. Jenkins"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="e.g. sarah.j@example.com"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="e.g. +1 (555) 019-2834"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Create password (min 6 characters)"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Re-enter password to confirm"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-white/5 pt-8">
        <button
          type="button"
          onClick={onNext}
          className="bg-[#22C55E] hover:bg-[#1eb050] text-white font-extrabold px-12 py-4 rounded-xl transition-all shadow-lg shadow-[#22C55E]/20 active:scale-95 text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
