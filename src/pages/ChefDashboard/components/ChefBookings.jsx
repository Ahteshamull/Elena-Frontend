import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  Inbox,
  Loader2,
} from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Input } from "../../../components/ui/Input";
import {
  useGetChefBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../../../redux/api/bookingApi";

const ChefBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: bookingsRes, isLoading } = useGetChefBookingsQuery("");
  const [updateStatus] = useUpdateBookingStatusMutation();

  const fetchedBookings = bookingsRes?.data || [];

  const bookings = useMemo(() => {
    const sorted = [...fetchedBookings].sort(
      (a, b) =>
        new Date(b.bookingDetails?.eventDate || 0) -
        new Date(a.bookingDetails?.eventDate || 0),
    );

    const searchFiltered = sorted.filter((booking) => {
      const clientName =
        (booking.clientInfo?.userName || "").toLowerCase() ||
        `${booking.bookingDetails?.firstName || ""} ${booking.bookingDetails?.lastName || ""}`
          .trim()
          .toLowerCase();
      const location = (
        booking.bookingDetails?.eventLocation || ""
      ).toLowerCase();
      const search = searchTerm.toLowerCase();
      return clientName.includes(search) || location.includes(search);
    });

    return {
      upcoming: searchFiltered.filter((b) =>
        ["pending", "confirmed"].includes(b.bookingDetails?.status),
      ),
      past: searchFiltered.filter(
        (b) => b.bookingDetails?.status === "completed",
      ),
      cancelled: searchFiltered.filter((b) =>
        ["cancelled", "declined"].includes(b.bookingDetails?.status),
      ),
    };
  }, [fetchedBookings, searchTerm]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus.toLowerCase() }).unwrap();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">
            Bookings
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Manage your schedule and client experiences.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 w-full bg-white border-gray-100 rounded-xl focus:ring-accent focus:border-accent"
            />
          </div>
          <Button
            variant="outline"
            className="h-11 rounded-xl border-gray-100 flex items-center gap-2 shrink-0"
          >
            <Filter size={16} />{" "}
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      <div className="flex border-b border-gray-100 overflow-x-auto">
        {["upcoming", "past", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-8 py-3 md:py-4 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === tab
                ? "text-primary-900"
                : "text-gray-400 hover:text-gray-600"
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
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-900" />
          </div>
        ) : bookings[activeTab]?.length > 0 ? (
          bookings[activeTab].map((booking) => {
            const bId = booking.bookingDetails._id;
            const clientInfo = booking.clientInfo || {};
            const client =
              clientInfo.userName ||
              `${booking.bookingDetails.firstName || ""} ${booking.bookingDetails.lastName || ""}`.trim() ||
              "Client";
            const event = "Private Booking";
            const dateObj = new Date(booking.bookingDetails.eventDate);
            const dateStr = !isNaN(dateObj)
              ? dateObj.toLocaleDateString()
              : "TBD";
            const timeStr = booking.bookingDetails.arrivalTime || "TBD";
            const guests = booking.bookingDetails.numberOfGuests || 0;
            const location = booking.bookingDetails.eventLocation || "TBD";
            const status = booking.bookingDetails.status;
            const amount = booking.bookingDetails.totalAmount
              ? `$${booking.bookingDetails.totalAmount}`
              : "TBD";

            const rawImage = clientInfo.image;
            const image = rawImage
              ? rawImage.startsWith("http")
                ? rawImage
                : `https://elena-backend-eaoh.onrender.com${rawImage}`
              : "";

            return (
              <Card
                key={bId}
                className="p-0 overflow-hidden border-gray-100 bg-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="relative">
                      {image ? (
                        <img
                          src={image}
                          alt={client}
                          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-50 group-hover:ring-accent/20 transition-all"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-2xl ring-2 ring-gray-50 group-hover:ring-accent/20 transition-all uppercase">
                          {client ? client.charAt(0) : "?"}
                        </div>
                      )}
                      {status === "pending" && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                          <span className="text-[8px] text-white font-bold">
                            !
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-primary-900">
                          {client}
                        </h3>
                        <Badge
                          variant={
                            status === "confirmed"
                              ? "success"
                              : status === "pending"
                                ? "warning"
                                : status === "completed"
                                  ? "success"
                                  : "default"
                          }
                          className="text-[8px] font-black uppercase px-2 py-0.5 tracking-widest border-none"
                        >
                          {status}
                        </Badge>
                      </div>
                      <p className="text-sm font-serif italic text-gray-500">
                        {event}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <Calendar size={14} className="text-accent" />{" "}
                          {dateStr}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <Clock size={14} className="text-accent" /> {timeStr}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <Users size={14} className="text-accent" /> {guests}{" "}
                          Guests
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <MapPin size={14} className="text-accent" />{" "}
                          {location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                    <div className="flex flex-col mr-6 text-right">
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                        Total Earned
                      </span>
                      <span className="text-xl font-bold text-primary-900">
                        {amount}
                      </span>
                    </div>

                    {status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleStatusUpdate(bId, "confirmed")}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 h-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                        >
                          <CheckCircle2 size={16} /> Accept
                        </Button>
                        <Button
                          onClick={() => handleStatusUpdate(bId, "cancelled")}
                          variant="outline"
                          className="border-red-100 text-red-600 hover:bg-red-50 rounded-xl px-4 h-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                        >
                          <XCircle size={16} /> Decline
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            navigate(`/chef-dashboard/bookings/${bId}`)
                          }
                          className="h-12 bg-primary-900 text-white hover:bg-black rounded-xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group"
                        >
                          View Details{" "}
                          <ChevronRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-[32px] text-center gap-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <Inbox size={32} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-primary-900">
                No bookings found
              </h3>
              <p className="text-sm text-gray-400 font-medium">
                Try adjusting your filters or search terms.
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm("");
                setActiveTab("upcoming");
              }}
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
