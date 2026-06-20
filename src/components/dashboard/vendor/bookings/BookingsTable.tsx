'use client';

import React, { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
  id: string;
  customerName: string;
  customerId: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  earnings: number;
  status: string;
}

interface BookingsTableProps {
  initialBookings: Booking[];
}

export interface BookingsTableRef {
  exportData: () => void;
}

// Helper to parse dates in DD/MM/YYYY format
function parseDateString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

const BookingsTable = forwardRef<BookingsTableRef, BookingsTableProps>(
  function BookingsTable({ initialBookings }, ref) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [dateRange, setDateRange] = useState('All time');

    const today = useMemo(() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }, []);

    // Filter by Date Range Logic
    const matchesDateRange = useMemo(() => {
      return (bookingDateStr: string) => {
        if (dateRange === 'All time') return true;

        const bookingDate = parseDateString(bookingDateStr);
        const bookingTime = bookingDate.getTime();

        const todayStart = today.getTime();
        const todayEnd = todayStart + 24 * 60 * 60 * 1000;

        if (dateRange === 'Today') {
          return bookingTime >= todayStart && bookingTime < todayEnd;
        }

        if (dateRange === 'This week') {
          // Calendar week from Sunday to Saturday
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 7);

          return bookingTime >= startOfWeek.getTime() && bookingTime < endOfWeek.getTime();
        }

        if (dateRange === 'This month') {
          return (
            bookingDate.getMonth() === today.getMonth() &&
            bookingDate.getFullYear() === today.getFullYear()
          );
        }

        return true;
      };
    }, [dateRange, today]);

    // Filtered Bookings
    const filteredBookings = useMemo(() => {
      return initialBookings.filter((booking) => {
        const matchesSearch =
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedStatus === 'All' ||
          booking.status.toLowerCase() === selectedStatus.toLowerCase();

        const matchesDate = matchesDateRange(booking.startDate);

        return matchesSearch && matchesStatus && matchesDate;
      });
    }, [searchTerm, selectedStatus, matchesDateRange, initialBookings]);

    // Expose export function to parent via ref
    useImperativeHandle(ref, () => ({
      exportData() {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(filteredBookings, null, 2)
        )}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', jsonString);
        downloadAnchor.setAttribute(
          'download',
          `incoming_rentals_${new Date().toISOString().split('T')[0]}.json`
        );
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      },
    }));

    return (
      <div className="space-y-6">
        {/* Search / Filter Bar - Unified Dark Horizontal Container */}
        <div className="flex flex-col lg:flex-row gap-4 items-center bg-[#0B2337] p-4 rounded-3xl border border-[#2A2F38]/30 shadow-xl">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#001c2f] border border-[#1e2d3d] text-white pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-[#28a745] transition-all text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full lg:w-44">
            <button
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsDateOpen(false);
              }}
              className="w-full flex items-center justify-between bg-[#001c2f] border border-[#1e2d3d] text-white px-4 py-3.5 rounded-2xl cursor-pointer hover:bg-[#082033] transition-all text-sm"
            >
              <span className="text-white">
                Status:{' '}
                <strong className="text-white font-semibold ml-1">
                  {selectedStatus}
                </strong>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform ${isStatusOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            <AnimatePresence>
              {isStatusOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#001c2f] border border-[#1e2d3d] rounded-xl shadow-2xl overflow-hidden z-20"
                >
                  {['All', 'Active', 'Complete'].map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setIsStatusOpen(false);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/5 transition-colors ${selectedStatus === status
                        ? 'text-[#28a745] bg-white/5 font-semibold'
                        : 'text-slate-300'
                        }`}
                    >
                      {status}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Range Dropdown */}
          <div className="relative w-full lg:w-48">
            <button
              onClick={() => {
                setIsDateOpen(!isDateOpen);
                setIsStatusOpen(false);
              }}
              className="w-full flex items-center justify-between bg-[#001c2f] border border-[#1e2d3d] text-white px-4 py-3.5 rounded-2xl cursor-pointer hover:bg-[#082033] transition-all text-sm"
            >
              <span className="text-white">
                Date Range:{' '}
                <strong className="text-white font-semibold ml-1">
                  {dateRange}
                </strong>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform ${isDateOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            <AnimatePresence>
              {isDateOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#001c2f] border border-[#1e2d3d] rounded-xl shadow-2xl overflow-hidden z-20"
                >
                  {['All time', 'Today', 'This week', 'This month'].map((range) => (
                    <div
                      key={range}
                      onClick={() => {
                        setDateRange(range);
                        setIsDateOpen(false);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/5 transition-colors ${dateRange === range
                        ? 'text-[#28a745] bg-white/5 font-semibold'
                        : 'text-slate-300'
                        }`}
                    >
                      {range}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Table Section - Styled exactly like FleetTable */}
        <div className="overflow-hidden shadow-2xl">

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#28A745]">
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap rounded-tl-2xl">
                    Rental ID
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                    Start Date
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                    End Date
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap rounded-tr-2xl">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-transparent">
                <AnimatePresence mode="popLayout">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => {
                      const rowBg = index % 2 === 0 ? 'bg-[#0B2337]' : 'bg-[#001C2F]';
                      return (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`transition-all cursor-pointer group ${rowBg}`}
                        >
                          <td className="px-4 sm:px-6 py-4 font-bold text-white text-sm tracking-wide whitespace-nowrap">
                            {booking.id}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-white font-semibold text-sm">
                                {booking.customerName}
                              </span>
                              <span className="text-white/60 text-xs mt-0.5">
                                {booking.customerId}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-white font-semibold text-sm">
                            {booking.vehicle}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-white/80 text-sm font-medium whitespace-nowrap">
                            {booking.startDate}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-white/80 text-sm font-medium whitespace-nowrap">
                            {booking.endDate}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-[#28A745] font-extrabold text-sm">
                            ${booking.earnings.toLocaleString()}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm whitespace-nowrap">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${booking.status === 'Active'
                                ? 'text-[#B25E10] border-[#FEF0C7] bg-[#FFFAEB]'
                                : 'text-[#027A48] border-[#D1FADF] bg-[#ECFDF3]'
                                }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 sm:px-6 py-12 text-center text-white/40 font-medium"
                      >
                        No rentals found matching the search/filters.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

BookingsTable.displayName = 'BookingsTable';
export default BookingsTable;

