'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Sparkles,
  KeyRound,
  ShieldCheck,
  Building,
  Plus,
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { nsKey } from '@/lib/storageNamespace';

interface SavedCard {
  id: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';
  isDefault: boolean;
}

const DEFAULT_SAVED_CARDS: SavedCard[] = [
  {
    id: 'card_default_1',
    cardName: 'Sarah Jenkins',
    cardNumber: '•••• •••• •••• 4321',
    expiry: '12/28',
    cvv: '***',
    brand: 'mastercard',
    isDefault: true,
  }
];

export default function VendorSettingsPage() {
  // Saved Cards states
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [newCard, setNewCard] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    zipCode: '',
  });
  const [newCardError, setNewCardError] = useState<string | null>(null);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const cardsKey = nsKey('vendor_saved_cards');
    const savedCardsData = localStorage.getItem(cardsKey);
    if (savedCardsData) {
      try {
        setSavedCards(JSON.parse(savedCardsData));
      } catch (err) {
        console.error('Error parsing vendor saved cards', err);
        setSavedCards(DEFAULT_SAVED_CARDS);
      }
    } else {
      setSavedCards(DEFAULT_SAVED_CARDS);
      localStorage.setItem(cardsKey, JSON.stringify(DEFAULT_SAVED_CARDS));
    }
  }, []);

  const getCardBrand = (number: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleanNumber) || /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6011|65|64[4-9]|622/.test(cleanNumber)) return 'discover';
    return 'unknown';
  };

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

  const handleNewCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cno') {
      const formatted = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
      setNewCard(prev => ({ ...prev, cardNumber: formatted }));
    } else if (name === 'exp') {
      setNewCard(prev => ({ ...prev, expiry: formatExpiry(value) }));
    } else if (name === 'cv') {
      setNewCard(prev => ({ ...prev, cvv: value.replace(/\D/g, '').slice(0, 4) }));
    } else if (name === 'zp') {
      setNewCard(prev => ({ ...prev, zipCode: value.replace(/\D/g, '').slice(0, 5) }));
    } else if (name === 'cn') {
      setNewCard(prev => ({ ...prev, cardName: value }));
    }
    
    if (newCardError) setNewCardError(null);
  };

  const handleSetDefaultCard = (id: string) => {
    const updated = savedCards.map(c => ({
      ...c,
      isDefault: c.id === id
    }));
    setSavedCards(updated);
    localStorage.setItem(nsKey('vendor_saved_cards'), JSON.stringify(updated));
    toast.success('Default payment card updated.', {
      icon: <Sparkles className="w-5 h-5 text-[#28A745]" />
    });
  };

  const handleDeleteCard = (id: string) => {
    const cardToDelete = savedCards.find(c => c.id === id);
    if (cardToDelete?.isDefault && savedCards.length > 1) {
      toast.error('Please set another card as default before deleting this one.');
      return;
    }
    const updated = savedCards.filter(c => c.id !== id);
    if (cardToDelete?.isDefault && updated.length > 0) {
      updated[0].isDefault = true;
    }
    setSavedCards(updated);
    localStorage.setItem(nsKey('vendor_saved_cards'), JSON.stringify(updated));
    toast.success('Card removed successfully.');
  };

  const handleAddCardSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setNewCardError(null);

    const cleanCard = newCard.cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 16) {
      setNewCardError('Invalid card number length');
      return;
    }

    const [month, year] = newCard.expiry.split('/');
    if (!month || parseInt(month) > 12 || parseInt(month) < 1) {
      setNewCardError('Invalid expiry month');
      return;
    }
    if (!year || year.length !== 2) {
      setNewCardError('Invalid expiry year');
      return;
    }

    if (newCard.cvv.length < 3) {
      setNewCardError('Invalid CVV');
      return;
    }
    if (!newCard.cardName) {
      setNewCardError('Cardholder name is required');
      return;
    }

    setIsTokenizing(true);

    // Simulate secure payment gateway tokenization
    setTimeout(() => {
      const detectedBrand = getCardBrand(newCard.cardNumber);
      const last4 = cleanCard.slice(-4);
      const maskedCardNumber = `•••• •••• •••• ${last4}`;

      const newCardObj: SavedCard = {
        id: `card_${Date.now()}`,
        cardName: newCard.cardName,
        cardNumber: maskedCardNumber,
        expiry: newCard.expiry,
        cvv: '***',
        brand: detectedBrand,
        isDefault: savedCards.length === 0,
      };

      const updated = [...savedCards, newCardObj];
      setSavedCards(updated);
      localStorage.setItem(nsKey('vendor_saved_cards'), JSON.stringify(updated));

      setNewCard({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        zipCode: '',
      });
      setIsTokenizing(false);
      setShowAddCardModal(false);
      toast.success('Card secured and saved successfully!', {
        icon: <Sparkles className="w-5 h-5 text-[#28A745]" />
      });
    }, 1000);
  };

  const getCardBackground = (brand: string, isDefault: boolean) => {
    let baseGradient = '';
    switch (brand) {
      case 'visa':
        baseGradient = 'from-[#1b3c59] via-[#0f2a4a] to-[#001c2f]';
        break;
      case 'mastercard':
        baseGradient = 'from-[#2d1b18] via-[#1a1215] to-[#0d070b]';
        break;
      case 'amex':
        baseGradient = 'from-[#2b3a4a] via-[#1A2E42] to-[#0e1620]';
        break;
      case 'discover':
        baseGradient = 'from-[#4a2e1b] via-[#21150f] to-[#0e0a08]';
        break;
      default:
        baseGradient = 'from-[#243342] via-[#0B2337] to-[#001C2F]';
        break;
    }
    
    return `bg-gradient-to-br ${baseGradient} ${isDefault ? 'border-[#28A745]/60 shadow-[0_0_15px_rgba(40,167,69,0.15)]' : 'border-white/5 hover:border-white/20'}`;
  };

  const renderCardLogo = (brand: string) => {
    switch (brand) {
      case 'visa':
        return (
          <svg viewBox="0 0 24 15" className="w-10 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2 0.5L9.6 14.5H12.9L15.5 0.5H12.2Z" fill="#FFFFFF"/>
            <path d="M5.5 0.5L2.6 10.5L2.2 8.8C1.5 6.4 -0.8 1.1 -0.8 1.1L-3.6 1.1L-3.55 1.4C-1.8 1.8 -0.2 2.9 0.8 4.4L3.8 14.9H7.2L12 0.5H8.7L5.5 0.5Z" fill="#F7B600"/>
            <path d="M20.4 0.9L20.1 0.5H15.1C14.1 0.5 13.3 1.1 13.1 2L12 7.2L16.6 7.2L17.5 2.7L17.8 0.9L20.4 0.9Z" fill="#FFFFFF"/>
          </svg>
        );
      case 'mastercard':
        return (
          <svg viewBox="0 0 24 15" className="w-10 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="7.5" r="7" fill="#EB001B" fillOpacity="0.85"/>
            <circle cx="16" cy="7.5" r="7" fill="#F79E1B" fillOpacity="0.85"/>
            <path d="M12 7.5C12 5.9 11.4 4.4 10.4 3.3C9.5 4.4 9 5.9 9 7.5C9 9.1 9.5 10.6 10.4 11.7C11.4 10.6 12 9.1 12 7.5Z" fill="#FF5F00"/>
          </svg>
        );
      case 'amex':
        return (
          <svg viewBox="0 0 24 15" className="w-10 h-7 rounded-[1px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="15" fill="#016FD0"/>
            <path d="M4 11.5H5.4L5.7 10.5H7.3L7.6 11.5H9L7.2 6.5H5.8L4 11.5ZM6.1 9.3L6.5 8L6.9 9.3H6.1ZM10 6.5V11.5H11.4V9.3L12.2 11.5H13.6L14.4 9.3V11.5H15.8V6.5H14.4L13.1 9.8L11.8 6.5H10ZM17 6.5V11.5H21.5V10.3H18.4V9.5H20.9V8.3H18.4V7.7H21.4V6.5H17Z" fill="white"/>
          </svg>
        );
      case 'discover':
        return (
          <svg viewBox="0 0 24 15" className="w-10 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H24V15H0V0Z" fill="#F47216"/>
            <path d="M4 4H6C7.1 4 8 4.9 8 6V9C8 10.1 7.1 11 6 11H4V4ZM6 9.5C6.3 9.5 6.5 9.3 6.5 9V6C6.5 5.7 6.3 5.5 6 5.5H5.5V9.5H6ZM10 4H11.5V11H10V4ZM13 11L15 4H16.5L18.5 11H17L16.5 9H15L14.5 11H13ZM15.5 8H16L15.7 7L15.5 8ZM20 4V11H21.5V4H20Z" fill="white"/>
          </svg>
        );
      default:
        return <CreditCard className="w-5 h-5 text-slate-400" />;
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password updated successfully!', {
        icon: <KeyRound className="w-5 h-5 text-[#28A745]" />
      });
    }, 1000);
  };

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[92%] max-w-[2400px] mx-auto space-y-10 bg-[#001C2F] font-inter text-white pb-16 px-2">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Settings
            </h1>
            <Sparkles className="w-6 h-6 text-[#28A745] animate-pulse" />
          </div>
          <p className="text-slate-400 text-sm md:text-base font-light">
            Manage your saved credit cards, platform billing methods, and password security.
          </p>
        </div>
      </div>

      {/* Grid Layout of Settings Options */}
      <div className="flex flex-col gap-8">
        
        {/* Card 1: Saved Payment Methods (Styled exactly like customer's profile page) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#28A745]/10 rounded-xl">
                <CreditCard className="w-5 h-5 text-[#28A745]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Saved Payment Methods</h3>
                <p className="text-slate-400 text-xs">Manage credit/debit cards for subscription fees</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddCardModal(true)}
              className="flex items-center justify-center gap-2 bg-[#28A745] hover:bg-[#218838] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg hover:shadow-[#28A745]/20 transition-all w-full sm:w-auto"
            >
              <Plus size={14} />
              Add New Card
            </button>
          </div>

          {savedCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-[#001C2F]/30 rounded-2xl border border-dashed border-white/5">
              <CreditCard className="w-12 h-12 text-slate-500 mb-3 stroke-1" />
              <p className="text-sm font-semibold text-slate-300">No saved payment methods</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mb-4">Add a card to secure your platform account billing option.</p>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="flex items-center justify-center gap-2 bg-[#28A745] hover:bg-[#218838] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg hover:shadow-[#28A745]/20 transition-all w-full sm:w-auto"
              >
                <Plus size={14} />
                Add New Card
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedCards.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  className={`relative h-52 rounded-[24px] p-6 flex flex-col justify-between overflow-hidden shadow-2xl border transition-all duration-300 group ${
                    getCardBackground(card.brand, card.isDefault)
                  }`}
                >
                  {/* Diagonal Glossy Sheen Overlay */}
                  <div className="absolute -inset-y-20 -left-20 w-32 bg-white/5 blur-xl -skew-x-12 rotate-12 transition-all duration-1000 group-hover:translate-x-[400px] pointer-events-none" />

                  {/* Micro Ambient Glow */}
                  <div className={`absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
                    card.isDefault ? 'bg-[#28A745]/10' : 'bg-white/5'
                  }`} />

                  {/* Card Top: Chip, contactless, and default status */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-4">
                      {/* Golden Chip */}
                      <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#F5D061] via-[#C49B32] to-[#E5C158] p-1 flex flex-col justify-between relative overflow-hidden shadow-md border border-amber-300/40 shrink-0">
                        <div className="w-full h-[1px] bg-black/20 absolute top-1/2 left-0 -translate-y-1/2" />
                        <div className="h-full w-[1px] bg-black/20 absolute left-1/2 top-0 -translate-x-1/2" />
                        <div className="w-5 h-3.5 border border-black/10 rounded-sm absolute left-3 top-2 bg-gradient-to-br from-[#C49B32] to-[#F5D061]" />
                      </div>
                      
                      {/* Contactless Icon */}
                      <svg className="w-5 h-5 text-white/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12a2.5 2.5 0 0 0-2.5-2.5" />
                        <path d="M12 18a6 6 0 0 0 4-6 6 6 0 0 0-4-6" strokeOpacity="0.7" />
                        <path d="M15.5 21a10 10 0 0 0 5-9 10 10 0 0 0-5-9" strokeOpacity="0.4" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-2">
                      {card.isDefault && (
                        <span className="bg-[#28A745]/20 border border-[#28A745]/40 text-[#28A745] text-[9px] font-extrabold uppercase tracking-widest rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                          <Check size={10} strokeWidth={3} />
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Number: Monospaced and distinct tracking */}
                  <div className="text-xl md:text-2xl font-mono tracking-[0.25em] text-white/95 font-semibold text-center my-3 select-none drop-shadow-md z-10">
                    {card.cardNumber}
                  </div>

                  {/* Card Bottom: Holder Name, Expiry, and Brand */}
                  <div className="flex justify-between items-end z-10 border-t border-white/5 pt-3">
                    <div className="space-y-0.5">
                      <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Card Holder</p>
                      <p className="text-xs font-bold text-white tracking-wide truncate max-w-[140px] drop-shadow-sm">{card.cardName}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      <div>
                        <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Expires</p>
                        <p className="text-xs font-bold text-white tracking-wide font-mono drop-shadow-sm">{card.expiry}</p>
                      </div>

                      <div className="h-6 w-[1px] bg-white/10" />

                      <div className="flex flex-col items-center">
                        {renderCardLogo(card.brand)}
                      </div>
                    </div>
                  </div>

                  {/* Hover Quick Actions Menu Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#001C2F]/95 border-t border-white/10 py-2.5 px-4 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                    {!card.isDefault ? (
                      <button
                        onClick={() => handleSetDefaultCard(card.id)}
                        className="text-[10px] text-[#28A745] hover:underline font-bold uppercase tracking-wider transition-all"
                      >
                        Set As Default
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Default Method
                      </span>
                    )}
                    
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Card 2: Security & Password Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-[#0B2337]/50 border border-white/5 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-[#28A745]/10 rounded-xl">
              <Lock className="w-5 h-5 text-[#28A745]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Change Password</h3>
              <p className="text-slate-400 text-xs">Keep your vendor account secure</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-xl">
            {/* Current Password */}
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 pr-11 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 pr-11 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 ml-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#001C2F] border border-[#1e2d3d] text-white px-4 py-3 pr-11 rounded-2xl focus:outline-none focus:border-[#28A745] focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full bg-[#28A745] hover:bg-[#218838] disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-sm shadow-lg shadow-[#28A745]/15"
              >
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </motion.div>

      </div>

      {/* Add Card Modal Overlay */}
      <AnimatePresence>
        {showAddCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCardModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-[#0B2337] border border-[#1A2E42] rounded-[28px] shadow-2xl p-6 md:p-8 overflow-hidden z-10 text-white"
            >
              {/* Subtle background gradient glow */}
              <div className="absolute -right-24 -top-24 w-60 h-60 rounded-full bg-[#28A745]/5 blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#28A745]/10 p-2 rounded-xl border border-[#28A745]/20">
                    <CreditCard className="w-5 h-5 text-[#28A745]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Add Card Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {newCardError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2.5 text-red-400 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {newCardError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleAddCardSubmit} className="space-y-4">
                {/* Cardholder Name */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold block ml-1">Holder's Full Name</label>
                  <input
                    type="text"
                    name="cn"
                    required
                    value={newCard.cardName}
                    onChange={handleNewCardInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] focus:border-[#28A745] text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm"
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold block ml-1 flex justify-between items-center">
                    <span>Card Digits (16-digits)</span>
                    <span className="text-[10px] uppercase text-[#28A745] font-bold tracking-wider">
                      {getCardBrand(newCard.cardNumber) !== 'unknown' ? getCardBrand(newCard.cardNumber) : ''}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cno"
                      required
                      value={newCard.cardNumber}
                      onChange={handleNewCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] focus:border-[#28A745] text-white pl-4 pr-12 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm font-mono tracking-wider"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                      {newCard.cardNumber ? (
                        renderCardLogo(getCardBrand(newCard.cardNumber))
                      ) : (
                        <Lock className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold block ml-1">Valid Thru (MM/YY)</label>
                    <input
                      type="text"
                      name="exp"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={newCard.expiry}
                      onChange={handleNewCardInputChange}
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] focus:border-[#28A745] text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm text-center font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold block ml-1">Code (3-digits)</label>
                    <input
                      type="password"
                      name="cv"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={newCard.cvv}
                      onChange={handleNewCardInputChange}
                      className="w-full bg-[#001C2F] border border-[#1e2d3d] focus:border-[#28A745] text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm text-center font-mono"
                    />
                  </div>
                </div>

                {/* Zip Code */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold block ml-1">Postal Code</label>
                  <input
                    type="text"
                    name="zp"
                    placeholder="e.g. 10001"
                    maxLength={5}
                    value={newCard.zipCode}
                    onChange={handleNewCardInputChange}
                    className="w-full bg-[#001C2F] border border-[#1e2d3d] focus:border-[#28A745] text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#28A745]/10 transition-all text-sm font-mono"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCardModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-[#1A2E42] text-slate-300 hover:bg-white/5 font-bold text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isTokenizing}
                    className="flex-1 bg-[#28A745] hover:bg-[#218838] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-[#28A745]/15 text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isTokenizing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Securing...
                      </>
                    ) : (
                      'Save Card'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
