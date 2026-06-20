import React from 'react';
import { Calendar, Shield, Wifi, Phone, MessageSquare, Map, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { BookingSidebarProps, InputGroupProps } from '@/types/equipment';
import { DatePicker } from '@/components/common/DatePicker';

interface SidebarInputProps extends InputGroupProps {
  type?: string;
}

const InputGroup = ({ label, placeholder, icon, type = "text" }: SidebarInputProps) => (
  <div className="space-y-3">
    <label className="text-xs font-bold uppercase tracking-widest text-white ml-1">{label}</label>
    <div className="relative group">
      <input
        type={type}
        placeholder={placeholder}
        onClick={(e) => {
          if (type === 'date') {
            try {
              (e.target as HTMLInputElement).showPicker();
            } catch (err) { }
          }
        }}
        className="w-full bg-[#0B2337] border-t border-t-[#2A2F38] border-x-0 border-b-0 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#05DF72] transition-colors placeholder:text-white/40 [color-scheme:dark] cursor-pointer"
      />
      {icon && type !== 'date' && <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white pointer-events-none">{icon}</div>}
    </div>
  </div>
);

const SidebarIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex flex-col items-center gap-2 3xl:gap-3">
    {icon}
    <span className="text-[9px] 3xl:text-[11px] 4xl:text-[12px] font-black uppercase tracking-widest text-white">{label}</span>
  </div>
);

const SidebarAction = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4 3xl:py-5 rounded-xl text-xs 3xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-white transition-all">
    {icon} {text}
  </button>
);

const BookingSidebar = ({ price }: BookingSidebarProps) => {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <div className="w-full lg:w-[400px] 3xl:w-[460px] 4xl:w-[500px] shrink-0">
      <div className="bg-[#001c2f] border border-[#2A2F38] rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 3xl:p-10 sticky top-24 shadow-2xl">
        <div className="text-center mb-10">
          <p className="text-white text-[10px] 3xl:text-xs 4xl:text-sm mb-2 uppercase tracking-[0.2em] font-bold">Daily Rate</p>
          <div className="text-5xl 3xl:text-6xl 4xl:text-7xl font-black text-white">${price}<span className="text-xl text-white/50 font-medium ml-1">/day</span></div>
          <p className="text-white/50 text-[10px] mt-2 font-medium">Plus taxes and fees</p>
        </div>

        <div className="border-t border-white pt-10 space-y-6 mb-10">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            label="Pick-up Date (Start)"
            placeholderText="mm/dd/yyyy"
            variant="sidebar"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            label="Return Date (End)"
            placeholderText="mm/dd/yyyy"
            variant="sidebar"
            minDate={startDate || undefined}
          />
        </div>

        <Link href="/equipment/booking" className="block">
          <button className="w-full bg-[#28A745] hover:bg-[#218838] text-black font-black py-5 3xl:py-6 rounded-2xl text-sm 3xl:text-base 4xl:text-lg uppercase tracking-widest transition-all active:scale-[0.98]">
            Request to Book
          </button>
        </Link>

        <div className="flex justify-between border-t border-white mt-10 pt-8">
          <SidebarIcon icon={<Shield size={24} className="text-[#05DF72]" />} label="Insured" />
          <SidebarIcon icon={<Wifi size={24} className="text-[#05DF72]" />} label="GPS Track" />
          <SidebarIcon icon={<CheckCircle2 size={24} className="text-[#C87533]" />} label="24/7 Help" />
        </div>

        <div className="border-t border-white mt-10 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Questions?</h3>
          <div className="space-y-4">
            <SidebarAction icon={<Phone size={18} />} text="Call Owner" />
            <SidebarAction icon={<MessageSquare size={18} />} text="Send Message" />
          </div>
        </div>

        <div className="border-t border-white mt-10 pt-8">
          <div className="flex items-center gap-3 font-bold mb-4 uppercase tracking-wider text-sm text-white">
            <Map className="text-[#05DF72]" size={20} /> Pick-up Location
          </div>
          <p className="text-white/70 text-sm mb-6 font-light">Houston, TX</p>
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#05DF72] text-xs py-3 rounded-xl font-bold uppercase tracking-widest transition-colors">
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
