"use client";
import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isMobile?: boolean;
  closeMobile?: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  locationSearch: string;
  setLocationSearch: (location: string) => void;
}

export const Sidebar = ({
  isMobile = false,
  closeMobile = () => {},
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  locationSearch,
  setLocationSearch
}: SidebarProps) => {
  const [openSections, setOpenSections] = useState({
    type: true,
    price: true,
    location: true,
    features: !isMobile
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const containerClasses = isMobile
    ? "w-full space-y-6"
    : "w-full lg:w-72 3xl:w-80 4xl:w-96 flex-shrink-0 space-y-6";

  const contentClasses = isMobile
    ? "space-y-6"
    : "bg-[#001c2f] rounded-xl p-5 border border-gray-800";

  return (
    <aside className={containerClasses}>
      <div className={contentClasses}>

        {/* Truck Type */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center mb-4 cursor-pointer group"
            onClick={() => toggleSection('type')}
          >
            <h3 className="font-semibold text-lg group-hover:text-green-500 transition-colors">Truck Type</h3>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSections.type ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence initial={false}>
            {openSections.type && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 pb-2">
                  <label className="flex items-center space-x-3 cursor-pointer group/item">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="truckType"
                        checked={selectedCategory === null}
                        onChange={() => setSelectedCategory(null)}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-600 rounded-full checked:border-green-500 transition-all"
                      />
                      <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">All Types</span>
                  </label>
                  {['Box Trucks', 'Flatbed', 'Excavators', 'Loaders'].map((type, idx) => (
                    <label key={idx} className="flex items-center space-x-3 cursor-pointer group/item">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="truckType"
                          checked={selectedCategory === type}
                          onChange={() => setSelectedCategory(type)}
                          className="peer appearance-none w-5 h-5 border-2 border-gray-600 rounded-full checked:border-green-500 transition-all"
                        />
                        <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                      </div>
                      <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <hr className="border-gray-800 mb-6" />

        {/* Daily Rate */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center mb-4 cursor-pointer group"
            onClick={() => toggleSection('price')}
          >
            <h3 className="font-semibold text-lg group-hover:text-green-500 transition-colors">Daily Rate</h3>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSections.price ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence initial={false}>
            {openSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-2 font-bold uppercase tracking-widest">
                    <span>Min ${priceRange.min}</span>
                    <span>Max ${priceRange.max}</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-gray-700 rounded-full">
                    {/* Progress Line */}
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-green-500 rounded-full flex items-center" 
                      animate={{ width: `${(priceRange.max / 1000) * 100}%` }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                    >
                      {/* Circle Head (Thumb) - Greenish Black */}
                      <div className="absolute right-0 translate-x-1/2 w-4 h-4 bg-[#0B1F12] border-2 border-green-500 rounded-full shadow-lg shadow-green-500/20" />
                    </motion.div>
                    
                    <input 
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
                      className="absolute inset-0 w-full h-1.5 bg-transparent appearance-none cursor-pointer z-10 custom-slider-range"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Min</label>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#0B2337] text-white rounded-lg p-2 mt-1 border border-gray-700 text-center font-bold text-xs focus:border-green-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Max</label>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#0B2337] text-white rounded-lg p-2 mt-1 border border-gray-700 text-center font-bold text-green-500 text-xs focus:border-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <hr className="border-gray-800 mb-6" />

        {/* Location */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center mb-4 cursor-pointer group"
            onClick={() => toggleSection('location')}
          >
            <h3 className="font-semibold text-lg group-hover:text-green-500 transition-colors">Location</h3>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSections.location ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence initial={false}>
            {openSections.location && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-2">
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="City, State, or ZIP"
                    className="w-full bg-[#0B2337] text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-600 text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <hr className="border-gray-800 mb-6" />

        {/* Features */}
        <div>
          <div
            className="flex justify-between items-center mb-4 cursor-pointer group"
            onClick={() => toggleSection('features')}
          >
            <h3 className="font-semibold text-lg group-hover:text-green-500 transition-colors">Features</h3>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSections.features ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence initial={false}>
            {openSections.features && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pb-2">
                  <div className="flex items-center space-x-3 bg-[#0B2337] p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">All Verified</p>
                      <p className="text-xs text-gray-400">Inspected equipment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-[#0B2337] p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                    <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Fast Booking</p>
                      <p className="text-xs text-gray-400">Instant processing</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </aside>
  );
};
