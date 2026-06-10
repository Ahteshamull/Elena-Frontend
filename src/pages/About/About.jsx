import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Lock, SlidersHorizontal, ChefHat, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">

      {/* 1. Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/ab_hero.png")',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
          <div className="max-w-3xl text-white">
            <p className="text-sm tracking-[0.2em] uppercase font-medium mb-4">Our Legacy</p>
            <h1 className="text-5xl md:text-7xl font-cursive mb-6 leading-tight">
              Elevating the Art of<br />the Private Table
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              Tableli was born from a singular vision: to bring world-class culinary experiences into the most intimate and beautiful settings, private homes, villas, yachts, and curated events.
            </p>
            {/* <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              We connect discerning hosts with exceptional private chefs who transform every gathering into a memorable dining experience. From elegant dinners to luxury celebrations, Tableli blends hospitality, artistry, and personalization to make every table feel unforgettable.
            </p> */}
          </div>
        </div>
      </section>

      {/* 2. Journey Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-24 items-center">
          <div className="flex flex-col gap-6 md:pr-8">
            <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight">
              A Journey Through<br />Taste and Time
            </h2>
            <div className="text-gray-600 flex flex-col gap-6 leading-relaxed">
              <p>
                Tableli began in 2026 in a small atelier in MIAMI, where our founders recognized that the most profound dining experiences were often the most personal. They saw a world where elite culinary talent was confined to restaurant kitchens, and connoisseurs were seeking more than just a meal—they were seeking a narrative.
              </p>
              <p>
                Today, we serve as the digital concierge for the world’s most discerning hosts and most visionary chefs. We aren’t just a marketplace; we are curators of moments that linger in the memory long after the final course is served.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-sm">
            <img
              src="/ab_1.png"
              alt="Chef plating food carefully"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="w-full bg-[#F5F5F5] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Card */}
            <div className="bg-white p-10 md:p-14 lg:p-16 rounded-[2rem] shadow-sm flex flex-col gap-8 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                <Target className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif font-medium">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To democratize access to elite culinary talent while preserving the exclusivity and meticulous standards of fine dining.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-[#0A0A0A] text-white p-10 md:p-14 lg:p-16 rounded-[2rem] flex flex-col gap-8 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif font-medium">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To become the global standard for bespoke hospitality, redefining the private home as the ultimate dining destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Philosophy Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-16 md:mb-24 flex flex-col gap-6">
          <h2 className="text-3xl md:text-5xl font-serif font-medium">Our Philosophy</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At Tableli, we believe dining is more than a meal, it is an experience that brings people together. Every event should feel effortless, elevated, and deeply personal.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            We partner with talented chefs who are passionate about creating unforgettable moments through exceptional food, refined presentation, and warm hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
          {/* Provenance */}
          <div className="flex flex-col items-center text-center gap-6 group">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-2">
              <img src="/ab_2.png" alt="Fresh ingredients" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-3 px-4">
              <h4 className="text-xl font-medium">Curated Culinary Talent</h4>
              <p className="text-gray-600 leading-relaxed">
                We carefully select chefs who deliver not only incredible cuisine, but professionalism, creativity, and luxury-level service for every occasion.
              </p>
            </div>
          </div>

          {/* Curation */}
          <div className="flex flex-col items-center text-center gap-6 group">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-2">
              <img src="/ab_3.png" alt="Plated dish" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-3 px-4">
              <h4 className="text-xl font-medium">Elevated Private Experiences</h4>
              <p className="text-gray-600 leading-relaxed">
                From intimate dinners to yacht celebrations and villa gatherings, Tableli transforms private spaces into unforgettable dining destinations.
              </p>
            </div>
          </div>

          {/* Hospitality */}
          <div className="flex flex-col items-center text-center gap-6 group">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-2">
              <img src="/ab_4.png" alt="Pouring wine" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-3 px-4">
              <h4 className="text-xl font-medium">Personalized Hospitality</h4>
              <p className="text-gray-600 leading-relaxed">
                Every experience is tailored to the host’s vision, from custom menus and dietary preferences to ambiance and event style ensuring every detail feels seamless and exclusive.
              </p>
            </div>
          </div>

            {/* Exceptional Ingredients */}
          <div className="flex flex-col items-center text-center gap-6 group">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-2">
              <img src="/ab_5.png" alt="Pouring wine" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-3 px-4">
              <h4 className="text-xl font-medium">Exceptional Ingredients</h4>
              <p className="text-gray-600 leading-relaxed">
                We believe unforgettable dining begins with quality. Our chefs use premium ingredients, seasonal selections, and refined techniques to create elevated culinary experiences.
              </p>
            </div>
          </div>


            {/* Chef-Curated Menus */}  
          <div className="flex flex-col items-center text-center gap-6 group">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-2">
              <img src="/ab_6.png" alt="Pouring wine" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-3 px-4">
              <h4 className="text-xl font-medium">Chef-Curated Menus</h4>
              <p className="text-gray-600 leading-relaxed">
                Every menu is thoughtfully crafted to match the occasion, guest preferences, and atmosphere delivering a personalized fine dining experience in any setting.
              </p>
            </div>
          </div>

            {/* Luxury Hosting Experience */}
          <div className="flex flex-col items-center text-center gap-6 group">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-2">
              <img src="/ab_7.png" alt="Pouring wine" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-3 px-4">
              <h4 className="text-xl font-medium">Luxury Hosting Experience</h4>
              <p className="text-gray-600 leading-relaxed">
                From private villas and yachts to intimate celebrations, Tableli creates seamless hospitality moments designed to impress guests and elevate every gathering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section className="w-full bg-[#0A0A0A] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <h2 className="text-3xl md:text-5xl font-serif font-medium max-w-xl leading-tight">
              Why Hosts Choose Tableli
            </h2>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-2 md:mb-4">
              Tableli simplifies luxury private dining by connecting clients with trusted chefs and seamless event experiences tailored for intimate gatherings, celebrations, and upscale hospitality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <Lock className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-lg">Verified Culinary Talent</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Work with experienced private chefs carefully selected for professionalism, presentation, and exceptional culinary standards.
                </p>
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <SlidersHorizontal className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-lg">Effortless Booking</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A seamless platform designed to make discovering, booking, and coordinating private chef experiences simple and stress-free.
                </p>
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <ChefHat className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-lg">Tailored Experiences</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  From romantic dinners to yacht events and birthdays, every experience is customized to fit the client’s vision and preferences.
                </p>
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <Home className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-lg">Luxury-Level Hospitality</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Tableli delivers elevated service, refined presentation, and unforgettable moments designed for premium private events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden py-24 md:py-32 px-6 text-center flex flex-col items-center justify-center">
          {/* Using hw_hero.png for the bokeh effect */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0 scale-105"
            style={{ backgroundImage: 'url("/hw_hero.png")' }}
          />
          <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]" />

          <div className="relative z-20 flex flex-col items-center gap-8 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight">
              Join Our Platform
            </h2>
            <p className="text-gray-300 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <Link to="/browse-chefs" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm h-auto bg-[#FDE047] text-black hover:bg-[#FDE047]/90 font-medium border-none shadow-none">
                  Browse Our Chefs
                </Button>
              </Link>
            
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
