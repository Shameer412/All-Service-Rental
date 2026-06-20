'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { nsKey } from '@/lib/storageNamespace';

export default function AddVehicle() {
  const fleetKey = nsKey('vendor_fleet_vehicles');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    description: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    securityDeposit: '',
    location: 'Dallas, TX',
    status: 'Available' as 'Available' | 'Rented' | 'Maintenance'
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueToPricing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.type || !formData.make || !formData.model || !formData.year || !formData.mileage) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setStep(2);
  };

  const handleContinueToImages = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dailyRate || !formData.weeklyRate || !formData.monthlyRate || !formData.securityDeposit) {
      toast.error('Please fill in all pricing fields.');
      return;
    }
    setStep(3);
  };

  const handleChooseFilesClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map(file => URL.createObjectURL(file));
      setUploadedImages(prev => {
        const combined = [...prev, ...newImages];
        return combined.slice(0, 4); // Limit to 4 images matching mockup slots
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedImages.length < 3) {
      toast.error('Please upload at least 3 images.');
      return;
    }

    setIsSubmitting(true);
    toast.loading('Publishing vehicle and registering in fleet...', { id: 'add-vehicle' });

    // Mock API Call & Save to localStorage
    setTimeout(() => {
      const stored = localStorage.getItem(fleetKey) ?? localStorage.getItem('vendor_fleet_vehicles');
      let vehiclesList = [];
      if (stored) {
        try {
          vehiclesList = JSON.parse(stored);
        } catch (err) {
          console.error('Failed to parse vehicles list', err);
        }
      }

      // Map location to coordinates to prevent interactive map crashes
      let coordinates = { x: 460, y: 130, lat: '32.7767° N', lng: '96.7970° W' }; // Dallas default
      const locLower = formData.location.toLowerCase();
      if (locLower.includes('houston')) {
        coordinates = { x: 510, y: 260, lat: '29.7604° N', lng: '95.3698° W' };
      } else if (locLower.includes('austin')) {
        coordinates = { x: 430, y: 240, lat: '30.2672° N', lng: '97.7431° W' };
      } else if (locLower.includes('san antonio')) {
        coordinates = { x: 390, y: 280, lat: '29.4241° N', lng: '98.4936° W' };
      }

      const newVehicle = {
        id: formData.id,
        type: formData.type,
        makeModel: `${formData.make} ${formData.model}`,
        year: formData.year,
        location: formData.location,
        coordinates,
        mileage: formData.mileage.toLowerCase().includes('mi') ? formData.mileage : `${Number(formData.mileage.replace(/,/g, '')).toLocaleString()} mi`,
        status: formData.status,
        dailyRate: formData.dailyRate,
        weeklyRate: formData.weeklyRate,
        monthlyRate: formData.monthlyRate,
        securityDeposit: formData.securityDeposit,
        description: formData.description,
        images: uploadedImages
      };

      vehiclesList.push(newVehicle);
      localStorage.setItem(fleetKey, JSON.stringify(vehiclesList));

      toast.success(`Vehicle ${formData.id} successfully registered!`, { id: 'add-vehicle' });
      setIsSubmitting(false);
      router.push('/vendor/fleet');
    }, 1500);
  };

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-5xl 3xl:max-w-7xl 4xl:max-w-[1600px] mx-auto pb-12">
      {/* Step 1: Vehicle Details */}
      {step === 1 && (
        <div className="bg-[#0B2337] border border-white/5 rounded-3xl p-8 sm:p-10 3xl:p-14 4xl:p-16 shadow-2xl">
          <h2 className="text-2xl 3xl:text-4xl 4xl:text-5xl font-extrabold text-[#28A745] tracking-tight mb-8 3xl:mb-12 4xl:mb-16 font-inter">
            Vehicle Details
          </h2>
          
          <form onSubmit={handleContinueToPricing} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 3xl:gap-x-12 3xl:gap-y-8 4xl:gap-x-16 4xl:gap-y-10 font-inter">
              
              {/* Vehicle Type */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle Type"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Vehicle ID */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Vehicle ID
                </label>
                <input
                  type="text"
                  name="id"
                  required
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle ID"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Make */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Make
                </label>
                <input
                  type="text"
                  name="make"
                  required
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Enter Make"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Model */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Enter Model"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Year */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Enter Year"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Mileage */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Mileage
                </label>
                <input
                  type="text"
                  name="mileage"
                  required
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="Enter Mileage"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  rows={5}
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg resize-none font-inter"
                />
              </div>

              {/* Spacer for MD screens to push the button below description */}
              <div className="hidden md:block col-span-1"></div>

              {/* Continue Button */}
              <div className="col-span-1 pt-2">
                <button
                  type="submit"
                  className="bg-[#28A745] hover:bg-[#218838] text-white font-bold px-12 py-3.5 3xl:px-16 3xl:py-4.5 4xl:px-20 4xl:py-5 rounded-xl transition-all shadow-lg shadow-[#28A745]/20 active:scale-95 text-sm 3xl:text-base 4xl:text-lg w-fit cursor-pointer"
                >
                  Continue
                </button>
              </div>

            </div>
          </form>
        </div>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <div className="bg-[#0B2337] border border-white/5 rounded-3xl p-8 sm:p-10 3xl:p-14 4xl:p-16 shadow-2xl">
          <h2 className="text-2xl 3xl:text-4xl 4xl:text-5xl font-extrabold text-[#28A745] tracking-tight mb-8 3xl:mb-12 4xl:mb-16 font-inter">
            Pricing
          </h2>
          
          <form onSubmit={handleContinueToImages} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 3xl:gap-x-12 3xl:gap-y-8 4xl:gap-x-16 4xl:gap-y-10 font-inter">
              
              {/* Daily rate */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Daily rate
                </label>
                <input
                  type="text"
                  name="dailyRate"
                  required
                  value={formData.dailyRate}
                  onChange={handleInputChange}
                  placeholder="Enter Daily Rate"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Weekly rate */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Weekly rate
                </label>
                <input
                  type="text"
                  name="weeklyRate"
                  required
                  value={formData.weeklyRate}
                  onChange={handleInputChange}
                  placeholder="Enter Weekly Rate"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Monthly rate */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Monthly rate
                </label>
                <input
                  type="text"
                  name="monthlyRate"
                  required
                  value={formData.monthlyRate}
                  onChange={handleInputChange}
                  placeholder="Enter Monthly Rate"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Security deposit */}
              <div className="space-y-2 col-span-1">
                <label className="text-[#28A745] text-sm 3xl:text-lg 4xl:text-xl font-semibold tracking-wide block mb-1 3xl:mb-2 font-inter">
                  Security deposit
                </label>
                <input
                  type="text"
                  name="securityDeposit"
                  required
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  placeholder="Enter Security Deposit"
                  className="w-full bg-[#001C2F] border border-[#2A2F38] rounded-xl px-5 py-4 3xl:px-7 3xl:py-5 4xl:px-8 4xl:py-6 text-white placeholder-white/20 focus:outline-none focus:border-[#28A745]/50 focus:ring-1 focus:ring-[#28A745]/50 transition-all font-medium text-sm 3xl:text-base 4xl:text-lg font-inter"
                />
              </div>

              {/* Action Buttons */}
              <div className="col-span-1 md:col-span-2 pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-[#28A745]/30 hover:border-[#28A745] hover:bg-[#28A745]/5 text-[#28A745] font-bold px-12 py-3.5 3xl:px-16 3xl:py-4.5 4xl:px-20 4xl:py-5 rounded-xl transition-all active:scale-95 text-sm 3xl:text-base 4xl:text-lg w-fit bg-transparent cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#28A745] hover:bg-[#218838] text-white font-bold px-12 py-3.5 3xl:px-16 3xl:py-4.5 4xl:px-20 4xl:py-5 rounded-xl transition-all shadow-lg shadow-[#28A745]/20 active:scale-95 text-sm 3xl:text-base 4xl:text-lg w-fit cursor-pointer"
                >
                  Continue
                </button>
              </div>

            </div>
          </form>
        </div>
      )}

      {/* Step 3: Upload Images */}
      {step === 3 && (
        <div className="space-y-6 3xl:space-y-10">
          <h2 className="text-3xl 3xl:text-4xl 4xl:text-5xl font-bold text-[#28A745] tracking-tight font-inter">
            Upload Images
          </h2>
          
          <div className="bg-[#001C2F] border border-[#2A2F38] rounded-2xl p-8 sm:p-10 3xl:p-14 4xl:p-16 shadow-2xl font-inter">
            <span className="text-white text-lg 3xl:text-2xl 4xl:text-3xl font-semibold tracking-wide block mb-6 3xl:mb-8 font-inter">
              Upload Images
            </span>
            
            <form onSubmit={handleSubmit} id="upload-form" className="space-y-6">
              
              {/* Hidden file input */}
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Dotted/Dashed Dropzone Box */}
              <div
                onClick={handleChooseFilesClick}
                className="border border-dashed border-[#2A2F38] hover:border-[#28A745]/50 bg-[#0B2337] rounded-2xl py-12 px-6 3xl:py-16 4xl:py-20 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group"
              >
                <Upload className="w-12 h-12 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 text-[#28A745] mb-2" />
                <p className="text-white font-medium text-base 3xl:text-xl 4xl:text-2xl tracking-wide font-inter">
                  Upload Vehicle Images
                </p>
                <p className="text-white/60 text-sm 3xl:text-base 4xl:text-lg font-medium font-inter leading-relaxed">
                  PNG, JPG up to 10MB (Min 3 images)
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChooseFilesClick();
                  }}
                  className="mt-2 bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-6 py-2.5 3xl:px-8 3xl:py-3.5 4xl:px-10 4xl:py-4 rounded-lg transition-all text-sm 3xl:text-base 4xl:text-lg active:scale-95 cursor-pointer"
                >
                  Choose Files
                </button>
              </div>

              {/* 4 Preview Slots in a grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => {
                  const imgUrl = uploadedImages[index];
                  return (
                    <div
                      key={index}
                      className="aspect-square bg-[#0B2337] border border-[#2A2F38] rounded-xl flex items-center justify-center relative overflow-hidden group shadow-lg"
                    >
                      {imgUrl ? (
                        <>
                          <img
                            src={imgUrl}
                            alt={`Uploaded preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setUploadedImages(prev => prev.filter((_, idx) => idx !== index));
                            }}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="w-8 h-8 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 text-white/40" />
                      )}
                    </div>
                  );
                })}
              </div>

            </form>
          </div>

          {/* Action Buttons - Outside of Card */}
          <div className="pt-6 3xl:pt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="border border-[#28A745] hover:bg-[#28A745]/5 text-[#28A745] font-bold px-12 py-3.5 3xl:px-16 3xl:py-4.5 4xl:px-20 4xl:py-5 rounded-xl transition-all active:scale-95 text-sm 3xl:text-base 4xl:text-lg cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              form="upload-form"
              disabled={isSubmitting}
              className="bg-[#28A745] hover:bg-[#218838] text-white font-bold px-12 py-3.5 3xl:px-16 3xl:py-4.5 4xl:px-20 4xl:py-5 rounded-xl transition-all shadow-lg shadow-[#28A745]/20 active:scale-95 text-sm 3xl:text-base 4xl:text-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Vehicle'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
