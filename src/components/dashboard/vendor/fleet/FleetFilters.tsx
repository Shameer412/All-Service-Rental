'use client';

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface FleetFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  vehicleTypes: string[];
}

export default function FleetFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  vehicleTypes,
}: FleetFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0B2337] border border-[#2A2F38] p-4 rounded-2xl shadow-xl">
      {/* Search */}
      <div className="md:col-span-6 relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search by ID, model, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm"
        />
      </div>

      {/* Status Filter */}
      <div className="md:col-span-3 relative">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-4 py-3 text-[#28A745] focus:outline-none focus:border-[#28A745]/50 transition-all font-semibold text-sm appearance-none cursor-pointer"
        >
          <option value="All" className="text-white bg-[#001C2F]">Status</option>
          <option value="Available" className="text-white bg-[#001C2F]">Available</option>
          <option value="Rented" className="text-white bg-[#001C2F]">Rented</option>
          <option value="Maintenance" className="text-white bg-[#001C2F]">Maintenance</option>
        </select>
        <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-[#28A745] pointer-events-none" />
      </div>

      {/* Type Filter */}
      <div className="md:col-span-3 relative">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-4 py-3 text-[#28A745] focus:outline-none focus:border-[#28A745]/50 transition-all font-semibold text-sm appearance-none cursor-pointer"
        >
          <option value="All" className="text-white bg-[#001C2F]">Type</option>
          {vehicleTypes.filter(t => t !== 'All').map((type) => (
            <option key={type} value={type} className="text-white bg-[#001C2F]">
              {type}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-[#28A745] pointer-events-none" />
      </div>
    </div>
  );
}
