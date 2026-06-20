'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/common/AuthProvider';
import { nsKey } from '@/lib/storageNamespace';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'vendor') {
        router.push('/login');
        return;
      }
      
      const isCompleted =
        localStorage.getItem(nsKey('vendor_profile_completed')) === 'true' ||
        localStorage.getItem('vendor_profile_completed') === 'true';
      if (!isCompleted) {
        router.push('/vendor/profile-setup');
      } else {
        setIsVerified(true);
      }
    }
  }, [user, isLoading, router]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading || !isVerified) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001C2F]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#001C2F]">
      <Sidebar 
        role="vendor" 
        portalName="Vendor Portal" 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#001C2F]">
          {children}
        </main>
      </div>
    </div>
  );
}
