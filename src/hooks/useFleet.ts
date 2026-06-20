'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { nsKey } from '@/lib/storageNamespace';
import { Vehicle } from '@/components/dashboard/vendor/fleet/FleetTable';
import { INITIAL_VEHICLES } from '@/components/dashboard/vendor/fleet/mockFleetData';

export function useFleet() {
  const fleetKey = nsKey('vendor_fleet_vehicles');
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editFormData, setEditFormData] = useState<{
    id: string;
    type: string;
    make: string;
    model: string;
    year: string;
    location: string;
    mileage: string;
    status: 'Available' | 'Rented' | 'Maintenance';
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(fleetKey) ?? localStorage.getItem('vendor_fleet_vehicles');
    if (stored) {
      try {
        setVehicles(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored vehicles:', e);
      }
    } else {
      localStorage.setItem(fleetKey, JSON.stringify(INITIAL_VEHICLES));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(fleetKey, JSON.stringify(vehicles));
    }
  }, [fleetKey, vehicles, mounted]);

  // Extract unique vehicle types for the filter dropdown
  const vehicleTypes = useMemo(() => {
    const types = new Set(vehicles.map((v) => v.type));
    return ['All', ...Array.from(types)];
  }, [vehicles]);

  // Filtered vehicles list
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.makeModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      const matchesType = typeFilter === 'All' || v.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [vehicles, searchQuery, statusFilter, typeFilter]);

  const handleEditClick = (vehicle: Vehicle, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingVehicle(vehicle);

    const parts = vehicle.makeModel.split(' ');
    const make = parts[0] || '';
    const model = parts.slice(1).join(' ') || '';

    const latLngStr = vehicle.coordinates
      ? `${vehicle.coordinates.lat.replace('° N', '').replace(' N', '')}, -${vehicle.coordinates.lng.replace('° W', '').replace(' W', '')}`
      : '';

    setEditFormData({
      id: vehicle.id,
      type: vehicle.type,
      make: make,
      model: model,
      year: vehicle.year,
      location: latLngStr || vehicle.location,
      mileage: vehicle.mileage.replace(' mi', '').replace(/,/g, ''),
      status: vehicle.status,
    });
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle || !editFormData) return;

    const locParts = editFormData.location.split(',');
    const latVal = locParts[0]?.trim() || '';
    const lngVal = locParts[1]?.trim() || '';
    const isCoords = !isNaN(Number(latVal)) && !isNaN(Number(lngVal)) && latVal !== '' && lngVal !== '';

    const updatedVehicle: Vehicle = {
      ...editingVehicle,
      type: editFormData.type,
      makeModel: `${editFormData.make} ${editFormData.model}`,
      year: editFormData.year,
      location: isCoords ? editingVehicle.location : editFormData.location,
      mileage: isNaN(Number(editFormData.mileage.replace(/,/g, '')))
        ? editFormData.mileage
        : `${Number(editFormData.mileage.replace(/,/g, '')).toLocaleString()} mi`,
      status: editFormData.status,
      coordinates: isCoords
        ? {
            x: editingVehicle.coordinates?.x || 400,
            y: editingVehicle.coordinates?.y || 200,
            lat: latVal.includes('°') ? latVal : `${latVal}° N`,
            lng: lngVal.includes('°') ? lngVal : `${lngVal.replace('-', '')}° W`,
          }
        : editingVehicle.coordinates,
    };

    setVehicles((prev) => prev.map((v) => (v.id === editingVehicle.id ? updatedVehicle : v)));
    toast.success(`Vehicle ${editingVehicle.id} updated successfully!`);
    setEditingVehicle(null);
    setEditFormData(null);
  };

  return {
    vehicles,
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
  };
}
