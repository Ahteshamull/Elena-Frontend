import React from 'react';
import HeroSection from './components/HeroSection';
import ChefSection from './components/ChefSection';
import ExperiencesSection from './components/ExperiencesSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialSection from './components/TestimonialSection';
import LocationsSection from './components/LocationsSection';
import FAQSection from './components/FAQSection';
import NewsletterSection from './components/NewsletterSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ChefSection />
      <ExperiencesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialSection />
      <LocationsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}
