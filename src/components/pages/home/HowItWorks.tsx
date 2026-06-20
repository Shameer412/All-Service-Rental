"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Section from '@/components/common/Section';
import { SectionHeader } from '@/components/ui';

interface Step {
  id: string;
  title: string;
  content: string;
}

const steps: Step[] = [
  { id: "01", title: "Pickup location & dates",  content: "Select where and when you'd like to start your journey. Travra offers hundreds of pickup points across major U.S. cities and airports, so your car is always nearby." },
  { id: "02", title: "Select your vehicle",       content: "Choose from our wide range of premium trucks and equipment tailored for your specific needs." },
  { id: "03", title: "Confirm & pay",             content: "Secure your booking with our transparent pricing and multiple payment options." },
  { id: "04", title: "Pick up or enjoy",          content: "Grab your keys and hit the road. Our process is designed to get you moving in minutes." },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState("01");

  return (
    <Section className="bg-[#021928] font-outfit">
      <div className="w-full">

        <div className="mb-16">
          <SectionHeader
            badge="How It Works"
            title="Rent in Minutes, Drive with Confidence"
            size="lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* Step Selectors */}
          <div className="flex flex-col gap-4 w-full lg:w-[35%] lg:min-w-[280px] lg:max-w-[420px] 3xl:max-w-[500px]">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center px-4 md:px-6 py-4 md:py-5 rounded-[16px] border transition-all duration-300 text-left font-[600] text-[16px] md:text-[18px] ${
                  activeStep === step.id
                    ? 'bg-gradient-to-r from-[#28A745] to-[#010F18] border-[#28A745] text-white shadow-lg shadow-[#28A74522]'
                    : 'bg-[#010F1899] border-[#021928] text-white opacity-80 hover:opacity-100'
                }`}
              >
                {step.id}. {step.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4 md:gap-6 animate-fadeIn">
              <h3 className="text-white text-[28px] md:text-[36px] xl:text-[40px] 3xl:text-[48px] font-[700] leading-tight capitalize">
                {steps.find(s => s.id === activeStep)?.title}
              </h3>
              <p className="text-gray-400 text-[16px] md:text-[18px] xl:text-[20px] 3xl:text-[22px] leading-relaxed max-w-full">
                {steps.find(s => s.id === activeStep)?.content}
              </p>
            </div>

            <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] xl:h-[460px] 2xl:h-[500px] 3xl:h-[560px]">
              <Image src="/Group.png" alt="Process Illustration" fill className="object-contain" />
            </div>
          </div>

        </div>

        <div className="w-full h-[1px] bg-white/10 mt-24" />
      </div>
    </Section>
  );
};

export default HowItWorks;
