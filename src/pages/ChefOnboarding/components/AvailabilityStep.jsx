import React from 'react';
import { Utensils, Coffee } from 'lucide-react';
import { Toggle } from '../../../components/ui/Toggle';
import { Calendar } from '../../../components/ui/Calendar';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const AvailabilityStep = ({
  register,
  errors,
  setValue,
  instantBooking,
  setInstantBooking,
  availableDates,
  setAvailableDates,
  selectedServiceWindows,
  setSelectedServiceWindows,
  travelRadius,
  setTravelRadius,
  city,
  country,
}) => {
  const toggleItem = (list, setList, item, fieldName) => {
    const newList = list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item];
    setList(newList);
    setValue(fieldName, newList, { shouldValidate: true });
  };

  return (
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
            <Toggle 
              checked={instantBooking} 
              onChange={(val) => { 
                setInstantBooking(val); 
                setValue('instantBooking', val); 
              }} 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-[auto,1fr] gap-16">
          <div className="relative">
            <Calendar 
              selectedDates={availableDates}
              onChange={(dates) => {
                setAvailableDates(dates);
                setValue('availableDates', dates, { shouldValidate: true });
              }}
            />
            {errors.availableDates && (
              <p className="text-xs text-red-500 absolute mt-2">{errors.availableDates.message}</p>
            )}
          </div>
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
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase mb-0.5">
                      {city || 'Los Angeles'},
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 block uppercase">
                      {country || 'CA'}
                    </span>
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

      {/* Card 2: Platform Terms & Escrow */}
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
            {errors.legalName && <p className="text-xs text-red-500">{errors.legalName.message}</p>}
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
            {errors.digitalSignature && <p className="text-xs text-red-500">{errors.digitalSignature.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AvailabilityStep };
