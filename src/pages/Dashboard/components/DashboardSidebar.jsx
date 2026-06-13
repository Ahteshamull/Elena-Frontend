import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Heart, 
  MessageSquare, 
  User, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'bookings', label: 'My Bookings', icon: Calendar, path: '/dashboard/bookings' },
  { id: 'saved', label: 'Saved Chefs', icon: Heart, path: '/dashboard/saved' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
  { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 hidden md:flex flex-col bg-white border-r border-gray-100 h-[calc(100vh-80px)] sticky top-20 self-start">
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary-900 text-white shadow-lg" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-primary-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn(isActive ? "text-accent" : "group-hover:text-accent")} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-accent" />}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-50">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl group">
          <LogOut size={20} className="group-hover:text-red-500" />
          <span className="text-sm font-bold">Log Out</span>
        </button>
      </div>
    </aside>
  );
};
