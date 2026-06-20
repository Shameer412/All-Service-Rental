'use client';

import React from 'react';
import { CreditCard, ShieldCheck, Shield, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BookingSteps from './BookingSteps';
import { toast } from 'sonner';

declare global {
  interface Window {
    Accept: any;
  }
}

const Payment = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://jstest.authorize.net/v1/Accept.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const formatCardNumber = (value: string) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 4);
    if (cleanValue.length > 2) {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
    }
    return cleanValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiry') {
      setFormData(prev => ({ ...prev, [name]: formatExpiry(value) }));
    } else if (name === 'cvv') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (error) setError(null);
  };

  const validateForm = () => {
    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 16) return 'Invalid card number length';

    const [month, year] = formData.expiry.split('/');
    if (!month || parseInt(month) > 12) return 'Invalid expiry month';
    if (!year || year.length !== 2) return 'Invalid expiry year';

    if (formData.cvv.length < 3) return 'Invalid CVV';
    if (!formData.cardName) return 'Name on card is required';
    return null;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    if (!window.Accept) {
      const msg = 'Payment security module not ready. Please refresh the page.';
      setError(msg);
      toast.error(msg);
      setIsSubmitting(false);
      return;
    }

    const [month, year] = formData.expiry.split('/');

    const authData = {
      clientKey: process.env.NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY,
      apiLoginID: process.env.NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID,
    };

    const cardData = {
      cardNumber: formData.cardNumber.replace(/\s/g, ''),
      month: month,
      year: year,
      cardCode: formData.cvv,
    };

    const secureData = {
      authData: authData,
      cardData: cardData,
    };

    window.Accept.dispatchData(secureData, async (response: any) => {
      if (response.messages.resultCode === 'Error') {
        let errorMsg = response.messages.message[0].text;
        setError(errorMsg);
        toast.error(errorMsg);
        setIsSubmitting(false);
      } else {
        await processPayment(response.opaqueData);
      }
    });
  };

  const processPayment = async (opaqueData: any) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opaqueData,
          cardName: formData.cardName
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Payment authorized successfully!');
        setTimeout(() => {
          window.location.href = '/equipment/booking/success';
        }, 1500);
      } else {
        const msg = result.error || 'Transaction declined. Please check your details.';
        setError(msg);
        toast.error(msg);
      }
    } catch (error) {
      const msg = 'Connectivity issue. Please check your internet and try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001C2F] text-slate-200 pt-28 md:pt-24 lg:pt-32 pb-12 md:pb-20 font-inter">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">
        <BookingSteps currentStep={4} />

        <div className="w-full max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="bg-[#18C3BB1A] p-2.5 md:p-3 rounded-2xl border border-green-500/10">
              <CreditCard className="text-[#28A745] w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-space font-bold text-white tracking-tight">Payment</h1>
              <p className="text-slate-400 mt-0.5 font-inter font-normal text-sm md:text-base">Secure encrypted transaction</p>
            </div>
          </header>

          <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Left Column: Card Details */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card-primary rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl md:text-2xl font-space font-bold text-white">Card Details</h2>
                  <div className="flex gap-4 items-center">
                    {/* Visa */}
                    <div className="w-10 h-7 bg-white/5 rounded-md border border-white/10 flex items-center justify-center p-1.5 shadow-sm">
                      <svg viewBox="0 0 24 15" className="w-full h-full">
                        <path d="M12.2 0.5L9.6 14.5H12.9L15.5 0.5H12.2Z" fill="#1A1F71" />
                        <path d="M5.5 0.5L2.6 10.5L2.2 8.8C1.5 6.4 -0.8 1.1 -0.8 1.1L-3.6 1.1L-3.55 1.4C-1.8 1.8 -0.2 2.9 0.8 4.4L3.8 14.9H7.2L12 0.5H8.7L5.5 0.5Z" fill="#F7B600" />
                        <path d="M20.4 0.9L20.1 0.5H15.1C14.1 0.5 13.3 1.1 13.1 2L12 7.2L16.6 7.2L17.5 2.7L17.8 0.9L20.4 0.9Z" fill="#1A1F71" />
                      </svg>
                    </div>
                    {/* Mastercard */}
                    <div className="w-10 h-7 bg-white/5 rounded-md border border-white/10 flex items-center justify-center p-1 shadow-sm">
                      <svg viewBox="0 0 24 15" className="w-full h-full">
                        <circle cx="8" cy="7.5" r="7" fill="#EB001B" fillOpacity="0.85" />
                        <circle cx="16" cy="7.5" r="7" fill="#F79E1B" fillOpacity="0.85" />
                        <path d="M12 7.5C12 5.9 11.4 4.4 10.4 3.3C9.5 4.4 9 5.9 9 7.5C9 9.1 9.5 10.6 10.4 11.7C11.4 10.6 12 9.1 12 7.5Z" fill="#FF5F00" />
                      </svg>
                    </div>
                    {/* Amex */}
                    <div className="w-10 h-7 bg-white/5 rounded-md border border-white/10 flex items-center justify-center p-1 shadow-sm">
                      <svg viewBox="0 0 24 15" className="w-full h-full rounded-[1px]">
                        <rect width="24" height="15" fill="#016FD0" />
                        <path d="M4 11.5H5.4L5.7 10.5H7.3L7.6 11.5H9L7.2 6.5H5.8L4 11.5ZM6.1 9.3L6.5 8L6.9 9.3H6.1ZM10 6.5V11.5H11.4V9.3L12.2 11.5H13.6L14.4 9.3V11.5H15.8V6.5H14.4L13.1 9.8L11.8 6.5H10ZM17 6.5V11.5H21.5V10.3H18.4V9.5H20.9V8.3H18.4V7.7H21.4V6.5H17Z" fill="white" />
                      </svg>
                    </div>
                    {/* Discover */}
                    <div className="w-10 h-7 bg-white/5 rounded-md border border-white/10 flex items-center justify-center p-1 shadow-sm">
                      <svg viewBox="0 0 24 15" className="w-full h-full">
                        <path d="M0 0H24V15H0V0Z" fill="#F47216" />
                        <path d="M4 4H6C7.1 4 8 4.9 8 6V9C8 10.1 7.1 11 6 11H4V4ZM6 9.5C6.3 9.5 6.5 9.3 6.5 9V6C6.5 5.7 6.3 5.5 6 5.5H5.5V9.5H6ZM10 4H11.5V11H10V4ZM13 11L15 4H16.5L18.5 11H17L16.5 9H15L14.5 11H13ZM15.5 8H16L15.7 7L15.5 8ZM20 4V11H21.5V4H20Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-6">
                  {/* Name on Card */}
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-slate-400 font-inter">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      autoComplete="cc-name"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="form-input-primary w-full rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#28A745]/20 focus:border-[#28A745] transition-all font-inter font-normal"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-slate-400 font-inter">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        autoComplete="cc-number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        className="form-input-primary w-full rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#28A745]/20 focus:border-[#28A745] transition-all font-inter font-normal tracking-[0.1em]"
                      />
                      <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    </div>
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-normal text-slate-400 font-inter">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        autoComplete="cc-exp"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        maxLength={5}
                        className="form-input-primary w-full rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#28A745]/20 focus:border-[#28A745] transition-all font-inter font-normal text-center"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-normal text-slate-400 font-inter">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        required
                        autoComplete="cc-csc"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="***"
                        maxLength={4}
                        className="form-input-primary w-full rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#28A745]/20 focus:border-[#28A745] transition-all font-inter font-normal text-center"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Summary & Security */}
            <div className="lg:col-span-5 space-y-6">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0A1F30]/60 border border-[#27384980] backdrop-blur-[24px] rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-2xl"
              >
                <h2 className="text-xl md:text-2xl font-space font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-400 font-inter font-normal">
                    <span>Subtotal</span>
                    <span className="text-white">$380.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-inter font-normal">
                    <span>Protection Plan</span>
                    <span className="text-white">$25.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-inter font-normal">
                    <span>Service Fee</span>
                    <span className="text-white">$5.40</span>
                  </div>
                  <div className="pt-4 border-t border-[#27384980] flex justify-between items-center">
                    <span className="text-white font-space font-bold text-lg">Total</span>
                    <span className="text-[#28A745] font-space font-bold text-2xl tracking-tight">$410.40</span>
                  </div>
                </div>
              </motion.div>

              {/* Security Note */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0A1F30]/40 border border-[#27384940] rounded-[24px] p-6"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="w-5 h-5 text-[#28A745]" strokeWidth={1.5} />
                  <h4 className="text-white font-space font-bold text-base">Secure Payment</h4>
                </div>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed font-inter font-normal">
                  Processed securely through Authorize.net. Your card info is never stored on our servers.
                </p>
              </motion.div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 md:gap-5 pt-4">
                <Link
                  href="/equipment/booking/verify"
                  className="px-14 py-2.5 rounded-xl border border-[#28A745] text-[#28A745] font-space font-bold hover:bg-[#28A745]/5 transition-all w-full sm:w-auto min-w-[200px] text-center text-base md:text-lg"
                >
                  Back
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-3 rounded-xl bg-[#28A745] text-white font-space font-bold hover:opacity-90 active:scale-95 transition-all w-full min-w-[260px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base md:text-lg shadow-lg shadow-[#28A74520]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
