import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  CheckCircle2,
  XCircle,
  ChevronRight,
  Inbox
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';

const ChefBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const [bookings, setBookings] = useState([
    {
      id: 1,
      client: "Sarah Johnson",
      event: "Anniversary Dinner",
      date: "May 24, 2026",
      time: "7:00 PM",
      guests: 6,
      location: "Malibu, CA",
      status: "Confirmed",
      type: "upcoming",
      amount: "$850",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
    },
    {
      id: 2,
      client: "Michael Chen",
      event: "Corporate Lunch",
      date: "May 28, 2026",
      time: "1:00 PM",
      guests: 12,
      location: "Santa Monica, CA",
      status: "Pending",
      type: "upcoming",
      amount: "$1,200",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
    },
    {
      id: 3,
      client: "Emma Watson",
      event: "Private Garden Party",
      date: "April 12, 2026",
      time: "6:00 PM",
      guests: 15,
      location: "Beverly Hills, CA",
      status: "Completed",
      type: "past",
      amount: "$2,100",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    },
    {
      id: 4,
      client: "James Miller",
      event: "Family Reunion",
      date: "March 05, 2026",
      time: "2:00 PM",
      guests: 8,
      location: "Los Angeles, CA",
      status: "Cancelled",
      type: "cancelled",
      amount: "$0",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
    }
  ]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesTab = booking.type === activeTab;
      const matchesSearch = 
        booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.event.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchTerm]);

  const handleStatusUpdate = (id, newStatus, newType) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, status: newStatus, type: newType || b.type } : b
    ));
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Bookings</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Manage your schedule and client experiences.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search clients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 w-full bg-white border-gray-100 rounded-xl focus:ring-accent focus:border-accent" 
            />
          </div>
          <Button variant="outline" className="h-11 rounded-xl border-gray-100 flex items-center gap-2 shrink-0">
            <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      <div className="flex border-b border-gray-100 overflow-x-auto">
        {['upcoming', 'past', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-8 py-3 md:py-4 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === tab ? 'text-primary-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent animate-in fade-in scale-x-100" />
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="p-0 overflow-hidden border-gray-100 bg-white shadow-sm hover:shadow-md transition-all group">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="relative">
                    <img src={booking.image} alt={booking.client} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-50 group-hover:ring-accent/20 transition-all" />
                    {booking.status === 'Pending' && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                        <span className="text-[8px] text-white font-bold">!</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-primary-900">{booking.client}</h3>
                      <Badge 
                        variant={
                          booking.status === 'Confirmed' ? 'success' : 
                          booking.status === 'Pending' ? 'warning' : 
                          booking.status === 'Completed' ? 'success' : 'default'
                        } 
                        className="text-[8px] font-black uppercase px-2 py-0.5 tracking-widest border-none"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-serif italic text-gray-500">{booking.event}</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <Calendar size={14} className="text-accent" /> {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <Clock size={14} className="text-accent" /> {booking.time}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <Users size={14} className="text-accent" /> {booking.guests} Guests
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <MapPin size={14} className="text-accent" /> {booking.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <div className="flex flex-col mr-6 text-right">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Earned</span>
                    <span className="text-xl font-bold text-primary-900">{booking.amount}</span>
                  </div>
                  
                  {booking.status === 'Pending' ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 h-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                      >
                        <CheckCircle2 size={16} /> Accept
                      </Button>
                      <Button 
                        onClick={() => handleStatusUpdate(booking.id, 'Cancelled', 'cancelled')}
                        variant="outline" 
                        className="border-red-100 text-red-600 hover:bg-red-50 rounded-xl px-4 h-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                      >
                        <XCircle size={16} /> Decline
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button className="h-12 bg-primary-900 text-white hover:bg-black rounded-xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                        View Details <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-[32px] text-center gap-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <Inbox size={32} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-primary-900">No bookings found</h3>
              <p className="text-sm text-gray-400 font-medium">Try adjusting your filters or search terms.</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => { setSearchTerm(''); setActiveTab('upcoming'); }}
              className="text-accent text-[10px] font-black uppercase tracking-widest mt-2"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefBookings;
