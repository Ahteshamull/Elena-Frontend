import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Camera, Ship, Home, PartyPopper, User, Plus, MoveRight, 
  CloudUpload, Image, LayoutGrid, ShieldCheck, FileText, 
  Banknote, AtSign, Globe, Check, Coffee, Utensils, Star,
  Clock, MapPin, CreditCard, Lock, Eye, AlertCircle, ChevronDown, CheckCircle2
} from 'lucide-react';
import { OnboardingLayout } from './components/OnboardingLayout';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { UploadArea } from '../../components/ui/UploadArea';
import { Toggle } from '../../components/ui/Toggle';
import { Calendar } from '../../components/ui/Calendar';
import { cn } from '../../utils/cn';

// --- Validation Schemas ---
const step1Schema = z.object({
  fullName: z.string().min(2, 'Required'),
  displayName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Required'),
  city: z.string().min(2, 'Required'),
  country: z.string().min(2, 'Required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  experience: z.string().min(1, 'Required'),
  position: z.string().min(2, 'Required'),
  cuisines: z.array(z.string()).min(1, 'Select at least one specialty'),
  category: z.string().min(1, 'Required'),
  bio: z.string().min(50, 'Bio should be at least 50 characters').max(500, 'Max 500 characters'),
});

const step2Schema = z.object({
  pricePerPerson: z.string().min(1, 'Required'),
  minBooking: z.string().min(1, 'Required'),
  menuTitle: z.string().min(2, 'Required'),
  menuDescription: z.string().min(10, 'Required'),
  selectedMenuTier: z.string().min(1, 'Required'),
  instagram: z.string().optional(),
  website: z.string().optional(),
});

const step3Schema = z.object({
  instantBooking: z.boolean(),
  serviceWindows: z.array(z.string()).min(1, 'Select at least one service window'),
  travelRadius: z.number().min(5).max(100),
  taxId: z.string().min(5, 'Required'),
  currency: z.string().min(1, 'Required'),
  termsAgreed: z.boolean().refine(val => val === true, 'You must agree to the terms'),
  legalName: z.string().min(2, 'Required'),
  digitalSignature: z.string().min(2, 'Required'),
});

const languagesList = ['ENGLISH', 'FRENCH', 'ITALIAN', 'JAPANESE', 'SPANISH'];
const cuisinesList = [
  'Asian', 'Seafood chef', 'Pastry chef', 'FRENCH', 'Grill & Bbq', 'Kosher',
  'Vegan', 'Vegetarian', 'Gluten-free', 'Keto', 'Paleo', 'Halal',
  'Farm-to-Table', 'Organic', 'Mediterranean', 'Indian',
  'Peruvian', 'Interfusion', 'Mexican', 'Italian', 'Morocan', 'Testing menu',
  'Spanish & tapas', 'Dairy free', 'Middle eastern', 'Healthy meal prep'
];

const ChefOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState(['ENGLISH']);
  const [selectedCuisines, setSelectedCuisines] = useState(['FRENCH', 'Vegetarian', 'Organic', 'Interfusion', 'Healthy meal prep']);
  const [selectedCategory, setSelectedCategory] = useState('PERSONAL');
  const [selectedMenuTier, setSelectedMenuTier] = useState('GOURMET');
  
  // Step 3 specific states
  const [instantBooking, setInstantBooking] = useState(false);
  const [selectedServiceWindows, setSelectedServiceWindows] = useState(['Dinner']);
  const [travelRadius, setTravelRadius] = useState(45);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema),
    defaultValues: {
      languages: ['ENGLISH'],
      cuisines: ['FRENCH', 'Vegetarian', 'Organic', 'Interfusion', 'Healthy meal prep'],
      category: 'PERSONAL',
      bio: '',
      selectedMenuTier: 'GOURMET',
      instantBooking: false,
      serviceWindows: ['Dinner'],
      travelRadius: 45,
      currency: 'USD ($)',
      termsAgreed: false,
    },
  });

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep(prev => prev + 1);
  };

  const onSubmit = (data) => {
    if (step < 3) {
      nextStep();
    } else {
      console.log('Onboarding complete:', data);
      // Mark profile setup as complete in localStorage
      const existing = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...existing,
        profileSetup: true,
      }));
      // Navigate to the chef dashboard — navbar will now show "Dashboard"
      navigate('/chef-dashboard', { replace: true });
    }
  };

  const toggleItem = (list, setList, item, fieldName) => {
    const newList = list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item];
    setList(newList);
    setValue(fieldName, newList, { shouldValidate: true });
  };

  const categories = [
    { id: 'YACHT', label: 'YACHT', icon: Ship },
    { id: 'VILLA', label: 'VILLA', icon: Home },
    { id: 'EVENT', label: 'EVENT', icon: PartyPopper },
    { id: 'PERSONAL', label: 'PERSONAL', icon: User },
  ];

  const menuTiers = [
    { id: 'BISTRO', title: 'Bistro Selection', courses: '3 Courses', price: '$120+', icon: Coffee },
    { id: 'GOURMET', title: 'Gourmet Experience', courses: '5 Courses', price: '$250+', icon: Utensils, recommended: true },
    { id: 'CHEFS_TABLE', title: 'Chef\'s Table', courses: '8 Courses', price: '$450+', icon: Star },
  ];

  return (
    <OnboardingLayout currentStep={step} wider={step === 3} noCard={step === 3}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
        
        {step === 1 && (
          <div className="flex flex-col gap-16 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Section 01: Personal Information */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">Section 01</span>
                <h2 className="text-4xl font-serif text-primary-900">Personal Information</h2>
              </div>

              {/* Profile Upload */}
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent transition-colors overflow-hidden">
                    <Camera size={24} className="text-gray-300" />
                    <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase">Upload</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 max-w-xs">
                  <span className="text-sm font-bold text-primary-900">Profile Portrait</span>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    High-resolution headshots in professional attire are recommended to establish trust with patrons.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Full Name</label>
                  <Input placeholder="Julian Vasseur" {...register('fullName')} error={errors.fullName?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Display Name</label>
                  <Input placeholder="Chef Julian" {...register('displayName')} error={errors.displayName?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Email Address</label>
                  <Input placeholder="julian@vasseur-dining.com" {...register('email')} error={errors.email?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Phone Number</label>
                  <Input placeholder="+33 6 12 34 56 78" {...register('phone')} error={errors.phone?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">City</label>
                  <Input placeholder="Paris" {...register('city')} error={errors.city?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Country</label>
                  <Input placeholder="France" {...register('country')} error={errors.country?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Languages Spoken</label>
                <div className="flex flex-wrap gap-2">
                  {languagesList.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleItem(selectedLanguages, setSelectedLanguages, lang, 'languages')}
                      className={cn(
                        "px-6 py-2 rounded-full border text-[10px] font-bold tracking-widest transition-all",
                        selectedLanguages.includes(lang) 
                          ? "bg-black text-white border-black" 
                          : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 02: Professional Information */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">Section 02</span>
                <h2 className="text-4xl font-serif text-primary-900">Professional Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Years of Experience</label>
                  <Select 
                    options={[
                      { value: '1-3', label: '1-3 Years' },
                      { value: '3-5', label: '3-5 Years' },
                      { value: '5-10', label: '5-10 Years' },
                      { value: '10+', label: '10+ Years' }
                    ]}
                    {...register('experience')}
                    error={errors.experience?.message}
                    className="bg-[#FAFAFA] border-transparent"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Current Position</label>
                  <Input placeholder="Executive Chef" {...register('position')} error={errors.position?.message} className="h-14 bg-[#FAFAFA] border-transparent" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Cuisine Specialties</label>
                <div className="flex flex-wrap gap-3">
                  {cuisinesList.map(cuisine => (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => toggleItem(selectedCuisines, setSelectedCuisines, cuisine, 'cuisines')}
                      className={cn(
                        "px-4 py-2.5 rounded-full border text-[10px] font-bold transition-all",
                        selectedCuisines.includes(cuisine) 
                          ? "bg-accent/20 border-accent text-primary-900" 
                          : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                      )}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Chef Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(id);
                        setValue('category', id, { shouldValidate: true });
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-4",
                        selectedCategory === id 
                          ? "border-primary-900 bg-white ring-1 ring-primary-900 shadow-sm" 
                          : "border-transparent bg-[#F5F5F0] hover:bg-gray-100"
                      )}
                    >
                      <Icon size={24} className={cn(selectedCategory === id ? "text-primary-900" : "text-gray-400")} />
                      <span className={cn("text-[8px] font-bold tracking-[0.2em]", selectedCategory === id ? "text-primary-900" : "text-gray-400")}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">About / Professional Bio</label>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea 
                      placeholder="Share your culinary philosophy, signature dishes, and professional journey..."
                      maxLength={500}
                      {...field}
                      error={errors.bio?.message}
                      className="bg-[#FAFAFA] border-transparent"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-16 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Step Header */}
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-serif text-primary-900">Portfolio & Verification</h2>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
                Present your culinary artistry and establish trust with our exclusive clientele through detailed menus and verified documentation.
              </p>
            </div>

            {/* Section: Menu & Pricing */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col gap-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-1">Menu & Pricing</h3>
                  <p className="text-xs text-gray-400 font-medium">Define your value and signature offerings.</p>
                </div>
                <Badge variant="success" className="bg-[#F8F9FA] border border-gray-100 text-primary-900 gap-2 px-4 py-2 lowercase first-letter:uppercase">
                  <Banknote size={14} className="text-accent" /> Tiered Pricing Active
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Starting Price per Person</label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <Input placeholder="150" {...register('pricePerPerson')} error={errors.pricePerPerson?.message} className="pl-6 border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Sample Menu Title</label>
                  <Input placeholder="Le Printemps Signature Tasting" {...register('menuTitle')} error={errors.menuTitle?.message} className="border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Minimum Booking Amount</label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <Input placeholder="600" {...register('minBooking')} error={errors.minBooking?.message} className="pl-6 border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Menu Description</label>
                  <Input placeholder="Describe the seasonal ingredients and culinary" {...register('menuDescription')} error={errors.menuDescription?.message} className="border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <label className="text-sm font-bold text-primary-900">Menu Builder</label>
                <div className="grid md:grid-cols-3 gap-6">
                  {menuTiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedMenuTier(tier.id);
                        setValue('selectedMenuTier', tier.id);
                      }}
                      className={cn(
                        "relative flex flex-col items-start p-6 rounded-2xl border transition-all text-left group",
                        selectedMenuTier === tier.id 
                          ? "border-accent bg-white shadow-lg ring-1 ring-accent" 
                          : "border-gray-100 bg-white hover:border-gray-200"
                      )}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8860B] text-white text-[8px] font-black tracking-widest py-1 px-3 rounded-full">
                          RECOMMENDED
                        </div>
                      )}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-6 transition-colors",
                        selectedMenuTier === tier.id ? "bg-accent/10 text-accent" : "bg-[#FFF9E6] text-accent"
                      )}>
                        <tier.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-primary-900 mb-1">{tier.title}</h4>
                        <p className="text-[10px] text-gray-400 font-medium mb-3">{tier.courses}</p>
                        <p className="text-sm font-bold text-primary-900">{tier.price}</p>
                      </div>
                      <div className={cn(
                        "absolute top-6 right-6 w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                        selectedMenuTier === tier.id ? "bg-accent border-accent text-white" : "border-gray-200 text-transparent"
                      )}>
                        {selectedMenuTier === tier.id ? <Check size={12} strokeWidth={4} /> : <Plus size={12} className="text-gray-300" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section: Visual Portfolio */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-primary-900">Visual Portfolio</h3>
                <p className="text-xs text-gray-400 font-medium">High-resolution imagery is essential for premium bookings.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <UploadArea 
                  title="Dish Photography" 
                  subtitle="Drag or click to upload your finest plates (JPG, PNG)" 
                  icon={CloudUpload}
                  className="bg-white"
                />
                <UploadArea 
                  title="Event Highlights" 
                  subtitle="Photos of you in action or beautifully set tables" 
                  icon={LayoutGrid}
                  className="bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 mt-4">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Instagram Profile</label>
                  <div className="relative">
                    <AtSign size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="chef_artisan" {...register('instagram')} className="pl-6 border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Portfolio Website</label>
                  <Input placeholder="https://yourname.com" {...register('website')} className="border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" />
                </div>
              </div>
            </div>

            {/* Section: Identity & Verification */}
            <div className="bg-[#FAFAFA] rounded-[40px] p-8 md:p-12 flex flex-col gap-10 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900">Identity & Verification</h3>
                  <p className="text-xs text-gray-400 font-medium">Encrypted and secure document storage.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between group hover:border-accent transition-colors cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-accent">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-900 mb-1">Curriculum Vitae</h4>
                      <p className="text-[10px] text-gray-400 font-medium italic">chef_profile_2024.pdf</p>
                    </div>
                  </div>
                  <Badge variant="accent" className="bg-accent/10 text-accent px-4 py-1.5">UPLOADED</Badge>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between group hover:border-accent transition-colors cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-accent">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-900 mb-1">Government ID</h4>
                      <p className="text-[10px] text-gray-400 font-medium italic">Passport_Scan.jpg</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-gray-100 text-gray-400 px-4 py-1.5">PENDING</Badge>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-100 flex items-center justify-between group hover:border-accent transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-accent transition-colors">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-900 mb-1">Food Safety Certificate</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Required for culinary service</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-accent group-hover:text-accent transition-all">
                    <Plus size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid lg:grid-cols-[1fr,320px] gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
            
            {/* Left Column: Main Sections */}
            <div className="flex flex-col gap-12">
              
              {/* Header */}
              <div className="flex flex-col gap-4">
                <h2 className="text-5xl font-serif text-primary-900">Availability & Publish</h2>
                <p className="text-gray-500 max-w-2xl text-sm leading-relaxed font-medium">
                  Refine your service schedule, connect your secure payout account, and finalize your application to join the global Epicurean network.
                </p>
              </div>

              {/* Card 1: Service Availability */}
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 md:p-12 flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">Service Availability</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[8px] font-black text-gray-400 tracking-widest uppercase">Instant Booking</span>
                    <Toggle checked={instantBooking} onChange={(val) => { setInstantBooking(val); setValue('instantBooking', val); }} />
                  </div>
                </div>

                <div className="grid md:grid-cols-[auto,1fr] gap-16">
                  <Calendar />
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Service Windows</label>
                      <div className="flex flex-col gap-3">
                        {['Dinner', 'Brunch', 'Lunch'].map((window) => (
                          <button
                            key={window}
                            type="button"
                            onClick={() => toggleItem(selectedServiceWindows, setSelectedServiceWindows, window, 'serviceWindows')}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                              selectedServiceWindows.includes(window)
                                ? "border-accent bg-[#FFF9E6]"
                                : "border-gray-100 bg-white hover:border-gray-200"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {window === 'Dinner' && <Utensils size={18} className="text-accent" />}
                              {window === 'Brunch' && <Coffee size={18} className="text-accent" />}
                              {window === 'Lunch' && <Utensils size={18} className="text-accent" />}
                              <span className="text-xs font-bold text-primary-900">{window}</span>
                            </div>
                            {selectedServiceWindows.includes(window) && (
                              <span className="text-[8px] font-black text-accent tracking-widest uppercase">Active</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Travel Radius</label>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end mb-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary-900">Up to {travelRadius} miles</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-bold text-gray-400 block uppercase mb-0.5">Los Angeles,</span>
                            <span className="text-[9px] font-bold text-gray-400 block uppercase">CA</span>
                          </div>
                        </div>
                        <input 
                          type="range" 
                          min="5" 
                          max="100" 
                          value={travelRadius} 
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setTravelRadius(val);
                            setValue('travelRadius', val);
                          }}
                          className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Payment & Payouts */}
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 md:p-12 flex flex-col gap-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <CreditCard size={24} className="text-primary-900" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-primary-900 mb-1">Payment & Payouts</h3>
                    <p className="text-xs text-gray-400 font-medium">We use Stripe Connect to ensure fast and secure transactions.</p>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center p-2">
                      <span className="text-white font-black text-xs">stripe</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-gray-400">Status:</span>
                        <span className="text-[10px] font-bold text-red-500">Not Connected</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium max-w-[180px]">Connect your account to accept client payments.</p>
                    </div>
                  </div>
                  <Button className="bg-black hover:bg-gray-900 text-white text-[9px] font-black tracking-[0.2em] px-8 py-4 rounded-full uppercase shadow-lg">
                    Set Up Stripe
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Tax Identification Number</label>
                    <Input placeholder="XX-XXXXXXX" {...register('taxId')} error={errors.taxId?.message} className="h-14 bg-[#FAFAFA] border-transparent rounded-2xl" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Currency Preference</label>
                    <div className="relative">
                      <Select 
                        options={[
                          { value: 'USD ($)', label: 'USD ($)' },
                          { value: 'EUR (€)', label: 'EUR (€)' },
                          { value: 'GBP (£)', label: 'GBP (£)' }
                        ]}
                        {...register('currency')}
                        error={errors.currency?.message}
                        className="h-14 bg-[#FAFAFA] border-transparent rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Platform Terms & Escrow */}
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 md:p-12 flex flex-col gap-10">
                <h3 className="text-2xl font-bold text-primary-900">Platform Terms & Escrow</h3>
                
                <div className="bg-[#F8F9FA] rounded-3xl p-8 max-h-[320px] overflow-y-auto border border-gray-100 custom-scrollbar">
                  <div className="flex flex-col gap-6 text-xs leading-relaxed text-gray-500 font-medium">
                    <div>
                      <h4 className="font-bold text-primary-900 mb-2">1. The Epicurean Standard</h4>
                      <p>Epicurean serves as a facilitator for bespoke culinary experiences. By joining our platform, you agree to maintain the highest standards of food safety, professional conduct, and aesthetic presentation. All chefs are independent contractors and are responsible for their own insurance and certifications.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-900 mb-2">2. Financial Escrow Policy</h4>
                      <p>To protect both the host and the chef, Epicurean utilizes a secure escrow system. Funds are collected at the time of booking and held until 24 hours after the service has been successfully completed. Cancellations are subject to our tiered refund policy.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-900 mb-2">3. Privacy & Non-Disclosure</h4>
                      <p>You may be granted access to the private residences of high-net-worth individuals. Absolute discretion and confidentiality regarding client identity, location, and property are mandatory conditions of your membership.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-2">
                  <input 
                    type="checkbox" 
                    id="terms"
                    {...register('termsAgreed')}
                    className="mt-1 w-5 h-5 rounded border-gray-200 text-accent focus:ring-accent"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-500 font-medium leading-relaxed">
                    I have read and agree to the Epicurean Terms of Service and Professional Standards.
                  </label>
                </div>
                {errors.termsAgreed && <p className="text-xs text-red-500">{errors.termsAgreed.message}</p>}

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Full Legal Name</label>
                    <div className="h-28 rounded-3xl border border-gray-100 bg-[#FAFAFA] flex items-center justify-center p-6 relative">
                      <Input 
                        placeholder="Sign within this field" 
                        {...register('legalName')} 
                        className="bg-transparent border-none text-center font-serif text-xl focus:ring-0 italic" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Digital Signature</label>
                    <div className="h-28 rounded-3xl border border-gray-100 bg-[#FAFAFA] flex items-center justify-center p-6 relative">
                      <Input 
                        placeholder="Sign within this field" 
                        {...register('digitalSignature')} 
                        className="bg-transparent border-none text-center font-serif text-xl focus:ring-0 italic" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="flex flex-col gap-8 lg:sticky lg:top-32 h-fit mt-[180px]">
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 flex flex-col gap-8">
                <h3 className="text-xl font-bold text-primary-900">Onboarding Summary</h3>
                
                <div className="flex flex-col gap-6">
                  {[
                    { label: 'Identity & Background', status: 'VERIFIED', icon: CheckCircle2, active: true },
                    { label: 'Culinary Signature', status: 'COMPLETED', icon: CheckCircle2, active: true },
                    { label: 'Portfolio Media', status: '12 ASSETS UPLOADED', icon: CheckCircle2, active: true },
                    { label: 'Payment Setup', status: 'ACTION REQUIRED', icon: AlertCircle, active: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <item.icon size={18} className={cn(item.active ? "text-[#2E7D32]" : "text-gray-200")} />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-primary-900 leading-tight">{item.label}</span>
                        <span className={cn("text-[8px] font-black tracking-widest uppercase mt-1", item.active ? "text-[#2E7D32]" : "text-red-500")}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-gray-50">
                  <Button 
                    type="submit" 
                    className="bg-black hover:bg-gray-900 text-white w-full py-5 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase shadow-xl"
                  >
                    Submit for Approval
                  </Button>
                  <Button variant="outline" className="w-full py-5 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase border-gray-100 hover:bg-gray-50">
                    Profile Preview
                  </Button>
                </div>

                <div className="flex justify-between items-center px-2">
                  <button type="button" onClick={() => setStep(2)} className="text-[9px] font-black text-gray-400 tracking-widest uppercase hover:text-primary-900">Back</button>
                  <button type="button" className="text-[9px] font-black text-gray-400 tracking-widest uppercase hover:text-primary-900">Save Draft</button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-[#FAFAFA] rounded-[32px] p-6 border border-gray-100 flex flex-col items-center text-center gap-4">
                <span className="text-[8px] font-black text-gray-400 tracking-[0.2em] uppercase">Elite Concierge Trust</span>
                <div className="flex gap-6 text-gray-300">
                  <ShieldCheck size={20} />
                  <Lock size={20} />
                  <ShieldCheck size={20} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Action (Step 1 & 2 only) */}
        {step < 3 && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-900 text-white px-12 py-5 rounded-none font-bold text-xs tracking-widest uppercase flex items-center gap-3 shadow-2xl transition-all hover:scale-[1.02]"
            >
              Continue <MoveRight size={16} />
            </Button>
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => setStep(prev => prev - 1)}
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-900 transition-colors"
              >
                Go Back
              </button>
            )}
          </div>
        )}

      </form>
    </OnboardingLayout>
  );
};

export { ChefOnboarding };
