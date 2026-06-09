import React from 'react';
import { Button } from '../../../components/ui/Button';

export default function NewsletterSection() {
  return (
    <section className="bg-black py-16 md:py-24 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6">
          Join Tableli
        </h2>
        <p className="text-gray-400 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Subscribe for exclusive chef interviews, seasonal menu inspirations, and priority access to pop-up events.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="flex-grow bg-[#1A1A1A] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent transition-colors"
            required
          />
          <button
            type="submit"
            className="bg-[#FFE59E] hover:bg-[#FFD97D] text-black font-bold px-10 py-4 rounded-xl transition-all duration-300 uppercase tracking-wider text-sm whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
