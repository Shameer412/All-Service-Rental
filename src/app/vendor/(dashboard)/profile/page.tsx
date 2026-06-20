'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  User, 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X, 
  FileText, 
  Phone, 
  Mail,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { nsKey } from '@/lib/storageNamespace';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  mcNumber: string;
  dotNumber: string;
  licenseNumber: string;
  insuranceProvider: string;
  policyNumber: string;
  insuranceExpiry: string;
  licenseUploaded: boolean;
  insuranceUploaded: boolean;
  taxFormUploaded: boolean;
}

const DEFAULT_PROFILE: ProfileData = {
  firstName: 'Sarah',
  lastName: 'Jenkins',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 019-2834',
  companyName: 'Jenkins Fleet Solutions LLC',
  mcNumber: 'MC-982341',
  dotNumber: 'USDOT-39284',
  licenseNumber: 'DL-8837492',
  insuranceProvider: 'Progressive Commercial',
  policyNumber: 'PRO-9923849-09',
  insuranceExpiry: '2027-08-15',
  licenseUploaded: true,
  insuranceUploaded: true,
  taxFormUploaded: true,
};

export default function VendorProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(DEFAULT_PROFILE);

  // Load from localStorage
  useEffect(() => {
    const dataKey = nsKey('vendor_profile_data');
    const savedData = localStorage.getItem(dataKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProfile(parsed);
        setEditedProfile(parsed);
      } catch (err) {
        console.error('Error parsing profile data', err);
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    if (!editedProfile.firstName || !editedProfile.lastName || !editedProfile.email || !editedProfile.phone) {
      toast.error('Account credentials cannot be empty.');
      return;
    }
    if (!editedProfile.companyName) {
      toast.error('Company Name is required.');
      return;
    }

    const dataKey = nsKey('vendor_profile_data');
    localStorage.setItem(dataKey, JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setEditMode(false);
    toast.success('Profile updated successfully!', {
      icon: <Sparkles className="w-5 h-5 text-[#28A745]" />
    });
  };

  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[92%] max-w-[2400px] mx-auto space-y-10 bg-[#001C2F] font-inter text-white pb-16 px-2">
      
      {/* Page Title & Main Edit Trigger Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Vendor Profile
            </h1>
            <Sparkles className="w-6 h-6 text-[#28A745] animate-pulse" />
          </div>
          <p className="text-slate-400 text-sm md:text-base font-light">
            Manage your account settings, business credentials, and verification status.
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

      {/* Creative Split-Card Dashboard Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side (Avatar, Name, Email, Phone) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-[#0B2337] border border-[#1A2E42] rounded-[24px] p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6 shadow-2xl"
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
              <span className="text-[#28A745] text-xs font-bold uppercase tracking-widest">Fleet Partner</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none">
                {profile.firstName} {profile.lastName}
              </h2>
            </div>
            <p className="text-slate-300 text-sm font-medium flex items-center justify-center sm:justify-start gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              {profile.companyName}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 border-t border-white/5 text-xs text-slate-400 font-medium">
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

        {/* Right Side (Verification Badge & Member Info Widget) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-[#0B2337] border border-[#1A2E42] rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-[#28A745]/5 blur-2xl pointer-events-none" />

          {/* Top Info */}
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verification Level</h4>
              <p className="text-slate-400 text-xs mt-1">Premium vendor tier</p>
            </div>
            <span className="bg-[#28A745]/15 border border-[#28A745]/30 text-[#28A745] text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1">
              Active Tier
            </span>
          </div>

          {/* Center Info */}
          <div className="my-4 flex items-center gap-4">
            <div className="p-3.5 bg-[#28A745]/10 rounded-2xl">
              <ShieldCheck className="w-7 h-7 text-[#28A745]" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white leading-none">100% Verified</p>
              <p className="text-slate-400 text-[11px] font-medium mt-1">Trust Score • Documents Uploaded</p>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs text-slate-400">
            <span>Member Since</span>
            <span className="text-white font-semibold">Jan 2026</span>
          </div>
        </motion.div>

      </div>

      {/* Profile Details Layout (Grid of Sections) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section 1: Account Information */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <User className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Account Information</h3>
              <p className="text-slate-400 text-xs">Your personal login details</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editedProfile.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editedProfile.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Jenkins"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
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
                  <span className="text-slate-400 text-sm font-medium">First Name</span>
                  <span className="text-white text-sm font-bold">{profile.firstName}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 border-b border-white/5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Last Name</span>
                  <span className="text-white text-sm font-bold">{profile.lastName}</span>
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

        {/* Section 2: Business Registration */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <Building className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Business Registration</h3>
              <p className="text-slate-400 text-xs">Verify your registered corporate data</p>
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
                  <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={editedProfile.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Fleet Master Solutions LLC"
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">MC Number</label>
                    <input
                      type="text"
                      name="mcNumber"
                      value={editedProfile.mcNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. MC-123456"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">DOT Number</label>
                    <input
                      type="text"
                      name="dotNumber"
                      value={editedProfile.dotNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. USDOT-39284"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">License No.</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={editedProfile.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. BL-987654321"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
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
                  <span className="text-slate-400 text-sm font-medium">Company Name</span>
                  <span className="text-white text-sm font-bold">{profile.companyName}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 border-b border-white/5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">MC Number</span>
                  <span className="text-white text-sm font-bold">{profile.mcNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 border-b border-white/5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">USDOT Number</span>
                  <span className="text-white text-sm font-bold">{profile.dotNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Business License</span>
                  <span className="text-white text-sm font-bold">{profile.licenseNumber || 'N/A'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Section 3: Insurance coverage */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Insurance Coverage</h3>
              <p className="text-slate-400 text-xs">Verify coverage expiration details</p>
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
                  <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Insurance Provider</label>
                  <input
                    type="text"
                    name="insuranceProvider"
                    value={editedProfile.insuranceProvider}
                    onChange={handleInputChange}
                    placeholder="e.g. Progressive Commercial"
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Policy Number</label>
                    <input
                      type="text"
                      name="policyNumber"
                      value={editedProfile.policyNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. PRO-9923849-09"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Expiry Date</label>
                    <input
                      type="date"
                      name="insuranceExpiry"
                      value={editedProfile.insuranceExpiry}
                      onChange={handleInputChange}
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                    />
                  </div>
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
                  <span className="text-slate-400 text-sm font-medium">Provider</span>
                  <span className="text-white text-sm font-bold">{profile.insuranceProvider}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 border-b border-white/5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Policy Number</span>
                  <span className="text-white text-sm font-bold">{profile.policyNumber}</span>
                </div>
                <div className="flex justify-between items-center py-3.5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Expiry Date</span>
                  <span className="text-[#28A745] text-sm font-bold">{profile.insuranceExpiry}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Section 4: Documents upload check */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <FileText className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Verification Documents</h3>
              <p className="text-slate-400 text-xs">Uploaded validation certificates</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {editMode ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between bg-[#001C2F]/80 border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-all">
                  <span className="text-sm font-medium text-slate-300">Business License Uploaded</span>
                  <input
                    type="checkbox"
                    name="licenseUploaded"
                    checked={editedProfile.licenseUploaded}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#28A745] cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between bg-[#001C2F]/80 border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-all">
                  <span className="text-sm font-medium text-slate-300">Insurance Certificate Uploaded</span>
                  <input
                    type="checkbox"
                    name="insuranceUploaded"
                    checked={editedProfile.insuranceUploaded}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#28A745] cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between bg-[#001C2F]/80 border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-all">
                  <span className="text-sm font-medium text-slate-300">Tax Form (W-9) Uploaded</span>
                  <input
                    type="checkbox"
                    name="taxFormUploaded"
                    checked={editedProfile.taxFormUploaded}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#28A745] cursor-pointer"
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
                <div className="flex items-center justify-between border-b border-white/5 py-3.5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Business License</span>
                  {profile.licenseUploaded ? (
                    <span className="flex items-center gap-1.5 text-[#027A48] border border-[#D1FADF]/20 bg-[#ECFDF3]/10 text-xs font-semibold rounded-full px-3.5 py-1">
                      <FileCheck className="w-4 h-4 text-[#28A745]" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#B93815] border border-[#FEE4E2]/20 bg-[#FEF6EE]/10 text-xs font-semibold rounded-full px-3.5 py-1">
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-3.5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Insurance Certificate</span>
                  {profile.insuranceUploaded ? (
                    <span className="flex items-center gap-1.5 text-[#027A48] border border-[#D1FADF]/20 bg-[#ECFDF3]/10 text-xs font-semibold rounded-full px-3.5 py-1">
                      <FileCheck className="w-4 h-4 text-[#28A745]" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#B93815] border border-[#FEE4E2]/20 bg-[#FEF6EE]/10 text-xs font-semibold rounded-full px-3.5 py-1">
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between py-3.5 hover:bg-white/5 rounded-xl px-3 transition-all">
                  <span className="text-slate-400 text-sm font-medium">Tax Form (W-9)</span>
                  {profile.taxFormUploaded ? (
                    <span className="flex items-center gap-1.5 text-[#027A48] border border-[#D1FADF]/20 bg-[#ECFDF3]/10 text-xs font-semibold rounded-full px-3.5 py-1">
                      <FileCheck className="w-4 h-4 text-[#28A745]" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#B93815] border border-[#FEE4E2]/20 bg-[#FEF6EE]/10 text-xs font-semibold rounded-full px-3.5 py-1">
                      Pending
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
