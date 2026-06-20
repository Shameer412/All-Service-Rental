'use client';

import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

interface DocumentsStepProps {
  formData: any;
  onFileUpload: (field: 'licenseUploaded' | 'insuranceUploaded' | 'taxFormUploaded') => void;
  onNext: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function DocumentsStep({ formData, onFileUpload, onNext, onBack }: DocumentsStepProps) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* 3-Column Document Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Business License Card */}
        <div className="flex flex-col items-center justify-between p-8 bg-[#0B2337] border border-[#2A2F38] rounded-3xl min-h-[340px] hover:border-[#22C55E]/30 transition-all duration-300">
          <h4 className="text-white font-bold text-lg sm:text-xl font-inter text-center mb-6">
            Business License
          </h4>
          
          <div 
            onClick={() => onFileUpload('licenseUploaded')}
            className={`w-full max-w-[220px] py-10 px-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
              formData.licenseUploaded 
                ? 'border-dashed border-[#22C55E]/50 bg-[#22C55E]/5' 
                : 'border-solid border-[#2A2F38] bg-[#0B2337] hover:border-[#22C55E]/40'
            }`}
          >
            {formData.licenseUploaded ? (
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-9 h-9 text-[#22C55E] mb-3 animate-pulse" />
                <span className="text-[#22C55E] font-bold text-sm font-poppins">Uploaded</span>
                <span className="text-gray-500 text-xs mt-2 underline hover:text-white transition-colors">Change file</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-8 h-8 text-white group-hover:text-[#22C55E] group-hover:scale-110 transition-all mb-3" />
                <span className="text-white font-bold text-sm font-poppins group-hover:text-[#22C55E] transition-colors">
                  Upload Document
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Insurance Certificate Card */}
        <div className="flex flex-col items-center justify-between p-8 bg-[#0B2337] border border-[#2A2F38] rounded-3xl min-h-[340px] hover:border-[#22C55E]/30 transition-all duration-300">
          <h4 className="text-white font-bold text-lg sm:text-xl font-inter text-center mb-6">
            Insurance Certificate
          </h4>
          
          <div 
            onClick={() => onFileUpload('insuranceUploaded')}
            className={`w-full max-w-[220px] py-10 px-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
              formData.insuranceUploaded 
                ? 'border-dashed border-[#22C55E]/50 bg-[#22C55E]/5' 
                : 'border-solid border-[#2A2F38] bg-[#0B2337] hover:border-[#22C55E]/40'
            }`}
          >
            {formData.insuranceUploaded ? (
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-9 h-9 text-[#22C55E] mb-3 animate-pulse" />
                <span className="text-[#22C55E] font-bold text-sm font-poppins">Uploaded</span>
                <span className="text-gray-500 text-xs mt-2 underline hover:text-white transition-colors">Change file</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-8 h-8 text-white group-hover:text-[#22C55E] group-hover:scale-110 transition-all mb-3" />
                <span className="text-white font-bold text-sm font-poppins group-hover:text-[#22C55E] transition-colors">
                  Upload Document
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Registration Card */}
        <div className="flex flex-col items-center justify-between p-8 bg-[#0B2337] border border-[#2A2F38] rounded-3xl min-h-[340px] hover:border-[#22C55E]/30 transition-all duration-300">
          <h4 className="text-white font-bold text-lg sm:text-xl font-inter text-center mb-6">
            Vehicle Registration
          </h4>
          
          <div 
            onClick={() => onFileUpload('taxFormUploaded')}
            className={`w-full max-w-[220px] py-10 px-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
              formData.taxFormUploaded 
                ? 'border-dashed border-[#22C55E]/50 bg-[#22C55E]/5' 
                : 'border-solid border-[#2A2F38] bg-[#0B2337] hover:border-[#22C55E]/40'
            }`}
          >
            {formData.taxFormUploaded ? (
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-9 h-9 text-[#22C55E] mb-3 animate-pulse" />
                <span className="text-[#22C55E] font-bold text-sm font-poppins">Uploaded</span>
                <span className="text-gray-500 text-xs mt-2 underline hover:text-white transition-colors">Change file</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-8 h-8 text-white group-hover:text-[#22C55E] group-hover:scale-110 transition-all mb-3" />
                <span className="text-white font-bold text-sm font-poppins group-hover:text-[#22C55E] transition-colors">
                  Upload Document
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-8 mt-12">
        <button
          type="button"
          onClick={onBack}
          className="border border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E]/10 px-12 py-4 rounded-xl transition-all active:scale-95 text-base font-bold bg-transparent font-poppins"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-[#22C55E] hover:bg-[#1eb050] text-white font-extrabold px-12 py-4 rounded-xl transition-all shadow-lg shadow-[#22C55E]/20 active:scale-95 text-base font-poppins"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
