'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { FormCardProps, InputGroupProps } from '@/types/equipment';

const FormCard = ({ title, children }: FormCardProps) => (
  <div className="bg-[#0B2337] border border-[#2A2F38] rounded-[2.5rem] p-6 md:p-10 shadow-xl">
    <h2 className="text-lg font-medium mb-8 uppercase tracking-tight text-white">{title}</h2>
    {children}
  </div>
);

interface DateInputGroupProps extends InputGroupProps {
  type?: string;
}

const InputGroup = ({ label, placeholder, icon, type = "text" }: DateInputGroupProps) => (
  <div className="space-y-5">
    <label className="text-[10px] font-black uppercase tracking-widest text-white ml-1">{label}</label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white z-10 pointer-events-none">
          {React.cloneElement(icon as React.ReactElement, { size: 18 } as Record<string, any>)}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        onClick={(e) => {
          if (type === 'date') {
            try {
              (e.target as HTMLInputElement).showPicker();
            } catch (err) {
              console.log(err);
            }
          }
        }}
        className={`w-full bg-[#001C2F] border-[0.86px] border-[#2A2F38] rounded-2xl py-4 ${icon ? 'pl-14 pr-6' : 'px-6'} text-sm text-white focus:outline-none focus:border-[#05DF72] transition-all placeholder:text-white font-medium h-[54px] [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden`}
      />
    </div>
  </div>
);

const BookingForm = () => {
  return (
    <div className="flex-1 space-y-6 w-full">
      {/* Personal Info Card */}
      <FormCard title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Full Name *" placeholder="John Doe" />
          <InputGroup label="Email Address *" placeholder="john@example.com" />
          <InputGroup label="Phone Number *" placeholder="+1 (555) 000-0000" />
          <InputGroup label="Company (Optional)" placeholder="Company name" />
        </div>
      </FormCard>

      {/* Rental Date Card */}
      <FormCard title="Rental Date">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Start Date *" placeholder="Pick start date" icon={<Calendar />} type="date" />
          <InputGroup label="End Date *" placeholder="Pick end date" icon={<Calendar />} type="date" />
        </div>
      </FormCard>

      {/* Additional Notes Card */}
      <FormCard title="Additional Notes">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-white ml-1">Special Requirements</label>
          <textarea
            placeholder="Any special requirements, delivery instructions, or onsite contacts..."
            className="w-full bg-[#001C2F] border-[0.86px] border-[#2A2F38] rounded-2xl p-6 h-32 text-white focus:outline-none focus:border-[#05DF72] transition-all resize-none placeholder:text-white/60 text-sm leading-relaxed"
          />
        </div>
      </FormCard>
    </div>
  );
};

export default BookingForm;
