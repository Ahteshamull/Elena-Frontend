import React from 'react';
import HowHero from './components/HowHero';
import StepsSection from './components/StepsSection';
import DualCTA from './components/DualCTA';

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <HowHero />
      <StepsSection />
      <DualCTA />
    </div>
  );
}
