'use client';

import React from 'react';

interface VehiclesStepProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function VehiclesStep({ formData, onChange, onNext, onBack }: VehiclesStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Vehicle Type</label>
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={onChange}
          placeholder="Enter Vehicle Type"
          className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Vehicle ID</label>
        <input
          type="text"
          name="vehicleId"
          value={formData.vehicleId}
          onChange={onChange}
          placeholder="Enter Vehicle ID"
          className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Make</label>
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={onChange}
          placeholder="Enter Make"
          className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Model</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={onChange}
          placeholder="Enter Model"
          className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Year</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={onChange}
          placeholder="Enter Year"
          className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[#22C55E] text-sm font-semibold tracking-wide block font-poppins">Mileage</label>
        <input
          type="text"
          name="mileage"
          value={formData.mileage}
          onChange={onChange}
          placeholder="Enter Mileage"
          className="w-full bg-[#0B2337] border-[1.09px] border-[#2A2F38] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 outline-none transition-all"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="md:col-span-2 flex items-center justify-end gap-4 border-t border-white/5 pt-8 mt-6">
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
