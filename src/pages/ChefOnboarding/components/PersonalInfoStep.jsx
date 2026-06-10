import React from 'react';
import { Controller } from 'react-hook-form';
import { Camera } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { cn } from '../../../utils/cn';
import { languagesList, cuisinesList, categories } from '../constants';

const PersonalInfoStep = ({
  register,
  control,
  errors,
  setValue,
  image,
  setImage,
  selectedLanguages,
  setSelectedLanguages,
  selectedCuisines,
  setSelectedCuisines,
  selectedCategory,
  setSelectedCategory,
}) => {
  const toggleItem = (list, setList, item, fieldName) => {
    const newList = list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item];
    setList(newList);
    setValue(fieldName, newList, { shouldValidate: true });
  };

  return (
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
            <label className="w-32 h-32 rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent transition-colors overflow-hidden relative">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files?.[0]) setImage(e.target.files[0]);
                }} 
              />
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera size={24} className="text-gray-300" />
                  <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase">Upload</span>
                </>
              )}
            </label>
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
            <Input 
              placeholder="Julian Vasseur" 
              {...register('fullName')} 
              error={errors.fullName?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Display Name</label>
            <Input 
              placeholder="Chef Julian" 
              {...register('displayName')} 
              error={errors.displayName?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Email Address</label>
            <Input 
              placeholder="julian@vasseur-dining.com" 
              {...register('email')} 
              error={errors.email?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Phone Number</label>
            <Input 
              placeholder="+33 6 12 34 56 78" 
              {...register('phone')} 
              error={errors.phone?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">City</label>
            <Input 
              placeholder="Paris" 
              {...register('city')} 
              error={errors.city?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Country</label>
            <Input 
              placeholder="France" 
              {...register('country')} 
              error={errors.country?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
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
            <Input 
              placeholder="Executive Chef" 
              {...register('position')} 
              error={errors.position?.message} 
              className="h-14 bg-[#FAFAFA] border-transparent" 
            />
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
  );
};

export { PersonalInfoStep };
