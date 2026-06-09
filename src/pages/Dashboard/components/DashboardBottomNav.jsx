import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Heart, 
  MessageSquare, 
  User, 
  LogOut,
  CreditCard,
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/dashboard/bookings' },
  { id: 'saved', label: 'Saved', icon: Heart, path: '/dashboard/saved' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
  { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
];

export const DashboardBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-1 py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[48px]',
                isActive ? 'text-primary-900' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <div className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                isActive ? 'bg-primary-900' : 'bg-transparent'
              )}>
                <Icon size={18} className={cn(isActive ? 'text-accent' : 'text-gray-400')} />
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
