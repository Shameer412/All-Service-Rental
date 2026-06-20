'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, ShieldCheck, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookingSteps from './BookingSteps';

// Types for our data
interface RentalData {
  contractId: string;
  equipment: string;
  renter: string;
  period: string;
  total: number;
}

function SignatureInput({ onChange }: { onChange: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const isDrawingRef = useRef(isDrawing);
  const hasSignedRef = useRef(hasSigned);

  useEffect(() => {
    isDrawingRef.current = isDrawing;
  }, [isDrawing]);

  useEffect(() => {
    hasSignedRef.current = hasSigned;
  }, [hasSigned]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.strokeStyle = '#05DF72';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getCoordinates = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if (e.type.startsWith('touch')) {
      const touchEvent = e as TouchEvent;
      if (touchEvent.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }

    const mouseEvent = e as MouseEvent;
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e.nativeEvent);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSigned(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasSigned) {
      onChange(canvas.toDataURL());
    }
  };

  // Handle native touch events to prevent passive event warning/error
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasSigned(true);
    };

    const handleTouchEnd = () => {
      if (!isDrawingRef.current) return;
      setIsDrawing(false);
      if (hasSignedRef.current) {
        onChange(canvas.toDataURL());
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onChange]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    onChange(null);
  };

  return (
    <div className="relative w-full group">
      <div className="bg-[#0B2337] border border-[#2A2F38] rounded-2xl overflow-hidden focus-within:border-green-500/50 transition-all h-[250px] relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full block"
        />
        {!hasSigned && (
          <div className="absolute inset-0 pt-4 pl-6 pointer-events-none text-slate-500 text-[15px] font-inter select-none">
            Draw your signature here
          </div>
        )}
      </div>
      {hasSigned && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-4 top-4 text-xs text-[#05DF72] hover:text-[#05DF72]/80 uppercase tracking-wider font-bold transition-colors bg-[#0B2337]/90 px-3 py-1.5 rounded-lg border border-[#2A2F38]"
        >
          Clear
        </button>
      )}
    </div>
  );
}

const ContractReview = () => {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const rentalData: RentalData = {
    contractId: "FR-611738",
    equipment: "Ford F-650 Box Truck",
    renter: "Rimsha Mirza Tariq",
    period: "Feb 26, 2026 – Feb 27, 2026 (1 day)",
    total: 410.40,
  };

  return (
    <div className="min-h-screen bg-[#001C2F] text-slate-200 pt-24 md:pt-32 pb-12 md:pb-20 font-inter font-normal text-[15px]">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">
        <BookingSteps currentStep={2} />
        {/* Header */}
        <header className="flex items-center gap-4 mb-12">
          <div className="bg-[#28A7451A] p-4 rounded-3xl border border-green-500/10">
            <FileText className="text-[#05DF72] w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">Contract Review</h1>
            <p className="text-slate-400 mt-1 font-inter font-normal text-[15px]">Review and sign your rental agreement to finalize booking</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Rental Agreement */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-[#001C2F]/70 backdrop-blur-[24px] border border-[#2A2F38] rounded-[32px] p-6 md:p-12"
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-space font-bold text-white mb-2">Rental Agreement</h2>
              <p className="text-slate-300 text-lg font-inter">Contract #{rentalData.contractId}</p>
            </div>

            {/* Details Box */}
            <div className="bg-[#0B2337] border border-[#2A2F38] rounded-[20px] p-6 md:p-8 mb-10">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[15px]">
                  <span className="text-white opacity-60 sm:min-w-[100px]">Equipment:</span>
                  <span className="text-white font-semibold">{rentalData.equipment}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[15px]">
                  <span className="text-white opacity-60 sm:min-w-[100px]">Renter:</span>
                  <span className="text-white font-semibold">{rentalData.renter}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[15px]">
                  <span className="text-white opacity-60 sm:min-w-[100px]">Period:</span>
                  <span className="text-white font-semibold">{rentalData.period}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[15px]">
                  <span className="text-white opacity-60 sm:min-w-[100px]">Total:</span>
                  <span className="text-white font-bold">${rentalData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Terms Content */}
            <div className="space-y-6 mb-10">
              {[
                "Late returns will incur a fee of 1.5x the daily rate for each additional day.",
                "FleetRent reserves the right to remotely disable GPS tracking and recover equipment if terms are violated.",
                "Insurance coverage is mandatory. Renter may use their own policy or purchase FleetRent's coverage.",
                "Cancellations made 48+ hours before pickup receive a full refund. Within 48 hours, a 25% fee applies.",
                "All disputes will be resolved through binding arbitration in accordance with FleetRent's terms of service."
              ].map((term, index) => (
                <div key={index} className="flex items-start gap-5">
                  <span className="text-[#05DF72] font-bold text-[15px]">{index + 1}.</span>
                  <p className="text-slate-300 text-[15px] leading-normal flex-1">{term}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-10" />

            {/* E-Signature Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-space font-bold text-white mb-6">E-Signature</h3>
                <SignatureInput onChange={setSignatureData} />
              </div>

              <label className="flex items-center gap-4 cursor-pointer group select-none">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-green-500/50 bg-green-500/10 checked:bg-green-500 checked:border-green-500 transition-all hover:border-green-500"
                  />
                  <CheckCircle className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-4 h-4" />
                </div>
                <span className="text-slate-300 text-[15px] leading-none font-inter">
                  I have read, understood, and agree to the terms and conditions of this rental agreement.
                </span>
              </label>
            </div>
          </motion.section>

          {/* Right Column: Sidebar */}
          <aside className="space-y-6">
            {/* What's Included Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0B2337] border border-[#2A2F38] rounded-[32px] p-6 md:p-8"
            >
              <h3 className="text-2xl font-space font-bold text-white mb-8">What's Included</h3>
              <ul className="space-y-6">
                {[
                  "Basic insurance coverage",
                  "24/7 roadside assistance",
                  "GPS tracking enabled",
                  "Fuel card (optional)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white">
                    <CheckCircle className="text-[#05DF72] w-5 h-5 flex-shrink-0" />
                    <span className="text-[15px] font-inter flex-1 leading-none">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Secure & Protected Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0B2337] border border-[#2A2F38] rounded-[32px] p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-[#4FD1C5] w-6 h-6 flex-shrink-0" />
                <h3 className="text-xl font-space font-bold text-white">Secure & Protected</h3>
              </div>
              <p className="text-slate-300 text-[15px] leading-relaxed font-inter">
                Your signature is encrypted and stored securely. This contract is legally binding and compliant with federal e-signature laws.
              </p>
            </motion.div>
          </aside>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-16 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-white/5 pt-10">
          <Link
            href="/equipment/booking"
            className="px-10 py-4 rounded-2xl border border-[#28A745] text-[#28A745] font-space font-bold hover:bg-[#28A745]/5 transition-all w-full sm:w-auto text-center"
          >
            Back
          </Link>

          <Link href="/equipment/booking/verify" className="w-full sm:w-auto">
            <button
              disabled={!agreed || !signatureData}
              className="px-10 py-4 rounded-2xl bg-[#28A745] text-white font-space font-bold hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all w-full min-w-[220px]"
            >
              Accept & Continue
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default ContractReview;
