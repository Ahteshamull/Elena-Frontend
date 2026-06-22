import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ShieldCheck } from 'lucide-react';

export default function StripeReturn() {
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get('accountId');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-32 pb-24 px-4 sm:px-6 flex justify-center items-center font-sans antialiased">
      <div className="max-w-xl w-full bg-white rounded-[32px] p-10 md:p-14 shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Animated Green Checkmark */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-green-50 animate-ping opacity-75" />
          <ShieldCheck size={44} className="text-green-500 relative z-10" />
        </div>

        <span className="text-[10px] font-bold text-green-500 uppercase tracking-[0.25em] mb-3">Verification Submitted</span>
        <h1 className="text-4xl font-serif font-medium text-primary-900 mb-4 leading-tight">
          Account Under Review
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mb-8">
          Thank you for providing your information. Stripe is currently reviewing your account. Once approved, you will be able to receive payouts directly to your bank account.
        </p>

        {accountId && (
          <div className="w-full bg-[#FAFAFA] rounded-xl p-4 mb-8 text-center border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Stripe Account ID</span>
            <span className="text-xs font-mono font-medium text-primary-900 break-all">{accountId}</span>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full mt-4">
          <Link to="/chef-dashboard" className="w-full">
            <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
              Go to Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
