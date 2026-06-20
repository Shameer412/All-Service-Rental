'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

export default function FleetGPS() {
  return (
    <div className="bg-[#0B2337] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center gap-2 text-[#28A745]">
        <MapPin className="w-6 h-6 shrink-0" />
        <h3 className="text-xl font-extrabold text-[#28A745] tracking-tight font-space">GPS Tracking</h3>
      </div>

      {/* Clean Tracking Map Container with dynamic scaling on larger viewports */}
      <div className="relative h-[380px] sm:h-[480px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-[#001C2F] rounded-2xl border border-[#2A2F38]/50 flex flex-col items-center justify-center transition-all duration-300">
        <div className="flex flex-col items-center text-center max-w-sm px-4">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-[#28A745]" />
          </div>
          <h4 className="text-white font-bold text-lg tracking-wide font-space">Real-time GPS Tracking</h4>
          <p className="text-white text-sm mt-2 font-medium leading-relaxed font-poppins">
            Track all your vehicles on the map
          </p>
        </div>
      </div>
    </div>
  );
}
