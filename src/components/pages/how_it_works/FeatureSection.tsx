"use client";
import React from 'react';
import Image from 'next/image';
import { features, type Feature } from '@/components/data/features';
import Heading from '@/components/common/Heading';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';

const FeatureSection = () => {
  return (
    <section className="bg-[#081D30] text-white py-16 md:py-24 px-4 selection:bg-green-500/30">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto space-y-24 md:space-y-40">
        {features.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
};

const FeatureItem = ({ feature }: { feature: Feature }) => {
  return (
    <div
      className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}
    >
      {/* Text Content */}
      <div className="flex-1 space-y-6">
        <div className="relative">
          <span className="text-4xl md:text-7xl font-bold text-[#66DF75] absolute -top-6 -left-2 md:-left-4 pointer-events-none select-none opacity-10">
            {feature.id}
          </span>
          <Heading as="h2" size="md" className="relative z-10">
            {feature.title}
          </Heading>
        </div>

        <p className="text-slate-400 text-lg leading-relaxed max-w-[90%] lg:max-w-[80%] font-light">
          {feature.description}
        </p>

        {/* Dynamic UI Elements based on content */}
        {feature.badge && (
          <Badge variant="simple" className="pt-4 with-line">
            {feature.badge}
          </Badge>
        )}

        {feature.points && (
          <div className="space-y-4 pt-4">
            {feature.points.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[11px] tracking-widest text-slate-200 font-bold group">
                <div className="w-4 h-4 rounded-full border-2 border-[#66DF75] flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#66DF75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {p}
              </div>
            ))}
          </div>
        )}

        {feature.stats && (
          <div className="bg-slate-900/50 border-l-2 border-green-500 p-5 max-w-sm rounded-r-sm mt-8">
            <div className="flex items-baseline gap-2">
              <span className="text-green-500 text-[10px] md:text-xs font-bold tracking-tighter">{feature.stats.label}</span>
              <span className="text-2xl md:text-3xl text-green-500 font-black">{feature.stats.value}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">
              {feature.stats.subtext}
            </p>
          </div>
        )}

        {feature.buttonText && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-8 !text-white !bg-transparent flex items-center justify-center feature-btn-outline !border-[#8794844D] hover:!bg-white/10 hover:!text-white"
          >
            {feature.buttonText}
          </Button>
        )}
      </div>

      {/* Visual Media Side */}
      <div className="flex-1 w-full">
        <div className="relative aspect-video rounded-sm overflow-hidden border border-white/5 group">
          {/* Futuristic Overlay Grid */}
          <div className="absolute inset-0 z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />

          {/* Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-700 group-hover:scale-110">
               <Image
                src={feature.icon}
                alt={`${feature.title} icon`}
                fill
                className="object-contain filter drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              />
            </div>
          </div>

          {/* Inner Glow Effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-30" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
