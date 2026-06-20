'use client';

import React from 'react';
import { Wrench, Wallet, ShieldCheck, TerminalSquare } from 'lucide-react';
import { FeatureCard } from '@/components/ui';

const categoryCards = [
  { id: '01', title: 'Rental Process',   desc: 'Fleet deployment protocols and hardware lifecycle management.',            icon: Wrench },
  { id: '02', title: 'Billing & Protocol', desc: 'Financial reconciliation and automated smart-contract auditing.',        icon: Wallet },
  { id: '03', title: 'Security',          desc: 'Data sovereignty, biometric validation, and neural encryption.',          icon: ShieldCheck },
  { id: '04', title: 'API Integration',   desc: 'Webhooks, RESTful endpoints, and real-time telemetry streaming.',         icon: TerminalSquare },
];

const CategoryGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto pb-16">
    {categoryCards.map((card) => (
      <FeatureCard
        key={card.id}
        icon={card.icon}
        num={card.id}
        title={card.title}
        desc={card.desc}
      />
    ))}
  </div>
);

export default CategoryGrid;
