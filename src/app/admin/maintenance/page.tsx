'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MaintenanceStats from '@/components/dashboard/admin/maintenance/MaintenanceStats';
import MaintenanceList from '@/components/dashboard/admin/maintenance/MaintenanceList';
import ConfirmModal from '@/components/dashboard/admin/shared/ConfirmModal';

interface MaintenanceAlert {
  id: string;
  name: string;
  detail: string;
  dueDate: string;
  status: 'Critical' | 'Scheduled' | 'In Progress';
}

const initialAlerts: MaintenanceAlert[] = [
  {
    id: '1',
    name: 'Freightliner M2 106',
    detail: 'Oil Change Due ,6700mi',
    dueDate: 'Due: 2025-02-2025',
    status: 'Critical',
  },
  {
    id: '2',
    name: 'Kenworth T680 Semi',
    detail: 'Tire Rotation - 89, 100 mi',
    dueDate: 'Due: 2025-02-2025',
    status: 'Scheduled',
  },
  {
    id: '3',
    name: 'Ford F-650 Box Truck',
    detail: 'Oil Change Due ,6700mi',
    dueDate: 'Due: 2025-02-2025',
    status: 'In Progress',
  },
  {
    id: '4',
    name: 'Freightliner M2 106',
    detail: 'Tire Rotation - 89, 100 mi',
    dueDate: 'Due: 2025-02-2025',
    status: 'Critical',
  },
];

export default function MaintenancePage() {
  const [mounted, setMounted] = useState(false);
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>(initialAlerts);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [alertToResolve, setAlertToResolve] = useState<MaintenanceAlert | null>(null);

  const [stats, setStats] = useState({
    critical: 7,
    scheduled: 23,
    inProgress: 12,
    thisMonth: 45,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#001C2F]" />;
  }

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleResolveClick = (alert: MaintenanceAlert) => {
    setAlertToResolve(alert);
  };

  const handleConfirmResolve = () => {
    if (alertToResolve) {
      setAlerts((prev) => prev.filter((a) => a.id !== alertToResolve.id));

      setStats((prev) => {
        const next = { ...prev };
        if (alertToResolve.status === 'Critical') {
          next.critical = Math.max(0, next.critical - 1);
        } else if (alertToResolve.status === 'Scheduled') {
          next.scheduled = Math.max(0, next.scheduled - 1);
        } else if (alertToResolve.status === 'In Progress') {
          next.inProgress = Math.max(0, next.inProgress - 1);
        }
        next.thisMonth = Math.max(0, next.thisMonth - 1);
        return next;
      });

      toast.success(`Maintenance for ${alertToResolve.name} resolved`, {
        description: 'The maintenance record has been updated successfully.',
      });
      setAlertToResolve(null);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (!activeFilter || activeFilter === 'This Month') return true;
    return alert.status === activeFilter;
  });

  return (
    <div className="mx-auto space-y-8 pb-12 w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] font-inter">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          Maintenance Alerts
        </h1>
        <p className="text-white text-sm md:text-base opacity-80">
          Monitor vehicle maintenance and service schedules
        </p>
      </div>

      {/* KPI Stats Cards */}
      <MaintenanceStats
        stats={stats}
        activeFilter={activeFilter}
        onFilterClick={handleFilterClick}
      />

      {/* Maintenance Alerts List */}
      <MaintenanceList
        alerts={filteredAlerts}
        onResolveClick={handleResolveClick}
      />

      {/* Confirm Resolve Modal */}
      {alertToResolve && (
        <ConfirmModal
          title="Confirm Approval"
          message="Are you sure you want to resolve this request?"
          confirmText="Resolve"
          confirmColorClass="bg-[#22C55E] hover:bg-[#16a34a] text-black shadow-lg shadow-[#22C55E]/20"
          onCancel={() => setAlertToResolve(null)}
          onConfirm={handleConfirmResolve}
        />
      )}
    </div>
  );
}
