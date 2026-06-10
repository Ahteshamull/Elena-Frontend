import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export default function HeroSection() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setLoggedInUser(JSON.parse(userStr));
      } catch (e) {
        // ignore error
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/h_1.png" 
          alt="Private Chef working" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full mt-16 md:mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive mb-4 md:mb-6 leading-tight">
            Exquisite Private Dining,<br />Tailored to You
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 md:mb-12 max-w-lg mx-auto">
            Experience the ultimate culinary journey with our curated private chefs.
          </p>
        </motion.div>

        {/* Search Bar Container */}
        {loggedInUser?.role !== 'chef' && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch gap-3 md:gap-4 max-w-5xl mx-auto"
          >
            
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-gray-400 shrink-0" size={18} />
              <div className="flex flex-col w-full">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</span>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where to?" className="w-full bg-transparent border-none outline-none text-primary-900 placeholder:text-gray-400 focus:ring-0 p-0 text-sm" />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Calendar className="text-gray-400 shrink-0" size={18} />
              <div className="flex flex-col w-full">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent border-none outline-none text-primary-900 placeholder:text-gray-400 focus:ring-0 p-0 text-sm cursor-pointer" />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Users className="text-gray-400 shrink-0" size={18} />
              <div className="flex flex-col w-full">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Guests</span>
                <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" placeholder="Add guests" className="w-full bg-transparent border-none outline-none text-primary-900 placeholder:text-gray-400 focus:ring-0 p-0 text-sm" />
              </div>
            </div>

            {/* <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="text-gray-400 shrink-0" size={18} />
              <div className="flex flex-col w-full">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Type</span>
                <select defaultValue="" className="w-full bg-transparent border-none outline-none text-primary-900 placeholder:text-gray-400 focus:ring-0 p-0 text-sm cursor-pointer appearance-none">
                  <option value="" disabled>Select event</option>
                  <option value="private-dinner">Private Dinner</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="party">Party / Celebration</option>
                  <option value="cooking-class">Cooking Class</option>
                </select>
              </div>
            </div> */}

            <Link 
              to={(!location && !date && !guests) ? "#" : "/browse-chefs"} 
              className={`block w-full md:w-auto ${(!location && !date && !guests) ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
            >
              <Button variant="primary" className="w-full h-12 md:h-14 px-6 md:px-8 rounded-xl shrink-0 gap-2 font-semibold">
                <Search size={18} />
                Find a Chef
              </Button>
            </Link>
            
          </motion.div>
        )}
      </div>
    </section>
  );
}
