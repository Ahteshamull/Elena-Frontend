import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Wallet,
  UserCircle,
  MessageSquare,
  LogOut,
  ChevronRight,
  Landmark
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const chefMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/chef-dashboard' },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays, path: '/chef-dashboard/bookings' },
  { id: 'menus', label: 'My Menus', icon: UtensilsCrossed, path: '/chef-dashboard/menus' },
  { id: 'earnings', label: 'Earnings', icon: Wallet, path: '/chef-dashboard/earnings' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/chef-dashboard/messages' },
  { id: 'profile', label: 'Chef Profile', icon: UserCircle, path: '/chef-dashboard/profile' },
  { id: 'onbording', label: 'Bank Onboarding', icon: Landmark, path: '/chef-dashboard/bank-onboarding' },
];

export const ChefSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <aside className="w-64 hidden md:flex flex-col bg-white border-r border-gray-100 min-h-[calc(100vh-80px)] sticky top-20">

      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        <div className="px-4 mb-6">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Chef Console</span>
        </div>
        {chefMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group",
                isActive
                  ? "bg-primary-900 text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-50 hover:text-primary-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn(isActive ? "text-accent" : "group-hover:text-accent transition-colors")} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-accent" />}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl group"
        >
          <LogOut size={20} className="group-hover:text-red-500" />
          <span className="text-sm font-bold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
