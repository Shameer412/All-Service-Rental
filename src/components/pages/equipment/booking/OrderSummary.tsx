import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { OrderSummaryProps } from '@/types/equipment';

const OrderSummary = ({ itemTitle, price, location, rating, reviewsCount }: OrderSummaryProps) => {
  return (
    <div className="w-full lg:w-[400px] sticky top-8 mt-[-100px]">
      <div className="bg-[#0B2337] rounded-[2rem] p-6 pt-6 pb-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>

        {/* Product Info */}
        <div className="flex gap-4 mb-8 items-start">
          <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
            <Image
              src="/Login.png"
              alt={itemTitle}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-base text-white leading-tight mb-2">{itemTitle}</h3>
            <div className="flex items-center gap-1.5 text-white/90 text-xs mb-1">
              <MapPin size={14} /> {location}
            </div>
            <div className="flex items-center gap-1.5 text-white text-xs">
              <Star size={14} className="text-[#05DF72] fill-[#05DF72]" />
              <span className="font-medium">{rating}</span>
              <span className="text-white/70">({reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 w-full mb-8" />

        {/* Price Breakdown */}
        <div className="space-y-5 mb-8">
          <div className="flex justify-between items-center text-sm text-white">
            <span className="font-medium">${price}/day × 0 days</span>
            <span className="font-bold">$0</span>
          </div>
          <div className="flex justify-between items-center text-sm text-white">
            <span className="font-medium">Service Fee (8%)</span>
            <span className="font-bold">$0</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 w-full mb-8" />

        {/* Total */}
        <div className="flex justify-between items-center mb-10">
          <span className="text-xl font-bold text-white">Total</span>
          <span className="text-3xl font-bold text-[#05DF72]">$0</span>
        </div>

        {/* Confirm Button */}
        <Link href="/equipment/booking/contract" className="block w-full">
          <button className="w-full bg-[#05DF72] hover:bg-[#04c966] text-black font-bold py-4 rounded-xl text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 group shadow-lg shadow-green-500/20">
            Confirm Booking <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* Footer Text */}
        <p className="text-center text-white/70 text-[11px] mt-8 font-medium">
          No charges until vendor confirms your booking.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
