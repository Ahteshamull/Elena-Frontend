import React, { useState } from 'react';
import {
  Users,
  CalendarCheck2,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Inbox,
  ChevronRight
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { useGetChefDashboardQuery } from '../../../redux/api/dashboardApi';
import { Loader2 } from 'lucide-react';

const ChefOverview = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { data: dashboardRes, isLoading, refetch } = useGetChefDashboardQuery();
  const dashboardData = dashboardRes?.data || {
    requests: [],
    statsData: { activeBookings: 0, totalEarnings: "$0", rating: "0.0" },
    recentReviews: [],
    upcomingPayout: "$0.00"
  };

  // Local state to allow optimistic updates when accepting/declining
  const [requests, setRequests] = useState([]);
  const [statsData, setStatsData] = useState(dashboardData.statsData);

  React.useEffect(() => {
    if (dashboardRes?.data) {
      setRequests(dashboardRes.data.requests || []);
      setStatsData(dashboardRes.data.statsData || { activeBookings: 0, totalEarnings: "$0", rating: "0.0" });
    }
  }, [dashboardRes]);
  const handleAccept = (id) => {
    // In a real app, this would be an API call
    // For now we'll optimistically update
    setRequests(prev => prev.filter(req => req.id !== id));
    setStatsData(prev => ({
      ...prev,
      activeBookings: prev.activeBookings + 1
    }));
  };

  const handleDecline = (id) => {
    // Optimistic update
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 size={32} className="animate-spin text-accent" /></div>;
  }

  const stats = [
    { label: "New Requests", value: requests.length.toString(), icon: Clock, color: "bg-blue-50 text-blue-600" },
    { label: "Active Bookings", value: statsData.activeBookings.toString(), icon: CalendarCheck2, color: "bg-green-50 text-green-600" },
    { label: "Total Earnings", value: statsData.totalEarnings, icon: TrendingUp, color: "bg-orange-50 text-orange-600" },
    { label: "Overall Rating", value: statsData.rating, icon: Star, color: "bg-yellow-50 text-yellow-600" },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Chef's Console</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          {requests.length > 0
            ? `Welcome back, ${user?.userName || 'Chef'}. You have ${requests.length} new requests waiting for your approval.`
            : `Welcome back, ${user?.userName || 'Chef'}. Your schedule is up to date.`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border-transparent bg-white shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{stat.label}</span>
                <span className="text-2xl font-bold text-primary-900">{stat.value}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Section: Requests */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary-900 font-serif italic">Pending Requests</h3>
            <Button
              variant="ghost"
              onClick={() => navigate('/chef-dashboard/bookings')}
              className="text-accent text-xs font-bold flex items-center gap-2"
            >
              View All <ArrowRight size={14} />
            </Button>
          </div>

          <div className="flex flex-col gap-4 min-h-[200px]">
            {requests.length > 0 ? (
              requests.map((req) => (
                <Card key={req.id} className="p-0 overflow-hidden border-gray-100 bg-white shadow-sm hover:shadow-md transition-all animate-in slide-in-from-right duration-300">
                  <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={req.image} alt={req.clientName} className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-gray-50 shrink-0" />
                      <div className="flex flex-col gap-1 min-w-0">
                        <h4 className="text-sm font-bold text-primary-900 truncate">{req.clientName}</h4>
                        <p className="text-xs text-gray-500 font-medium">{req.event}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <CalendarCheck2 size={12} /> {req.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <MapPin size={12} /> {req.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                      <span className="text-base md:text-lg font-bold text-primary-900">{req.amount}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Accept"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Decline"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10 opacity-60">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <Inbox size={32} />
                </div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">No pending requests</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Performance / Activity */}
        <div className="flex flex-col gap-8">
          <Card className="p-8 border-none !bg-primary-900 !text-white rounded-[32px] shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-accent text-[10px] font-black uppercase tracking-widest">Payout Status</span>
                <h4 className="text-2xl font-serif italic">Upcoming Payout</h4>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white">{dashboardData.upcomingPayout || "$0.00"}</span>
                <span className="text-white/60 text-xs font-medium">Scheduled for soon</span>
              </div>
              <Button
                onClick={() => navigate('/chef-dashboard/earnings')}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-accent hover:text-black hover:border-accent rounded-2xl py-6 text-[10px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-500 group/btn"
              >
                View Payout Details
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-black/10 transition-colors">
                  <ChevronRight size={14} className="text-white group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all" />
                </div>
              </Button>
            </div>
            {/* Abstract glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors" />
          </Card>

          <Card className="p-8 border-gray-100 bg-white rounded-[32px] flex flex-col gap-6">
            <h4 className="text-sm font-bold text-primary-900 uppercase tracking-widest">Recent Reviews</h4>
            <div className="flex flex-col gap-5">
              {dashboardData.recentReviews && dashboardData.recentReviews.length > 0 ? (
                dashboardData.recentReviews.map((review) => (
                  <div key={review.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} size={10} className={idx < review.rating ? "fill-accent text-accent" : "fill-gray-200 text-gray-200"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{review.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                    <span className="text-[9px] font-bold text-primary-900 uppercase">- {review.reviewerName}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">No recent reviews.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChefOverview;
