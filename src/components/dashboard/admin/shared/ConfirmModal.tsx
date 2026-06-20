'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  confirmColorClass: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText,
  confirmColorClass,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto p-4 flex items-center justify-center font-inter animate-in fade-in duration-200">
      <div className="bg-[#0B2337] border border-[#2A2F38] rounded-[24px] w-full max-w-[400px] sm:max-w-[480px] 2xl:max-w-[600px] p-6 sm:p-8 2xl:p-10 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left my-auto">
        {/* Close button (Green X) */}
        <button
          onClick={onCancel}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#22C55E] hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
        </button>

        <div className="space-y-4 sm:space-y-6 text-left">
          {/* Title */}
          <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#22C55E] tracking-wide font-inter">
            {title}
          </h3>
          
          {/* Message */}
          <p className="text-white text-base sm:text-lg 2xl:text-xl font-medium leading-relaxed font-inter">
            {message}
          </p>

          {/* Centered Buttons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 sm:pt-4">
            <button
              onClick={onCancel}
              className="px-6 sm:px-10 py-2.5 sm:py-3 rounded-xl bg-[#CBD5E1] hover:bg-gray-300 text-black font-bold text-sm sm:text-base transition-all active:scale-95 font-inter flex-1 sm:flex-initial"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 shadow-lg ${confirmColorClass} font-inter flex-1 sm:flex-initial`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
