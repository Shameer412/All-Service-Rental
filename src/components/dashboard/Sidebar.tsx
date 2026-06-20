'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import { NAVIGATION_CONFIG } from '@/config/navigation';
import { UserRole } from '../../types/user';
import { useAuth } from '../common/AuthProvider';

interface SidebarProps {
  role: UserRole;
  portalName: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, portalName, isOpen, onClose }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navItems = NAVIGATION_CONFIG[role];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Backdrop overlay for mobile screen sizes */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}
      <aside className={`w-72 h-screen bg-[#0B2337] flex flex-col border-r border-white/5 fixed lg:sticky top-0 left-0 z-50 lg:z-30 lg:translate-x-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        {/* Logo Section */}
        <div className="h-24 flex items-center justify-center px-6 border-b border-white/5">
          <Link href="/" className="flex flex-col items-center gap-1">
            <Image
              src="/icons/logo1.svg"
              alt="All Service Rental"
              width={100}
              height={30}
              className="object-contain"
              priority
            />
            <p className="text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
              {portalName}
            </p>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden absolute top-0 right-0 p-3 bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 rounded-bl-xl"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Spacing after logo */}
        <div className="h-6" />

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            // Normalize paths for comparison
            const normalizedPathname = pathname.replace(/\/$/, '');
            const normalizedHref = item.href.replace(/\/$/, '');

            const isActive = mounted && (normalizedPathname === normalizedHref ||
              (normalizedHref !== '' && normalizedPathname.startsWith(normalizedHref + '/')));

            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => onClose?.()}
                className={`flex items-center gap-4 px-4 py-4 rounded-[12px] transition-all duration-200 group ${isActive
                    ? 'bg-[#28a745] text-black shadow-lg shadow-[#28a745]/20'
                    : 'text-white hover:bg-white/5'
                  }`}
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${isActive ? 'text-black' : 'text-white'}`}
                />
                <span className={`font-medium text-[16px] tracking-wide flex-1 ${isActive ? 'text-black' : 'text-white'}`}>
                  {item.title}
                </span>

                {/* Badge */}
                {item.badge && (
                  <span className="bg-[#dc3545] text-white text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section: Logout */}
        <div className="p-4 mt-auto">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-4 w-full px-4 py-4 rounded-[12px] text-white hover:bg-white/5 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-red-500/50 group-hover:border-red-500 transition-colors">
              <LogOut className="w-4 h-4 text-red-500" />
            </div>
            <span className="font-medium text-[16px] tracking-wide">Logout</span>
          </button>
        </div>

        {showConfirm && mounted && createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 flex items-center justify-center p-4">
            <div className="bg-[#0B2337] rounded-[24px] max-w-[480px] w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              {/* Close button (Green X) */}
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-6 right-6 text-[#28a745] hover:opacity-80 transition-opacity"
                aria-label="Close"
              >
                <X className="w-8 h-8" strokeWidth={2.5} />
              </button>

              <div className="space-y-4">
                {/* Title */}
                <h3 className="text-3xl font-bold text-white tracking-wide">Logout</h3>

                {/* Message */}
                <p className="text-white text-lg font-medium leading-relaxed">
                  Are you sure you want to log out?
                </p>

                {/* Centered Buttons */}
                <div className="flex items-center justify-center gap-6 pt-6">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-10 py-3 rounded-xl border border-red-600 text-red-500 hover:bg-red-500/10 font-bold text-base transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      logout();
                    }}
                    className="bg-[#E53E3E] hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg shadow-red-600/20"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </aside>
    </>
  );
};

export default Sidebar;
