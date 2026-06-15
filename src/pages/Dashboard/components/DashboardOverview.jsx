import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  ChefHat, 
  ShieldCheck,
  CreditCard,
  Loader2
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { useGetUserDashboardQuery } from '../../../redux/api/dashboardApi';

const DashboardOverview = () => {
  const navigate = useNavigate();

  const { data: dashboardRes, isLoading } = useGetUserDashboardQuery();
  const overview = dashboardRes?.data?.overview || {};

  const stats = [
    { label: "Total Bookings", value: overview.totalBookings || "0", icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Saved Chefs", value: overview.savedChefs || "0", icon: ChefHat, color: "bg-orange-50 text-orange-600" },
    { label: "Account Status", value: overview.accountStatus || "Pending", icon: ShieldCheck, color: "bg-green-50 text-green-600" },
  ];

  const nextBooking = overview.nextBooking;

  if (isLoading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-900" /></div>;
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Welcome back, {overview.userName || 'Guest'}</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          {nextBooking ? `Your next culinary experience is scheduled on ${nextBooking.date}.` : "You don't have any upcoming experiences scheduled yet."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat, idx) => (
          <Card 
            key={idx} 
            className="p-4 md:p-6 border-transparent bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              if (stat.label === "Total Bookings") navigate('/dashboard/bookings');
              if (stat.label === "Saved Chefs") navigate('/dashboard/saved');
            }}
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 tracking-widest uppercase">{stat.label}</span>
                <span className="text-xl md:text-2xl font-bold text-primary-900">{stat.value}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Next Booking & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Next Booking Featured Card */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary-900">Upcoming Experience</h3>
            <Button 
              variant="ghost" 
              className="text-accent text-xs font-bold hover:bg-transparent"
              onClick={() => navigate('/dashboard/bookings')}
            >
              View All Bookings <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
          
          {nextBooking ? (
            <Card className="overflow-hidden border-transparent shadow-xl relative group">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative h-52 md:h-auto">
                  <img src={nextBooking.image} alt={nextBooking.chefName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="success" className="bg-white/90 backdrop-blur-md text-green-700 border-none font-black px-4">{nextBooking.status}</Badge>
                  </div>
                </div>
                <div className="md:w-3/5 p-5 md:p-8 flex flex-col gap-4 md:gap-6 bg-white">
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-bold text-accent tracking-[0.2em] uppercase">Private Chef Experience</span>
                    <h4 className="text-xl md:text-2xl font-serif text-primary-900">{nextBooking.chefName}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-700">{nextBooking.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-700">{nextBooking.time}</span>
                    </div>
                    <div className="flex items-center gap-3 col-span-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-700">{nextBooking.location}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase mb-1">Selected Menu</span>
                    <p className="text-xs font-bold text-primary-900">{nextBooking.experience}</p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button 
                      className="flex-1 rounded-full bg-primary-900 text-white hover:bg-black text-[10px] font-black tracking-widest uppercase py-4 shadow-lg"
                      onClick={() => navigate('/dashboard/bookings')}
                    >
                      Manage Booking
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-gray-100 hover:bg-gray-50 text-[10px] font-black tracking-widest uppercase px-6"
                      onClick={() => navigate('/dashboard/messages')}
                    >
                      Message Chef
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="overflow-hidden border-transparent shadow-md relative group p-10 flex flex-col items-center justify-center text-center gap-4 bg-gray-50 min-h-[300px]">
              <Calendar className="w-12 h-12 text-gray-300" />
              <div>
                <h4 className="text-lg font-bold text-primary-900">No upcoming experiences</h4>
                <p className="text-sm text-gray-500">Book a chef to schedule your next private dining experience.</p>
              </div>
              <Button className="mt-2 bg-primary-900 text-white rounded-full text-xs font-bold tracking-widest uppercase px-8 py-4 shadow-lg" onClick={() => navigate('/browse-chefs')}>
                Browse Chefs
              </Button>
            </Card>
          )}
        </div>

        {/* Quick Actions / Sidebar in Overview */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-primary-900">Quick Actions</h3>
            <div className="grid gap-3">
              <Button 
                variant="outline" 
                className="justify-start gap-4 h-16 px-6 border-gray-100 rounded-2xl hover:border-accent group transition-all"
                onClick={() => navigate('/browse-chefs')}
              >
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-accent/10 transition-colors">
                  <ChefHat size={18} className="text-primary-900 group-hover:text-accent" />
                </div>
                <span className="text-sm font-bold text-gray-700">Browse New Chefs</span>
              </Button>
              {/* <Button 
                variant="outline" 
                className="justify-start gap-4 h-16 px-6 border-gray-100 rounded-2xl hover:border-accent group transition-all"
                onClick={() => navigate('/dashboard/payments')}
              >
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-accent/10 transition-colors">
                  <CreditCard size={18} className="text-primary-900 group-hover:text-accent" />
                </div>
                <span className="text-sm font-bold text-gray-700">Payment Methods</span>
              </Button> */}
            </div>
          </div>

          <div className="bg-primary-900 rounded-[32px] p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-2">
              <h4 className="text-white font-serif italic text-xl">Elena Circle</h4>
              <p className="text-white/60 text-xs leading-relaxed">Unlock exclusive benefits, early access to top chefs, and concierge service.</p>
              <Button className="mt-4 bg-accent hover:bg-accent/90 text-primary-900 border-none rounded-full py-3 text-[10px] font-black tracking-widest uppercase">Upgrade Now</Button>
            </div>
            {/* Abstract decorative element */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
