import React from 'react';
import { Search, SlidersHorizontal, Utensils } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Browse",
    description: "Discover curated profiles of top-tier chefs available in your area.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customize",
    description: "Connect with your chef to tailor a menu perfectly suited to your tastes.",
  },
  {
    icon: Utensils,
    title: "Enjoy",
    description: "Relax as your chef transforms your space into a premium dining setting.",
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">Tableli</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gray-200 z-0"></div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] mb-8 border border-gray-50">
              <step.icon className="w-8 h-8 text-primary-900" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-primary-900 mb-4">{step.title}</h3>
            <p className="text-gray-500 max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
