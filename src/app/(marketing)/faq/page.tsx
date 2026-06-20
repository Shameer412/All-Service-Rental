import React from 'react';
import SupportHero from '@/components/pages/faq/SupportHero';
import CategoryGrid from '@/components/pages/faq/CategoryGrid';
import FaqAccordion from '@/components/pages/faq/FaqAccordion';
import SupportCTA from '@/components/pages/faq/SupportCTA';

export const metadata = {
  title: 'FAQ - Global Support Matrix | All Service Rental',
  description: 'Resolve protocols, access API endpoints, and optimize your operational flow with All Service Rental global support matrix.',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200 font-sans selection:bg-[#4ADE80] selection:text-black">
      <SupportHero />
      <CategoryGrid />
      <FaqAccordion />
      <SupportCTA />
    </main>
  );
}
