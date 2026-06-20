'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Navigation, Signal } from 'lucide-react';

interface RentalItem {
  id: string;
  equipment: string;
  customer: string;
  vendor: string;
  location: string;
  dates: string;
  amount: string;
  status: 'Pending' | 'Suspended' | 'Complete' | 'Active';
}

interface GPSMapModalProps {
  rental: RentalItem;
  onClose: () => void;
}

export default function GPSMapModal({ rental, onClose }: GPSMapModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeLat, setActiveLat] = useState(40.7128);
  const [activeLng, setActiveLng] = useState(-74.006);

  useEffect(() => {
    setMounted(true);
    if (rental.location.toLowerCase().includes('chicago')) {
      setActiveLat(41.8781);
      setActiveLng(-87.6298);
    } else {
      setActiveLat(40.7128);
      setActiveLng(-74.006);
    }
  }, [rental.location]);

  // Telemetry fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLat((prev) => prev + (Math.random() - 0.5) * 0.0001);
      setActiveLng((prev) => prev + (Math.random() - 0.5) * 0.0001);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // Tracked items list matching the screenshot
  const trackedItems = [
    {
      name: 'Ford F-650 Box Truck',
      location: 'New York',
      coords: `${activeLat.toFixed(4)}, ${activeLng.toFixed(4)}`,
      isActiveRow: !rental.location.toLowerCase().includes('chicago'),
    },
    {
      name: 'CAT 320 Excavator',
      location: 'Chicago',
      coords: '41.8781, -87.6298',
      isActiveRow: rental.location.toLowerCase().includes('chicago'),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#001C2F] border border-white/10 rounded-[28px] max-w-[950px] w-full p-6 md:p-8 shadow-2xl relative flex flex-col h-[90vh] md:h-auto max-h-[850px] overflow-hidden select-none animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-90 z-20 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* GPS Tracking Header */}
        <div className="mb-6 space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-wide font-space">
            GPS Tracking
          </h1>
          <p className="text-gray-400 text-sm">
            Live location of your rented equipment.
          </p>
        </div>

        {/* Map Area */}
        <div className="w-full h-[280px] md:h-[380px] bg-[#192E434D] border border-[#2A2F38] rounded-[20px] relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300 mb-6">
          {/* Grid Map Background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Ford Box Truck Pin */}
          <div className="absolute top-[25%] left-[25%] flex flex-col items-center select-none z-10">
            <div className="bg-[#0B2337] border border-white/10 px-2 py-1 rounded text-[10px] text-white font-bold mb-1.5 shadow-lg whitespace-nowrap">
              Ford F-650 Box Truck
            </div>
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-[#14b8a6] rounded-full shadow-md border border-white" />
              {!rental.location.toLowerCase().includes('chicago') && (
                <div className="absolute -inset-1.5 bg-[#14b8a6]/40 rounded-full animate-ping" />
              )}
            </div>
          </div>

          {/* CAT 320 Excavator Pin */}
          <div className="absolute top-[48%] left-[55%] flex flex-col items-center select-none z-10">
            <div className="bg-[#0B2337] border border-white/10 px-2 py-1 rounded text-[10px] text-white font-bold mb-1.5 shadow-lg whitespace-nowrap">
              CAT 320 Excavator
            </div>
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-[#14b8a6] rounded-full shadow-md border border-white" />
              {rental.location.toLowerCase().includes('chicago') && (
                <div className="absolute -inset-1.5 bg-[#14b8a6]/40 rounded-full animate-ping" />
              )}
            </div>
          </div>

          {/* Center Pointer & Live GPS Map Indicator */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-2 px-4">
            <Navigation className="w-12 h-12 text-[#14b8a6] mb-1 drop-shadow-[0_2px_6px_rgba(20,184,166,0.2)] animate-bounce duration-1000" style={{ animationDuration: '3s' }} />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1 font-space drop-shadow-md">
                Live GPS Map
              </h2>
              <p className="text-white/70 text-xs max-w-xs drop-shadow-sm font-medium">
                Map integration will display real-time vehicle locations
              </p>
            </div>
          </div>

          {/* Satellite Status Badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#001C2F]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5">
            <Signal className="w-3.5 h-3.5 text-[#14b8a6]" />
            <span className="text-white text-[9px] font-bold tracking-wider">SATELLITE CONNECTED</span>
          </div>
        </div>

        {/* Tracked Items List */}
        <div className="space-y-4 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
          {trackedItems.map((item, index) => (
            <div
              key={index}
              className={`bg-[#0B2337] border p-4.5 rounded-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
                item.isActiveRow ? 'border-[#14b8a6]/40 shadow-lg shadow-[#14b8a6]/5' : 'border-[#2A2F38] hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Map Pin Icon Container */}
                <div className="w-12 h-12 bg-[#14b8a6]/10 rounded-xl border border-[#14b8a6]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#14b8a6]" />
                </div>
                
                {/* Vehicle Details */}
                <div>
                  <h3 className="text-white font-bold text-base font-space">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium">
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Coordinates and Live Badge */}
              <div className="flex items-center justify-between sm:justify-end gap-8 border-t border-white/5 pt-3 sm:pt-0 sm:border-0">
                <div className="text-left sm:text-right">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Coordinates
                  </p>
                  <p className="text-white font-mono text-sm font-semibold">
                    {item.coords}
                  </p>
                </div>
                
                <div className="bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 px-4 py-1 rounded-full shrink-0 select-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
