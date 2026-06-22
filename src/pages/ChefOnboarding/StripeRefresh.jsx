import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSetupProfileMutation } from '../../redux/api/profileApi'; // You might want to map this to a check status endpoint if needed

export default function StripeRefresh() {
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get('accountId');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-32 pb-24 px-4 sm:px-6 flex justify-center items-center font-sans antialiased">
      <div className="max-w-xl w-full bg-white rounded-[32px] p-10 md:p-14 shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Animated Warning */}
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-amber-50 animate-ping opacity-75" />
          <AlertTriangle size={44} className="text-amber-500 relative z-10" />
        </div>

        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.25em] mb-3">Action Required</span>
        <h1 className="text-4xl font-serif font-medium text-primary-900 mb-4 leading-tight">
          Verification Incomplete
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mb-8">
          It looks like your Stripe verification process was interrupted. Please resume the process to ensure you can receive payments.
        </p>

        {accountId && (
          <div className="w-full bg-[#FAFAFA] rounded-xl p-4 mb-8 text-center border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Stripe Account ID</span>
            <span className="text-xs font-mono font-medium text-primary-900 break-all">{accountId}</span>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full mt-4">
          <Button 
            onClick={() => navigate('/chef-dashboard/settings')} // Adjust route based on where they should trigger onboarding
            className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} /> Resume Verification
          </Button>
          <Link to="/chef-dashboard" className="w-full">
            <Button className="w-full bg-white border border-gray-200 text-primary-900 hover:bg-gray-50 rounded-xl py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
              Return to Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
