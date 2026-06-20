"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, Filter, X, ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Sidebar } from '@/components/pages/equipment/Sidebar';
import { TruckCard } from '@/components/pages/equipment/TruckCard';
import { trucks } from '@/components/data/truck';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

export default function BrowseTrucksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Price: Low');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [locationSearch, setLocationSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrucks = useMemo(() => {
    let result = [...trucks].filter(truck => {
      const matchesCategory = !selectedCategory || truck.category === selectedCategory;
      const matchesPrice = truck.price >= priceRange.min && truck.price <= priceRange.max;
      const matchesLocation = !locationSearch || 
        truck.location.toLowerCase().includes(locationSearch.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesLocation;
    });

    // Sorting logic
    if (sortBy === 'Price: Low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, priceRange, locationSearch, sortBy]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, locationSearch, sortBy]);

  const totalPages = Math.ceil(filteredTrucks.length / ITEMS_PER_PAGE);
  const paginatedTrucks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTrucks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTrucks, currentPage]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: 0, max: 1000 });
    setLocationSearch('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#001c2f] text-white font-jakarta">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto pt-24 lg:pt-28 pb-12">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <span className="hover:text-green-500 cursor-pointer transition-colors" onClick={clearFilters}>Home</span> 
              <span className="text-gray-600">&gt;</span> 
              <span className="text-slate-200 font-medium">Browse Trucks</span>
            </div>
            <h1 className="text-3xl md:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold mb-3 tracking-tight">Find Your Perfect Truck</h1>
            <p className="text-gray-400 max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl 3xl:text-lg 4xl:text-xl">
              Browse from {trucks.length}+ <span className="text-green-500 font-medium italic underline decoration-green-500/30 underline-offset-4">verified trucks</span> available for rent across the country
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-green-500 text-[#001c2f] font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            <Filter size={18} />
            Show Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Sidebar - Desktop (Static) & Mobile (Drawer) */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <Sidebar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              locationSearch={locationSearch}
              setLocationSearch={setLocationSearch}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
                />
                {/* Drawer */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-[#001c2f] z-[101] p-6 lg:hidden overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <button 
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 bg-white/5 rounded-lg text-white"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <Sidebar 
                    isMobile={true} 
                    closeMobile={() => setIsSidebarOpen(false)}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    locationSearch={locationSearch}
                    setLocationSearch={setLocationSearch}
                  />
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full bg-green-500 text-black font-bold py-4 rounded-xl mt-8 sticky bottom-0 shadow-2xl"
                  >
                    Apply Filters
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <p className="text-slate-400 font-medium 3xl:text-lg 4xl:text-xl">
                Showing <span className="text-white font-bold">{filteredTrucks.length} Trucks Found</span>
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto relative">
                <span className="text-slate-500 text-sm 3xl:text-base 4xl:text-lg font-medium">Sort by:</span>
                <div 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-6 bg-[#0B2337] px-6 py-3 3xl:px-8 3xl:py-4 rounded-2xl cursor-pointer hover:bg-[#0e2d46] transition-all group min-w-[180px] 3xl:min-w-[220px]"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <ArrowUpDown size={16} className="text-white" />
                    <span className="text-base 3xl:text-lg 4xl:text-xl font-medium text-white">{sortBy}</span>
                  </div>
                  <ChevronDown className={`w-[18px] h-[18px] text-slate-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-[#0B2337] border border-white/5 rounded-xl shadow-2xl overflow-hidden z-[60]"
                    >
                      {['Price: Low', 'Price: High', 'Top Rated'].map((option) => (
                        <div 
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`px-6 py-3 text-sm font-medium cursor-pointer transition-colors hover:bg-white/5 ${sortBy === option ? 'text-green-500 bg-white/5' : 'text-slate-300 hover:text-white'}`}
                        >
                          {option}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Truck Grid */}
            {paginatedTrucks.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6 md:gap-8">
                  {paginatedTrucks.map((truck) => (
                    <TruckCard key={truck.id} truck={truck} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 3xl:mt-16 4xl:mt-20 flex justify-center items-center gap-2 3xl:gap-3">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-[#0B2337] border border-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 3xl:w-12 3xl:h-12 rounded-lg font-bold 3xl:text-lg transition-all ${
                          currentPage === i + 1
                            ? 'bg-green-500 text-[#001c2f] scale-110 shadow-lg shadow-green-500/20'
                            : 'bg-[#0B2337] text-white hover:bg-white/10'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-[#0B2337] border border-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-[#0B2337] p-8 rounded-full mb-6">
                  <Filter size={48} className="text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No trucks found</h3>
                <p className="text-gray-400 mb-8">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
