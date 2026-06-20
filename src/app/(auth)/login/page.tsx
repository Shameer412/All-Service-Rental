'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/common/AuthProvider';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Default to vendor for now since the UI shows Vendor Login
    login('vendor');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-[#001C2F] font-sans overflow-y-auto custom-scrollbar">
      {/* Left Side: Login Form */}
      <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-[5%] xl:px-[8%] relative min-h-full py-12 md:py-20">
        {/* Logo Section */}
        <div className="mb-6 md:mb-8 flex flex-col items-center">
          <Link href="/">
            <Image
              src="/icons/logo1.svg"
              alt="All Service Rental Logo"
              width={150}
              height={65}
              className="object-contain mb-2"
              priority
            />
          </Link>
        </div>

        {/* Header Text */}
        <div className="text-center w-full max-w-[90%] lg:max-w-[550px] 2xl:max-w-[600px] 3xl:max-w-[700px] 4xl:max-w-[800px] mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold mb-3 text-white"> Login</h1>
          <p className="text-gray-400 text-sm md:text-lg 3xl:text-xl 4xl:text-2xl">Access your B2B truck leasing dashboard</p>
        </div>

        {/* Form */}
        <form className="w-full max-w-[90%] lg:max-w-[480px] 2xl:max-w-[540px] 3xl:max-w-[640px] 4xl:max-w-[720px]" onSubmit={handleLogin}>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-[10px] text-center text-sm font-medium">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-6 md:mb-8 w-full">
            <label className="block text-[#22C55E] text-sm md:text-base 3xl:text-lg 4xl:text-xl font-semibold mb-3 3xl:mb-4 uppercase tracking-wider" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 md:h-6 md:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 text-[#22C55E]" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="block w-full h-[60px] 3xl:h-[72px] 4xl:h-[80px] bg-[#0B2337] border border-[#2A2F38] text-gray-300 pl-14 md:pl-16 3xl:pl-20 4xl:pl-24 pr-6 rounded-[10px] focus:outline-none focus:border-[#22C55E] transition-all placeholder:text-gray-600 text-base md:text-lg 3xl:text-xl 4xl:text-2xl shadow-inner"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-2 w-full">
            <label className="block text-[#22C55E] text-sm md:text-base 3xl:text-lg 4xl:text-xl font-semibold mb-3 3xl:mb-4 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 md:h-6 md:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 text-[#22C55E]" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full h-[60px] 3xl:h-[72px] 4xl:h-[80px] bg-[#0B2337] border border-[#2A2F38] text-gray-300 pl-14 md:pl-16 3xl:pl-20 4xl:pl-24 pr-14 rounded-[10px] focus:outline-none focus:border-[#22C55E] transition-all placeholder:text-gray-600 text-base md:text-lg 3xl:text-xl 4xl:text-2xl shadow-inner"
              />
              <div
                className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 md:h-6 md:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 text-[#22C55E]" />
                ) : (
                  <Eye className="h-5 w-5 md:h-6 md:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 text-[#22C55E]" />
                )}
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end mb-8 md:mb-10">
            <Link href="/forgot-password" title="Reset your password" className="text-[#22C55E] text-sm md:text-base 3xl:text-lg 4xl:text-xl font-medium hover:underline">
              Forgot the password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[60px] 3xl:h-[72px] 4xl:h-[80px] bg-[#22C55E] hover:bg-[#1eb050] text-white font-bold rounded-[10px] text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl transition-all mb-8 md:mb-10 active:scale-[0.98] shadow-lg shadow-[#22C55E]/20"
          >
            Login
          </button>

          {/* Quick Access Buttons */}
          <div className="mt-12 w-full max-w-[90%] lg:max-w-[480px] 2xl:max-w-[540px] 3xl:max-w-[640px] 4xl:max-w-[720px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] flex-1 bg-white/10"></div>
              <p className="text-gray-500 text-sm 3xl:text-base 4xl:text-lg font-bold uppercase tracking-widest">Quick Access (Demo)</p>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => login('admin')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0B2337] border border-[#2A2F38] rounded-xl hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">AD</span>
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-tighter">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => login('vendor')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0B2337] border border-[#2A2F38] rounded-xl hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">VN</span>
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-tighter">Vendor</span>
              </button>

              <button
                type="button"
                onClick={() => login('customer')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0B2337] border border-[#2A2F38] rounded-xl hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">CU</span>
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-tighter">Customer</span>
              </button>
            </div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-400 text-sm md:text-base mt-8">
            Don't have an account?{' '}
            <Link href="/welcome" className="text-[#22C55E] font-bold hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side: Visual Image */}
      <div className="hidden lg:block lg:col-span-6 relative">
        <Image
          src="/Login.png"
          alt="Heavy Truck Construction Site"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay to match the image gradient if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001C2F]/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default LoginPage;
