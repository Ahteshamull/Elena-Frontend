import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0A0A] text-white pt-12 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-3xl font-semibold tracking-wider text-accent mb-6 block">TABLELI</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Exquisite Private Dining, Tailored to You. We connect you with world-class chefs for unforgettable culinary experiences.
            </p>
            <div className="flex items-center gap-4 mt-6 text-gray-400">
              <a href="#" className="hover:text-accent transition-colors font-semibold">IG</a>
              <a href="#" className="hover:text-accent transition-colors font-semibold">TW</a>
              <a href="#" className="hover:text-accent transition-colors font-semibold">FB</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/browse-chefs" className="hover:text-accent transition-colors">Our Chefs</Link></li>
              {/* <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li> */}
              <li><Link to="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center pt-2">
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-accent/40 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-accent hover:bg-accent hover:text-black hover:border-accent transition-all duration-500 shadow-[0_0_0_0_rgba(229,195,122,0)] hover:shadow-[0_8px_25px_-5px_rgba(229,195,122,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Contact Us
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span>Miami, FL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 border-t border-white/10 pt-8">
          <p>&copy; {new Date().getFullYear()} Tableli. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}