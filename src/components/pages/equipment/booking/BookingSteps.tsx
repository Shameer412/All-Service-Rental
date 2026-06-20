'use client';

import React from 'react';

interface BookingStepsProps {
  currentStep?: number;
}

const BookingSteps = ({ currentStep = 1 }: BookingStepsProps) => {
  const steps = [
    { number: 1, label: 'Book' },
    { number: 2, label: 'Contract' },
    { number: 3, label: 'Verify' },
    { number: 4, label: 'Payment' },
    { number: 5, label: 'Confirmed' },
  ];

  return (
    <div className="flex items-center justify-start lg:justify-center mb-8 md:mb-16 w-full overflow-x-auto no-scrollbar pb-4 px-4">
      <div className="flex items-center gap-2 md:gap-3 min-w-max">
        {steps.map((step, idx) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-2 shrink-0">
                {/* Circle */}
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                  isActive || isCompleted
                    ? 'border-2 border-[#05DF72] text-[#05DF72] bg-[#05DF721A]' 
                    : 'bg-[#192E4380] text-white'
                }`}>
                  {step.number}
                </div>
                
                {/* Label */}
                <span className={`text-[10px] md:text-sm font-bold whitespace-nowrap ${isActive || isCompleted ? 'text-[#05DF72]' : 'text-white'}`}>
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className={`w-8 md:w-14 h-[1.5px] mx-1 ${isCompleted ? 'bg-[#05DF72]' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSteps;
