import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-32 pb-24 px-4 sm:px-6 flex justify-center items-center font-sans antialiased">
      <div className="max-w-xl w-full bg-white rounded-[32px] p-10 md:p-14 shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Animated Gold Checkmark */}
        <div className="w-20 h-20 rounded-full bg-[#E5C37A]/10 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-[#E5C37A]/20 animate-ping opacity-75" />
          <CheckCircle2 size={44} className="text-[#E5C37A] relative z-10" />
        </div>

        <span className="text-[10px] font-bold text-[#E5C37A] uppercase tracking-[0.25em] mb-3">Escrow Secured</span>
        <h1 className="text-4xl font-serif font-medium text-primary-900 mb-4 leading-tight">Payment Successful</h1>
        <p className="text-gray-500 text-sm max-w-sm mb-8">
          Your payment has been successfully processed and is held securely in escrow. A confirmation email has been sent.
        </p>

        {sessionId && (
          <div className="w-full bg-[#FAFAFA] rounded-xl p-4 mb-8 text-center border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Session ID</span>
            <span className="text-xs font-mono font-medium text-primary-900 break-all">{sessionId}</span>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full mt-4">
          <Link to="/dashboard/bookings" className="w-full">
            <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
              View Your Bookings
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
