import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const latestPosts = [
    {
      id: 1,
      image: '/blg_2.png',
      category: 'CULINARY TRENDS',
      title: 'Telling the Seasons: A Roaming Degustation Experience',
      description: 'How private chefs are redefining the boundaries of the dining room by moving meals out into nature.',
      author: 'Thomas L.',
      date: 'OCT 12, 2023',
    },
    {
      id: 2,
      image: '/blg_3.png',
      category: 'DRINK CULTURE',
      title: 'The Alchemy of Aging: Rare Vintages at the Exclusive Table',
      description: 'An exploration of how world-class mixologists pair rare spirits with personalized menus.',
      author: 'Thomas L.',
      date: 'OCT 10, 2023',
    },
    {
      id: 3,
      image: '/blg_4.png',
      category: 'CHEF SPOTLIGHT',
      title: '"Leave No Trace": The Art of Zero-Waste Private Dining',
      description: 'Meet the chefs pioneering radical sustainability without sacrificing a single ounce of luxury.',
      author: 'Thomas L.',
      date: 'OCT 08, 2023',
    },
    {
      id: 4,
      image: '/blg_5.png',
      category: 'EVENT DESIGN',
      title: 'Oasis of Taste: Designing the Impossible Destination',
      description: 'From deserts to glaciers, organizing pop-up private dining experiences in the most remote corners of the earth.',
      author: 'Thomas L.',
      date: 'OCT 05, 2023',
    }
  ];

  const topArticles = [
    { id: 1, title: 'Sustainable Caviar: The New Gold Standard', readTime: '5 MIN READ' },
    { id: 2, 'title': 'Historic Venues, Modern Chefs: A Contrast of Eras', readTime: '8 MIN READ' },
    { id: 3, 'title': 'The Chef\'s Guide to Multi-sensory Dining', readTime: '12 MIN READ' }
  ];

  const popularTags = [
    'Mixology', 'Private Chef', 'Michelin Guide', 'Entertaining', 'Hospitality'
  ];

  const instagramImages = [
    '/blg_6.png', '/blg_7.png', '/blg_8.png',
    '/blg_9.png', '/blg_10.png', '/blg_11.png'
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#FAFAFA]">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex items-center text-white pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url("/blg_hero.png")' }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col gap-4">
          <p className="text-sm tracking-[0.2em] uppercase font-medium text-[#D4AF37]">
            CULTURE, INSIGHTS & CULINARY ART
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-medium leading-[1.1] max-w-4xl">
            Private Dining Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl leading-relaxed font-light">
            Where taste meets time. Exploring the intersection of global culinary practices, bespoke experiences, and the visionaries who define modern luxury hospitality.
          </p>
          
          <div className="mt-12 flex flex-col items-start gap-4">
             <span className="text-xs tracking-widest uppercase font-medium opacity-80">
               Scroll to explore
             </span>
             <div className="w-[1px] h-16 bg-white/50"></div>
          </div>
        </div>
      </section>

      {/* 2. Featured Article */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="relative w-full lg:w-5/12 rounded-3xl overflow-hidden shadow-sm group shrink-0">
            <img 
              src="/blg_1.png" 
              alt="Plated scallops with herbs" 
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Tableli watermark/logo overlay shown in design */}
            <div className="absolute bottom-6 left-6 pointer-events-none">
              <span className="text-white font-serif text-3xl opacity-90 tracking-wide">tableli</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-6 lg:w-7/12 lg:pl-10">
            <span className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 border-b border-gray-300 pb-1">
              CHEF PROFILE
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif font-medium leading-[1.1] text-gray-900">
              The Architect of<br/>Flavour: Inside<br/>Chef Julian<br/>Vasseur's Alpine<br/>Retreat
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg max-w-md mt-2">
              A masterclass in restraint. Explore how the celebrated chef strips away the unnecessary to create profound, terroir-driven plates in the heart of the Swiss Alps.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest font-medium mt-4">
               <span>BY JULIAN VASSEUR</span>
               <span className="w-1 h-1 rounded-full bg-gray-300"></span>
               <span>7 MIN READ</span>
            </div>
            <Link to="#" className="mt-6 flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-gray-900 hover:text-gray-600 transition-colors">
              READ ARTICLE <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Latest Dispatches & Sidebar */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-20">
          
          {/* Heading Row (Spans 8 cols) */}
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1 border-b border-gray-200 pb-6">
            <h3 className="text-3xl font-serif font-medium">
              Latest Dispatches
            </h3>
          </div>

          {/* Left Column: Latest Dispatches (Spans 8 cols) */}
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-2 flex flex-col">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
              {latestPosts.map((post) => (
                <div key={post.id} className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-3">
                    {post.category}
                  </span>
                  <h4 className="text-2xl font-serif font-medium text-gray-900 mb-3 leading-tight group-hover:text-primary-900 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm mb-5 flex-grow">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                     <span className="text-xs text-gray-500 font-medium">By {post.author}</span>
                     <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Sidebar (Spans 4 cols) */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2 flex flex-col gap-16 mt-12 lg:mt-0">
            
            {/* Newsletter Box */}
            <div className="bg-[#0A0A0A] text-white rounded-[2rem] p-10 lg:p-12 flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="flex flex-col gap-4 relative z-10">
                <h4 className="text-3xl font-serif font-medium">The Epicure Circle</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  A curated selection of our best stories, chef interviews, and exclusive dining invitations delivered directly to your inbox.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10 mt-8">
                <p className="text-xs font-medium uppercase tracking-widest text-[#D4AF37] mb-1">
                  Join our exclusive community today.
                </p>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <Button variant="secondary" className="w-full rounded-full bg-[#FDE047] text-black hover:bg-[#FDE047]/90 py-4 font-medium border-none text-sm tracking-wide">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Top Articles */}
            <div className="flex flex-col">
              <h4 className="text-sm tracking-[0.2em] uppercase font-semibold text-gray-400 mb-6 border-b border-gray-200 pb-4">
                TOP ARTICLES
              </h4>
              <div className="flex flex-col gap-6">
                {topArticles.map((article) => (
                  <div key={article.id} className="flex gap-4 group cursor-pointer">
                    <span className="text-2xl font-serif text-gray-300 font-light italic">
                      0{article.id}
                    </span>
                    <div className="flex flex-col gap-1 pt-1">
                      <h5 className="font-medium text-gray-900 group-hover:text-primary-900 transition-colors leading-snug">
                        {article.title}
                      </h5>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-col">
              <h4 className="text-sm tracking-[0.2em] uppercase font-semibold text-gray-400 mb-6 border-b border-gray-200 pb-4">
                POPULAR TAGS
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Link 
                    key={index} 
                    to="#" 
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
        
        {/* Load More Button - Centered relative to the entire section */}
        <div className="w-full flex justify-center mt-8 md:mt-12 pt-8 border-t border-gray-200">
           <Button variant="outline" className="rounded-full px-12 py-4 text-sm border-gray-900 text-gray-900 hover:bg-gray-100 font-medium tracking-widest uppercase shadow-sm">
             LOAD MORE JOURNAL
           </Button>
        </div>
      </section>

      {/* 4. Instagram Feed Section */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-2">
            FOLLOW THE JOURNEY
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-12">
            @tablelichef @tablelifood
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full max-w-5xl">
            {instagramImages.map((src, index) => (
              <div key={index} className="w-full aspect-square relative group overflow-hidden bg-gray-100">
                <img 
                  src={src} 
                  alt={`Instagram feed image ${index + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20 md:pb-32 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight max-w-2xl">
          Discover Luxury Dining<br/>Experiences
        </h2>
        <p className="text-gray-500 mb-10 max-w-xl leading-relaxed">
          The perfect occasion requires the perfect chef. Browse our curated selection of top culinary talent.
        </p>
        <Link to="/browse-chefs">
          <Button variant="primary" className="rounded-full px-10 py-4 text-sm bg-[#0A0A0A] hover:bg-gray-800 text-white font-medium shadow-xl shadow-black/10">
            Browse Our Chefs
          </Button>
        </Link>
      </section>

    </div>
  );
}
