import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Utensils, ChefHat, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { cn } from '../../utils/cn';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['guest', 'chef']),
  agree: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'chef' ? 'chef' : 'guest';
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: initialRole,
      agree: false,
    },
  });

  // Dynamic role synchronization based on URL search query parameters
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'chef') {
      setSelectedRole('chef');
      setValue('role', 'chef');
    } else {
      setSelectedRole('guest');
      setValue('role', 'guest');
    }
  }, [searchParams, setValue]);


  const onSubmit = (data) => {
    // Navigate to OTP verification — pass all user details in router state.
    // The session is only persisted to localStorage after the code is verified.
    navigate('/verify-email', {
      state: {
        email: data.email,
        name: data.fullName,
        role: data.role,
        from: location.state?.from,
      },
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        {/* Welcome Header */}
        <div className="bg-[#F8F9FA] rounded-2xl p-6 flex items-center gap-5 border border-gray-100">
          <div className="h-14 w-14 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100 p-2">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-900">Join TABLELI</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Please enter your details to begin your journey.</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleRoleSelect('guest')}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 gap-3",
              selectedRole === 'guest' 
                ? "border-primary-900 bg-white shadow-md scale-[1.02]" 
                : "border-gray-100 bg-[#FAFAFA] hover:border-gray-200"
            )}
          >
            {selectedRole === 'guest' && (
              <CheckCircle2 size={16} className="absolute top-3 right-3 text-primary-900" />
            )}
            <Utensils size={32} className={cn(selectedRole === 'guest' ? "text-[#8B4513]" : "text-gray-400")} />
            <div className="text-center">
              <span className={cn("block text-lg font-bold", selectedRole === 'guest' ? "text-primary-900" : "text-gray-400")}>Guest</span>
              <span className="text-[10px] text-gray-400 font-medium">Find a private chef for your event</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('chef')}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 gap-3",
              selectedRole === 'chef' 
                ? "border-primary-900 bg-white shadow-md scale-[1.02]" 
                : "border-gray-100 bg-[#FAFAFA] hover:border-gray-200"
            )}
          >
            {selectedRole === 'chef' && (
              <CheckCircle2 size={16} className="absolute top-3 right-3 text-primary-900" />
            )}
            <ChefHat size={32} className={cn(selectedRole === 'chef' ? "text-[#D4AF37]" : "text-gray-400")} />
            <div className="text-center">
              <span className={cn("block text-lg font-bold", selectedRole === 'chef' ? "text-primary-900" : "text-gray-400")}>Chef</span>
              <span className="text-[10px] text-gray-400 font-medium">Apply as a private chef</span>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-primary-900">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              icon={User}
              error={errors.fullName?.message}
              {...register('fullName')}
              className="h-14 rounded-2xl border-gray-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-primary-900">Email Address</label>
            <Input
              type="email"
              placeholder="name@halalhire.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
              className="h-14 rounded-2xl border-gray-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-primary-900">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="........"
                icon={Lock}
                error={errors.password?.message}
                {...register('password')}
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

          {/* Terms Checkbox */}
          <Checkbox
            label={
              <span>
                I agree to the <Link to="#" className="underline font-bold text-primary-900">Terms of Service</Link> and <Link to="#" className="underline font-bold text-primary-900">Privacy Policy</Link> and commit to ethical professional standards.
              </span>
            }
            error={errors.agree?.message}
            {...register('agree')}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-16 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-lg flex gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
          >
            <UserPlus size={20} />
            Create New Account
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export { Register };
