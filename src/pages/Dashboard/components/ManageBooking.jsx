import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  ChevronRight,
  Clock,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { useGetBookingDetailsQuery, useUpdateBookingDetailsMutation, useCancelBookingMutation } from '../../../redux/api/bookingApi';
import { toast } from 'react-toastify';

const ManageBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: bookingResponse, isLoading, refetch } = useGetBookingDetailsQuery(id, { skip: !id });
  const [updateBookingDetails, { isLoading: isUpdating }] = useUpdateBookingDetailsMutation();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const booking = bookingResponse?.data?.bookingDetails;
  const chefInfo = bookingResponse?.data?.chefInfo;

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newGuests, setNewGuests] = useState("");

  useEffect(() => {
    if (booking) {
      if (booking.eventDate) {
        setNewDate(new Date(booking.eventDate).toISOString().split('T')[0]);
      }
      setNewTime(booking.arrivalTime || "");
      setNewGuests(booking.numberOfGuests || "");
    }
  }, [booking]);

  if (isLoading) {
    return <div className="p-8 text-center text-primary-900 font-medium">Loading booking details...</div>;
  }

  if (!booking) {
    return <div className="p-8 text-center text-red-500 font-medium">Booking not found.</div>;
  }

  const handleReschedule = async () => {
    try {
      if (!newDate && !newTime) {
        return toast.warning("Please select a new date or time");
      }
      const res = await updateBookingDetails({ id, eventDate: newDate, arrivalTime: newTime }).unwrap();
      toast.success(res.message || "Booking rescheduled successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reschedule booking");
    }
  };

  const handleUpdateGuests = async () => {
    try {
      if (!newGuests || newGuests == booking.numberOfGuests) {
        return toast.warning("Please select a different number of guests");
      }
      const res = await updateBookingDetails({ id, numberOfGuests: Number(newGuests) }).unwrap();
      toast.success(res.message || "Guest count updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update guest count");
    }
  };

  const handleCancelBooking = async () => {
    if (window.confirm("Are you sure you want to cancel this booking? Cancellation fees may apply.")) {
      try {
        const res = await cancelBooking(id).unwrap();
        toast.success(res.message || "Booking cancelled successfully");
        navigate('/dashboard/bookings');
      } catch (err) {
        toast.error(err?.data?.message || "Failed to cancel booking");
      }
    }
  };

  const formattedDate = new Date(booking.eventDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const chefName = chefInfo?.firstName ? `${chefInfo.firstName} ${chefInfo.lastName}` : "Chef Julian Vasseur";

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
            <p className="text-gray-500 font-medium">Modify your upcoming experience with {chefName}.</p>
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
                  <p className="text-xs text-gray-400 font-medium">Current date: {formattedDate} at {booking.arrivalTime}</p>
                </div>
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-none px-3 font-bold text-[8px] tracking-widest">SUBJECT TO AVAILABILITY</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Date</label>
                <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="h-14 bg-gray-50 border-transparent rounded-2xl px-6" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Arrival Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <Input placeholder="e.g. 7:30 PM" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="h-14 bg-gray-50 border-transparent rounded-2xl pl-12 pr-6" />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleReschedule} disabled={isUpdating} className="bg-primary-900 text-white hover:bg-black rounded-full px-8 py-3 text-[10px] font-black tracking-widest uppercase">
                {isUpdating ? "Requesting..." : "Request Reschedule"}
              </Button>
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
                  <p className="text-xs text-gray-400 font-medium">Currently booked for {booking.numberOfGuests} persons</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Number of Guests</label>
                <Input type="number" min="1" value={newGuests} onChange={(e) => setNewGuests(e.target.value)} className="h-14 bg-gray-50 border-transparent rounded-2xl px-6" />
              </div>
              <div className="flex-1 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] text-blue-700 font-medium leading-relaxed">Increasing party size may affect the final price and requires chef approval.</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleUpdateGuests} disabled={isUpdating} className="bg-primary-900 text-white hover:bg-black rounded-full px-8 py-3 text-[10px] font-black tracking-widest uppercase">
                {isUpdating ? "Updating..." : "Update Guests"}
              </Button>
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
            <Button onClick={handleCancelBooking} disabled={isCancelling} variant="outline" className="w-fit border-red-200 text-red-600 hover:bg-red-50 rounded-full px-8 py-4 text-[10px] font-black tracking-widest uppercase">
              {isCancelling ? "Cancelling..." : "Cancel This Booking"}
            </Button>
          </Card>
        </div>

        {/* Right Column: Summary Card */}
        <div className="lg:h-fit lg:sticky lg:top-32 flex flex-col gap-6 self-start">
          <Card className="p-8 border-transparent bg-white shadow-md rounded-[32px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Booking Summary</span>
                <h4 className="text-xl font-bold text-primary-900">{chefName}</h4>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span>{booking.arrivalTime}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Users size={16} className="text-gray-400" />
                  <span>{booking.numberOfGuests} Guests</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{booking.eventLocation}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <Button 
                  onClick={() => navigate(`/dashboard/bookings/${booking._id}`)}
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
            <p className="text-[10px] text-white/60 leading-relaxed font-medium">Any changes made after confirmation are subject to chef approval and our luxury service guarantee.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
