'use client';

import React from 'react';
import { ShieldCheck, CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookingSteps from './BookingSteps';

const Verification = () => {
  const verificationSteps = [
    { id: 1, label: 'Identity Verification', status: 'Passed' },
    { id: 2, label: 'Credit Score Check', status: 'Passed' },
    { id: 3, label: 'Rental History Review', status: 'Passed' },
    { id: 4, label: 'Insurance Verification', status: 'Passed' },
    { id: 5, label: 'Final Approval', status: 'Passed' },
  ];

  return (
    <div className="min-h-screen bg-[#001C2F] text-slate-200 pt-28 md:pt-24 lg:pt-32 pb-12 md:pb-20 font-inter">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">
        <BookingSteps currentStep={3} />

        <div className="w-full max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="bg-[#18C3BB1A] p-2.5 md:p-3 rounded-3xl ">
              <ShieldCheck className="text-[#05DF72] w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-space font-bold text-white tracking-tight">Credit Verification</h1>
              <p className="text-slate-400 mt-0.5 font-inter font-normal text-xs md:text-sm lg:text-[14px]">Automated security & credit check</p>
            </div>
          </header>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A1F30]/60 border border-[#27384980] backdrop-blur-[24px] rounded-[24px] md:rounded-[32px] p-5 md:p-10 overflow-hidden relative shadow-2xl"
          >
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-slate-400 font-normal text-sm md:text-base font-inter">Verification Progress</span>
                <span className="text-[#05DF72] font-bold text-lg md:text-xl font-space">100%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-[#05DF72] shadow-[0_0_15px_rgba(5,223,114,0.3)]"
                />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
              {verificationSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#18C3BB26] flex items-center justify-center text-[#05DF72] shrink-0">
                      <CircleCheck className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
                    </div>
                    <span className="text-white/90 font-normal text-sm md:text-base lg:text-lg font-inter tracking-tight">{step.label}</span>
                  </div>
                  <span className="text-[#05DF72] font-normal font-inter text-xs md:text-sm lg:text-base">
                    {step.status}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Result Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-[#0B2337]/60 border border-[#2A2F38] backdrop-blur-[24px] rounded-xl p-5 md:p-6 flex items-center gap-4 md:gap-5"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#18C3BB26] flex items-center justify-center text-[#05DF72] shrink-0">
                <CircleCheck className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 font-space">Verification Passed</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-inter font-normal">
                  Credit score: <span className="text-white font-normal">Excellent (780+)</span> • Approved for rental
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-end gap-3 md:gap-4">
            <Link
              href="/equipment/booking/contract"
              className="px-6 md:px-8 py-3 rounded-xl border border-[#28A745] text-[#28A745] font-space font-bold hover:bg-[#28A745]/5 transition-all w-full sm:w-auto min-w-[140px] md:min-w-[160px] text-center text-sm md:text-base"
            >
              Back
            </Link>

            <Link href="/equipment/booking/payment" className="w-full sm:w-auto">
              <button className="px-6 md:px-8 py-3 rounded-xl bg-[#28A745] text-white font-space font-bold hover:opacity-90 active:scale-95 transition-all w-full min-w-[140px] md:min-w-[180px] text-sm md:text-base">
                Proceed payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
