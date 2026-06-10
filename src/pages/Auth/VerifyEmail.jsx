import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyRegistrationMutation } from '../../redux/api/authApi';
import { toast } from 'react-toastify';
import { MailCheck, RotateCcw, ShieldCheck } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const maskEmail = (email = '') => {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const masked = local[0] + '***' + (local.length > 1 ? local[local.length - 1] : '');
  return `${masked}@${domain}`;
};

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state || {};
  const { email = '', name = '', role = 'guest', from = '/' } = userData;

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifyRegistration, { isLoading: isVerifying }] = useVerifyRegistrationMutation();
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    setCanResend(false);
    setCountdown(RESEND_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(''));
    setError('');
    inputRefs.current[0]?.focus();
  };

  const handleChange = useCallback((index, value) => {
    // Allow only single digit
    const char = value.replace(/\D/g, '').slice(-1);
    setError('');

    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);

    // Auto-advance focus
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        // Clear current cell
        const updated = [...digits];
        updated[index] = '';
        setDigits(updated);
      } else if (index > 0) {
        // Move to previous cell
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const updated = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => { updated[i] = char; });
    setDigits(updated);
    setError('');
    const nextFocus = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextFocus]?.focus();
  }, []);

  const handleVerify = async () => {
    const code = digits.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter all 6 digits of your verification code.');
      return;
    }

    try {
      const response = await verifyRegistration({ email, otp: code }).unwrap();
      
      if (response.success || response) {
        toast.success(response.message || 'Email verified successfully!');
        
        const resolvedRole = role === 'chef' ? 'chef' : 'user';
        const userDataToSave = {
          ...response.data,
          email,
          name,
          role: resolvedRole,
        };

        // Save tokens and user data
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(userDataToSave));

        // Save to cookies as well
        if (response.accessToken && response.refreshToken) {
          document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400; SameSite=Lax`;
          document.cookie = `refreshToken=${response.refreshToken}; path=/; max-age=2592000; SameSite=Lax`;
          document.cookie = `user=${encodeURIComponent(JSON.stringify(userDataToSave))}; path=/; max-age=86400; SameSite=Lax`;
        }

        setIsSuccess(true);

        // Redirect after brief success animation
        await new Promise((res) => setTimeout(res, 1000));
        if (resolvedRole === 'chef') {
          navigate('/chef-onboarding', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }
    } catch (err) {
      console.error('Failed to verify OTP:', err);
      if (err?.data?.message) {
        setError(err.data.message);
        toast.error(err.data.message);
      } else {
        setError('Invalid verification code. Please try again.');
        toast.error('Verification failed.');
      }
      setDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  const isFilled = digits.every((d) => d !== '');

  // Success state
  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-60" />
            <ShieldCheck size={40} className="text-emerald-500 relative z-10" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">Verified</p>
            <h2 className="text-2xl font-serif font-medium text-gray-900 leading-tight">Account Confirmed</h2>
            <p className="text-sm text-gray-400 mt-2">Redirecting you to your dashboard…</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className="bg-[#F8F9FA] rounded-2xl p-6 flex items-center gap-5 border border-gray-100">
          <div className="h-14 w-14 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100 shrink-0">
            <MailCheck size={28} className="text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              A 6-digit code was sent to{' '}
              <span className="font-bold text-gray-700">{maskEmail(email)}</span>
            </p>
          </div>
        </div>

        {/* OTP Inputs */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold text-gray-900">Enter Verification Code</label>

          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                autoFocus={index === 0}
                className={cn(
                  'w-full aspect-square max-w-[64px] text-center text-2xl font-bold rounded-2xl border-2 bg-[#FAFAFA] transition-all duration-150 focus:outline-none focus:bg-white',
                  digit
                    ? 'border-gray-900 bg-white text-gray-900 shadow-sm'
                    : 'border-gray-200 text-gray-400',
                  error
                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                    : 'focus:border-gray-900',
                )}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1.5">
              <span className="text-red-400">✕</span> {error}
            </p>
          )}
        </div>

        {/* Verify Button */}
        <Button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying || !isFilled}
          className={cn(
            'h-16 rounded-2xl font-bold text-lg flex gap-3 shadow-xl transition-all',
            isFilled && !isVerifying
              ? 'bg-black hover:bg-gray-900 text-white hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          )}
        >
          {isVerifying ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Verifying…
            </>
          ) : (
            <>
              <ShieldCheck size={20} />
              Verify & Continue
            </>
          )}
        </Button>

        {/* Resend */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-400">Didn't receive a code?</span>
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-bold text-gray-900 flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <RotateCcw size={14} />
              Resend Code
            </button>
          ) : (
            <span className="font-bold text-gray-400 tabular-nums">
              Resend in{' '}
              <span className="text-gray-900">
                {String(Math.floor(countdown / 60)).padStart(2, '0')}:
                {String(countdown % 60).padStart(2, '0')}
              </span>
            </span>
          )}
        </div>



      </div>
    </AuthLayout>
  );
};

export { VerifyEmail };
