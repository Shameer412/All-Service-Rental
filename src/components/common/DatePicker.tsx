'use client';

import React, { ReactNode, forwardRef, useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isBefore,
  startOfDay,
  setMonth,
  setYear
} from 'date-fns';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  minDate?: Date;
  label?: string;
  icon?: ReactNode;
  variant?: 'form' | 'sidebar';
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  icon?: ReactNode;
  variant?: 'form' | 'sidebar';
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholder, icon, variant = 'form' }, ref) => {
    const isSidebar = variant === 'sidebar';
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={
          isSidebar
            ? "w-full flex items-center justify-between bg-[#0B2337] border-t border-t-[#2A2F38] border-x-0 border-b-0 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#05DF72] hover:border-t-white/20 transition-all font-medium h-[54px] text-left cursor-pointer group"
            : "w-full flex items-center justify-between bg-[#001C2F] border-[0.86px] border-[#2A2F38] rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#05DF72] hover:border-white/20 transition-all font-medium h-[54px] text-left cursor-pointer group"
        }
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value || placeholder}
        </span>
        {icon ? (
          <span className="text-white/60 group-hover:text-white transition-colors">{icon}</span>
        ) : (
          <Calendar size={18} className="text-white/60 group-hover:text-white transition-colors" />
        )}
      </button>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export const DatePicker = ({
  selected,
  onChange,
  placeholderText = "Select Date",
  minDate,
  label,
  icon,
  variant = 'form',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMinDate = minDate !== undefined ? startOfDay(minDate) : startOfDay(new Date());

  useEffect(() => {
    if (selected) {
      setCurrentMonth(selected);
    }
  }, [selected]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(setMonth(currentMonth, parseInt(e.target.value)));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(setYear(currentMonth, parseInt(e.target.value)));
  };

  const renderHeader = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return (
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 hover:bg-[#2A2F38] rounded-full transition-colors text-white/70 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          <select
            value={currentMonth.getMonth()}
            onChange={handleMonthChange}
            className="bg-[#001C2F] text-white font-bold text-sm border border-[#2A2F38] rounded-lg px-2 py-1 outline-none focus:border-[#05DF72] cursor-pointer appearance-none"
            style={{ WebkitAppearance: 'none' }}
          >
            {months.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={currentMonth.getFullYear()}
            onChange={handleYearChange}
            className="bg-[#001C2F] text-white font-bold text-sm border border-[#2A2F38] rounded-lg px-2 py-1 outline-none focus:border-[#05DF72] cursor-pointer appearance-none"
            style={{ WebkitAppearance: 'none' }}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 hover:bg-[#2A2F38] rounded-full transition-colors text-white/70 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, i) => (
          <div key={i} className="text-center text-xs font-bold text-[#86878A] py-1">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isOutside = !isSameMonth(day, monthStart);
        const isDisabled = isBefore(day, activeMinDate);
        const isSelected = selected ? isSameDay(day, selected) : false;
        const isToday = isSameDay(day, new Date());

        days.push(
          <div key={day.toString()} className="flex justify-center items-center h-10 w-10">
            {isOutside ? (
              // Empty div for outside days to strictly keep months separate
              <div className="w-full h-full"></div>
            ) : (
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => handleSelect(cloneDay)}
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all
                  ${isDisabled ? 'text-white/20 cursor-not-allowed' : 'cursor-pointer hover:bg-[#05DF72]/15 hover:text-[#05DF72]'}
                  ${isSelected ? 'bg-[#05DF72] text-[#001C2F] font-extrabold hover:bg-[#04c966] hover:text-[#001C2F]' : ''}
                  ${!isSelected && isToday ? 'text-[#05DF72] font-extrabold border border-[#05DF72]/30' : ''}
                  ${!isSelected && !isToday && !isDisabled ? 'text-white font-medium' : ''}
                `}
              >
                {formattedDate}
              </button>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="space-y-3 w-full" ref={containerRef}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-widest text-white ml-1">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <CustomInput
          value={selected ? format(selected, 'MM/dd/yyyy') : ''}
          onClick={() => setIsOpen(!isOpen)}
          placeholder={placeholderText}
          icon={icon}
          variant={variant}
        />
        
        {isOpen && (
          <div className="absolute left-0 z-50 mt-2 bg-[#0B2337] border border-[#2A2F38] rounded-3xl p-5 shadow-2xl w-[320px]">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        )}
      </div>
    </div>
  );
};
