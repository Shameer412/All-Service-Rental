'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import BookingSteps from './booking/BookingSteps';
import BookingForm from './booking/BookingForm';
import OrderSummary from './booking/OrderSummary';

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-[#001c2f] text-white pt-24 md:pt-32 pb-12 md:pb-20 font-jakarta">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">

        <BookingSteps />

        {/* Back Link */}
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 text-gray-400 text-sm mb-10 hover:text-white transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Fleet</span>
        </Link>

        <div className="mb-12">
          <h1
            className="font-bold tracking-normal uppercase booking-title-custom"
          >
            Complete Your <span className="text-[#05DF72]">Booking</span>
          </h1>

        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <BookingForm />
          <OrderSummary
            itemTitle="FREIGHTLINER CASCADIA"
            price="299"
            location="Houston, TX"
            rating="4.8"
            reviewsCount="156"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
