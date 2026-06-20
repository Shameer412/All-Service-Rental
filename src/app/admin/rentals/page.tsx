'use client';

import React, { useState, useEffect } from 'react';
import ActiveRentalsStats from '@/components/dashboard/admin/rentals/ActiveRentalsStats';
import ActiveRentalsTable from '@/components/dashboard/admin/rentals/ActiveRentalsTable';
import GPSTrackingView from '@/components/dashboard/admin/rentals/GPSTrackingView';

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

const mockRentals: RentalItem[] = [
  {
    id: '1',
    equipment: 'Ford F-650 Box Truck',
    customer: 'Jhon Smith',
    vendor: 'NYC Fleet Co.',
    location: 'New York',
    dates: '2024-01-15 ➔ 2024-01-15',
    amount: '$1,322',
    status: 'Pending',
  },
  {
    id: '2',
    equipment: 'Ford F-650 Box Truck',
    customer: 'Sarah Johnson',
    vendor: 'West Coast Trucks',
    location: 'Chicago',
    dates: '2024-01-15 ➔ 2024-01-15',
    amount: '$1,322',
    status: 'Suspended',
  },
  {
    id: '3',
    equipment: 'Ford F-650 Box Truck',
    customer: 'Jhon Smith',
    vendor: 'Midwest Heavy Equip',
    location: 'New York',
    dates: '2024-01-15 ➔ 2024-01-15',
    amount: '$1,322',
    status: 'Complete',
  },
  {
    id: '4',
    equipment: 'Ford F-650 Box Truck',
    customer: 'Sarah Johnson',
    vendor: 'NYC Fleet Co.',
    location: 'Chicago',
    dates: '2024-01-15 ➔ 2024-01-15',
    amount: '$1,322',
    status: 'Active',
  },
];

export default function ActiveRentalsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedRental, setSelectedRental] = useState<RentalItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#001C2F]" />;
  }

  // Filter rentals based on the selected card (Active or Pending)
  const filteredRentals = activeFilter
    ? mockRentals.filter((rental) => rental.status === activeFilter)
    : mockRentals;

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-8 pb-12 font-inter">
      {selectedRental ? (
        <GPSTrackingView
          rental={selectedRental}
          onBack={() => setSelectedRental(null)}
        />
      ) : (
        <>
          {/* Title Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Active Rentals & GPS Tracking
            </h1>
            <p className="text-white text-sm md:text-base font-inter">
              Monitor ongoing rentals in real-time
            </p>
          </div>

          {/* Stats Cards */}
          <ActiveRentalsStats
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            stats={{
              activeRentals: 182,
              pendingPickup: 24,
              todayRevenue: 8450,
              avgDuration: 4.2,
            }}
          />

          {/* Rentals Table */}
          <div className="space-y-4">
            {activeFilter && (
              <div className="flex justify-end items-center">
                <button
                  onClick={() => setActiveFilter(null)}
                  className="text-xs text-[#22C55E] hover:underline font-semibold"
                >
                  Clear Filter
                </button>
              </div>
            )}
            
            <ActiveRentalsTable
              rentals={filteredRentals}
              onGPSClick={(rental) => setSelectedRental(rental)}
            />
          </div>
        </>
      )}
    </div>
  );
}
