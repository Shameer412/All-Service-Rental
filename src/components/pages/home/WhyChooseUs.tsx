import React from 'react';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import { SectionHeader, FeatureCard } from '@/components/ui';

const features = [
  { title: "Wide Vehicle Selection",   desc: "From compact cars to premium SUVs, our fleet fits every travel style and budget.",         icon: "/icons/whychooseus/truck.png" },
  { title: "24/7 Support",             desc: "Our customer team is always available to help you on the road, wherever you are.",          icon: "/icons/whychooseus/h24.png" },
  { title: "Fast Pickup & Return",     desc: "Skip the counter and drive away in minutes with our digital check-in system.",              icon: "/icons/whychooseus/h25.png" },
  { title: "Transparent Pricing",      desc: "What you see is what you pay — no hidden fees, no surprises.",                              icon: "/icons/whychooseus/h26.png" },
  { title: "Flexible Booking Options", desc: "Need to extend your trip? Manage everything online in just a few clicks.",                  icon: "/icons/whychooseus/h27.png" },
];

const WhyChooseUs = () => {
  return (
    <Section className="bg-[#021522]">
      <div className="mb-20">
        <SectionHeader
          badge="Why Choose Us"
          title="Experience Convenience Every Time You Rent With Travra"
          size="lg"
          titleClassName="max-w-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {features.map((f, index) => (
          <FeatureCard key={index} imgSrc={f.icon} imgAlt={f.title} title={f.title} desc={f.desc} />
        ))}

        {/* Journey Card — 6th slot */}
        <div
          className="w-full md:w-[85%] lg:w-full mx-auto p-6 xl:p-8 flex flex-col items-center justify-center text-center gap-5 shadow-2xl h-full journey-card"
        >
          <h3 className="text-white text-[22px] font-[700] leading-tight">
            Let's Start Your Journey Today
          </h3>
          <Button variant="primary" className="w-full py-3.5 rounded-[12px] font-[700] text-[14px] uppercase tracking-wider mt-auto">
            Find the Perfect Car
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;
