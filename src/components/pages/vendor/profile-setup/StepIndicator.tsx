'use client';

import React from 'react';

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  activeStep: number;
  onStepClick: (stepId: number) => void;
}

export default function StepIndicator({ steps, activeStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="relative mb-12 sm:mb-16">
      {/* Connector Line */}
      <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-[#2A2F45] z-0" />
      
      <div className="flex justify-between items-center relative z-10">
        {steps.map((step) => {
          const isActiveOrCompleted = step.id <= activeStep;

          return (
            <div 
              key={step.id} 
              onClick={() => {
                if (step.id < activeStep) {
                  onStepClick(step.id);
                }
              }}
              className={`flex flex-col items-center gap-3 flex-1 group ${
                step.id < activeStep ? 'cursor-pointer' : ''
              }`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isActiveOrCompleted 
                    ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/30 font-extrabold' 
                    : 'text-gray-400 group-hover:border-white/20'
                }`}
                style={!isActiveOrCompleted ? { border: '1.09px solid #2A2F45', backgroundColor: '#001C2F' } : undefined}
              >
                {step.id}
              </div>
              
              <span className={`text-[11px] sm:text-xs font-semibold tracking-wide transition-colors hidden sm:block ${
                isActiveOrCompleted ? 'text-white' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
