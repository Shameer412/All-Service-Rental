'use client';

import React, { useState } from 'react';
import { Download, Activity } from 'lucide-react';
import { AccordionItem } from '@/components/ui';

const faqs = [
  {
    id: 1,
    num: '01',
    question: 'HOW DO I AUTHORIZE A COLD-CHAIN FLEET DEPLOYMENT?',
    answer: 'Standard authorization requires level 3 clearance and biometric validation via the mobile node.',
  },
  {
    id: 2,
    num: '02',
    question: 'ENCRYPTION PROTOCOLS FOR CROSS-BORDER TELEMETRY?',
    answer: 'All Service Rental utilizes AES-256 neural-grade encryption for all telemetry data streams. For cross-border transit, we deploy the "Sentinel" protocol which ensures data sovereignty while maintaining real-time latency under 15ms.',
  },
  {
    id: 3,
    num: '03',
    question: 'AUTOMATED SMART-CONTRACT DISPUTE RESOLUTION?',
    answer: 'Disputes are automatically routed to the arbitration nodes. Resolution typically occurs within 400ms based on predefined oracle parameters.',
  },
  {
    id: 4,
    num: '04',
    question: 'API RATE LIMITS FOR HIGH-FREQUENCY TRADING?',
    answer: 'Enterprise tiers support up to 10,000 requests per second. Custom node provisioning is required for higher throughput.',
  },
];

const FaqAccordion = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(2);

  return (
    <section className="bg-[#011428] border-y border-slate-800/50">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto py-20 flex flex-col lg:flex-row gap-16">

        {/* Left Column */}
        <div className="lg:w-1/3">
          <h2 className="text-white text-3xl font-black leading-tight mb-4">
            ACTIVE QUERY<br />RESOLUTION
          </h2>
          <div className="w-8 h-1 bg-[#4ADE80] mb-6" />
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Our kinetic support system operates on a zero-latency protocol. Select a category to filter
            technical documentation or browse the global matrix.
          </p>

          <div className="space-y-4">
            <button className="flex items-center text-[#4ADE80] text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">
              <Download className="w-4 h-4 mr-3" />
              Download Documentation
            </button>
            <button className="flex items-center text-[#4ADE80] text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">
              <Activity className="w-4 h-4 mr-3" />
              Live Node Status
            </button>
          </div>
        </div>

        {/* Right Column — uses AccordionItem UI primitive */}
        <div className="lg:w-2/3 flex flex-col gap-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              num={faq.num}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaq === faq.id}
              onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              accentColor="#4ADE80"
              bgColor="#16283d"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
