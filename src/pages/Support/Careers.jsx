import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const jobs = [
  {
    title: "Senior Experience Manager",
    department: "Operations",
    location: "Miami, FL / Remote",
    type: "Full-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    title: "Culinary Talent Scout",
    department: "Chef Relations",
    location: "New York, NY",
    type: "Full-time",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "Product Designer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    title: "Customer Concierge",
    department: "Support",
    location: "Remote",
    type: "Part-time",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

export default function Careers() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl font-serif text-primary-900 mb-6 italic">Join the Tableli Team</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary-900">Elite Culture</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary-900">Work-Life Balance</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary-900">Remote-First</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-primary-900 mb-8 italic">Open Positions</h2>
          {jobs.map((job, idx) => (
            <div key={idx} className="group p-6 md:p-8 rounded-3xl border border-gray-100 bg-[#FAFAFA] hover:bg-white hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                      {job.department}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{job.type}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-primary-900">{job.title}</h4>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                  </div>
                </div>
                <button className="bg-primary-900 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3 group/btn w-fit">
                  Apply Now
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center p-12 rounded-[40px] bg-primary-900 text-white">
          <h3 className="text-2xl md:text-3xl font-serif italic mb-4">Don't see the right fit?</h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="mailto:careers@tableli.com" className="text-accent font-bold hover:underline">
            Send us your resume anyway →
          </a>
        </div>
      </div>
    </div>
  );
}
