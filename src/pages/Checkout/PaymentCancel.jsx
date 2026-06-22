import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { XCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function PaymentCancel() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-32 pb-24 px-4 sm:px-6 flex justify-center items-center font-sans antialiased">
      <div className="max-w-xl w-full bg-white rounded-[32px] p-10 md:p-14 shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Animated Red Cross */}
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-red-50 animate-ping opacity-75" />
          <XCircle size={44} className="text-red-500 relative z-10" />
        </div>

        <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.25em] mb-3">Payment Cancelled</span>
        <h1 className="text-4xl font-serif font-medium text-primary-900 mb-4 leading-tight">
          Checkout Incomplete
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mb-8">
          You have cancelled the checkout process. No charges have been made. You can safely return to your bookings or the home page.
        </p>

        <div className="flex flex-col gap-3 w-full mt-4">
          <Link to="/dashboard/bookings" className="w-full">
            <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
              Return to Bookings
            </Button>
          </Link>
          <Link to="/" className="w-full">
            <Button className="w-full bg-white border border-gray-200 text-primary-900 hover:bg-gray-50 rounded-xl py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
              Return Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
