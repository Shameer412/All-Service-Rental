'use client';

import React from 'react';
import { CheckCircle2, Calendar, Download, Mail, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import BookingSteps from './BookingSteps';

const Success = () => {
  return (
    <div className="min-h-screen bg-[#001C2F] text-slate-200 pt-28 md:pt-24 lg:pt-32 pb-12 md:pb-20 font-inter">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">
        <BookingSteps currentStep={5} />

        <div className="w-full max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8 md:mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-[#28A7451A] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#28A74520]"
            >
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-[#28A745]" strokeWidth={2.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-space font-bold text-white mb-3"
            >
              Booking <span className="text-[#28A745]">Confirmed!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-xs md:text-base max-w-lg mx-auto font-normal font-inter opacity-80"
            >
              Your booking request has been submitted. The vendor will review and confirm shortly.
            </motion.p>
          </div>

          {/* Booking Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card-primary rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl mb-8 md:mb-10"
          >
            <div className="p-5 md:p-8">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-space font-bold text-white">Booking Details</h2>
                <span className="bg-[#28A74515] text-[#28A745] px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold font-space border border-[#28A74520]">
                  FR-MM0K5LMK
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start pb-6 md:pb-8 border-b border-[#27384960]">
                <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                  <img
                    src="/images/truck_sample.png"
                    alt="CAT 430F2 Backhoe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5 md:space-y-2">
                  <h3 className="text-lg md:text-xl font-space font-bold text-white">CAT 430F2 Backhoe</h3>
                  <p className="text-slate-400 font-inter font-normal text-xs md:text-sm">15ft Dig · 4WD</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 text-xs md:text-sm">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    <span>Beaverton, OR</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-slate-500 text-[10px] md:text-xs font-normal uppercase tracking-wider">Rental</p>
                  <p className="text-white text-base md:text-lg font-space font-bold">Rimsha tariq</p>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-slate-500 text-[10px] md:text-xs font-normal uppercase tracking-wider">Rental Period</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-white text-sm md:text-base font-space font-bold">
                    <Calendar className="w-4 h-4 text-[#28A745]" />
                    <span>Feb 26</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                    <span>Feb 27, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <button 
              className="btn-glass-primary flex items-center justify-center gap-2 px-6 py-3 border-x border-b border-[#27384960] rounded-xl text-white text-sm md:text-base font-space font-bold transition-all w-full sm:w-auto min-w-[170px]"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button 
              className="btn-glass-primary flex items-center justify-center gap-2 px-6 py-3 border-x border-b border-[#27384960] rounded-xl text-white text-sm md:text-base font-space font-bold transition-all w-full sm:w-auto min-w-[170px]"
            >
              <Mail className="w-4 h-4" />
              Email Confirmation
            </button>
            <Link href="/equipment" className="w-full sm:w-auto">
              <button className="px-8 py-3 bg-[#28A745] hover:bg-[#218838] rounded-xl text-white text-sm md:text-base font-space font-bold transition-all w-full min-w-[170px] shadow-lg shadow-[#28A74520]">
                Browse More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Success;
