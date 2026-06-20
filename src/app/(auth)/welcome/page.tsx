import React from 'react';
import WelcomeHero from '@/components/pages/auth/WelcomeHero';

export const metadata = {
  title: 'Welcome | All Service Rental',
  description: 'Professional equipment rental at your fingertips. Rent trucks and equipment easily.',
};

export default function WelcomePage() {
  return (
    <main>
      <WelcomeHero />
    </main>
  );
}
