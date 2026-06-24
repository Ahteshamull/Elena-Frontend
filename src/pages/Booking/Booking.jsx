import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ArrowLeft, 
  CheckCircle2
} from 'lucide-react';
import { useCreateBookingMutation } from '../../redux/api/bookingApi';
import { useGetProfileByUserIdQuery } from '../../redux/api/profileApi';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  countryCode: z.string().min(1, 'Required'),
  phone: z.string().regex(/^[0-9\s\-]{6,}$/, 'Please enter a valid phone number'),
  location: z.string().min(5, 'Please enter a valid address'),
  eventDate: z.string().min(1, 'Please select a date'),
  arrivalTime: z.string().min(1, 'Please select a time'),
  numberOfGuests: z.string().min(1, 'Please select number of guests'),
  notes: z.string().optional(),
});

const timeOptions = [];
for (let i = 6; i <= 23; i++) {
  for (let j = 0; j < 60; j += 30) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const minute = j === 0 ? '00' : '30';
    const ampm = i < 12 ? 'AM' : 'PM';
    const label = `${hour}:${minute} ${ampm}`;
    const value = `${i.toString().padStart(2, '0')}:${minute}`;
    timeOptions.push({ label, value });
  }
}

export default function Booking() {
  const { chefId } = useParams();
  const locationState = useLocation();
  const navigate = useNavigate();
  
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const { data: profileRes } = useGetProfileByUserIdQuery(chefId, { skip: !chefId });
  const chefProfile = profileRes?.data || {};

  const bookingData = locationState.state || {};
  const { 
    chefName = chefProfile.fullName || chefProfile.displayName || "Verified Chef", 
    guests: initialGuests = 2, 
    selectedDate = '', 
    startingPricePerPerson = 250 
  } = bookingData;

  const finalPricePerPerson = chefProfile.startingPricePerPerson || startingPricePerPerson;
  const chefStatus = chefProfile.status || "approved";
  const travelRadius = chefProfile.travelRadius || 0;
  const travelRadiusLocation = chefProfile.travelRadiusLocation || "Not specified";

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
      countryCode: '+000',
      phone: '',
      location: '',
      eventDate: selectedDate,
      arrivalTime: '',
      numberOfGuests: String(initialGuests),
      notes: '',
    },
  });

  // Watch form fields for live summary updates
  const watchedGuests = watch('numberOfGuests');
  const watchedDate = watch('eventDate');
  const watchedTime = watch('arrivalTime');
  const watchedLocation = watch('location');

  // Math calculations
  const guestCount = parseInt(watchedGuests) || 2;
  const pricePerPerson = finalPricePerPerson || 0;
  const minimumFee = chefProfile?.minimumBookingAmount || 0;
  const subtotal = Math.max(minimumFee, pricePerPerson * guestCount);
  const total = subtotal;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    if (!loggedInUser) {
      toast.error('Please log in to make a booking.');
      navigate('/login', { state: { from: `/book/${chefId}` } });
      return;
    }

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `${data.countryCode} ${data.phone}`,
        eventLocation: data.location,
        eventDate: data.eventDate,
        arrivalTime: data.arrivalTime,
        numberOfGuests: parseInt(data.numberOfGuests, 10),
        notes: data.notes,
      };

      const res = await createBooking({ chefId, body: payload }).unwrap();
      
      toast.success(res.message || 'Booking created successfully!');
      
      // Redirect to the new Checkout page
      const newBookingId = res.data?.bookingDetails?._id;
      if (newBookingId) {
        navigate(`/checkout/${newBookingId}`);
      } else {
        toast.error('Failed to retrieve booking ID for payment.');
      }

    } catch (err) {
      toast.error(err?.data?.message || err?.error || 'Failed to create booking');
      console.error('Booking error:', err);
    }
  };



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
                  <div className="flex gap-2">
                    <div className="w-1/3 min-w-[105px]">
                      <Select 
                        options={[
                          { label: '🇺🇸 +1', value: '+1' },
                          { label: '🇬🇧 +44', value: '+44' },
                          { label: '🇧🇩 +880', value: '+880' },
                          { label: '🇮🇳 +91', value: '+91' },
                          { label: '🇵🇰 +92', value: '+92' },
                          { label: '🇦🇪 +971', value: '+971' },
                          { label: '🇦🇺 +61', value: '+61' },
                        ]}
                        error={errors.countryCode?.message}
                        {...register('countryCode')}
                        className="h-12 rounded-xl border-gray-200"
                      />
                    </div>
                    <div className="w-2/3 flex-1">
                      <Input 
                        type="tel" 
                        placeholder="1700 000000" 
                        icon={Phone} 
                        error={errors.phone?.message} 
                        {...register('phone')}
                        className="h-12 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
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
                    error={errors.eventDate?.message} 
                    {...register('eventDate')}
                    className="h-12 rounded-xl border-gray-200 pr-4"
                  />
                </div>

                {/* Booking Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Arrival Time</label>
                  <Select 
                    options={timeOptions}
                    error={errors.arrivalTime?.message} 
                    {...register('arrivalTime')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Guest Count */}
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Number of Guests</label>
                  <Input 
                    type="number" 
                    min="1"
                    error={errors.numberOfGuests?.message} 
                    {...register('numberOfGuests')}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Description/Note */}
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-primary-900 uppercase tracking-widest">Description / Note</label>
                  <textarea 
                    placeholder="Any special instructions or event details..." 
                    {...register('notes')}
                    className={`flex min-h-[100px] w-full rounded-xl border ${errors.notes ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-colors duration-150 ease-in-out`}
                  />
                  {errors.notes && (
                    <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>
                  )}
                </div>
              </div>

              {/* Secure Checkout / Pay Button */}
              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <Button 
                  type="submit" 
                  disabled={isBooking}
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-5 text-xs font-bold tracking-[0.2em] uppercase shadow-2xl transition-all duration-300 transform active:scale-[0.98] h-14"
                >
                  {isBooking ? 'Processing...' : 'Review Booking'}
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
                <div className="w-16 h-16 rounded-full bg-primary-900/5 text-primary-900 flex items-center justify-center font-bold font-serif text-3xl border-2 border-[#E5C37A]/20">
                  {chefName.charAt(0)}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#E5C37A] tracking-wider uppercase">Verified Professional</span>
                  <h3 className="text-lg font-bold text-primary-900 leading-snug">{chefName}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold mt-0.5">
                    <span className="text-[#E5C37A] text-sm">★</span> 5.0 <span className="text-gray-400 font-normal"></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-5 pt-5 border-t border-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">status</span>
                  <span className="text-sm font-bold text-primary-900 capitalize">{chefStatus}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">travel radius</span>
                  <span className="text-sm font-bold text-primary-900">{travelRadius} miles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">base location</span>
                  <span className="text-sm font-bold text-primary-900 text-right max-w-[150px] truncate" title={travelRadiusLocation}>{travelRadiusLocation}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">starting rate</span>
                  <span className="text-xl font-bold font-serif text-primary-900">${pricePerPerson} <span className="text-xs font-sans font-normal text-gray-400">/ person</span></span>
                </div>
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
