'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  num?: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  accentColor?: string;
  bgColor?: string;
}

/**
 * AccordionItem — A single collapsible FAQ row with a numbered label,
 * question, and expandable answer.
 * Extracted from FaqAccordion.tsx so it can be reused anywhere.
 */
const AccordionItem: React.FC<AccordionItemProps> = ({
  num,
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`rounded-sm cursor-pointer transition-all bg-[#16283d] ${isOpen ? 'border-l-2 border-[#4ADE80]' : 'border-l-2 border-transparent'}`}
      onClick={onToggle}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-6">
          {num && (
            <span 
              className="font-mono text-sm text-[#4ADE80]" 
            >
              {num}
            </span>
          )}
          <span className="text-white text-xs md:text-sm font-semibold tracking-wide uppercase">
            {question}
          </span>
        </div>
        {isOpen ? (
          <Minus className="text-slate-400 w-4 h-4 shrink-0" />
        ) : (
          <Plus className="text-slate-500 w-4 h-4 shrink-0" />
        )}
      </div>

      {/* Expanded Answer */}
      {isOpen && (
        <div className={`px-6 pb-6 pt-2 ${num ? 'ml-10' : ''}`}>
          <p className="text-gray-400 text-sm leading-relaxed border-t border-slate-700/50 pt-4">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
