import React from 'react';
import { Star, MapPin, Shield, Truck, Clock } from 'lucide-react';
import { EquipmentHeaderProps } from '@/types/equipment';

const EquipmentHeader = ({ title, type, modelYear, rating, reviewsCount, location }: EquipmentHeaderProps) => {
  const badges = [
    { label: 'Verified Vendor', icon: <Shield size={14} className="text-[#05DF72]" /> },
    { label: 'Inspected Equipment', icon: <Truck size={14} className="text-[#05DF72]" /> },
    { label: 'Same Day Pickup', icon: <Clock size={14} className="text-[#05DF72]" /> },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold mb-4 3xl:mb-6 tracking-tighter uppercase">{title}</h1>
          <p className="text-white text-lg 3xl:text-xl 4xl:text-2xl font-bold tracking-[0.2em] uppercase mb-6 3xl:mb-8 flex items-center gap-3">
            {type} <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" /> {modelYear} MODEL
          </p>
          <div className="flex flex-wrap items-center gap-8 text-sm 3xl:text-base 4xl:text-lg">
            <div className="flex items-center gap-2 text-[#FFFF00]">
              <Star size={18} fill="currentColor" className="3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6" />
              <span className="font-black text-lg 3xl:text-xl 4xl:text-2xl">{rating}</span>
              <span className="text-gray-500 font-medium">({reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin size={18} className="text-white 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6" />
              <span className="font-medium tracking-wide">{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mt-8">
        {badges.map((badge) => (
          <span 
            key={badge.label} 
            className="text-white text-[12px] 3xl:text-sm 4xl:text-base font-medium px-5 py-2.5 3xl:px-6 3xl:py-3 rounded-full flex items-center gap-2 shadow-sm equipment-badge-glass"
          >
             {badge.icon} {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EquipmentHeader;
