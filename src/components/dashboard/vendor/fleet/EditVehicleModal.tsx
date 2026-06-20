'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    id: string;
    type: string;
    make: string;
    model: string;
    year: string;
    location: string;
    mileage: string;
    status: 'Available' | 'Rented' | 'Maintenance';
  } | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function EditVehicleModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
}: EditVehicleModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !formData || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-[#001424]/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="vehicle-edit-modal-card">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#28A745] hover:text-[#218838] transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 font-bold" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 lg:mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-space">Edit Vehicle</h3>
          <p className="text-white/60 text-xs md:text-sm lg:text-base mt-1.5 font-medium font-inter">Update vehicle details below</p>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSave} className="flex-grow flex flex-col min-h-0 justify-between">
          {/* Scrollable Fields Container */}
          <div className="flex-grow overflow-y-auto pr-1.5 md:pr-3 custom-scrollbar pb-2 min-h-0">
            <div className="vehicle-edit-modal-grid">
              {/* Vehicle ID (Read-only) */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Vehicle ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full bg-[#0B2337]/55 border-2 border-[#2A2F38] rounded-xl text-white/50 font-semibold cursor-not-allowed"
                />
              </div>

              {/* Vehicle Type */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Type
                </label>
                <div className="relative flex items-center">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={onChange}
                    className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-semibold appearance-none cursor-pointer"
                  >
                    <option value="Truck" className="bg-[#0B2337] text-white">Truck</option>
                    <option value="Semi-Truck" className="bg-[#0B2337] text-white">Semi-Truck</option>
                    <option value="Box Truck" className="bg-[#0B2337] text-white">Box Truck</option>
                    <option value="Flatbed" className="bg-[#0B2337] text-white">Flatbed</option>
                    <option value="Refrigerated" className="bg-[#0B2337] text-white">Refrigerated</option>
                    <option value="Dump Truck" className="bg-[#0B2337] text-white">Dump Truck</option>
                    <option value="Flatbed Trailer" className="bg-[#0B2337] text-white">Flatbed Trailer</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Make */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Make
                </label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={onChange}
                  required
                  className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-medium"
                />
              </div>

              {/* Model */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={onChange}
                  required
                  className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-medium"
                />
              </div>

              {/* Year */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={onChange}
                  required
                  className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-medium"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Status
                </label>
                <div className="relative flex items-center">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                    className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-semibold appearance-none cursor-pointer"
                  >
                    <option value="Available" className="bg-[#0B2337] text-white">Available</option>
                    <option value="Rented" className="bg-[#0B2337] text-white">Rented</option>
                    <option value="Maintenance" className="bg-[#0B2337] text-white">Maintenance</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Location (Lat, Lng) - Spans 2 cols on desktop */}
              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Location (Lat, Lng)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  required
                  className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-medium"
                />
              </div>

              {/* Current Mileage - Spans 2 cols on desktop */}
              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <label className="text-[#28A745] font-extrabold uppercase tracking-widest block font-inter">
                  Current Mileage
                </label>
                <input
                  type="text"
                  name="mileage"
                  value={formData.mileage}
                  onChange={onChange}
                  required
                  className="w-full bg-[#0B2337] border-2 border-[#2A2F38] rounded-xl text-white focus:outline-none focus:border-[#28A745] focus:ring-1 focus:ring-[#28A745] transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-2 w-full justify-end border-t border-white/5 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-8 border border-white hover:bg-white/5 text-white bg-transparent font-bold py-3.5 rounded-xl lg:rounded-2xl transition-all active:scale-95 text-sm md:text-base text-center cursor-pointer order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 bg-[#28A745] hover:bg-[#218838] text-white font-bold py-3.5 rounded-xl lg:rounded-2xl transition-all active:scale-95 text-sm md:text-base text-center shadow-lg shadow-[#28A745]/10 cursor-pointer order-1 sm:order-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
