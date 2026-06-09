import React from 'react';

export default function TestimonialSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 md:mb-10 flex justify-center">
          <span className="text-5xl md:text-6xl text-accent font-serif leading-none">"</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-primary-900 leading-snug mb-8 md:mb-12 italic">
          "An absolutely flawless experience from start to finish. Chef Julian Vance didn't just cook a meal; he created a sensory journey that my guests are still talking about weeks later. The level of professionalism is unmatched."
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0">
            <img 
              src="/h_10.png" 
              alt="Helena Alvarez" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="font-semibold text-primary-900 uppercase tracking-wider text-xs md:text-sm">Helena Alvarez</div>
            <div className="text-gray-500 text-xs md:text-sm">Villa Owner, Mallorca</div>
          </div>
        </div>
      </div>
    </section>
  );
}
