'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const VendorRegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate signup success
    console.log('Signing up vendor:', formData);
    router.push('/login');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen font-sans">

      {/* Left Side: Registration Form — White Background */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center px-8 sm:px-12 md:px-14 lg:px-16 bg-[#001c2f] min-h-screen py-12">

        <div className="w-full max-w-[480px] 3xl:max-w-[600px] 4xl:max-w-[700px] mx-auto">

          {/* Back Button */}
          <Link
            href="/welcome"
            className="inline-flex items-center gap-2 bg-[#0B2337] border border-[#2A2F38] text-gray-300 hover:text-white hover:border-[#28a745] px-4 py-2.5 rounded-[10px] transition-all mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#28a745]" />
            <span className="text-xs font-bold uppercase tracking-widest">Go Back</span>
          </Link>

          {/* Header Text */}
          <div className="mb-8">
            <h1 className="text-white text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold mb-1">Vendor Signup</h1>
            <p className="text-gray-400 text-sm 3xl:text-base 4xl:text-lg">Create your account to get started</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            {error && (
              <div className="mb-2 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-[10px] text-center text-sm font-medium">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="w-full">
              <label className="block text-[#28a745] text-[15px] 3xl:text-lg 4xl:text-xl font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="block w-full bg-[#0B2337] h-[60px] 3xl:h-[72px] 4xl:h-[80px] border border-transparent text-white py-3 pl-12 3xl:pl-16 4xl:pl-20 pr-4 rounded-[12px] focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-500 text-[15px] 3xl:text-lg 4xl:text-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-[#28a745] text-[15px] 3xl:text-lg 4xl:text-xl font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="block w-full bg-[#0B2337] h-[60px] 3xl:h-[72px] 4xl:h-[80px] border border-transparent text-white py-3 pl-12 3xl:pl-16 4xl:pl-20 pr-4 rounded-[12px] focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-500 text-[15px] 3xl:text-lg 4xl:text-xl"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="w-full">
              <label className="block text-[#28a745] text-[15px] 3xl:text-lg 4xl:text-xl font-semibold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="block w-full bg-[#0B2337] h-[60px] 3xl:h-[72px] 4xl:h-[80px] border border-transparent text-white py-3 pl-12 3xl:pl-16 4xl:pl-20 pr-4 rounded-[12px] focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-500 text-[15px] 3xl:text-lg 4xl:text-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-[#28a745] text-[15px] 3xl:text-lg 4xl:text-xl font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="*********"
                  className="block w-full bg-[#0B2337] h-[60px] 3xl:h-[72px] 4xl:h-[80px] border border-transparent text-white py-3 pl-12 3xl:pl-16 4xl:pl-20 pr-14 rounded-[12px] focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-500 text-[15px] 3xl:text-lg 4xl:text-xl"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                  ) : (
                    <Eye className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                  )}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <label className="block text-[#28a745] text-[15px] 3xl:text-lg 4xl:text-xl font-semibold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="*********"
                  className="block w-full bg-[#0B2337] h-[60px] 3xl:h-[72px] 4xl:h-[80px] border border-transparent text-white py-3 pl-12 3xl:pl-16 4xl:pl-20 pr-14 rounded-[12px] focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-500 text-[15px] 3xl:text-lg 4xl:text-xl"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                  ) : (
                    <Eye className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-[#28a745]" />
                  )}
                </div>
              </div>
            </div>

            {/* Signup Button */}
            <div className="mt-2">
              <button 
                type="submit"
                className="w-full bg-[#EFEFEF] hover:bg-[#E3E3E3] text-[#888] font-bold h-[58px] 3xl:h-[68px] 4xl:h-[78px] rounded-[12px] text-xl 3xl:text-2xl 4xl:text-3xl transition-all active:scale-[0.98]"
              >
                Signup
              </button>
            </div>

            {/* Already have account */}
            <p className="text-center text-gray-400 text-sm pt-1">
              Already have an account?{' '}
              <Link href="/login" className="text-[#28a745] font-bold hover:underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
      {/* Right Side: Image */}
      <div className="hidden lg:block lg:col-span-6 relative overflow-hidden">
        <Image
          src="/Login.png"
          alt="Vendor Fleet Management"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001C2F]/60 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default VendorRegisterPage;
