"use client";
import React, { useState } from 'react';
import { ChevronDown, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { toast } from 'sonner';

import { contactSchema, ContactFormData } from '@/lib/validations/contactSchema';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      sector: 'Intermodal Logistics'
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Sending your message...');

    try {
      // Simulate API call
      console.log("Form Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Message sent successfully!', { id: toastId });
      setIsSubmitting(false);
      setIsSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.', { id: toastId });
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="p-12 rounded-[12px] flex flex-col items-center justify-center text-center gap-6 animate-in fade-in zoom-in duration-500 min-h-[500px] bg-glass-navy border-accent-green blur-md-20"
      >
        <div className="w-20 h-20 bg-[#28A745]/20 rounded-full flex items-center justify-center text-[#28A745]">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h3 className="text-white text-[32px] font-[600] mb-2">Message Sent!</h3>
          <p className="text-gray-400 text-[18px]">We've received your inquiry and will get back to you shortly.</p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-[#28A745] hover:underline font-[600] uppercase tracking-widest"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div
      className="p-6 md:p-12 rounded-[12px] transition-all bg-glass-transparent border-brand-light blur-md-20 shadow-green-glow"
    >
      <h3 className="text-white text-[24px] md:text-[32px] font-[600] mb-6 md:mb-10 text-center md:text-left">Contact Customer Support</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Name Field */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-500 text-[12px] font-[700] uppercase tracking-widest flex justify-between">
            Name
            {errors.name && <span className="text-red-400 lowercase italic font-normal tracking-normal">{errors.name.message}</span>}
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Full legal entity"
            className={`text-white p-4 rounded-[4px] outline-none focus:border-b-[#28A745] transition-colors bg-field-navy border-field ${errors.name ? 'border-b-error' : 'border-b-brand-light'}`}
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-500 text-[12px] font-[700] uppercase tracking-widest flex justify-between">
            Email
            {errors.email && <span className="text-red-400 lowercase italic font-normal tracking-normal">{errors.email.message}</span>}
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="Secure email address"
            className={`text-white p-4 rounded-[4px] outline-none focus:border-b-[#28A745] transition-colors bg-field-navy border-field ${errors.email ? 'border-b-error' : 'border-b-brand-light'}`}
          />
        </div>

        {/* Fleet Sector Field */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <label className="text-gray-500 text-[12px] font-[700] uppercase tracking-widest flex justify-between">
            Fleet Sector
            {errors.sector && <span className="text-red-400 lowercase italic font-normal tracking-normal">{errors.sector.message}</span>}
          </label>
          <div className="relative">
            <select
              {...register('sector')}
              className="w-full text-white p-4 pr-12 rounded-[4px] outline-none appearance-none cursor-pointer focus:border-b-[#28A745] transition-colors bg-field-navy border-field"
            >
              <option value="Intermodal Logistics" className="bg-[#24364B]">Intermodal Logistics</option>
              <option value="Air Freight" className="bg-[#24364B]">Air Freight</option>
              <option value="Maritime Shipping" className="bg-[#24364B]">Maritime Shipping</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Details Field */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <label className="text-gray-500 text-[12px] font-[700] uppercase tracking-widest flex justify-between">
            Details
            {errors.details && <span className="text-red-400 lowercase italic font-normal tracking-normal">{errors.details.message}</span>}
          </label>
          <textarea
            {...register('details')}
            rows={5}
            placeholder="Briefing details..."
            className={`text-white p-4 rounded-[4px] outline-none focus:border-b-[#28A745] transition-colors resize-none bg-field-navy border-field ${errors.details ? 'border-b-error' : 'border-b-brand-light'}`}
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-gray-600' : 'bg-[#28A745] hover:bg-[#218838]'} text-white py-5 rounded-[4px] font-[700] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send size={20} />
                Submit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

