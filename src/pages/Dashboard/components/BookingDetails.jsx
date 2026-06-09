import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ChefHat, 
  Utensils, 
  MessageSquare, 
  AlertTriangle,
  CreditCard,
  FileText,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for a specific booking
  const booking = {
    id: id || "BK-9021",
    status: "Confirmed",
    chef: {
      name: "Chef Julian Vasseur",
      image: "https://images.unsplash.com/photo-1583394293214-28dea15ee548?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
    },
    experience: {
      title: "Gourmet Experience",
      courses: "5 Courses",
      menu: [
        { course: "First Course", dish: "Wild Mushroom Velouté with Truffle Oil" },
        { course: "Second Course", dish: "Pan-Seared Scallops with Pea Purée" },
        { course: "Third Course", dish: "Herb-Crusted Rack of Lamb" },
        { course: "Fourth Course", dish: "Artisanal Cheese Selection" },
        { course: "Fifth Course", dish: "Dark Chocolate Fondant with Raspberry Coulis" }
      ]
    },
    logistics: {
      date: "May 24, 2026",
      time: "7:00 PM",
      location: "Malibu Villa, 23450 Pacific Coast Hwy, Malibu, CA 90265",
      guests: 6,
      dietary: "One guest with Nut Allergy"
    },
    payment: {
      subtotal: "$1,500.00",
      serviceFee: "$150.00",
      tax: "$200.00",
      total: "$1,850.00",
      method: "Visa ending in 4242"
    }
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
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-serif text-primary-900 italic">Booking Details</h1>
              <Badge variant="success" className="bg-green-50 text-green-700 border-none px-4 py-1.5 font-black text-[9px] tracking-widest uppercase">
                {booking.status}
              </Badge>
            </div>
            <p className="text-gray-500 font-medium">Reference: {booking.id}</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-gray-100 gap-2 text-[10px] font-black tracking-widest uppercase py-4 px-6">
              <FileText size={14} /> Download Receipt
            </Button>
            <Button className="rounded-xl bg-primary-900 text-white hover:bg-black gap-2 text-[10px] font-black tracking-widest uppercase py-4 px-6 shadow-lg">
              <MessageSquare size={14} /> Message Chef
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Section: Chef & Menu */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px]">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/20">
                  <img src={booking.chef.image} alt={booking.chef.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">Private Chef</span>
                  <h3 className="text-2xl font-bold text-primary-900">{booking.chef.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge className="bg-gray-50 text-gray-400 border-none text-[9px] font-bold px-3">★ {booking.chef.rating}</Badge>
                    <button className="text-[10px] font-bold text-primary-900 hover:underline">View Profile</button>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold text-primary-900">{booking.experience.title}</h4>
                    <p className="text-xs text-gray-400 font-medium">{booking.experience.courses}</p>
                  </div>
                  <Utensils size={24} className="text-gray-100" />
                </div>

                <div className="grid gap-4">
                  {booking.experience.menu.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                      <span className="text-[10px] font-black text-accent mt-1 min-w-[20px]">{String(idx + 1).padStart(2, '0')}</span>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.course}</span>
                        <span className="text-sm font-bold text-primary-900">{item.dish}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section: Logistics */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                  <Calendar size={20} />
                </div>
                <h4 className="text-lg font-bold text-primary-900">Schedule</h4>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</span>
                  <span className="text-sm font-bold text-primary-900">{booking.logistics.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Arrival Time</span>
                  <span className="text-sm font-bold text-primary-900">{booking.logistics.time}</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                  <Users size={20} />
                </div>
                <h4 className="text-lg font-bold text-primary-900">Party Size</h4>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Guests</span>
                  <span className="text-sm font-bold text-primary-900">{booking.logistics.guests} Persons</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dietary Notes</span>
                  <span className="text-sm font-bold text-amber-600">{booking.logistics.dietary}</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] md:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                  <MapPin size={20} />
                </div>
                <h4 className="text-lg font-bold text-primary-900">Location</h4>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Private Residence</span>
                <span className="text-sm font-bold text-primary-900">{booking.logistics.location}</span>
                <button className="text-[10px] font-bold text-accent mt-2 uppercase tracking-widest hover:underline text-left">View on Map</button>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions & Summary Sidebar */}
        <div className="flex flex-col gap-8">
          {/* Quick Management Action */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-4">
            <h4 className="text-lg font-bold text-primary-900">Experience Management</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Need to reschedule or modify your guest list? Access our management suite.</p>
            <Button 
              onClick={() => navigate(`/dashboard/bookings/${booking.id}/manage`)}
              className="w-full bg-primary-900 text-white hover:bg-black rounded-xl py-4 text-[10px] font-black tracking-widest uppercase shadow-lg flex items-center justify-center gap-3"
            >
              Manage This Booking <ChevronRight size={16} />
            </Button>
          </Card>

          {/* Payment Summary */}
          <Card className="p-8 border-transparent bg-primary-900 rounded-[32px] text-white">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-serif italic">Payment Summary</h4>
                <CreditCard size={20} className="text-accent" />
              </div>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{booking.payment.subtotal}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Service Fee</span>
                  <span className="font-bold text-white">{booking.payment.serviceFee}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>VAT / Tax</span>
                  <span className="font-bold text-white">{booking.payment.tax}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm font-bold">Total Charged</span>
                  <span className="text-xl font-bold text-accent">{booking.payment.total}</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <CreditCard size={16} className="text-white/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{booking.payment.method}</span>
              </div>
            </div>
          </Card>

          {/* Support Note */}
          <div className="p-8 rounded-[32px] bg-gray-50 flex flex-col gap-4 border border-gray-100">
            <h4 className="text-sm font-bold text-primary-900">Need Assistance?</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">If you have any questions regarding this booking, please contact our 24/7 Elite Concierge.</p>
            <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline text-left">Contact Concierge</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
