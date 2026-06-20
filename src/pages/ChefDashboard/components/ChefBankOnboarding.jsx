import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Building2, ShieldCheck, Banknote, Loader2 } from 'lucide-react';
import { useStripeAccountOnboardingMutation } from '../../../redux/api/paymentApi';

const ChefBankOnboarding = () => {
  const [triggerOnboarding, { isLoading, data, error }] = useStripeAccountOnboardingMutation();

  const handleConnectBank = async () => {
    try {
      const res = await triggerOnboarding().unwrap();
      if (res?.onboardingLink) {
        window.location.href = res.onboardingLink;
      }
    } catch (err) {
      console.error("Failed to connect bank:", err);
    }
  };

  const isVerified = data?.status === 'verified';

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Payout Settings</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Connect your bank account to receive payments from clients securely via Stripe.
        </p>
      </div>

      <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-primary-900 font-serif italic">Secure Bank Connection</h2>
            <p className="text-gray-600">
              Elena uses <span className="font-bold text-indigo-600">Stripe</span> to safely transfer your earnings directly into your bank account. Connect your account to enable payouts for all your accepted bookings.
            </p>

            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                Bank-level security and encryption
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                Direct deposit to your local bank
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                Automatic payouts after completed events
              </li>
            </ul>

            <div className="pt-6">
              {isVerified ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 p-4 rounded-2xl w-fit">
                    <ShieldCheck className="w-6 h-6" />
                    Stripe Account Verified
                  </div>
                  <p className="text-xs text-gray-400">Your payouts are enabled and active.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleConnectBank}
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto py-6 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Connecting to Stripe...</span>
                    ) : (
                      "Connect Bank Account"
                    )}
                  </Button>
                  {error && <p className="text-red-500 text-xs mt-2">{error?.data?.message || 'Something went wrong.'}</p>}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 w-full bg-gray-50 rounded-[32px] p-8 flex items-center justify-center border-2 border-dashed border-gray-200">
            {/* Visual placeholder for stripe card / illustration */}
            <div className="flex flex-col items-center gap-4 max-w-[200px] text-center opacity-40">
              <Building2 className="w-24 h-24 text-gray-400" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Powered by Stripe</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChefBankOnboarding;
