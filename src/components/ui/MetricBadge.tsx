import React from 'react';

interface MetricBadgeProps {
  label: string;
  value: string;
  subtext: string;
  accentColor?: string;
  className?: string;
}

/**
 * MetricBadge — A compact inline block showing a labelled metric value.
 * Replaces the hardcoded stats block inside FeatureSection.tsx.
 */
const MetricBadge: React.FC<MetricBadgeProps> = ({
  label,
  value,
  subtext,
  className = '',
}) => {
  return (
    <div
      className={`bg-slate-900/50 border-l-2 p-5 max-w-sm rounded-r-sm ${className} border-[#28A745]`}
    >
      <div className="flex items-baseline gap-2">
        <span
          className="text-[10px] md:text-xs font-bold tracking-tighter text-[#28A745]"
        >
          {label}
        </span>
        <span
          className="text-2xl md:text-3xl font-black text-[#28A745]"
        >
          {value}
        </span>
      </div>
      <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">
        {subtext}
      </p>
    </div>
  );
};

export default MetricBadge;
