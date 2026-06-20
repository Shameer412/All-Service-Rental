'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  accentColor?: string;
  className?: string;
}

/**
 * SliderArrows — A pair of circular Prev / Next buttons for carousel navigation.
 * Extracted from Reviews.tsx so any slider section can reuse them.
 */
const SliderArrows: React.FC<SliderArrowsProps> = ({
  onPrev,
  onNext,
  accentColor = '#28A745',
  className = '',
}) => {
  const style = {
    background: '#FFFFFF42',
    color: accentColor,
    border: 'none',
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      <button
        onClick={onPrev}
        style={style}
        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#28A745] hover:text-white transition-all active:scale-90"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        style={style}
        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#28A745] hover:text-white transition-all active:scale-90"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default SliderArrows;
