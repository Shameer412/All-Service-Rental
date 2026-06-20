import React from 'react';
import Section from '@/components/common/Section';
import Heading from '@/components/common/Heading';
import Badge from '@/components/common/Badge';

const architectureData = [
  {
    title: "GLOBAL MONOLITH",
    desc: "We operate as a single, unified entity across 142 countries, ensuring that logistics never feels like a series of handoffs, but a continuous flow."
  },
  {
    title: "ZERO LATENCY",
    desc: "In the kinetic economy, time is the only true currency. Our proprietary Stratum AI predicts bottlenecks before they manifest."
  }
];

const OurArchitecture = () => {
  return (
    <Section className="bg-[#081D30]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Features */}
          <div className="flex flex-col gap-12">
            <Heading size="md">
              Our Architecture
            </Heading>

            <div className="flex flex-col gap-10">
              {architectureData.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  {/* Green Vertical Line */}
                  <div className="w-[3px] bg-[#28A745] h-auto self-stretch rounded-full" />

                  <div className="flex flex-col gap-3">
                    <Badge variant="simple">
                      {item.title}
                    </Badge>
                    <p className="text-gray-400 text-[18px] leading-relaxed max-w-[90%] lg:max-w-[80%]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quote Box */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[70%] p-10 md:p-14 rounded-[4px] relative overflow-hidden quote-box-glass"
            >
              {/* Architecture Icon (SVG from Figma) */}
              <div className="mb-10">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="24" cy="12" r="3" fill="#28A745"/>
                   <circle cx="12" cy="24" r="3" fill="#28A745"/>
                   <circle cx="36" cy="24" r="3" fill="#28A745"/>
                   <circle cx="18" cy="36" r="3" fill="#28A745"/>
                   <circle cx="30" cy="36" r="3" fill="#28A745"/>
                   <path d="M24 15V21M15 24H21M27 24H33M21 33L18 36M27 33L30 36" stroke="#28A745" strokeWidth="2"/>
                </svg>
              </div>

              <blockquote className="flex flex-col gap-8">
                <p className="text-white text-[24px] md:text-[30px] font-[500] leading-tight italic">
                  "Logistics is no longer about moving boxes; it is about managing the kinetic energy of global demand."
                </p>
                <footer className="text-gray-500 text-[14px] font-[700] uppercase tracking-[0.2em]">
                  Our Service Doctrine
                </footer>
              </blockquote>
            </div>
          </div>

        </div>

    </Section>
  );
};

export default OurArchitecture;
