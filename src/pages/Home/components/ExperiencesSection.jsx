import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const experiencesData = [
  {
    id: 1,
    title: "Private Celebrations",
    image: "/h_5.png",
    className: "md:col-span-2 h-56 md:h-80",
  },
  {
    id: 2,
    title: "Corporate Events",
    image: "/h_6.png",
    className: "md:col-span-1 h-56 md:h-80",
  },
  {
    id: 3,
    title: "Yacht & Villa events",
    image: "/h_7.png",
    className: "md:col-span-1 h-56 md:h-80",
  },
  {
    id: 4,
    title: "Curated Tasting Menus",
    image: "/h_8.png",
    className: "md:col-span-2 h-56 md:h-80",
  }
];

export default function ExperiencesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Simulate dynamic data fetching
    const timer = setTimeout(() => {
      setExperiences(experiencesData);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="experiences" className="py-16 md:py-24 bg-[#F3F2EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-primary-900">Moments Made Extraordinary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {isLoading
            ? // Skeleton Loaders
              experiencesData.map((exp) => (
                <div 
                  key={exp.id} 
                  className={`relative rounded-2xl overflow-hidden bg-gray-300 animate-pulse ${exp.className}`}
                >
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                    <div className="h-6 bg-gray-400 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            : // Actual Data
              experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer ${exp.className}`}
                >
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <h3 className="text-white text-xl md:text-2xl font-serif">{exp.title}</h3>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

