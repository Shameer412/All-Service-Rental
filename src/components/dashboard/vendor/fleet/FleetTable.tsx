'use client';

import React from 'react';
import { MapPin, Edit } from 'lucide-react';

export interface Vehicle {
  id: string;
  type: string;
  makeModel: string;
  year: string;
  location: string;
  coordinates: { x: number; y: number; lat: string; lng: string };
  mileage: string;
  status: 'Available' | 'Rented' | 'Maintenance';
}

interface FleetTableProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  onEditClick: (vehicle: Vehicle, e: React.MouseEvent) => void;
}

export default function FleetTable({
  vehicles,
  selectedVehicleId,
  setSelectedVehicleId,
  onEditClick,
}: FleetTableProps) {
  return (
    <div className="overflow-hidden shadow-2xl">
      {/* Table Title Bar */}
      <div className="bg-[#0B2337] px-4 sm:px-6 py-4 flex items-center justify-between">
        <h2 className="text-white font-extrabold text-lg tracking-wide font-space">Vehicle</h2>
        <span className="text-white/40 text-xs font-semibold">{vehicles.length} total</span>
      </div>
      <div className="w-full overflow-x-hidden">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#28A745]">
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap rounded-tl-2xl">
                Vehicle ID
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider hidden sm:table-cell">
                Type
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider">
                Make/Model
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                Year
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider hidden md:table-cell">
                Location
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                Mileage
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider text-center rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle, index) => {
                const isSelected = selectedVehicleId === vehicle.id;
                const rowBg = index % 2 === 0 ? 'bg-[#0B2337]' : 'bg-[#001C2F]';
                return (
                  <tr
                    key={vehicle.id}
                    onClick={() => setSelectedVehicleId(isSelected ? null : vehicle.id)}
                    className={`transition-all cursor-pointer group ${rowBg}`}
                  >
                    <td className="px-4 sm:px-6 py-4.5 font-bold text-white text-sm tracking-wide whitespace-nowrap">
                      {vehicle.id}
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-white/80 text-sm font-medium hidden sm:table-cell">
                      {vehicle.type}
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-white font-semibold text-sm">
                      {vehicle.makeModel}
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-white/80 text-sm font-medium whitespace-nowrap hidden md:table-cell">
                      {vehicle.year}
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-sm font-medium hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-white/80">
                        <MapPin className="w-4 h-4 text-[#28A745] shrink-0" />
                        <span>{vehicle.location}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-white/80 text-sm font-medium whitespace-nowrap hidden md:table-cell">
                      {vehicle.mileage}
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-sm whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                          vehicle.status === 'Available'
                            ? 'text-[#027A48] border-[#D1FADF]'
                            : vehicle.status === 'Rented'
                            ? 'text-[#B93815] border-[#FEE4E2]'
                            : 'text-[#B25E10] border-[#FEF0C7]'
                        }`}
                        style={{
                          backgroundColor:
                            vehicle.status === 'Available'
                              ? 'var(--Component-colors-Utility-Success-utility-success-50, #ECFDF3)'
                              : 'var(--Component-colors-Utility-Orange-utility-orange-50, #FEF6EE)',
                        }}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4.5 text-center">
                      <button
                        onClick={(e) => onEditClick(vehicle, e)}
                        className="p-2 text-white/40 hover:text-[#28A745] hover:bg-white/5 rounded-lg transition-all active:scale-95 inline-flex items-center justify-center"
                        title="Edit Vehicle"
                      >
                        <Edit className="w-4 h-4 text-[#28A745]" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 sm:px-6 py-12 text-center text-white/40 font-medium"
                >
                  No vehicles found matching the search/filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
