'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { useFleet } from '@/hooks/useFleet';
import FleetFilters from '@/components/dashboard/vendor/fleet/FleetFilters';
import FleetTable from '@/components/dashboard/vendor/fleet/FleetTable';
import FleetGPS from '@/components/dashboard/vendor/fleet/FleetGPS';
import EditVehicleModal from '@/components/dashboard/vendor/fleet/EditVehicleModal';

export default function FleetOverview() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    selectedVehicleId,
    setSelectedVehicleId,
    editingVehicle,
    setEditingVehicle,
    editFormData,
    setEditFormData,
    vehicleTypes,
    filteredVehicles,
    handleEditClick,
    handleEditFormChange,
    handleEditSave,
  } = useFleet();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight font-space">
            Fleet <span className="text-[#28A745]">Overview</span>
          </h1>
          <p className="text-white text-sm mt-1 font-medium">Monitor and manage all your vehicles</p>
        </div>
        <Link href="/vendor/fleet/add" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-[#28A745] hover:bg-[#218838] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#28A745]/10">
            <Plus className="w-5 h-5" />
            Add Vehicle
          </button>
        </Link>
      </div>

      {/* Modular Search & Filter Bar */}
      <FleetFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        vehicleTypes={vehicleTypes}
      />

      {/* Modular Vehicle List Table */}
      <FleetTable
        vehicles={filteredVehicles}
        selectedVehicleId={selectedVehicleId}
        setSelectedVehicleId={setSelectedVehicleId}
        onEditClick={handleEditClick}
      />

      {/* Modular GPS Tracking Section */}
      <FleetGPS />

      {/* Modular Edit Vehicle Modal */}
      <EditVehicleModal
        isOpen={!!editingVehicle}
        onClose={() => {
          setEditingVehicle(null);
          setEditFormData(null);
        }}
        formData={editFormData}
        onChange={handleEditFormChange}
        onSave={handleEditSave}
      />
    </div>
  );
}
