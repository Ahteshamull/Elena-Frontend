import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const footerLinks = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Sharia Compliance Certificate', path: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center pt-20 pb-12 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-12">Secure Access Portal</h1>

      <div className="w-full max-w-[580px] bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <Link
            to="/login"
            className={cn(
              "flex-1 py-6 text-center text-sm font-bold uppercase tracking-widest transition-all",
              isLogin ? "bg-[#FFFBF2] text-primary-900 border-b-4 border-accent" : "text-gray-400 hover:text-primary-900"
            )}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={cn(
              "flex-1 py-6 text-center text-sm font-bold uppercase tracking-widest transition-all",
              !isLogin ? "bg-[#FFFBF2] text-primary-900 border-b-4 border-accent" : "text-gray-400 hover:text-primary-900"
            )}
          >
            Register
          </Link>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {children}
        </div>

        {/* Inner Footer - Secure Encryption */}
        <div className="bg-[#F4FAF6] p-8 border-t border-gray-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[#2E7D32] mb-3">
            <Shield size={16} fill="currentColor" className="text-[#2E7D32] opacity-20" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Encryption</span>
          </div>
          <p className="text-xs text-gray-500 max-w-[400px] leading-relaxed italic">
            Your data is secured with end-to-end encryption. <br />
            Built on the principles of Amanah (Trust) and Sharia-compliant data privacy.
          </p>
        </div>
      </div>

      {/* External Links */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-10">
        {footerLinks.map((link) => (
          <Link key={link.name} to={link.path} className="text-sm font-bold text-primary-900 hover:opacity-70 transition-opacity">
            {link.name}
          </Link>
        ))}
      </div>

      {/* Global Footer */}
      <footer className="mt-auto w-full max-w-7xl pt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 gap-6">
        <p className="text-sm text-gray-500 font-medium">
          © 2024 HalalHire. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-primary-900">
          <Globe size={20} className="cursor-pointer hover:opacity-70" />
          <HelpCircle size={20} className="cursor-pointer hover:opacity-70" />
        </div>
      </footer>
    </div>
  );
};

export { AuthLayout };
