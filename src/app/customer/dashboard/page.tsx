'use client';

import React from 'react';
import { Truck, CreditCard, FileText, Bell, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CustomerDashboard() {
  const [expandedRentals, setExpandedRentals] = React.useState<Record<number, boolean>>({});
  const stats = [
    { label: 'Active Rentals', value: '2', icon: Truck, trend: '+1 this week', color: 'text-green-500' },
    { label: 'Total Spent', value: '$7,503', icon: CreditCard, color: 'text-blue-500' },
    { label: 'Completed Rentals', value: '2', icon: FileText, color: 'text-purple-500' },
    { label: 'Unread Alerts', value: '4', icon: Bell, color: 'text-orange-500' },
  ];

  const activeRentals = [
    {
      id: 1,
      name: 'Ford F-650 Box Truck',
      location: 'New York',
      dates: '2025-02-10 → 2025-02-17',
      status: 'Active',
      icon: Truck,
    },
    {
      id: 2,
      name: 'CAT 320 Excavator',
      location: 'Chicago',
      dates: '2025-02-12 → 2025-02-19',
      status: 'Active',
      icon: Truck,
    },
  ];

  const featuredEquipment = [
    {
      id: 1,
      name: 'Ford F-650 Box Truck',
      specs: '26ft · Diesel · Auto',
      price: '189',
      img: '/images/truck_sample.png',
    },
    {
      id: 2,
      name: 'CAT 320 Excavator',
      specs: '20 Ton · Tracked',
      price: '450',
      img: '/Login.png',
    },
    {
      id: 3,
      name: 'Freightliner M2 106',
      specs: '24ft · Liftgate · GPS',
      price: '210',
      img: '/hero-bg.png',
    },
  ];

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-10 bg-[#001C2F] font-inter">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-space">Dashboard</h1>
        <p className="text-gray-400">Welcome back, here's your rental overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const isTotalSpent = stat.label === 'Total Spent';
          const isUnreadAlerts = stat.label === 'Unread Alerts';
          const Content = (
            <div key={index} className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[20px] relative overflow-hidden group hover:border-[#22C55E]/30 transition-all h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#18C3BB]/10 p-3 rounded-xl border border-white/5">
                  <stat.icon className="w-6 h-6 text-[#22C55E]" />
                </div>
                {stat.trend && (
                  <span className="text-[12px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full">
                    {stat.trend}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            </div>
          );

          if (isTotalSpent) {
            return (
              <Link href="/customer/payments" key={index} className="block">
                {Content}
              </Link>
            );
          }

          if (isUnreadAlerts) {
            return (
              <Link href="/customer/notifications" key={index} className="block">
                {Content}
              </Link>
            );
          }

          return Content;
        })}
      </div>

      {/* Active Rentals Section */}
      <section className="space-y-5">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-2xl font-bold text-white font-space">Active Rentals</h2>
          <Link href="/customer/bookings" className="text-white hover:text-[#22C55E] text-sm font-medium transition-colors">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {activeRentals.map((rental) => {
            return (
              <div
                key={rental.id}
                className="relative bg-[#0B2337] border border-[#2A2F38] p-4 md:p-5 rounded-[15px] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-all group"
              >
                <Link 
                  href={`/equipment/${rental.id}`}
                  className="flex items-center gap-4 min-w-0 select-none hover:opacity-90 group/link"
                  title="View Equipment Details"
                >
                  {/* Icon Container */}
                  <div className="w-12 h-12 bg-[#18C3BB]/10 rounded-xl border border-white/5 flex items-center justify-center shrink-0 transition-colors group-hover/link:border-[#22C55E]/30">
                    <rental.icon className="w-5 h-5 text-[#22C55E]" />
                  </div>

                  {/* Info */}
                  <div className="space-y-0.5 min-w-0 pr-16 md:pr-0">
                    <div className="flex items-center gap-3">
                      <div className="relative min-w-0">
                        <h3 className="text-white font-bold text-sm md:text-base font-space block group-hover/link:text-[#22C55E] transition-colors truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-none">
                          {rental.name}
                        </h3>
                      </div>
                    </div>

                    <div className="relative min-w-0">
                      <p className="text-gray-400 text-xs md:text-sm font-medium block truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-none">
                        {rental.location}
                      </p>
                    </div>

                    <div className="relative min-w-0">
                      <p className="text-gray-400 text-[11px] md:text-xs block font-mono truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-none">
                        {rental.dates}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center justify-center md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0">
                  <span className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0">
                    {rental.status}
                  </span>
                  <Link
                    href="/customer/tracking"
                    className="flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#1eb050] text-black px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-lg shadow-[#22C55E]/10 w-fit md:w-auto"
                  >
                    <MapPin className="w-4 h-4 text-black" />
                    Track
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Equipment Section */}
      <section className="space-y-6 pt-4">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-2xl font-bold text-white font-space">Featured Equipment</h2>
          <Link href="#" className="text-white hover:text-[#22C55E] text-sm font-medium transition-colors">
            Browse All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEquipment.map((item) => (
            <div key={item.id} className="bg-[#0B2337] border border-[#2A2F38] rounded-[24px] overflow-hidden group hover:border-[#22C55E]/20 transition-all shadow-xl">
              <div className="relative h-[220px] w-full bg-[#001C2F] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{item.name}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.specs}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#22C55E] text-2xl font-bold">${item.price}</span>
                    <span className="text-gray-500 text-sm font-bold uppercase tracking-tighter">/day</span>
                  </div>
                  <button className="bg-[#22C55E] hover:bg-[#1eb050] text-black px-5 py-2.5 rounded-[12px] font-bold text-sm transition-all active:scale-95 shadow-lg shadow-[#22C55E]/10">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
