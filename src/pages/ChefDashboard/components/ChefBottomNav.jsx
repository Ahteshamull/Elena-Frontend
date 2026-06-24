import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Wallet,
  UserCircle,
  MessageSquare,
  Landmark,
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const chefMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/chef-dashboard' },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays, path: '/chef-dashboard/bookings' },
  { id: 'menus', label: 'Menus', icon: UtensilsCrossed, path: '/chef-dashboard/menus' },
  { id: 'earnings', label: 'Earnings', icon: Wallet, path: '/chef-dashboard/earnings' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/chef-dashboard/messages' },
  { id: 'profile', label: 'Profile', icon: UserCircle, path: '/chef-dashboard/profile' },
  { id: 'onbording', label: 'Onboarding', icon: Landmark, path: '/chef-dashboard/bank-onboarding' },
];

export const ChefBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] overflow-x-auto no-scrollbar">
      <div className="flex items-center px-2 py-2 gap-2 min-w-max safe-pb">
        {chefMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[52px]',
                isActive
                  ? 'text-primary-900'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <div className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                isActive ? 'bg-primary-900' : 'bg-transparent'
              )}>
                <Icon
                  size={18}
                  className={cn(isActive ? 'text-accent' : 'text-gray-400')}
                />
              </div>
              <span className={cn(
                'text-[9px] font-black uppercase tracking-wider leading-none',
                isActive ? 'text-primary-900' : 'text-gray-400'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
