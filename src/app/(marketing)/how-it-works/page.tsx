import React from 'react';
import FrictionlessVelocity from '@/components/pages/how_it_works/FrictionlessVelocity';
import FeatureSection from '@/components/pages/how_it_works/FeatureSection';
import StatsSection from '@/components/pages/how_it_works/StatsSection';
import CTASection from '@/components/pages/how_it_works/CTASection';

export const metadata = {
  title: 'How It Works - All Service Rental',
  description: 'Learn about our operational workflow, features, and precision engineering.',
};

const HowItWorksPage = () => {
  return (
    <div className="flex flex-col w-full font-manrope">
      <FrictionlessVelocity />
      <FeatureSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default HowItWorksPage;
