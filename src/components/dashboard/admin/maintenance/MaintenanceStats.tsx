'use client';

import React from 'react';
import { AlertTriangle, Calendar, Wrench, CheckCircle2 } from 'lucide-react';

interface MaintenanceStatsProps {
  stats: {
    critical: number;
    scheduled: number;
    inProgress: number;
    thisMonth: number;
  };
  activeFilter: string | null;
  onFilterClick: (filter: string) => void;
}

export default function MaintenanceStats({
  stats,
  activeFilter,
  onFilterClick,
}: MaintenanceStatsProps) {
  const cards = [
    {
      id: 'Critical',
      label: 'Critical Alerts',
      value: stats.critical.toString(),
      icon: AlertTriangle,
      iconColor: 'text-[#EF4444]',
      bgColor: 'bg-[#EF4444]/10',
      borderColor: 'hover:border-[#EF4444]/20',
      activeBorder: 'border-[#EF4444]',
      activeGlow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    },
    {
      id: 'Scheduled',
      label: 'Scheduled',
      value: stats.scheduled.toString(),
      icon: Calendar,
      iconColor: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
      borderColor: 'hover:border-[#3B82F6]/20',
      activeBorder: 'border-[#3B82F6]',
      activeGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    },
    {
      id: 'In Progress',
      label: 'In Progress',
      value: stats.inProgress.toString(),
      icon: Wrench,
      iconColor: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
      borderColor: 'hover:border-[#F59E0B]/20',
      activeBorder: 'border-[#F59E0B]',
      activeGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    },
    {
      id: 'This Month',
      label: 'This Month',
      value: stats.thisMonth.toString(),
      icon: CheckCircle2,
      iconColor: 'text-[#22C55E]',
      bgColor: 'bg-[#22C55E]/10',
      borderColor: 'hover:border-[#22C55E]/20',
      activeBorder: 'border-[#22C55E]',
      activeGlow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onFilterClick(card.id)}
            className={`flex flex-col justify-between p-6 w-full h-[200px] text-white bg-[#0B2337] border rounded-[24px] transition-all duration-300 cursor-pointer select-none ${
              isActive
                ? `${card.activeBorder} ${card.activeGlow}`
                : `border-[#2A2F38] ${card.borderColor}`
            }`}
          >
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                {card.value}
              </h3>
              <p className="text-white text-sm font-semibold tracking-wide">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
