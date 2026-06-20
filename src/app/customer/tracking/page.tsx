'use client';

import React from 'react';
import { MapPin, Navigation, Signal, Truck } from 'lucide-react';

const TrackingPage = () => {
  const [expandedItems, setExpandedItems] = React.useState<Record<number, boolean>>({});
  
  const trackedItems = [
    {
      id: 1,
      name: 'Ford F-650 Box Truck',
      location: 'New York',
      coordinates: '40.7128, -74.0060',
      status: 'Live',
    },
    {
      id: 2,
      name: 'CAT 320 Excavator',
      location: 'Chicago',
      coordinates: '41.8781, -87.6298',
      status: 'Live',
    }
  ];

  return (
    <div className="w-full space-y-8 bg-[#001C2F] font-inter px-4 md:px-8">
      {/* Header */}
      <div className="space-y-1 3xl:space-y-2">
        <h1 className="text-3xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-2 font-space">GPS Tracking</h1>
        <p className="text-gray-400 text-sm md:text-base 3xl:text-xl 4xl:text-2xl">Live location of your rented equipment.</p>
      </div>

      {/* Map Area Placeholder aligned with layout paddings */}
      <div className="w-full h-[380px] sm:h-[480px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-[#192E434D] border border-[#2A2F38] rounded-[20px] 3xl:rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300">
        {/* Mock Pins */}
        <div className="absolute top-[20%] left-[8%] sm:left-[20%] flex flex-col items-center group cursor-pointer">
          <div className="bg-[#0B2337] border border-white/10 px-2 py-1 3xl:px-3.5 3xl:py-2 rounded text-[8px] sm:text-[10px] 3xl:text-base 4xl:text-lg text-white font-bold mb-1.5 3xl:mb-2.5 shadow-lg whitespace-nowrap">
            Ford F-650 Box Truck
          </div>
          <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 bg-[#22C55E] rounded-full shadow-md"></div>
        </div>

        <div className="absolute bottom-[25%] right-[8%] sm:right-[20%] flex flex-col items-center group cursor-pointer">
          <div className="bg-[#0B2337] border border-white/10 px-2 py-1 3xl:px-3.5 3xl:py-2 rounded text-[8px] sm:text-[10px] 3xl:text-base 4xl:text-lg text-white font-bold mb-1.5 3xl:mb-2.5 shadow-lg whitespace-nowrap">
            CAT 320 Excavator
          </div>
          <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 bg-[#22C55E] rounded-full shadow-md"></div>
        </div>

        {/* Center Text */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2 3xl:space-y-4 px-4 select-none">
          <Navigation className="w-10 h-10 md:w-12 md:h-12 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 text-[#22C55E] mb-1 md:mb-2 drop-shadow-[0_2px_6px_rgba(34,197,94,0.2)] animate-bounce duration-1000" style={{ animationDuration: '3s' }} />
          <div>
            <h2 className="text-xl md:text-2xl 3xl:text-4xl 4xl:text-5xl font-bold text-white mb-1 md:mb-1.5 font-space drop-shadow-md">Live GPS Map</h2>
            <p className="text-white/95 text-xs md:text-sm 3xl:text-lg 4xl:text-xl max-w-[240px] sm:max-w-md 3xl:max-w-xl drop-shadow-sm font-medium">Map integration will display real-time vehicle locations</p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 3xl:bottom-10 3xl:right-10 flex items-center gap-1.5 md:gap-2 3xl:gap-3.5 bg-[#001C2F]/80 backdrop-blur-md px-2.5 py-1 md:px-4 md:py-2 3xl:px-6 3xl:py-3.5 rounded-full border border-white/5 select-none z-20">
          <Signal className="w-3 h-3 md:w-3.5 md:h-3.5 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 text-[#22C55E]" />
          <span className="text-white text-[8px] md:text-xs 3xl:text-base 4xl:text-lg font-bold tracking-wider">SATELLITE CONNECTED</span>
        </div>
      </div>

      {/* Tracked Items List */}
      <div className="space-y-4 3xl:space-y-6">
        {trackedItems.map((item) => {
          return (
            <div 
              key={item.id} 
              className="bg-[#0B2337] border border-[#2A2F38] p-5 3xl:p-8 rounded-[16px] 3xl:rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-4 3xl:gap-6 min-w-0 w-full sm:w-auto">
                {/* Icon Container */}
                <div className="w-12 h-12 3xl:w-16 3xl:h-16 bg-[#18C3BB]/10 rounded-xl 3xl:rounded-2xl border border-white/5 flex items-center justify-center shrink-0 transition-colors">
                  <MapPin className="w-5 h-5 3xl:w-8 3xl:h-8 text-[#22C55E]" />
                </div>

                {/* Info */}
                <div className="space-y-0.5 3xl:space-y-1.5 min-w-0 w-full">
                  <h3 className="text-white font-bold text-base md:text-lg 3xl:text-2xl 4xl:text-3xl font-space truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm 3xl:text-lg 4xl:text-xl font-medium truncate" title={item.location}>
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Coordinates and Status Badge */}
              <div className="flex items-center justify-between sm:justify-end gap-6 3xl:gap-10 w-full sm:w-auto shrink-0 border-t border-white/5 pt-3 sm:pt-0 sm:border-0">
                <div className="text-left sm:text-right min-w-0 space-y-0.5 3xl:space-y-1.5">
                  <p className="text-white text-[10px] 3xl:text-xs 4xl:text-sm font-bold uppercase tracking-widest mb-0.5">Coordinates</p>
                  <p className="text-white font-mono text-xs md:text-sm 3xl:text-lg 4xl:text-xl">{item.coordinates}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#22C55E]/10 text-[#22C55E] px-3.5 py-1.5 3xl:px-6 3xl:py-2.5 rounded-full select-none shrink-0">
                  <span className="text-[11px] 3xl:text-sm 4xl:text-base font-bold uppercase tracking-wider">{item.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingPage;
