import React from 'react';
import { Button } from '../../../components/ui/Button';

export default function DualCTA() {
  return (
    <section className="bg-[#F3F2EF] py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-gray-500 mb-2">Culinary Professional?</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-900">Elevate Your Lifestyle</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-2xl font-serif font-medium mb-4 text-primary-900">Seeking an Experience?</h3>
            <p className="text-gray-500 mb-8 max-w-[280px] mx-auto text-sm leading-relaxed">
              Access the world's most talented private chefs for your next occasion.
            </p>
            <Button variant="primary" className="rounded-none px-8 py-3 w-full max-w-[240px] text-[10px] font-bold tracking-widest uppercase">
              Inquire Now
            </Button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <p className="text-gray-500 mb-8 max-w-[320px] mx-auto text-sm leading-relaxed mt-4">
              Join our elite network of verified chefs and reach high-net-worth clients.
            </p>
            <Button variant="outline" className="rounded-none px-8 py-3 w-full max-w-[240px] text-[10px] font-bold tracking-widest uppercase !border-black text-black hover:!bg-black hover:!text-white">
              Join the Inner Circle
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
