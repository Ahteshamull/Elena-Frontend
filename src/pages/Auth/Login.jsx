import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.log('Login attempt:', data);
    // Mock login success logic
    // For testing: emails with 'chef' in them will be treated as chefs
    const role = data.email.toLowerCase().includes('chef') ? 'chef' : 'user';
    localStorage.setItem('user', JSON.stringify({ 
      email: data.email, 
      name: 'Tanvir',
      role: role 
    }));
    
    // Redirect based on role
    if (role === 'chef') {
      navigate('/chef-onboarding');
    } else {
      navigate('/');
    }
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
            <h2 className="text-xl font-bold text-primary-900">Welcome Back</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Enter your credentials to access your concierge dashboard.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-primary-900">Password</label>
              <Link to="#" className="text-xs font-bold text-primary-900 hover:opacity-70 transition-opacity">
                Forgot password?
              </Link>
            </div>
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

          {/* Commitment Checkbox */}
          <Checkbox
            label={
              <span>
                I agree to <span className="underline decoration-1 underline-offset-2">Tableli's</span> Terms and Private Policy.
              </span>
            }
            error={errors.remember?.message}
            {...register('remember')}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-16 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-lg flex gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
          >
            <LogIn size={20} />
            Sign In to Account
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export { Login };
