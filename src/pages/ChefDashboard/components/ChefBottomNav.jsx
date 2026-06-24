import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Wallet,
  UserCircle,
  MessageSquare,
  Landmark,
  MoreHorizontal,
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const mainMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/chef-dashboard' },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays, path: '/chef-dashboard/bookings' },
  { id: 'menus', label: 'Menus', icon: UtensilsCrossed, path: '/chef-dashboard/menus' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/chef-dashboard/messages' },
];

const moreMenuItems = [
  { id: 'earnings', label: 'Earnings', icon: Wallet, path: '/chef-dashboard/earnings' },
  { id: 'profile', label: 'Profile', icon: UserCircle, path: '/chef-dashboard/profile' },
  { id: 'onbording', label: 'Onboarding', icon: Landmark, path: '/chef-dashboard/bank-onboarding' },
];

export const ChefBottomNav = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const isMoreActive = moreMenuItems.some((item) => location.pathname === item.path);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around px-2 py-2 safe-pb">
          {mainMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-all min-w-[56px]',
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

          {/* More button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-all min-w-[56px]',
              isMoreActive
                ? 'text-primary-900'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
              isMoreActive ? 'bg-primary-900' : 'bg-transparent'
            )}>
              <MoreHorizontal
                size={18}
                className={cn(isMoreActive ? 'text-accent' : 'text-gray-400')}
              />
            </div>
            <span className={cn(
              'text-[9px] font-black uppercase tracking-wider leading-none',
              isMoreActive ? 'text-primary-900' : 'text-gray-400'
            )}>
              More
            </span>
          </button>
        </div>
      </nav>

      {/* Bottom Sheet Menu */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMoreOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-gray-100 flex flex-col gap-2 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Grab handle indicator */}
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 shrink-0" />

            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-xl font-bold font-serif text-primary-900 italic">More Options</h3>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {moreMenuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-5 py-4 rounded-2xl transition-all group",
                      isActive
                        ? "bg-primary-900 text-white shadow-lg"
                        : "text-gray-500 bg-gray-50/50 hover:bg-gray-50 hover:text-primary-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={cn(
                          isActive
                            ? "text-accent"
                            : "text-gray-500 group-hover:text-accent transition-colors"
                        )}
                      />
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? "text-accent" : "text-gray-400"} />
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-5 py-4 text-red-500 bg-red-50/50 hover:bg-red-50 transition-all rounded-2xl text-left"
              >
                <LogOut size={20} />
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
