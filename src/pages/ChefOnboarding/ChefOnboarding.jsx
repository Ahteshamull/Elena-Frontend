import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
import { OnboardingLayout } from './components/OnboardingLayout';
import { Button } from '../../components/ui/Button';
import { useSetupProfileMutation } from '../../redux/api/profileApi';
import { toast } from 'react-toastify';

import { 
  step1Schema, 
  step2Schema, 
  step3Schema 
} from './constants';

import { PersonalInfoStep } from './components/PersonalInfoStep';
import { PortfolioStep } from './components/PortfolioStep';
import { AvailabilityStep } from './components/AvailabilityStep';
import { SummarySidebar } from './components/SummarySidebar';
import { ProfilePreviewModal } from './components/ProfilePreviewModal';

const ChefOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState(['ENGLISH']);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const role = user?.role?.toLowerCase() || '';
        if (role !== 'chef') {
          navigate('/');
        }
      } catch (e) {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const [selectedCuisines, setSelectedCuisines] = useState([
    'FRENCH', 'Vegetarian', 'Organic', 'Interfusion', 'Healthy meal prep'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('PERSONAL');
  const [selectedMenuTier, setSelectedMenuTier] = useState('GOURMET');
  
  // Step 3 specific states
  const [instantBooking, setInstantBooking] = useState(false);
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);
  const [selectedServiceWindows, setSelectedServiceWindows] = useState(['Dinner']);
  const [travelRadius, setTravelRadius] = useState(45);
  const [availableDates, setAvailableDates] = useState([]);

  // File states
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const [governmentId, setGovernmentId] = useState(null);
  const [foodSafetyCertificate, setFoodSafetyCertificate] = useState(null);
  const [dishPhotography, setDishPhotography] = useState(null);
  const [eventHighlights, setEventHighlights] = useState(null);

  const [formData, setFormData] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const [setupProfile, { isLoading: isSubmittingAPI }] = useSetupProfileMutation();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: {
      languages: ['ENGLISH'],
      cuisines: ['FRENCH', 'Vegetarian', 'Organic', 'Interfusion', 'Healthy meal prep'],
      category: 'PERSONAL',
      bio: '',
      selectedMenuTier: 'GOURMET',
      instantBooking: false,
      alwaysAvailable: false,
      serviceWindows: ['Dinner'],
      travelRadius: 45,
      currency: 'USD ($)',
      termsAgreed: false,
      availableDates: [],
    },
  });

  const allFormValues = watch();

  useEffect(() => {
    console.log('====== CHEF ONBOARDING ACTIVE SELECTIONS ======');
    console.log('Current Step:', step);
    console.log('Form Inputs:', allFormValues);
    console.log('Selected Languages:', selectedLanguages);
    console.log('Selected Cuisines:', selectedCuisines);
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Menu Tier:', selectedMenuTier);
    console.log('Instant Booking Enabled:', instantBooking);
    console.log('Always Available Enabled:', alwaysAvailable);
    console.log('Selected Service Windows:', selectedServiceWindows);
    console.log('Travel Radius:', travelRadius);
    console.log('Available Dates (Calendar):', availableDates);
    console.log('Uploaded Files:', {
      profileImage: image ? image.name : null,
      cv: cv ? cv.name : null,
      governmentId: governmentId ? governmentId.name : null,
      foodSafetyCertificate: foodSafetyCertificate ? foodSafetyCertificate.name : null,
      dishPhotography: dishPhotography ? dishPhotography.name : null,
      eventHighlights: eventHighlights ? eventHighlights.name : null,
    });
    console.log('================================================');
  }, [
    step,
    allFormValues,
    selectedLanguages,
    selectedCuisines,
    selectedCategory,
    selectedMenuTier,
    instantBooking,
    alwaysAvailable,
    selectedServiceWindows,
    travelRadius,
    availableDates,
    image,
    cv,
    governmentId,
    foodSafetyCertificate,
    dishPhotography,
    eventHighlights,
  ]);

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep(prev => prev + 1);
  };

  const onSubmit = async (data) => {
    if (step < 3) {
      setFormData(prev => ({ ...prev, ...data }));
      nextStep();
    } else {
      const finalData = { ...formData, ...data };
      const payloadData = {
        fullName: finalData.fullName,
        displayName: finalData.displayName,
        email: finalData.email,
        phone: finalData.phone,
        city: finalData.city,
        country: finalData.country,
        languages: finalData.languages,
        yearsOfExperience: finalData.experience,
        currentPosition: finalData.position,
        cuisineSpecialties: finalData.cuisines,
        chefCategory: [(finalData.category || '').toLowerCase()],
        aboutMe: finalData.bio,
        startingPricePerPerson: Number(finalData.pricePerPerson),
        sampleMenuTitle: finalData.menuTitle,
        minimumBookingAmount: Number(finalData.minBooking),
        menuDescription: finalData.menuDescription,
        menuBuilder: [
          {
            title: finalData.menuTitle || "Signature Dish",
            courses: 3,
            price: Number(finalData.pricePerPerson) || 120
          }
        ],
        instagramProfile: finalData.instagram || "",
        portfolioWebsite: finalData.website || "",
        instantBooking: finalData.instantBooking,
        alwaysAvailable: finalData.alwaysAvailable,
        availableDates: availableDates,
        serviceWindows: finalData.serviceWindows,
        travelRadius: finalData.travelRadius,
        travelRadiusLocation: `${finalData.city || ''}, ${finalData.country || ''}`.toUpperCase(),
        agreedToTerms: finalData.termsAgreed,
        fullLegalName: finalData.legalName,
        digitalSignature: finalData.digitalSignature,
        isProfileCompleted: true
      };

      console.log('====== ONBOARDING SUBMISSION ======');
      console.log('Raw Form Data:', finalData);
      console.log('Formatted API Payload:', payloadData);
      console.log('Attached Files:', { image, cv, governmentId, foodSafetyCertificate, dishPhotography, eventHighlights });
      console.log('===================================');

      const submitFormData = new FormData();
      submitFormData.append('data', JSON.stringify(payloadData));
      if (image) submitFormData.append('image', image);
      if (cv) submitFormData.append('cv', cv);
      if (governmentId) submitFormData.append('governmentId', governmentId);
      if (foodSafetyCertificate) submitFormData.append('foodSafetyCertificate', foodSafetyCertificate);
      
      if (dishPhotography) {
        if (Array.isArray(dishPhotography)) {
          dishPhotography.forEach(file => submitFormData.append('dishPhotography', file));
        } else {
          submitFormData.append('dishPhotography', dishPhotography);
        }
      }
      
      if (eventHighlights) {
        if (Array.isArray(eventHighlights)) {
          eventHighlights.forEach(file => submitFormData.append('eventHighlights', file));
        } else {
          submitFormData.append('eventHighlights', eventHighlights);
        }
      }

      try {
        const response = await setupProfile(submitFormData).unwrap();
        if (response.success || response) {
          toast.success(response.message || 'Profile setup successfully! Please log in.');
          // Clear credentials on completed onboarding
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
          document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
          document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
          
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Failed to setup profile', err);
        toast.error(err?.data?.message || 'Failed to setup profile. Please try again.');
      }
    }
  };

  const onInvalid = (errors) => {
    console.error('====== ONBOARDING VALIDATION FAILED ======');
    console.error(errors);
    console.error('==========================================');
    toast.error('Please fill in all required fields and resolve errors.');
  };

  return (
    <OnboardingLayout currentStep={step} wider={step === 3} noCard={step === 3}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-16">
        
        {step === 1 && (
          <PersonalInfoStep
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            image={image}
            setImage={setImage}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedCuisines={selectedCuisines}
            setSelectedCuisines={setSelectedCuisines}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {step === 2 && (
          <PortfolioStep
            register={register}
            errors={errors}
            setValue={setValue}
            selectedMenuTier={selectedMenuTier}
            setSelectedMenuTier={setSelectedMenuTier}
            cv={cv}
            setCv={setCv}
            governmentId={governmentId}
            setGovernmentId={setGovernmentId}
            foodSafetyCertificate={foodSafetyCertificate}
            setFoodSafetyCertificate={setFoodSafetyCertificate}
            dishPhotography={dishPhotography}
            setDishPhotography={setDishPhotography}
            eventHighlights={eventHighlights}
            setEventHighlights={setEventHighlights}
          />
        )}

        {step === 3 && (
          <div className="grid lg:grid-cols-[1fr,320px] gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Left Column: Main Sections */}
            <AvailabilityStep
              register={register}
              errors={errors}
              setValue={setValue}
              instantBooking={instantBooking}
              setInstantBooking={setInstantBooking}
              alwaysAvailable={alwaysAvailable}
              setAlwaysAvailable={setAlwaysAvailable}
              availableDates={availableDates}
              setAvailableDates={setAvailableDates}
              selectedServiceWindows={selectedServiceWindows}
              setSelectedServiceWindows={setSelectedServiceWindows}
              travelRadius={travelRadius}
              setTravelRadius={setTravelRadius}
              city={watch('city')}
              country={watch('country')}
            />

            {/* Right Column: Sidebar */}
            <SummarySidebar
              isSubmitting={isSubmitting}
              isSubmittingAPI={isSubmittingAPI}
              onPreviewClick={() => setShowPreview(true)}
              onBackClick={() => setStep(prev => prev - 1)}
            />
          </div>
        )}

        {/* Footer Action (Step 1 & 2 only) */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-4 pt-8">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep(prev => prev - 1)}
                className="px-12 py-5 rounded-none font-bold text-xs tracking-widest uppercase transition-all"
              >
                Go Back
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-900 text-white px-12 py-5 rounded-none font-bold text-xs tracking-widest uppercase flex items-center gap-3 shadow-2xl transition-all hover:scale-[1.02]"
            >
              Continue <MoveRight size={16} />
            </Button>
          </div>
        )}

      </form>

      {/* Profile Preview Modal */}
      {showPreview && (
        <ProfilePreviewModal
          onClose={() => setShowPreview(false)}
          image={image}
          watch={watch}
          availableDates={availableDates}
        />
      )}
    </OnboardingLayout>
  );
};

export { ChefOnboarding };
