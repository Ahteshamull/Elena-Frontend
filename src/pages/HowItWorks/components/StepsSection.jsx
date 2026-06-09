import React from 'react';
import { ClipboardList, UtensilsCrossed, Sparkles } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Submit Booking Request",
    desc: "Describe the bespoke event details, from preferred cuisine to guest count and venue specifics.",
    icon: <ClipboardList strokeWidth={1.5} className="w-8 h-8 text-[#A59570]" />,
    image: "/hw_1.png",
    imgMargin: "mt-12 md:mt-16"
  },
  {
    num: "02",
    title: "Receive Chef Proposals",
    desc: "Browse through a curated selection of hand-selected menus from world-class culinary talent.",
    icon: <UtensilsCrossed strokeWidth={1.5} className="w-8 h-8 text-[#A59570]" />,
    image: "/hw_2.png",
    imgMargin: "mt-12 md:mt-32"
  },
  {
    num: "03",
    title: "Enjoy Event",
    desc: "Experience exquisite gastronomy served in the comfort of your home by a dedicated culinary team.",
    icon: <Sparkles strokeWidth={1.5} className="w-8 h-8 text-[#A59570]" />,
    image: "/hw_3.png",
    imgMargin: "mt-12 md:mt-0"
  }
];

export default function StepsSection() {
  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full border border-dashed border-gray-400 flex items-center justify-center bg-[#FDFDFD]">
                  {step.icon}
                </div>
                {/* Number Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAFAFA]">
                  {step.num}
                </div>
              </div>

              {/* Text */}
              <div className="mb-4">
                <h3 className="text-xl font-serif font-medium mb-3 text-primary-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[260px] mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* Image */}
              <div className={`w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-lg ${step.imgMargin}`}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-[320px] object-cover"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
