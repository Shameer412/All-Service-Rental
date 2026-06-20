'use client';

import React from 'react';
import { X } from 'lucide-react';

interface DeleteConfirmModalProps {
  userName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  userName,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto p-4 flex items-start md:items-center justify-center font-inter">
      <div className="bg-[#0B2337] border border-[#2A2F38] rounded-[24px] w-full max-w-[440px] p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-left my-auto">
        {/* Close button (Green X) */}
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 text-[#22C55E] hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <X className="w-8 h-8" strokeWidth={2.5} />
        </button>

        <div className="space-y-6 text-left">
          {/* Title */}
          <h3 className="text-3xl font-bold text-[#22C55E] tracking-wide">Confirm Action</h3>
          
          {/* Message */}
          <p className="text-white text-lg font-medium leading-relaxed">
            Are you sure you want to delete this user?
          </p>

          {/* Centered Buttons */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <button
              onClick={onCancel}
              className="px-10 py-3 rounded-xl bg-[#CBD5E1] hover:bg-gray-300 text-black font-bold text-base transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-[#EF4444] hover:bg-red-600 text-white px-10 py-3 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg shadow-red-600/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
