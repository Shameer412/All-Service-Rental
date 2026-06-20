'use client';

import React from 'react';
import { X } from 'lucide-react';

interface EditUserModalProps {
  editName: string;
  setEditName: (name: string) => void;
  editEmail: string;
  setEditEmail: (email: string) => void;
  editPhone: string;
  setEditPhone: (phone: string) => void;
  editIsActive: boolean;
  setEditIsActive: (active: boolean) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EditUserModal({
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  editPhone,
  setEditPhone,
  editIsActive,
  setEditIsActive,
  onCancel,
  onSubmit,
}: EditUserModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto p-4 flex items-start md:items-center justify-center font-inter">
      <form
        onSubmit={onSubmit}
        className="bg-[#001C2F] border border-[#2A2F38] rounded-none w-full max-w-[420px] sm:max-w-[540px] 2xl:max-w-[760px] p-6 sm:p-8 2xl:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-left my-auto"
      >
        {/* Close button (Green X) */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-6 right-6 text-[#22C55E] hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <X className="w-8 h-8" strokeWidth={2.5} />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-3xl font-bold text-[#22C55E] tracking-wide">Edit user</h3>
            <p className="text-white text-base mt-2 font-medium">Update the user details below.</p>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#22C55E]">Name</label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full bg-[#0B2337] border border-[#2A2F38] rounded-none px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#22C55E]/50 transition-all text-sm font-inter"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#22C55E]">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-[#0B2337] border border-[#2A2F38] rounded-none px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#22C55E]/50 transition-all text-sm font-inter"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#22C55E]">Phone</label>
            <input
              type="text"
              required
              placeholder="Enter your phone number"
              className="w-full bg-[#0B2337] border border-[#2A2F38] rounded-none px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#22C55E]/50 transition-all text-sm font-inter"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </div>

          {/* Status Toggle Card */}
          <div className="bg-[#0B2337] border border-[#2A2F38] rounded-none p-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-white text-base font-semibold block font-inter">Status</span>
              <span className="text-white text-xs leading-normal block font-inter">
                Control user account activation and access permissions
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEditIsActive(!editIsActive)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none shrink-0 ${
                editIsActive ? 'bg-[#22C55E]' : 'bg-gray-600'
              }`}
              aria-label="Toggle user status"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  editIsActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Centered Actions */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-10 py-3 rounded-xl bg-[#CBD5E1] hover:bg-gray-300 text-black font-bold text-base transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#22C55E] hover:bg-[#16a34a] text-white px-10 py-3 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg shadow-[#22C55E]/20"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
