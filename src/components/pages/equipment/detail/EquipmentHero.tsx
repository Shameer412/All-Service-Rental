'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { EquipmentHeroProps } from '@/types/equipment';

const EquipmentHero = ({ title, subTitle, image }: EquipmentHeroProps) => {
  return (
    <div className="space-y-10">
      {/* Main Image Card */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute top-6 left-6 z-10 bg-[#00C9501A] text-[#05DF72] backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-black shadow-lg">
          <CheckCircle2 size={14} strokeWidth={3} /> DOT VERIFIED
        </div>
        <div className="absolute top-6 right-6 z-10 bg-[#FF69001A] text-[#FF8904] backdrop-blur-md px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg">
          Popular Choice
        </div>
        <div className="relative aspect-[16/10] md:aspect-video w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentHero;
