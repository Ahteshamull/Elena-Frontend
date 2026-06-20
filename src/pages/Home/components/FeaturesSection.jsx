import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Leaf } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="bg-[#0A0A0A] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 md:mb-12 leading-tight">
              The Standards of Global Gastronomy. In Your Home
            </h2>
            
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="mt-1">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extraordinary Talent</h3>
                  <p className="text-gray-400">Only the most distinguished chefs, rigorously vetted to ensure unparalleled culinary excellence.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Seamless Service</h3>
                  <p className="text-gray-400">From tailored menus to flawless execution and meticulous cleanup, we handle every detail.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Leaf className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sustainable Sourcing</h3>
                  <p className="text-gray-400">Partnering with local producers to ensure the freshest, most ethically sourced ingredients.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-2 mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl w-full max-w-sm mx-auto lg:max-w-none">
              {/* Using provided local image */}
              <img 
                src="/h_9.png" 
                alt="Plating fine dining" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
