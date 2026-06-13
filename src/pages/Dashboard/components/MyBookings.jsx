import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  ChefHat, 
  MoreVertical,
  ChevronRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';
import { useGetClientBookingsQuery } from '../../../redux/api/bookingApi';

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const { data: bookingsRes, isLoading } = useGetClientBookingsQuery();
  const allBookings = bookingsRes?.data || [];

  // Categorize bookings
  const bookings = {
    upcoming: allBookings.filter(b => ['pending', 'confirmed'].includes(b.bookingDetails?.status)),
    past: allBookings.filter(b => ['completed', 'cancelled'].includes(b.bookingDetails?.status))
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getImageUrl = (url) => {
    if (!url || url === 'undefined' || url === 'null') return "https://images.unsplash.com/photo-1583394293214-28dea15ee548?auto=format&fit=crop&q=80&w=200";
    if (url.startsWith('http')) return url;
    return url.startsWith('/') ? `http://localhost:8005${url}` : `http://localhost:8005/${url}`;
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">My Bookings</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Manage your upcoming and past culinary experiences.</p>
        </div>

        <div className="flex items-center p-1 bg-gray-100 rounded-2xl w-fit">
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 md:px-8 py-2 md:py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-widest",
                activeTab === tab 
                  ? "bg-white text-primary-900 shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by chef or location..." 
            className="w-full pl-12 pr-4 h-14 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
          />
        </div>
        <Button variant="outline" className="h-14 px-6 border-gray-100 bg-white rounded-2xl gap-3">
          <Filter size={18} />
          <span className="text-sm font-bold">Filters</span>
        </Button>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-900" />
          </div>
        ) : bookings[activeTab].length > 0 ? (
          bookings[activeTab].map((booking) => (
            <Card key={booking.bookingDetails._id} className="p-0 border-transparent shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-44 sm:h-auto overflow-hidden shrink-0">
                  <img src={getImageUrl(booking.chefInfo?.image || booking.chefInfo?.profile?.image)} alt={booking.chefInfo?.userName || 'Chef'} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex-1 flex flex-col gap-3 md:gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                          {booking.bookingDetails._id.substring(0, 8).toUpperCase()}
                        </span>
                        <h3 className="text-xl font-bold text-primary-900">{booking.chefInfo?.userName || booking.chefInfo?.fullName || 'A Chef'}</h3>
                      </div>
                      <Badge 
                        variant={booking.bookingDetails.status === 'confirmed' ? 'success' : booking.bookingDetails.status === 'pending' ? 'default' : 'secondary'}
                        className={cn(
                          "px-4 py-1.5 rounded-full font-black text-[9px] tracking-widest uppercase",
                          booking.bookingDetails.status === 'confirmed' ? "bg-green-50 text-green-700" : 
                          booking.bookingDetails.status === 'pending' ? "bg-amber-50 text-amber-700" :
                          booking.bookingDetails.status === 'cancelled' ? "bg-red-50 text-red-700" :
                          "bg-gray-100 text-gray-500"
                        )}
                      >
                        {booking.bookingDetails.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                        </div>
                        <span className="text-xs font-bold text-primary-900">{formatDate(booking.bookingDetails.eventDate)}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                        </div>
                        <span className="text-xs font-bold text-primary-900">{booking.bookingDetails.arrivalTime}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Location</span>
                        </div>
                        <span className="text-xs font-bold text-primary-900 truncate max-w-[150px]">{booking.bookingDetails.eventLocation || 'TBD'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <ChefHat size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Total</span>
                        </div>
                        <span className="text-xs font-bold text-primary-900">${booking.bookingDetails.totalAmount?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-3">
                    <Button 
                      className="flex-1 md:w-40 py-3 rounded-xl bg-primary-900 text-white text-[10px] font-black tracking-widest uppercase shadow-lg"
                      onClick={() => navigate(`/dashboard/bookings/${booking.bookingDetails._id}/manage`)}
                    >
                      {activeTab === 'upcoming' ? 'Manage' : 'Re-book'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 md:w-40 py-3 rounded-xl border-gray-100 text-[10px] font-black tracking-widest uppercase"
                      onClick={() => navigate(`/dashboard/bookings/${booking.bookingDetails._id}`)}
                    >
                      {activeTab === 'upcoming' ? 'Details' : 'Invoice'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center gap-6 bg-white rounded-[40px] border border-dashed border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <Calendar size={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-primary-900">No {activeTab} bookings</h3>
              <p className="text-sm text-gray-500 max-w-xs font-medium">You haven't scheduled any experiences yet. Start by browsing our elite chefs.</p>
            </div>
            <Button 
              className="bg-primary-900 text-white rounded-full px-10 py-4 text-[10px] font-black tracking-widest uppercase shadow-xl"
              onClick={() => navigate('/browse-chefs')}
            >
              Browse Chefs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
