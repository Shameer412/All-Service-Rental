import React from 'react';

interface StatCardProps {
  value: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * StatCard — Displays a metric with a large green value, bold title,
 * and a short description.
 * Replaces the repeated card pattern in StatsSection.tsx.
 */
const StatCard: React.FC<StatCardProps> = ({ value, title, description, className = '' }) => {
  return (
    <div
      className={`bg-[#182B40] p-6 md:p-8 rounded-sm text-left border border-white/5 flex flex-col justify-between w-full min-h-[220px] md:min-h-[260px] mx-auto group transition-all hover:bg-[#1d334a] hover:-translate-y-1 ${className}`}
    >
      <div>
        <h3 className="text-4xl md:text-5xl font-bold text-[#66DF75] tracking-tighter mb-3 md:mb-4 group-hover:drop-shadow-[0_0_15px_rgba(102,223,117,0.3)] transition-all">
          {value}
        </h3>
        <h4 className="text-lg md:text-xl font-bold text-slate-100 mb-2">{title}</h4>
        <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
