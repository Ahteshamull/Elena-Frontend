import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function ChefProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('BIOGRAPHY');

  const scrollToSection = (id) => {
    const sectionMap = {
      'BIOGRAPHY': 'biography',
      'SIGNATURE MENUS': 'menus',
      'GALLERY': 'gallery',
      'REVIEWS': 'reviews'
    };
    
    const element = document.getElementById(sectionMap[id]);
    if (element) {
      const offset = 120; // Accounting for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center pb-24 font-sans antialiased">

      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-32 pb-12 lg:pt-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

          {/* Hero Image (Left) */}
          <div className="w-full lg:w-7/12 shrink-0">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
              style={{ aspectRatio: '3/2', minHeight: '400px' }}
            >
              <img
                src="/cp_1.png"
                alt="Chef Julian Vance"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Hero Content (Right) */}
          <div className="w-full lg:w-5/12 flex flex-col items-start lg:pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-5">
              VERIFIED MASTER CHEF
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-4 leading-tight">
              Julian Vance
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif italic text-gray-500 mb-8 font-light">
              Executive Chef & Culinary Architect
            </h2>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-600 mb-8 border-b border-gray-100 pb-10 w-full">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] text-xl">★</span>
                <span className="text-gray-900">4.9 <span className="font-normal text-gray-400 ml-1">(120 Reviews)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-lg">📍</span>
                <span className="text-gray-900">London / Global</span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-lg mb-12 text-lg font-light">
              Crafting bespoke gastronomic experiences for the world's most discerning palates for over 18 years.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10">
              <Link to="/book/1">
                <Button variant="primary" className="bg-black text-white px-10 py-5 rounded-lg text-xs font-bold tracking-widest uppercase shadow-xl hover:bg-gray-800 transition-all">
                  BOOK CHEF JULIAN
                </Button>
              </Link>
              <Link to="/contact" className="group text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-3 transition-all">
                <span className="border-b border-transparent group-hover:border-gray-900 pb-1">INQUIRE FOR BESPOKE EVENT</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Booking Sidebar */}
      <section className="w-full max-w-7xl mx-auto px-6 mt-12 md:mt-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Main Content (8 cols) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col">

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur-md pt-4 pb-6 border-b border-gray-100 mb-16 flex gap-12 overflow-x-auto no-scrollbar">
              {['BIOGRAPHY', 'SIGNATURE MENUS', 'GALLERY', 'REVIEWS'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap pb-3 border-b-2 transition-all duration-300 ${activeTab === tab
                      ? 'border-[#D4AF37] text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Biography Section */}
            <div id="biography" className="mb-24">
              <h3 className="text-4xl font-serif text-gray-900 mb-10 leading-tight">The Culinary Journey</h3>
              <div className="flex flex-col gap-8 text-gray-500 leading-relaxed text-base font-light max-w-3xl">
                <p>
                  Born into a family of vintners in the heart of Bordeaux, Julian Vance's relationship with flavor began at the very source. His philosophy, "The Poetry of the Product," dictates that every dish must tell the story of its origin, elevated by rigorous French technique and modern innovation.
                </p>
                <p>
                  After refining his craft at the three-Michelin-starred Le Meurice in Paris, Julian spent five years as Executive Chef for a private estate in the Cotswolds, where he pioneered a true 'farm-to-fork' ecosystem. His culinary style is a harmonious balance of classical foundations and bold, contemporary textures.
                </p>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-4 mt-12">
                {[
                  { label: 'Verified Professional', icon: '✓' },
                  { label: 'Michelin Trained', icon: '✮' },
                  { label: 'Sustainability Award', icon: '🍃' }
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3 bg-gray-100 px-6 py-4 rounded-2xl border border-white transition-all hover:bg-white hover:shadow-md">
                    <span className="text-[#D4AF37] text-lg">{badge.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-700">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Menus Section */}
            <div id="menus" className="mb-24 border-t border-gray-100" style={{ paddingTop: '100px' }}>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 gap-4">
                <h3 className="text-4xl font-serif text-gray-900 leading-tight">Signature Menus</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Mediterranean Odyssey',
                    courses: '7 COURSES',
                    price: '£255 / pp',
                    desc: 'An evocative journey through the coastal flavors of the Amalfi Coast and Santorini, featuring hand-dived scallops and wild foraged herbs.'
                  },
                  {
                    title: 'Art of Omakase',
                    courses: '12 COURSES',
                    price: '£320 / pp',
                    desc: 'A precise, minimalist exploration of Japanese technique blended with British seasonal ingredients. A theater of purity and precision.'
                  }
                ].map((menu) => (
                  <div key={menu.title} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-50 flex flex-col h-full transition-all hover:shadow-xl group">
                    <h4 className="text-2xl font-serif text-gray-900 mb-8 leading-tight group-hover:text-[#D4AF37] transition-colors">{menu.title}</h4>
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-50">
                      <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{menu.courses}</span>
                      <span className="text-lg font-bold text-gray-900 font-serif">{menu.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow font-light">
                      {menu.desc}
                    </p>
                    <Button variant="outline" className="w-full rounded-full border-gray-200 text-xs font-bold tracking-widest uppercase py-5 hover:bg-black hover:text-white transition-all">
                      VIEW MENU
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary Gallery Section */}
            <div id="gallery" className="mb-24 border-t border-gray-100" style={{ paddingTop: '100px' }}>
              <h3 className="text-4xl font-serif text-gray-900 mb-12 leading-tight">
                Culinary Gallery
              </h3>

              {/* Gallery Grid: 3 cols, 2 rows */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: '16px',
                  height: '700px',
                }}
              >
                {/* Top Left: Image 1 — spans col 1-2 */}
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ gridColumn: '1 / 3', gridRow: '1' }}>
                  <img src="/cp_2.png" alt="Gallery 1" className="w-full h-full object-cover" />
                </div>

                {/* Top Right: Image 2 — col 3 */}
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ gridColumn: '3', gridRow: '1' }}>
                  <img src="/cp_3.png" alt="Gallery 2" className="w-full h-full object-cover" />
                </div>

                {/* Bottom Left: Image 3 — col 1 */}
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ gridColumn: '1', gridRow: '2' }}>
                  <img src="/cp_4.png" alt="Gallery 3" className="w-full h-full object-cover" />
                </div>

                {/* Bottom Right: Image 4 — spans col 2-3 */}
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ gridColumn: '2 / 4', gridRow: '2' }}>
                  <img src="/cp_5.png" alt="Gallery 4" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Guest Reflections Section */}
            <div id="reviews" className="mb-24 border-t border-gray-100" style={{ paddingTop: '100px' }}>
              <h3 className="text-4xl font-serif text-gray-900 mb-12 leading-tight">Guest Reflections</h3>

              <div className="flex flex-col gap-8">
                {[
                  {
                    name: 'Lady Alexandra Thomas',
                    event: 'PRIVATE ANNIVERSARY DINNER, MAY 2024',
                    text: '"Chef Julian transformed our home into a sanctuary of flavor. His presence is as refined as his menu—unobtrusive yet commanding. The lobster tail in saffron butter was a revelation."'
                  },
                  {
                    name: 'Markus Vanderbilt',
                    event: 'CORPORATE RETREAT, JULY 2024',
                    text: '"Exceptional technical skill. Julian managed a 12-course Omakase for twenty guests with flawless execution and poise. A truly world-class culinary experience."'
                  }
                ].map((review) => (
                  <div key={review.name} className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8">
                      <div>
                        <h5 className="font-bold text-gray-900 text-lg mb-2">{review.name}</h5>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.event}</span>
                      </div>
                      <div className="flex gap-1 text-[#FDE047] text-xl">
                        ★★★★★
                      </div>
                    </div>
                    <p className="text-gray-500 text-lg leading-relaxed font-light italic">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Sidebar (4 cols) */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 pb-12">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-50 w-full relative">

              {/* Card Header */}
              <div className="mb-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">PRICING</span>
                <div className="text-3xl font-serif text-gray-900">
                  £1,200 <span className="text-sm font-sans font-normal text-gray-400 ml-1 italic tracking-normal">starting from</span>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex flex-col gap-8 mb-10">
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">EVENT DATE</label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Select your date"
                      className="w-full bg-gray-50 border-b-2 border-gray-100 px-5 py-4 text-sm text-gray-900 focus:outline-none focus:border-[#D4AF37] transition-all rounded-t-xl"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg transition-colors">📅</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">GUESTS</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 border-b-2 border-gray-100 px-5 py-4 text-sm text-gray-900 focus:outline-none focus:border-[#D4AF37] appearance-none transition-all rounded-t-xl cursor-pointer">
                      <option>2 - 4 Guests</option>
                      <option>5 - 8 Guests</option>
                      <option>9 - 12 Guests</option>
                      <option>12+ Guests</option>
                    </select>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none transition-colors">▼</span>
                  </div>
                </div>
              </div>

              <Link to="/book/1">
                <Button variant="primary" className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-6 text-xs font-bold tracking-widest uppercase shadow-2xl transition-all duration-300 transform active:scale-95 mb-8">
                  BOOK CHEF JULIAN
                </Button>
              </Link>

              <p className="text-[11px] text-gray-400 text-center leading-relaxed font-light px-2 italic">
                Pricing includes menu consultation, grocery shopping, preparation, service, and kitchen master clean.
              </p>
            </div>

            {/* Why Book Julian? Checklist */}
            <div className="mt-12 px-6">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Why Book Julian?</h4>
              <ul className="flex flex-col gap-6">
                {[
                  'Full customization and dietary requirements included.',
                  'Setup, service, and clean up for a truly relaxing evening.',
                  'Includes premium tableware and crystal glassware.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 group">
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[#D4AF37] text-[10px] shrink-0 mt-0.5 transition-colors duration-300">✓</span>
                    <span className="text-xs text-gray-500 leading-relaxed font-light transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
