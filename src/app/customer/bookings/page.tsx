'use client';

import React from 'react';
import { Truck, MapPin, Calendar, DollarSign, ChevronRight, Map } from 'lucide-react';
import Link from 'next/link';

const MyRentalsPage = () => {
  const [expandedRentals, setExpandedRentals] = React.useState<Record<number, boolean>>({});
  const rentals = [
    {
      id: 1,
      name: 'Ford F-650 Box Truck',
      vendor: 'NYC Fleet Co.',
      location: 'New York',
      dates: '2025-02-10 → 2025-02-17',
      price: '1,323',
      status: 'Active',
      statusColor: 'bg-[#22C55E]/10 text-[#22C55E]',
      showTrack: true
    },
    {
      id: 2,
      name: 'CAT 320 Excavator',
      vendor: 'Midwest Heavy Equip',
      location: 'Chicago',
      dates: '2025-02-12 → 2025-02-19',
      price: '3,150',
      status: 'Active',
      statusColor: 'bg-[#22C55E]/10 text-[#22C55E]',
      showTrack: true
    },
    {
      id: 3,
      name: 'Freightliner M2 106',
      vendor: 'West Coast Trucks',
      location: 'Los Angeles',
      dates: '2025-01-20 → 2025-01-27',
      price: '1,470',
      status: 'Completed',
      statusColor: 'bg-blue-500/10 text-blue-400',
      showTrack: false
    },
    {
      id: 4,
      name: 'Kenworth T680 Semi',
      vendor: 'West Coast Trucks',
      location: 'Houston',
      dates: '2025-02-14 → 2025-02-28',
      price: '4,480',
      status: 'Pending',
      statusColor: 'bg-yellow-500/10 text-yellow-500',
      showTrack: false
    },
    {
      id: 5,
      name: 'Utility Flatbed Trailer',
      vendor: 'NYC Fleet Co.',
      location: 'New York',
      dates: '2025-02-01 → 2025-02-10',
      price: '1,080',
      status: 'Completed',
      statusColor: 'bg-blue-500/10 text-blue-400',
      showTrack: false
    }
  ];

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-8 bg-[#001C2F] font-inter">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 font-space">My Rentals</h1>
        <p className="text-gray-400 font-inter">View and manage all your equipment rentals.</p>
      </div>

      {/* Rentals List */}
      <div className="space-y-4">
        {rentals.map((rental) => {
          const isExpanded = expandedRentals[rental.id] || false;
          return (
            <div 
              key={rental.id} 
              className="relative bg-[#0B2337] border border-[#2A2F38] p-4 md:p-5 rounded-[12px] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-all group"
            >
              <div 
                className="flex items-center gap-4 min-w-0 cursor-pointer select-none"
                onClick={() => setExpandedRentals(prev => ({ ...prev, [rental.id]: !prev[rental.id] }))}
                title="Click/Tap to expand details"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 bg-[#18C3BB]/10 rounded-lg border border-white/5 flex items-center justify-center shrink-0 transition-colors">
                  <Truck className="w-5 h-5 text-[#22C55E]" />
                </div>

                {/* Info */}
                <div className="space-y-0.5 min-w-0 pr-16 md:pr-0">
                  <div className="flex items-center gap-3">
                    <div className="relative group/tooltip min-w-0">
                      <h3 className={`text-white font-bold text-sm md:text-base font-space block ${
                        isExpanded ? 'whitespace-normal' : 'truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-none'
                      }`}>
                        {rental.name}
                      </h3>
                      {!isExpanded && (
                        <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/tooltip:block bg-[#050E1B] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none transition-all duration-150">
                          {rental.name} (Tap to expand)
                        </div>
                      )}
                    </div>
                    <span className={`absolute top-0 right-0 md:static px-3 py-1.5 md:py-0.5 rounded-bl-xl rounded-tr-[12px] md:rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider shrink-0 ${rental.statusColor}`}>
                      {rental.status}
                    </span>
                  </div>
                  
                  <div className="relative group/tooltip min-w-0">
                    <p className={`text-gray-400 text-xs md:text-sm font-medium block ${
                      isExpanded ? 'whitespace-normal' : 'truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-none'
                    }`}>
                      {rental.vendor} • {rental.location}
                    </p>
                    {!isExpanded && (
                      <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/tooltip:block bg-[#050E1B] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none transition-all duration-150">
                        {rental.vendor} • {rental.location}
                      </div>
                    )}
                  </div>

                  <div className="relative group/tooltip min-w-0">
                    <p className={`text-gray-400 text-[11px] md:text-xs block ${
                      isExpanded ? 'whitespace-normal' : 'truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-none'
                    }`}>
                      {rental.dates} · ${rental.price}
                    </p>
                    {!isExpanded && (
                      <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/tooltip:block bg-[#050E1B] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none transition-all duration-150">
                        {rental.dates} · ${rental.price}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            {/* Actions */}
            <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0">
              {rental.showTrack && (
                <Link 
                  href="/customer/tracking"
                  className="flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#1eb050] text-black px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#22C55E]/10 active:scale-95 w-fit md:w-auto"
                >
                  <MapPin className="w-4 h-4 text-black" />
                  Track
                </Link>
              )}
              <Link 
                href={`/equipment/${rental.id}`} 
                className="text-white hover:text-gray-300 font-bold text-sm transition-colors py-2"
              >
                Details
              </Link>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default MyRentalsPage;
