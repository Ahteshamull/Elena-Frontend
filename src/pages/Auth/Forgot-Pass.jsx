import React, { useState } from "react";
import { 
  useForgotPasswordMutation, 
  useVerifyResetOtpMutation, 
  useResetPasswordMutation,
  useResendOtpMutation 
} from "../../redux/api/authApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, KeyRound, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

// Schemas for each step
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ForgotPass = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyResetOtpMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOtpMutation();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onEmailSubmit = async (data) => {
    try {
      const response = await forgotPassword({ email: data.email }).unwrap();
      if (response.success) {
        toast.success(response.message || "OTP sent to your email");
        setEmail(data.email);
        setStep(2);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  const onOtpSubmit = async (data) => {
    try {
      const response = await verifyOtp({ otp: data.otp }).unwrap();
      if (response.success) {
        toast.success(response.message || "OTP verified successfully");
        setResetToken(response.resetToken);
        setStep(3);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      const response = await resetPassword({ 
        data: { 
          newPassword: data.newPassword, 
          confirmPassword: data.confirmPassword 
        }, 
        token: resetToken 
      }).unwrap();
      
      if (response.success) {
        toast.success(response.message || "Password reset successful");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({ email }).unwrap();
      if (response.success) {
        toast.success(response.message || "A new OTP has been sent");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="bg-[#F8F9FA] rounded-2xl p-6 flex flex-col gap-5 border border-gray-100">
          <Link to="/login" className="text-sm font-semibold text-gray-500 hover:text-primary-900 flex items-center gap-2 w-fit transition-colors">
            <ArrowLeft size={16} /> Back to Login
          </Link>
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100 p-2">
              <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-900">
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Reset Password"}
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {step === 1 && "Enter your email to receive a password reset code."}
                {step === 2 && `Enter the 6-digit code sent to ${email}`}
                {step === 3 && "Enter your new password below."}
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleSubmitEmail(onEmailSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-primary-900">Email Address</label>
              <Input
                type="email"
                placeholder="name@tableli.com"
                icon={Mail}
                error={emailErrors.email?.message}
                {...registerEmail("email")}
                className="h-14 rounded-2xl border-gray-200"
              />
            </div>
            <Button
              type="submit"
              isLoading={isForgotLoading}
              loadingText="Sending OTP..."
              className="h-16 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-lg flex gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
            >
              <Mail size={20} />
              Send Reset Code
            </Button>
          </form>
        )}

        {/* Step 2: OTP Form */}
        {step === 2 && (
          <form onSubmit={handleSubmitOtp(onOtpSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-primary-900">Verification Code</label>
              <Input
                type="text"
                placeholder="123456"
                icon={KeyRound}
                error={otpErrors.otp?.message}
                {...registerOtp("otp")}
                className="h-14 rounded-2xl border-gray-200"
              />
            </div>
            
            <div className="text-sm text-center">
              <span className="text-gray-500">Didn't receive the code? </span>
              <button 
                type="button" 
                onClick={handleResendOtp}
                disabled={isResendLoading}
                className="text-primary-900 font-bold hover:underline disabled:opacity-50"
              >
                {isResendLoading ? "Resending..." : "Resend OTP"}
              </button>
            </div>

            <Button
              type="submit"
              isLoading={isVerifyLoading}
              loadingText="Verifying..."
              className="h-16 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-lg flex gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
            >
              Verify Code
            </Button>
          </form>
        )}

        {/* Step 3: Reset Password Form */}
        {step === 3 && (
          <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-primary-900">New Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="........"
                  icon={Lock}
                  error={passwordErrors.newPassword?.message}
                  {...registerPassword("newPassword")}
                  className="h-14 rounded-2xl border-gray-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-primary-900">Confirm New Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="........"
                  icon={Lock}
                  error={passwordErrors.confirmPassword?.message}
                  {...registerPassword("confirmPassword")}
                  className="h-14 rounded-2xl border-gray-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-900 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isResetLoading}
              loadingText="Resetting..."
              className="h-16 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-lg flex gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
            >
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPass;
