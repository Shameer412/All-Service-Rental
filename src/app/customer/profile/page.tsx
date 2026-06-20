'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  User, 
  CheckCircle2, 
  Edit3, 
  Save, 
  Mail, 
  Phone, 
  Sparkles,
  CreditCard,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { nsKey } from '@/lib/storageNamespace';

interface CustomerProfileData {
  name: string;
  email: string;
  phone: string;
  membershipLevel: string;
  memberSince: string;
  activeRentals: number;
  totalSpent: string;
}

const DEFAULT_CUSTOMER_PROFILE: CustomerProfileData = {
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 019-2834',
  membershipLevel: 'Gold Tier',
  memberSince: 'Feb 2025',
  activeRentals: 2,
  totalSpent: '$7,503',
};

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState<CustomerProfileData>(DEFAULT_CUSTOMER_PROFILE);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CustomerProfileData>(DEFAULT_CUSTOMER_PROFILE);

  // Load from localStorage
  useEffect(() => {
    const dataKey = nsKey('customer_profile_data');
    const savedData = localStorage.getItem(dataKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProfile(parsed);
        setEditedProfile(parsed);
      } catch (err) {
        console.error('Error parsing customer profile data', err);
      }
    }
  }, []);

  const handleEditToggle = () => {
    setEditedProfile({ ...profile });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedProfile({ ...profile });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedProfile.name || !editedProfile.email || !editedProfile.phone) {
      toast.error('Profile information fields cannot be empty.');
      return;
    }

    const dataKey = nsKey('customer_profile_data');
    localStorage.setItem(dataKey, JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setEditMode(false);
    toast.success('Profile updated successfully!', {
      icon: <Sparkles className="w-5 h-5 text-[#28A745]" />
    });
  };

  // Get initials for profile avatar fallback
  const getInitials = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  const initials = getInitials(profile.name);

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[92%] max-w-[2400px] mx-auto space-y-10 bg-[#001C2F] font-inter text-white pb-16 px-2">
      
      {/* Page Title & Main Edit Trigger Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              My Profile
            </h1>
            <Sparkles className="w-6 h-6 text-[#28A745] animate-pulse" />
          </div>
          <p className="text-slate-400 text-sm md:text-base font-light">
            Manage your personal settings, contact details, and view rental statistics.
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {!editMode ? (
            <motion.button
              key="edit-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEditToggle}
              className="bg-[#28A745] hover:bg-[#218838] hover:shadow-lg hover:shadow-[#28A745]/20 text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-sm self-start sm:self-auto"
            >
              <Edit3 size={16} />
              Edit Profile
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              <motion.button
                key="cancel-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="px-5 py-3 rounded-2xl border border-[#1A2E42] text-slate-300 hover:bg-white/5 font-bold text-sm transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                key="save-btn"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="bg-[#28A745] hover:bg-[#218838] text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#28A745]/15 text-sm"
              >
                <Save size={16} />
                Save Changes
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Creative Full-Width Dashboard Header */}
      <div className="w-full">
        
        {/* Profile Card (Avatar, Name, Email, Phone) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-[#0B2337] border border-[#1A2E42] rounded-[24px] p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6 shadow-2xl"
        >
          {/* Subtle decorative radial background blur */}
          <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-[#28A745]/5 blur-3xl pointer-events-none" />

          {/* Glowing Avatar */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#28A745]/20 flex items-center justify-center p-1 shadow-xl bg-[#001C2F]">
              <div className="w-full h-full rounded-full bg-[#28A745]/10 flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold tracking-wide">
                {initials}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#28A745] text-[#001C2F] p-1.5 rounded-full shadow-lg border-4 border-[#0B2337]">
              <CheckCircle2 className="w-4 h-4 text-black" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="space-y-1">
              <span className="text-[#28A745] text-xs font-bold uppercase tracking-widest">Customer</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none">
                {profile.name}
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 border-t border-white/5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#28A745]" />
                {profile.email}
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#28A745]" />
                {profile.phone}
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Account Details and Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Info Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <User className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Personal Details</h3>
              <p className="text-slate-400 text-xs">Verify or modify your personal identity details</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {editMode ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sarah.j@example.com"
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1"
              >
                <div className="flex justify-between items-center py-3.5 border-b border-white/5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Full Name</span>
                  <span className="text-white text-sm font-bold">{profile.name}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 border-b border-white/5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Email Address</span>
                  <span className="text-white text-sm font-bold">{profile.email}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Phone Number</span>
                  <span className="text-white text-sm font-bold">{profile.phone}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats and Fast Overview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <Truck className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Rental Overview</h3>
              <p className="text-slate-400 text-xs">Summary of your account rental metrics</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#001C2F]/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#28A745]/10 rounded-xl">
                  <Truck className="w-5 h-5 text-[#28A745]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Active Equipment</p>
                  <p className="text-slate-400 text-[10px]">Undergoing current leasing contracts</p>
                </div>
              </div>
              <span className="text-xl font-extrabold text-[#28A745]">{profile.activeRentals}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#001C2F]/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#28A745]/10 rounded-xl">
                  <CreditCard className="w-5 h-5 text-[#28A745]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Total Spent</p>
                  <p className="text-slate-400 text-[10px]">Historical billing invoices</p>
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">{profile.totalSpent}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
