'use client';

import React from 'react';
import { Car, Clock, DollarSign } from 'lucide-react';

interface ActiveRentalsStatsProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  stats: {
    activeRentals: number;
    pendingPickup: number;
    todayRevenue: number;
    avgDuration: number;
  };
}

export default function ActiveRentalsStats({
  activeFilter,
  onFilterChange,
  stats,
}: ActiveRentalsStatsProps) {
  const cards = [
    {
      id: 'Active',
      label: 'Active Rentals',
      value: stats.activeRentals.toString(),
      icon: Car,
      iconColor: 'text-[#22C55E]',
      bgColor: 'bg-[#22C55E]/10',
      borderColor: 'hover:border-[#22C55E]/20',
      activeBorder: 'border-[#22C55E]',
      activeGlow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)]',
    },
    {
      id: 'Pending',
      label: 'Pending Pickup',
      value: stats.pendingPickup.toString(),
      icon: Clock,
      iconColor: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
      borderColor: 'hover:border-[#F59E0B]/20',
      activeBorder: 'border-[#F59E0B]',
      activeGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    },
    {
      id: 'Revenue',
      label: "Today's Revenue",
      value: `$${stats.todayRevenue.toLocaleString()}`,
      icon: DollarSign,
      iconColor: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
      borderColor: 'hover:border-[#3B82F6]/20',
      activeBorder: 'border-[#3B82F6]',
      activeGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    },
    {
      id: 'Duration',
      label: 'Avg Duration',
      value: `${stats.avgDuration} days`,
      icon: Clock,
      iconColor: 'text-[#A855F7]',
      bgColor: 'bg-[#A855F7]/10',
      borderColor: 'hover:border-[#A855F7]/20',
      activeBorder: 'border-[#A855F7]',
      activeGlow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]',
    },
  ];

  const handleCardClick = (id: string) => {
    // Only allow filtering by Active and Pending statuses for table lists,
    // or toggle off if clicked again
    if (id === 'Active' || id === 'Pending') {
      if (activeFilter === id) {
        onFilterChange(null);
      } else {
        onFilterChange(id);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.id;
        const isFilterable = card.id === 'Active' || card.id === 'Pending';

        return (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`bg-[#0B2337] border p-6 rounded-[24px] flex flex-col justify-between h-[200px] transition-all duration-300 select-none ${
              isFilterable ? 'cursor-pointer' : 'cursor-default'
            } ${
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
              <p className="text-white text-sm font-semibold tracking-wide font-inter">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
