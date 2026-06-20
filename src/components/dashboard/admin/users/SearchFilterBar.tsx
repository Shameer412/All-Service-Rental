'use client';

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export default function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: SearchFilterBarProps) {
  return (
    <div className="bg-[#0B2337] border border-[#2A2F38] p-3 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-inter">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        <input
          type="text"
          placeholder="Search users by name, email, or company..."
          className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#22C55E]/50 transition-all text-sm font-inter"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Status Dropdown */}
      <div className="relative min-w-[180px]">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl pl-4 pr-10 py-3 text-[#22C55E] font-semibold text-sm focus:outline-none focus:border-[#22C55E]/50 transition-all cursor-pointer font-inter"
        >
          <option value="All" className="bg-[#0B2337] text-white font-inter">Status</option>
          <option value="Active" className="bg-[#0B2337] text-white font-inter">Active</option>
          <option value="Pending" className="bg-[#0B2337] text-white font-inter">Pending</option>
          <option value="Suspended" className="bg-[#0B2337] text-white font-inter">Suspended</option>
          <option value="Complete" className="bg-[#0B2337] text-white font-inter">Complete</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22C55E] pointer-events-none" />
      </div>
    </div>
  );
}
