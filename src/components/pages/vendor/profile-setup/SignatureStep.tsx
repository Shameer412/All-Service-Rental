'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SignatureStepProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function SignatureStep({ 
  formData, 
  onChange, 
  onCheckboxChange, 
  onNext, 
  onBack 
}: SignatureStepProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Set up coordinate helper
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if ('touches' in e) {
      // Prevent screen scrolling when drawing on touch devices
      if (e.cancelable) e.preventDefault();
    }

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if ('touches' in e) {
      if (e.cancelable) e.preventDefault();
    }

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#001C2F'; // Solid dark ink
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Mark as signed in form state
    if (formData.signatureName !== 'Signed') {
      onChange({
        target: { name: 'signatureName', value: 'Signed' }
      } as any);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Clear signature field
    onChange({
      target: { name: 'signatureName', value: '' }
    } as any);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Signature Pad */}
      <div className="space-y-4">
        <div className="w-full rounded-[24px] overflow-hidden border border-[#2A2F45]/60 shadow-inner">
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-48 sm:h-64 bg-white cursor-crosshair block"
          />
        </div>
        
        {/* Clear Button */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={clearCanvas}
            className="bg-[#22C55E] hover:bg-[#1eb050] text-[#001C2F] font-bold px-6 py-3 rounded-xl transition-all text-sm active:scale-95 font-poppins"
          >
            Clear Signature
          </button>
        </div>
      </div>

      {/* Vendor Agreement Card */}
      <div className="bg-[#0B2337] border border-[#2A2F38] rounded-3xl p-6 sm:p-8 space-y-6">
        <h4 className="text-white font-bold text-lg sm:text-xl font-inter">
          Vendor Agreement
        </h4>
        
        <p className="text-gray-300 text-sm font-poppins">
          By signing above, I agree to:
        </p>

        {/* Custom Bullet List */}
        <ul className="space-y-4">
          {[
            'Maintain valid insurance coverage for all listed vehicles',
            'Ensure all vehicles meet safety and operational standards',
            'Respond to booking requests within 24 hours',
            'Pay the platform commission fee of 10% on all rentals',
            'Comply with all local, state, and federal regulations',
            'Provide accurate information about my vehicles and availability'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-poppins">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] mt-2 shrink-0" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* Checkbox agreement */}
        <div className="flex items-start gap-3 border-t border-white/5 pt-6 mt-6">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={onCheckboxChange}
            className="w-5 h-5 rounded border-[1.09px] border-[#2A2F38] bg-[#0B2337] text-[#22C55E] focus:ring-0 focus:ring-offset-0 accent-[#22C55E] cursor-pointer mt-0.5"
            required
          />
          <label htmlFor="agreeToTerms" className="text-gray-300 text-xs sm:text-sm cursor-pointer select-none leading-relaxed font-poppins">
            I have read and agree to the <span className="text-[#22C55E] hover:underline cursor-pointer">Vendor Terms</span>, <span className="text-[#22C55E] hover:underline cursor-pointer">Terms of Service</span>, and <span className="text-[#22C55E] hover:underline cursor-pointer">Privacy Policy</span>
          </label>
        </div>
      </div>

      {/* Navigation Submit Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-[#22C55E] hover:bg-[#1eb050] text-white font-extrabold py-5 rounded-2xl transition-all shadow-lg shadow-[#22C55E]/20 active:scale-95 text-base sm:text-lg font-poppins"
        >
          Go Dashboard
        </button>
      </div>
      
    </div>
  );
}
