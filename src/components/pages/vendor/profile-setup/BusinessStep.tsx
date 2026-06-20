'use client';

import React from 'react';

interface BusinessStepProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function BusinessStep({ formData, onChange, onNext, onBack }: BusinessStepProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Business Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            placeholder="e.g. Fleet Master Solutions LLC"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">MC Number (Motor Carrier)</label>
          <input
            type="text"
            name="mcNumber"
            value={formData.mcNumber}
            onChange={onChange}
            placeholder="e.g. MC-123456"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Business License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={onChange}
            placeholder="e.g. BL-987654321"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">DOT Number</label>
          <input
            type="text"
            name="dotNumber"
            value={formData.dotNumber}
            onChange={onChange}
            placeholder="e.g. USDOT-39284"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          />
        </div>
      </div>

      {/* Insurance Info Subheading */}
      <div className="border-t border-white/5 pt-8 font-inter">
        <h3 className="text-2xl font-bold text-white tracking-tight">Insurance Information</h3>
      </div>

      {/* Insurance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Insurance Provider *</label>
          <input
            type="text"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={onChange}
            placeholder="e.g. Progressive Commercial"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Policy Number *</label>
          <input
            type="text"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={onChange}
            placeholder="e.g. PRO-9923849-09"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Insurance Expiry Date *</label>
          <input
            type="text"
            name="insuranceExpiry"
            value={formData.insuranceExpiry}
            onChange={onChange}
            placeholder="e.g. 08/15/2027"
            className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
            required
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-8">
        <button
          type="button"
          onClick={onBack}
          className="border border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E]/10 px-12 py-4 rounded-xl transition-all active:scale-95 text-base font-bold bg-transparent"
        >
          Back
        </button>
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
