import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

const RentalHero = () => {
  return (
    <div className="relative">
      <Navbar />
      <main className="min-h-screen bg-[#001c2f] text-white flex flex-col items-center justify-center px-4 font-sans pt-24 pb-10 overflow-hidden">
        <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto flex flex-col items-center">
          {/* Exact Logo Recreation using Navbar Logo */}
          <div className="mb-10 flex flex-col items-center">
            <Link href="/">
              <Image
                src="/icons/logo1.svg"
                alt="All Service Rental Logo"
                width={160}
                height={70}
                className="object-contain mb-3"
                priority
              />
            </Link>
          </div>

          {/* Heading - Responsive Size */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-center max-w-[90%] lg:max-w-[75%]">
            Rent Trucks & Equipment Easily
          </h1>

          {/* Subtext - Responsive Size */}
          <div className="text-gray-300 text-base sm:text-lg md:text-2xl text-center mb-8 md:mb-12 max-w-[90%] lg:max-w-[65%] font-light leading-relaxed">
            <p>Professional equipment rental at your fingertips.</p>
            <p>Book, track, and manage your rentals seamlessly.</p>
          </div>

          {/* Feature Badges - Balanced */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 w-full">
            {['Verified Equipment', 'Real-time Tracking', 'Secure Payments'].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-[#28a745] px-5 py-2.5 rounded-sm shadow-lg text-black"
              >
                <Check className="w-5 h-5 stroke-[3px]" />
                <span className="text-base md:text-lg font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Get Started Button - Balanced */}
          <Link href="/register">
            <button className="bg-[#28a745] hover:bg-[#218838] transition-all px-14 py-4 rounded-lg text-xl md:text-2xl font-semibold mb-10 text-black">
              Get Started
            </button>
          </Link>

          {/* Footer Text */}
          <p className="text-white text-base md:text-lg">
            Already have an account?{' '}
            <Link href="/login" className="text-[#28a745] font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RentalHero;
