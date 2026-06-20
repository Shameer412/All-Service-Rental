'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, FileText, Download, Loader2 } from 'lucide-react';

interface ReportCardItemProps {
  title: string;
  description: string;
  icon: any;
  onGenerate: () => Promise<void>;
}

function ReportCardItem({ title, description, icon: Icon, onGenerate }: ReportCardItemProps) {
  const [generating, setGenerating] = useState(false);

  const handleClick = async () => {
    setGenerating(true);
    await onGenerate();
    setGenerating(false);
  };

  return (
    <div className="flex flex-col justify-between p-6 bg-[#0B2337] border border-[#2A2F38] rounded-[24px] transition-all duration-300 hover:border-[#22C55E]/20">
      <div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#22C55E]/10 text-[#22C55E]">
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 mt-6 mb-8">
          <h3 className="text-white font-bold text-base leading-snug">{title}</h3>
          <p className="text-white/60 text-xs font-medium leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        disabled={generating}
        className="flex items-center justify-center gap-2 px-4 py-2.5 w-full text-sm font-semibold text-black bg-[#22C55E] hover:bg-[#16a34a] rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-inter"
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-black" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-black" />
            Generate
          </>
        )}
      </button>
    </div>
  );
}

interface ReportCardsGridProps {
  onGenerateReport: (reportName: string) => Promise<void>;
}

export default function ReportCardsGrid({ onGenerateReport }: ReportCardsGridProps) {
  const reportCards = [
    {
      title: 'Monthly Revenue Report',
      description: 'Comprehensive revenue breakdown',
      icon: BarChart3,
    },
    {
      title: 'Vendor Performance',
      description: 'Top performing vendors analysis',
      icon: TrendingUp,
    },
    {
      title: 'Fleet Utilization',
      description: 'Vehicle usage and efficiency',
      icon: FileText,
    },
    {
      title: 'Customer Analytics',
      description: 'User behavior and trends',
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {reportCards.map((card) => (
        <ReportCardItem
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          onGenerate={() => onGenerateReport(card.title)}
        />
      ))}
    </div>
  );
}
