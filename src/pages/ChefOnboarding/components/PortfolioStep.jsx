import React from 'react';
import { 
  Banknote, Check, Plus, CloudUpload, LayoutGrid, AtSign, 
  ShieldCheck, FileText, Star 
} from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { UploadArea } from '../../../components/ui/UploadArea';
import { cn } from '../../../utils/cn';
import { menuTiers } from '../constants';

const PortfolioStep = ({
  register,
  errors,
  setValue,
  selectedMenuTier,
  setSelectedMenuTier,
  cv,
  setCv,
  governmentId,
  setGovernmentId,
  foodSafetyCertificate,
  setFoodSafetyCertificate,
  dishPhotography,
  setDishPhotography,
  eventHighlights,
  setEventHighlights,
}) => {
  return (
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
              <Input 
                placeholder="150" 
                {...register('pricePerPerson')} 
                error={errors.pricePerPerson?.message} 
                className="pl-6 border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" 
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Sample Menu Title</label>
            <Input 
              placeholder="Le Printemps Signature Tasting" 
              {...register('menuTitle')} 
              error={errors.menuTitle?.message} 
              className="border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" 
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Minimum Booking Amount</label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <Input 
                placeholder="600" 
                {...register('minBooking')} 
                error={errors.minBooking?.message} 
                className="pl-6 border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" 
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Menu Description</label>
            <Input 
              placeholder="Describe the seasonal ingredients and culinary" 
              {...register('menuDescription')} 
              error={errors.menuDescription?.message} 
              className="border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" 
            />
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
            accept="image/*"
            selectedFile={dishPhotography}
            onFileSelect={setDishPhotography}
          />
          <UploadArea 
            title="Event Highlights" 
            subtitle="Photos of you in action or beautifully set tables" 
            icon={LayoutGrid}
            className="bg-white"
            accept="image/*"
            selectedFile={eventHighlights}
            onFileSelect={setEventHighlights}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 mt-4">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Instagram Profile</label>
            <div className="relative">
              <AtSign size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="chef_artisan" 
                {...register('instagram')} 
                className="pl-6 border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" 
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-primary-900 tracking-widest uppercase">Portfolio Website</label>
            <Input 
              placeholder="https://yourname.com" 
              {...register('website')} 
              className="border-transparent border-b-gray-200 rounded-none bg-transparent h-10 py-0" 
            />
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
          <label className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between group hover:border-accent transition-colors cursor-pointer block">
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files?.[0]) setCv(e.target.files[0]);
              }} 
            />
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-accent">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-900 mb-1">Curriculum Vitae</h4>
                <p className="text-[10px] text-gray-400 font-medium italic">{cv ? cv.name : 'Upload your CV'}</p>
              </div>
            </div>
            {cv ? (
              <Badge variant="accent" className="bg-accent/10 text-accent px-4 py-1.5">UPLOADED</Badge>
            ) : (
              <Badge variant="default" className="bg-gray-100 text-gray-400 px-4 py-1.5">PENDING</Badge>
            )}
          </label>

          <label className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between group hover:border-accent transition-colors cursor-pointer block">
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files?.[0]) setGovernmentId(e.target.files[0]);
              }} 
            />
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-accent">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-900 mb-1">Government ID</h4>
                <p className="text-[10px] text-gray-400 font-medium italic">{governmentId ? governmentId.name : 'Upload your ID'}</p>
              </div>
            </div>
            {governmentId ? (
              <Badge variant="accent" className="bg-accent/10 text-accent px-4 py-1.5">UPLOADED</Badge>
            ) : (
              <Badge variant="default" className="bg-gray-100 text-gray-400 px-4 py-1.5">PENDING</Badge>
            )}
          </label>

          <label className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-100 flex items-center justify-between group hover:border-accent transition-all cursor-pointer block">
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files?.[0]) setFoodSafetyCertificate(e.target.files[0]);
              }} 
            />
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-accent transition-colors">
                <Star size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-900 mb-1">Food Safety Certificate</h4>
                <p className="text-[10px] text-gray-400 font-medium">{foodSafetyCertificate ? foodSafetyCertificate.name : 'Required for culinary service'}</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-accent group-hover:text-accent transition-all">
              {foodSafetyCertificate ? <Check size={16} /> : <Plus size={16} />}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export { PortfolioStep };
