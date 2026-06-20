import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  User,
  Utensils,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  FileText,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { useGetBookingDetailsQuery } from "../../../redux/api/bookingApi";

const ChefBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: resData, isLoading, error } = useGetBookingDetailsQuery(id);
  const bookingData = resData?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary-900" />
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-primary-900">
          Booking not found
        </h2>
        <Button
          onClick={() => navigate("/chef-dashboard/bookings")}
          className="bg-primary-900 text-white rounded-xl mt-4"
        >
          Return to Bookings
        </Button>
      </div>
    );
  }

  const { bookingDetails, clientInfo = {} } = bookingData;

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getImageUrl = (url) => {
    if (!url || url === "undefined" || url === "null") return "";
    if (url.startsWith("http")) return url;
    return url.startsWith("/")
      ? `https://api.tableli.com${url}`
      : `https://api.tableli.com/${url}`;
  };

  const clientName =
    clientInfo.userName ||
    `${bookingDetails.firstName || ""} ${bookingDetails.lastName || ""}`.trim() ||
    "Client";
  const clientImage = getImageUrl(clientInfo.image);
  const clientEmail = clientInfo.email || bookingDetails.email || "N/A";
  const clientPhone = bookingDetails.phone || clientInfo.phone || "N/A";

  const totalAmount = bookingDetails.totalAmount || 0;
  const subtotal = (totalAmount * 0.8).toFixed(2);
  const serviceFee = (totalAmount * 0.1).toFixed(2);
  const tax = (totalAmount * 0.1).toFixed(2);

  return (
    <div
      id="printable-receipt"
      className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-0"
    >
      {/* Header */}
      <div className="flex flex-col gap-6">
        <button
          onClick={() => navigate("/chef-dashboard/bookings")}
          className="no-print flex items-center gap-2 text-gray-400 hover:text-primary-900 transition-colors text-xs font-bold uppercase tracking-widest w-fit"
        >
          <ArrowLeft size={14} /> Back to Bookings
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-serif text-primary-900 italic">
                Booking Details
              </h1>
              <Badge
                variant={
                  bookingDetails.status === "confirmed"
                    ? "success"
                    : bookingDetails.status === "pending"
                      ? "warning"
                      : "secondary"
                }
                className="border-none px-4 py-1.5 font-black text-[9px] tracking-widest uppercase"
              >
                {bookingDetails.status}
              </Badge>
            </div>
            <p className="text-gray-500 font-medium">
              Reference: {bookingDetails._id.substring(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="no-print flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-gray-100 gap-2 text-[10px] font-black tracking-widest uppercase py-4 px-6"
              onClick={() => window.print()}
            >
              <FileText size={14} /> Download Receipt
            </Button>
            <Button
              className="rounded-xl bg-primary-900 text-white hover:bg-black gap-2 text-[10px] font-black tracking-widest uppercase py-4 px-6 shadow-lg"
              onClick={() => navigate(`/messages?userId=${clientInfo._id}`)}
            >
              <MessageSquare size={14} /> Message Client
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Section: Client & Event */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px]">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/20 flex items-center justify-center bg-gray-100">
                  {clientImage ? (
                    <img
                      src={clientImage}
                      alt={clientName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-500">
                      {clientName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">
                    Client
                  </span>
                  <h3 className="text-2xl font-bold text-primary-900">
                    {clientName}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs font-bold text-gray-400">
                      {clientEmail}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold text-primary-900">
                      Custom Culinary Experience
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      Private Booking
                    </p>
                  </div>
                  <Utensils size={24} className="text-gray-100" />
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Special Requests / Notes
                      </span>
                      <span className="text-sm font-bold text-primary-900">
                        {bookingDetails.specialRequests ||
                          "No special requests provided."}
                      </span>
                    </div>
                  </div>
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
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Date
                  </span>
                  <span className="text-sm font-bold text-primary-900">
                    {formatDate(bookingDetails.eventDate)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Arrival Time
                  </span>
                  <span className="text-sm font-bold text-primary-900">
                    {bookingDetails.arrivalTime || "TBD"}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                  <Users size={20} />
                </div>
                <h4 className="text-lg font-bold text-primary-900">
                  Party Size
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Total Guests
                  </span>
                  <span className="text-sm font-bold text-primary-900">
                    {bookingDetails.numberOfGuests} Persons
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Client Contact
                  </span>
                  <span className="text-sm font-bold text-primary-900">
                    {clientPhone}
                  </span>
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
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Event Address
                </span>
                <span className="text-sm font-bold text-primary-900">
                  {bookingDetails.eventLocation || "TBD"}
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions & Summary Sidebar */}
        <div className="flex flex-col gap-8">
          {/* Payment Summary */}
          <div className="p-8 border border-transparent bg-primary-900 rounded-[32px] text-white shadow-sm overflow-hidden">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-serif italic">Payment Summary</h4>
                <CreditCard size={20} className="text-accent" />
              </div>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex justify-between items-center text-white/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm font-bold">Total Earnings</span>
                  <span className="text-xl font-bold text-accent">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <CreditCard size={16} className="text-white/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Payment Status: {bookingDetails.paymentStatus || "PENDING"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefBookingDetails;
