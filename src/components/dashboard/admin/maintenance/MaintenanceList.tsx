'use client';

import React from 'react';
import { Building, Truck } from 'lucide-react';

interface MaintenanceAlert {
  id: string;
  name: string;
  detail: string;
  dueDate: string;
  status: 'Critical' | 'Scheduled' | 'In Progress';
}

interface MaintenanceListProps {
  alerts: MaintenanceAlert[];
  onResolveClick: (alert: MaintenanceAlert) => void;
}

export default function MaintenanceList({ alerts, onResolveClick }: MaintenanceListProps) {
  return (
    <div className="p-6 md:p-8 space-y-4 bg-[#001C2F] border border-white/5 rounded-[24px]">
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-[#001C2F] border border-white/5 rounded-[16px]"
          >
            <div className="flex items-center gap-4">
              {/* Left Column: Icon container */}
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-[#05253F] border border-white/5 text-[#22C55E]">
                <Building className="w-6 h-6 text-[#22C55E]" />
              </div>
              {/* Text Column */}
              <div>
                <h4 className="text-white font-bold text-base md:text-lg">
                  {alert.name}
                </h4>
                <p className="mt-0.5 text-white text-sm font-medium">
                  {alert.detail}
                </p>
                <p className="mt-1 text-white text-xs font-normal">
                  {alert.dueDate}
                </p>
              </div>
            </div>

            {/* Right Column: Action Button */}
            <button
              onClick={() => onResolveClick(alert)}
              className="bg-[#22C55E] hover:bg-[#16a34a] text-black font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 active:scale-95 text-sm cursor-pointer"
            >
              Resolve
            </button>
          </div>
        ))
      ) : (
        <p className="text-white/60 text-center py-8 bg-[#001C2F] border border-white/5 rounded-[16px]">
          No active maintenance alerts for this status.
        </p>
      )}
    </div>
  );
}
