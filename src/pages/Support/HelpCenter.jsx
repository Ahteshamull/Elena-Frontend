import React from "react";
import {
  Search,
  BookOpen,
  CreditCard,
  ShieldCheck,
  User,
  MessageSquare,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { label: "How it works", path: "/how-it-works" },
      "Creating an account",
      "Finding a chef",
      "First time booking",
    ],
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Payments & Pricing",
    icon: CreditCard,
    items: [
      "Service fees",
      "Payment methods",
      "Refund policy",
      "Invoices & Receipts",
    ],
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Account & Safety",
    icon: ShieldCheck,
    items: [
      "Privacy settings",
      "Verifying your identity",
      "Reporting an issue",
      "Account security",
    ],
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "For Chefs",
    icon: Utensils,
    items: [
      "Chef onboarding",
      "Managing menus",
      "Earnings & Payouts",
      "Chef guidelines",
    ],
    color: "bg-orange-50 text-orange-600",
  },
];

export default function HelpCenter() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      {/* Hero Search Section */}
      <div className="bg-primary-900 py-16 md:py-24 px-4 sm:px-6 mb-16 rounded-b-[40px] md:rounded-b-[80px]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-8 italic">
            How can we help?
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-6 p-8 rounded-3xl border border-gray-100 hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center`}
              >
                <cat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-900">
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path || "#"}
                      className="text-sm text-gray-500 hover:text-accent transition-colors block"
                    >
                      {item.label || item}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* <Link to="#" className="mt-auto text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2 group">
                View All <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link> */}
            </div>
          ))}
        </div>

        {/* Support Options */}
        <div className="mt-24">
          <div className="p-10 rounded-[40px] bg-gray-50 flex items-start gap-8 border border-gray-100 group hover:bg-white hover:border-accent transition-all">
            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-primary-900 group-hover:bg-accent group-hover:text-white transition-all shrink-0">
              <MessageSquare size={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-primary-900">
                Live Concierge
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Chat with our dedicated support team in real-time for immediate
                assistance.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-block text-left text-xs font-black uppercase tracking-widest text-primary-900 hover:text-accent"
              >
                Start Contact →
              </Link>
            </div>
          </div>

          {/* <div className="p-10 rounded-[40px] bg-gray-50 flex items-start gap-8 border border-gray-100 group hover:bg-white hover:border-accent transition-all">
            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-primary-900 group-hover:bg-accent group-hover:text-white transition-all shrink-0">
              <User size={32} />
            </div>
            {/* <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-primary-900">Call Support</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Speak directly with one of our experience managers for complex requests.</p>
              <button className="mt-4 text-xs font-black uppercase tracking-widest text-primary-900 hover:text-accent">Call Now →</button>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
