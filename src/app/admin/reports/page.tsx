'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Calendar, ChevronDown, Download, Loader2 } from 'lucide-react';
import ReportCardsGrid from '@/components/dashboard/admin/reports/ReportCardsGrid';
import RevenueGrowthTrend from '@/components/dashboard/admin/reports/RevenueGrowthTrend';
import TopVendorPerformance from '@/components/dashboard/admin/reports/TopVendorPerformance';

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#001C2F]" />;
  }

  const handleGenerateReport = (reportName: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success(`${reportName} generated successfully`, {
          description: 'The report has been saved to your downloads folder.',
        });
        resolve();
      }, 1200);
    });
  };

  const handleExportAll = () => {
    setExporting(true);
    setTimeout(() => {
      toast.success('All reports exported successfully', {
        description: 'Excel and PDF data packages have been downloaded.',
      });
      setExporting(false);
    }, 1500);
  };

  const selectTimeRange = (range: string) => {
    setTimeRange(range);
    setIsDropdownOpen(false);
    toast.info(`Analytics view updated to: ${range}`);
  };

  return (
    <div className="mx-auto space-y-8 pb-12 w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] font-inter">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-white text-sm md:text-base opacity-80">
            Business intelligence and performance metrics
          </p>
        </div>

        {/* Date Filter & Export buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Dropdown Filter */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B2337] border border-[#2A2F38] rounded-xl hover:border-white/20 transition-all cursor-pointer font-inter"
            >
              <Calendar className="w-4 h-4 text-white/70" />
              {timeRange}
              <ChevronDown className="w-4 h-4 text-white/50" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0B2337] border border-[#2A2F38] rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {['Last 30 days', 'Last 90 days', 'Last Year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => selectTimeRange(range)}
                    className="flex w-full px-4 py-2.5 text-left text-sm text-white hover:bg-[#22C55E]/10 hover:text-[#22C55E] transition-colors cursor-pointer font-inter"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export All Button */}
          <button
            onClick={handleExportAll}
            disabled={exporting}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-[#22C55E] hover:bg-[#16a34a] rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-inter"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin text-black" />
            ) : (
              <Download className="w-4 h-4 text-black" />
            )}
            Export All
          </button>
        </div>
      </div>

      {/* Reports Card Grid */}
      <ReportCardsGrid onGenerateReport={handleGenerateReport} />

      {/* Revenue Growth Trend Widget */}
      <RevenueGrowthTrend />

      {/* Top Vendor Performance Widget */}
      <TopVendorPerformance />
    </div>
  );
}
