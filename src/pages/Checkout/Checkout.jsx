import { useParams, Link } from 'react-router-dom';
import { useGetBookingDetailsQuery } from '../../redux/api/bookingApi';
import { useCreateCheckoutSessionMutation } from '../../redux/api/paymentApi';
import { Button } from '../../components/ui/Button';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function Checkout() {
  const { bookingId } = useParams();
  const { data: response, isLoading, error } = useGetBookingDetailsQuery(bookingId);
  const [createCheckoutSession, { isLoading: isPaying }] = useCreateCheckoutSessionMutation();

  const booking = response?.data;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] flex justify-center items-center">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Secure Checkout...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center gap-4">
        <p className="text-red-500 font-bold uppercase tracking-widest text-xs">Failed to load booking details.</p>
        <Link to="/browse-chefs" className="text-primary-900 underline text-sm">Return to Chefs</Link>
      </div>
    );
  }

  const { bookingDetails, chefInfo } = booking;
  const chefName = chefInfo?.userName || 'Private Chef';

  // Format Date
  const dateStr = new Date(bookingDetails.eventDate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const handlePayment = async () => {
    try {
      const res = await createCheckoutSession(bookingDetails._id).unwrap();
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Failed to initiate secure checkout session.');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Error redirecting to Stripe');
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-28 md:pt-36 pb-24 font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link to="/dashboard/bookings" className="flex items-center gap-2 text-gray-400 hover:text-primary-900 transition-colors text-xs font-bold uppercase tracking-widest mb-10 w-fit">
          <ArrowLeft size={14} /> Back to Bookings
        </Link>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold text-[#E5C37A] uppercase tracking-[0.2em] mb-2 block">STEP 2: PAYMENT</span>
          <h1 className="text-4xl md:text-5xl font-serif text-primary-900 leading-tight">Review & Pay</h1>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col gap-10">
          
          {/* Chef Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-100">
            <div className="w-20 h-20 rounded-full bg-primary-900/5 text-primary-900 flex items-center justify-center font-bold font-serif text-4xl border-2 border-[#E5C37A]/20">
              {chefName.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold text-[#E5C37A] tracking-wider uppercase">Culinary Artist</span>
              <h2 className="text-2xl font-bold text-primary-900 leading-snug">{chefName}</h2>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-y-6 text-sm">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Event Date</span>
              <span className="font-bold text-primary-900">{dateStr}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Arrival Time</span>
              <span className="font-bold text-primary-900">{bookingDetails.arrivalTime}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Number of Guests</span>
              <span className="font-bold text-primary-900">{bookingDetails.numberOfGuests} Persons</span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Location</span>
              <span className="font-bold text-primary-900">{bookingDetails.eventLocation}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white mt-4">
            <h4 className="text-lg font-serif italic text-[#E5C37A] mb-6 pb-4 border-b border-white/10">
              Final Invoice
            </h4>
            
            <div className="flex justify-between items-baseline">
              <span className="text-white/80 font-medium">Total Amount Due</span>
              <span className="text-4xl font-bold font-serif text-[#E5C37A]">${bookingDetails.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-2">
            <Button 
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-6 text-sm font-bold tracking-[0.2em] uppercase shadow-2xl transition-all duration-300 transform active:scale-[0.98]"
            >
              {isPaying ? 'Redirecting to Stripe...' : 'Pay Securely Now'}
            </Button>
            <p className="text-[11px] text-gray-400 text-center mt-4">
              Payments are securely processed by Stripe. Your funds will be held safely in escrow.
            </p>
          </div>

          {/* Cancellation & Refund Policy */}
          <div className="bg-gray-50 rounded-2xl p-6 text-xs text-gray-600 border border-gray-100 pt-6">
            <h5 className="font-bold text-primary-900 mb-3 text-sm">Cancellation & Refund Policy</h5>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>14+ days before event:</strong> 100% full refund.</li>
              <li><strong>7-14 days before event:</strong> 50% partial refund.</li>
              <li><strong>Less than 7 days:</strong> No refund. Deposits are non-refundable at this point.</li>
              <li><strong>Chef Cancellations:</strong> 100% refund guaranteed, and we'll assist in finding a replacement.</li>
              <li className="text-[10px] text-gray-400 pt-2 list-none border-t border-gray-200 mt-3">* Payment processing fees are non-refundable. Force majeure situations are reviewed on a case-by-case basis.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
