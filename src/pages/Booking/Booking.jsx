import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ArrowLeft, 
  CheckCircle2
} from 'lucide-react';
import { chefsData } from '../../constants/mockData';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(5, 'Please enter a valid address'),
  bookingDate: z.string().min(1, 'Please select a date'),
  bookingTime: z.string().min(1, 'Please select a time'),
  guests: z.string().min(1, 'Please select number of guests'),
});

export default function Booking() {
  const { chefId } = useParams();
  const [isPaid, setIsPaid] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Find chef
  const chef = chefsData.find(c => c.id === parseInt(chefId)) || chefsData[0];

  // Try to load user data from local storage
  const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: loggedInUser?.name?.split(' ')[0] || '',
      lastName: loggedInUser?.name?.split(' ')[1] || '',
      email: loggedInUser?.email || '',
      phone: '',
      location: '',
      bookingDate: '',
      bookingTime: '',
      guests: '4',
    },
  });

  // Watch form fields for live summary updates
  const watchedGuests = watch('guests');
  const watchedDate = watch('bookingDate');
  const watchedTime = watch('bookingTime');
  const watchedLocation = watch('location');

  // Math calculations
  const guestCount = parseInt(watchedGuests) || 4;
  const pricePerPerson = parseInt(chef.price) || 250;
  const subtotal = pricePerPerson * guestCount;
  const serviceFee = subtotal * 0.1;
  const tax = subtotal * 0.08;
  const total = subtotal + serviceFee + tax;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data) => {
    // Simulate payment and booking generation
    console.log('Booking submitted successfully:', data);
    const ref = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsPaid(true);
    window.scrollTo(0, 0);

    // Save mock booking to localStorage if a user exists
    if (loggedInUser) {
      const existingBookings = JSON.parse(localStorage.getItem(`bookings_${loggedInUser.email}`) || '[]');
      const newBooking = {
        id: ref,
        status: 'Confirmed',
        date: data.bookingDate,
        time: data.bookingTime,
        guests: data.guests,
        location: data.location,
        chefName: chef.name,
        chefImage: chef.image,
        total: `$${total.toFixed(2)}`
      };
      localStorage.setItem(`bookings_${loggedInUser.email}`, JSON.stringify([newBooking, ...existingBookings]));
    }
  };

  const guestOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '6', label: '6 Guests' },
    { value: '8', label: '8 Guests' },
    { value: '10', label: '10 Guests' },
    { value: '12', label: '12+ Guests' },
  ];

  if (isPaid) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] pt-32 pb-24 px-4 sm:px-6 flex justify-center items-center font-sans antialiased">
        <div className="max-w-xl w-full bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          {/* Animated Gold Checkmark */}
          <div className="w-20 h-20 rounded-full bg-[#E5C37A]/10 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-[#E5C37A]/20 animate-ping opacity-75" />
            <CheckCircle2 size={44} className="text-[#E5C37A] relative z-10" />
          </div>

          <span className="text-[10px] font-bold text-[#E5C37A] uppercase tracking-[0.25em] mb-3">Booking Confirmed</span>
          <h1 className="text-4xl font-serif font-medium text-primary-900 mb-4 leading-tight">Your Culinary Journey Awaits</h1>
          <p className="text-gray-500 text-sm max-w-sm mb-8">
            Your reservation with <span className="font-bold text-primary-900">{chef.name}</span> has been confirmed. The details have been sent to your email.
          </p>

          {/* Booking Summary Box */}
          <div className="w-full bg-[#FAFAFA] rounded-2xl p-6 mb-10 text-left flex flex-col gap-4 border border-gray-100">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
              <span className="text-xs text-gray-400 font-medium">Reference Code</span>
              <span className="text-sm font-bold text-primary-900 font-mono">{bookingRef}</span>
            </div>
            
            <div className="flex items-center gap-4 py-2">
              <img src={chef.image} alt={chef.name} className="w-12 h-12 rounded-full object-cover border border-[#E5C37A]/30" />
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Private Chef</span>
                <span className="text-sm font-bold text-primary-900">{chef.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 pt-3 border-t border-gray-200/60 text-xs">
              <div>
                <span className="text-gray-400 block mb-1">Date & Time</span>
                <span className="font-bold text-primary-900">{watchedDate} at {watchedTime}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Guests</span>
                <span className="font-bold text-primary-900">{guestCount} Persons</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block mb-1">Event Location</span>
                <span className="font-bold text-primary-900 leading-normal">{watchedLocation}</span>
              </div>
              <div className="col-span-2 pt-3 border-t border-gray-200/60 flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Total Charged</span>
                <span className="text-lg font-serif font-bold text-primary-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="w-full">
            <Link to="/dashboard/bookings" className="block w-full">
              <Button variant="primary" className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 h-14">
                View in Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-28 md:pt-36 pb-24 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link to="/browse-chefs" className="flex items-center gap-2 text-gray-400 hover:text-primary-900 transition-colors text-xs font-bold uppercase tracking-widest mb-10 w-fit">
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-[#E5C37A] uppercase tracking-[0.2em] mb-2 block">SECURE RESERVATION</span>
          <h1 className="text-4xl md:text-5xl font-serif text-primary-900 leading-tight">Bespoke Dining Reservation</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form (8 cols) */}
          <form onSubmit={handleSubmit(onSubmit)} className="col-span-1 lg:col-span-8 flex flex-col gap-8">
            
            {/* Step 1: Guest & Event Details */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-8 h-8 rounded-full bg-primary-900/5 text-primary-900 flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-bold text-primary-900">Event Details</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">First Name</label>
                  <Input 
                    type="text" 
                    placeholder="Enter first name" 
                    icon={User} 
                    error={errors.firstName?.message} 
                    {...register('firstName')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Last Name</label>
                  <Input 
                    type="text" 
                    placeholder="Enter last name" 
                    icon={User} 
                    error={errors.lastName?.message} 
                    {...register('lastName')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    icon={Mail} 
                    error={errors.email?.message} 
                    {...register('email')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Phone Number</label>
                  <Input 
                    type="tel" 
                    placeholder="(555) 000-0000" 
                    icon={Phone} 
                    error={errors.phone?.message} 
                    {...register('phone')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Location */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Event Location</label>
                  <Input 
                    type="text" 
                    placeholder="Full street address, apartment, city, state, zip" 
                    icon={MapPin} 
                    error={errors.location?.message} 
                    {...register('location')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Booking Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Event Date</label>
                  <Input 
                    type="date" 
                    error={errors.bookingDate?.message} 
                    {...register('bookingDate')}
                    className="h-12 rounded-xl border-gray-200 pr-4"
                  />
                </div>

                {/* Booking Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Arrival Time</label>
                  <Input 
                    type="time" 
                    error={errors.bookingTime?.message} 
                    {...register('bookingTime')}
                    className="h-12 rounded-xl border-gray-200 pr-4"
                  />
                </div>

                {/* Guest Count */}
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Number of Guests</label>
                  <Select 
                    options={guestOptions} 
                    error={errors.guests?.message} 
                    {...register('guests')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>
              </div>

              {/* Secure Checkout / Pay Button */}
              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-5 text-xs font-bold tracking-[0.2em] uppercase shadow-2xl transition-all duration-300 transform active:scale-[0.98] h-14"
                >
                  {isSubmitting ? 'Processing...' : 'Pay Now & Reserve Chef'}
                </Button>

                <p className="text-[11px] text-gray-400 leading-normal flex items-start gap-2 bg-[#FAFAFA] p-4 rounded-xl border border-gray-100">
                  <span className="text-[#E5C37A] mt-0.5 font-bold">✓</span>
                  <span>
                    Your payment will be processed via our secure luxury checkout gateway. Funds are held in escrow and only released 24 hours after the culinary experience is completed.
                  </span>
                </p>
              </div>
            </div>
          </form>

          {/* Right Column: Invoice & Chef Details (4 cols) */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
            
            {/* Chef Mini Profile */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Selected Culinary Artist</h4>
              
              <div className="flex items-center gap-5 mb-6">
                <img src={chef.image} alt={chef.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#E5C37A]/20" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#E5C37A] tracking-wider uppercase">Verified Professional</span>
                  <h3 className="text-lg font-bold text-primary-900 leading-snug">{chef.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold mt-0.5">
                    <span className="text-[#E5C37A] text-sm">★</span> {chef.rating} <span className="text-gray-400 font-normal">({chef.reviews} Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="py-5 border-t border-b border-gray-50 flex flex-col gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-gray-400 text-sm">📍</span>
                  <div>
                    <span className="font-semibold text-gray-400 block">Service Location</span>
                    <span className="font-bold text-primary-900">{chef.location}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 mt-2">
                  <span className="text-gray-400 text-sm">🍳</span>
                  <div>
                    <span className="font-semibold text-gray-400 block">Cuisine & Specialties</span>
                    <span className="font-bold text-primary-900 leading-normal">{chef.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">starting rate</span>
                <span className="text-xl font-bold font-serif text-primary-900">${chef.price} <span className="text-xs font-sans font-normal text-gray-400">/ person</span></span>
              </div>
            </div>

            {/* Live Pricing Summary */}
            <div className="bg-[#1A1A1A] rounded-[32px] p-8 shadow-xl text-white">
              <h4 className="text-lg font-serif italic text-[#E5C37A] mb-8 pb-4 border-b border-white/10 flex justify-between items-center">
                <span>Summary Invoice</span>
                <span className="text-xs font-sans font-bold text-white/50 tracking-widest uppercase">Estimates</span>
              </h4>

              {/* Dynamic details */}
              <div className="flex flex-col gap-4 mb-8 text-xs font-medium text-white/60">
                <div className="flex justify-between">
                  <span>Guest Count</span>
                  <span className="font-bold text-white">{guestCount} Persons</span>
                </div>
                <div className="flex justify-between">
                  <span>Bespoke Menu Rate</span>
                  <span className="font-bold text-white">${pricePerPerson} / Person</span>
                </div>
                
                {watchedDate && (
                  <div className="flex justify-between">
                    <span>Reserved Date</span>
                    <span className="font-bold text-[#E5C37A]">{watchedDate}</span>
                  </div>
                )}
                
                {watchedTime && (
                  <div className="flex justify-between">
                    <span>Arrival Time</span>
                    <span className="font-bold text-[#E5C37A]">{watchedTime}</span>
                  </div>
                )}
              </div>

              {/* Math breakdown */}
              <div className="flex flex-col gap-4 text-xs pt-6 border-t border-white/10">
                <div className="flex justify-between text-white/60">
                  <span>Menu Subtotal</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Concierge Service Fee (10%)</span>
                  <span className="font-bold text-white">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Estimated Taxes (8%)</span>
                  <span className="font-bold text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-6 mt-2 border-t border-white/15 flex justify-between items-baseline">
                  <span className="text-sm font-bold">Total Amount</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-serif text-[#E5C37A] block">${total.toFixed(2)}</span>
                    <span className="text-[9px] text-white/40 block mt-1 uppercase tracking-wider">All-inclusive pricing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Elite Package Promise */}
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col gap-3 text-xs leading-normal">
              <h5 className="font-bold text-primary-900 flex items-center gap-2">
                <span className="text-[#E5C37A]">★</span> Tableli Luxury Concierge Promise
              </h5>
              <p className="text-gray-500 font-light">
                Every booking includes full kitchen clean-up, menu customization, grocery shopping, professional tableware presentation, and 24/7 dedicated support.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
