'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { User, Settings, LogOut, ChevronDown, Menu, ClipboardList, X, Bell } from 'lucide-react';
import { useAuth } from '../common/AuthProvider';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-24 bg-[#0B2337] border-b border-white/5 flex items-center justify-between lg:justify-end px-4 md:px-8 lg:pr-16 sticky top-0 z-40">
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
      <div className="flex items-center gap-4">
        {/* Notification Bell Icon */}
        {user?.role === 'customer' && (
          <Link
            href="/customer/notifications"
            className="relative p-2.5 rounded-full hover:bg-white/5 text-white/80 hover:text-white transition-colors group flex items-center justify-center shrink-0"
            title="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#28a745] rounded-full ring-2 ring-[#0B2337] animate-pulse" />
          </Link>
        )}

        <div className="relative" ref={dropdownRef}>
          {/* User Profile Trigger */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:opacity-80 transition-opacity rounded-full"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#28a745]/30">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#0B2337] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
              <div className="p-3 border-b border-white/5 bg-white/5">
                <p className="text-white font-semibold text-sm">{user?.name || 'User Profile'}</p>
                <p className="text-gray-400 text-xs truncate">{user?.email || 'user@example.com'}</p>
              </div>

              <div className="p-2">
                <Link
                  href={user?.role === 'vendor' ? '/vendor/profile' : user?.role === 'customer' ? '/customer/profile' : '/profile'}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-[#28a745]/10 rounded-lg transition-colors group"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="w-4 h-4 text-[#28a745]" />
                  <span className="text-sm font-medium">Profile</span>
                </Link>

                {user?.role === 'vendor' && (
                  <Link
                    href="/vendor/profile-setup?edit=true"
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-[#28a745]/10 rounded-lg transition-colors group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ClipboardList className="w-4 h-4 text-[#28a745]" />
                    <span className="text-sm font-medium">Profile Setup</span>
                  </Link>
                )}

                <Link
                  href={user?.role === 'vendor' ? '/vendor/settings' : user?.role === 'customer' ? '/customer/settings' : '/settings'}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-[#28a745]/10 rounded-lg transition-colors group"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4 text-[#28a745]" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>

                <div className="h-[1px] bg-white/5 my-2" />

                <button
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors group text-left"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLogoutConfirm && mounted && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 flex items-center justify-center p-4">
          <div className="bg-[#0B2337] rounded-[24px] max-w-[480px] w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button (Green X) */}
            <button
              onClick={() => setShowLogoutConfirm(false)}
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
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-10 py-3 rounded-xl border border-red-600 text-red-500 hover:bg-red-500/10 font-bold text-base transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
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
    </header>
  );
};

export default Header;
