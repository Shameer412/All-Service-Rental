'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function ProfileSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#001C2F] flex flex-col">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content with top padding to account for fixed navbar height */}
      <main className="flex-1 pt-[70px] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
