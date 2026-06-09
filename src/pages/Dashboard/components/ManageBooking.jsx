import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  AlertTriangle,
  ChevronRight,
  Clock,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';

const ManageBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookingSummary = {
    id: id || "BK-9021",
    chef: "Chef Julian Vasseur",
    date: "May 24, 2026",
    guests: 6
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <button 
          onClick={() => navigate('/dashboard/bookings')}
          className="flex items-center gap-2 text-gray-400 hover:text-primary-900 transition-colors text-xs font-bold uppercase tracking-widest w-fit"
        >
          <ArrowLeft size={14} /> Back to Bookings
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-serif text-primary-900 italic">Manage Booking</h1>
            <p className="text-gray-500 font-medium">Modify your upcoming experience with {bookingSummary.chef}.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Management Sections */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Section: Reschedule */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                  <Calendar size={20} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-primary-900">Reschedule Experience</h3>
                  <p className="text-xs text-gray-400 font-medium">Current date: {bookingSummary.date}</p>
                </div>
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-none px-3 font-bold text-[8px] tracking-widest">SUBJECT TO AVAILABILITY</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Date</label>
                <Input type="date" className="h-14 bg-gray-50 border-transparent rounded-2xl px-6" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Arrival Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <Input placeholder="e.g. 7:30 PM" className="h-14 bg-gray-50 border-transparent rounded-2xl pl-12 pr-6" />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="bg-primary-900 text-white hover:bg-black rounded-full px-8 py-3 text-[10px] font-black tracking-widest uppercase">Request Reschedule</Button>
            </div>
          </Card>

          {/* Section: Party Size */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                  <Users size={20} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-primary-900">Modify Party Size</h3>
                  <p className="text-xs text-gray-400 font-medium">Currently booked for {bookingSummary.guests} persons</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Number of Guests</label>
                <Input type="number" defaultValue={bookingSummary.guests} className="h-14 bg-gray-50 border-transparent rounded-2xl px-6" />
              </div>
              <div className="flex-1 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] text-blue-700 font-medium leading-relaxed">Increasing party size may affect the final price and requires chef approval.</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="bg-primary-900 text-white hover:bg-black rounded-full px-8 py-3 text-[10px] font-black tracking-widest uppercase">Update Guests</Button>
            </div>
          </Card>

          {/* Section: Dangerous Zone / Cancel */}
          <Card className="p-8 border-red-100 bg-red-50/10 rounded-[32px] flex flex-col gap-6 border">
            <div className="flex items-center gap-4 text-red-600">
              <ShieldAlert size={20} />
              <h3 className="text-lg font-bold">Cancellation</h3>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xl">
              Cancellations made within 48 hours of the event are subject to a 50% cancellation fee. Please review our policy before proceeding.
            </p>
            <Button variant="outline" className="w-fit border-red-200 text-red-600 hover:bg-red-50 rounded-full px-8 py-4 text-[10px] font-black tracking-widest uppercase">Cancel This Booking</Button>
          </Card>
        </div>

        {/* Right Column: Summary Card */}
        <div className="lg:h-fit lg:sticky lg:top-32 flex flex-col gap-6 self-start">
          <Card className="p-8 border-transparent bg-white shadow-md rounded-[32px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Booking Summary</span>
                <h4 className="text-xl font-bold text-primary-900">{bookingSummary.chef}</h4>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{bookingSummary.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Users size={16} className="text-gray-400" />
                  <span>{bookingSummary.guests} Guests</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>Malibu Villa, CA</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <Button 
                  onClick={() => navigate(`/dashboard/bookings/${bookingSummary.id}`)}
                  variant="ghost" 
                  className="w-full text-accent text-[10px] font-black tracking-widest uppercase hover:bg-transparent justify-between px-0"
                >
                  View Full Details <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="p-8 rounded-[32px] bg-gray-900 text-white flex flex-col gap-4 shadow-xl">
            <h4 className="text-sm font-bold">Policy Reminder</h4>
            <p className="text-[10px] text-white/60 leading-relaxed font-medium">Any changes made after confirmation are subject to Chef Julian's approval and our luxury service guarantee.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
