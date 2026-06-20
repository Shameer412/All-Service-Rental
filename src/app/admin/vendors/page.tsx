'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Building2 } from 'lucide-react';
import { Vendor } from '@/types/vendor';
import VendorCard from '@/components/dashboard/admin/vendors/VendorCard';
import ConfirmModal from '@/components/dashboard/admin/shared/ConfirmModal';

const initialVendors: Vendor[] = [
  {
    id: '1',
    name: 'NYC Fleet Co.',
    contactName: 'Robert Chen',
    email: 'robert@nycfleet.com',
    fleetSize: 45,
    rentalsCount: 312,
    rating: 4.9,
    joinedDate: '2024-06-15',
    status: 'verified',
    earnings: 128500,
  },
  {
    id: '2',
    name: 'Midwest Heavy Equip',
    contactName: 'Lisa Martinez',
    email: 'lisa@midwestheavy.com',
    fleetSize: 28,
    rentalsCount: 187,
    rating: 4.8,
    joinedDate: '2024-08-01',
    status: 'verified',
    earnings: 95200,
  },
  {
    id: '3',
    name: 'West Coast Trucks',
    contactName: 'David Kim',
    email: 'david@westcoast.com',
    fleetSize: 62,
    rentalsCount: 456,
    rating: 4.7,
    joinedDate: '2024-03-22',
    status: 'verified',
    earnings: 201300,
  },
  {
    id: '4',
    name: 'Texas Haulers LLC',
    contactName: 'Maria Garcia',
    email: 'maria@texashaulers.com',
    fleetSize: 35,
    rentalsCount: 0,
    joinedDate: '2025-02-10',
    status: 'pending',
  },
];

export default function VendorManagement(): React.ReactNode {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [mounted, setMounted] = useState(false);
  const [activeAction, setActiveAction] = useState<{
    type: 'approve' | 'reject';
    vendorId: string;
    vendorName: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#001C2F]" />;
  }

  const handleApprove = (id: string, name: string): void => {
    setActiveAction({ type: 'approve', vendorId: id, vendorName: name });
  };

  const handleReject = (id: string, name: string): void => {
    setActiveAction({ type: 'reject', vendorId: id, vendorName: name });
  };

  const executeApprove = (): void => {
    if (activeAction) {
      const { vendorId, vendorName } = activeAction;
      setVendors((prev) =>
        prev.map((vendor) =>
          vendor.id === vendorId
            ? { ...vendor, status: 'verified' as const, earnings: 0, rating: 5.0 }
            : vendor
        )
      );
      toast.success(`Vendor approved successfully`, {
        description: `${vendorName} has been activated as a verified vendor.`,
      });
      setActiveAction(null);
    }
  };

  const executeReject = (): void => {
    if (activeAction) {
      const { vendorId, vendorName } = activeAction;
      setVendors((prev) => prev.filter((vendor) => vendor.id !== vendorId));
      toast.error(`Vendor registration rejected`, {
        description: `${vendorName}'s registration request was denied.`,
      });
      setActiveAction(null);
    }
  };

  const activeVendors = vendors.filter((vendor) => vendor.status !== 'rejected');

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-8 pb-12 font-inter">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight font-inter">
          Vendor Management
        </h1>
        <p className="text-white text-sm md:text-base font-inter">
          Approve or reject vendor registrations.
        </p>
      </div>

      {/* Vendors list */}
      <div className="space-y-4">
        {activeVendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-[#0B2337] border border-white/5 rounded-[16px] text-gray-400">
            <Building2 className="w-12 h-12 text-gray-500 mb-3" />
            <p className="text-lg font-medium">No vendors found</p>
          </div>
        ) : (
          activeVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>

      {activeAction && (
        <ConfirmModal
          title={activeAction.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
          message={
            activeAction.type === 'approve'
              ? 'Are you sure you want to approve this request?'
              : 'Are you sure you want to reject this request?'
          }
          confirmText={activeAction.type === 'approve' ? 'Approve' : 'Reject'}
          confirmColorClass={
            activeAction.type === 'approve'
              ? 'bg-[#28A745] hover:bg-[#218838] shadow-[#28A745]/20'
              : 'bg-[#D92D20] hover:bg-[#b02218] shadow-[#D92D20]/20'
          }
          onCancel={() => setActiveAction(null)}
          onConfirm={activeAction.type === 'approve' ? executeApprove : executeReject}
        />
      )}
    </div>
  );
}
