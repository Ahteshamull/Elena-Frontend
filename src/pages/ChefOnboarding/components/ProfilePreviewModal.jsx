import React from 'react';
import { User, Clock, Banknote } from 'lucide-react';

const ProfilePreviewModal = ({
  onClose,
  image,
  watch,
  availableDates,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[40px] w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl custom-scrollbar">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-serif text-primary-900 mb-8">Profile Preview</h2>
        
        <div className="flex flex-col gap-10">
          {/* Personal Info */}
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
              {image ? (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User size={32} />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-primary-900">
                {watch('fullName') || 'Your Name'}
              </h3>
              <p className="text-sm font-medium text-gray-500">
                "{watch('displayName') || 'Display Name'}"
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {watch('city') || 'City'}, {watch('country') || 'Country'}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Professional Bio</h4>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">
              {watch('bio') || 'No bio provided yet.'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center justify-center">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Category</span>
              <span className="text-sm font-bold text-primary-900">{watch('category')}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center justify-center">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Experience</span>
              <span className="text-sm font-bold text-primary-900">{watch('experience') || '0'} Yrs</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center justify-center">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Starting Price</span>
              <span className="text-sm font-bold text-accent">${watch('pricePerPerson') || '0'}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center justify-center">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Min Booking</span>
              <span className="text-sm font-bold text-primary-900">${watch('minBooking') || '0'}</span>
            </div>
          </div>

          {/* Specialties & Languages */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Cuisines</h4>
              <div className="flex flex-wrap gap-2">
                {(watch('cuisines') || []).map(c => (
                  <span key={c} className="text-xs font-bold bg-accent/10 text-accent px-3 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {(watch('languages') || []).map(l => (
                  <span key={l} className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Preview */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Sample Menu: {watch('menuTitle') || 'Untitled Menu'}</h4>
            <div className="border border-gray-100 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-black text-accent tracking-widest uppercase">
                {watch('selectedMenuTier') || 'Tier'}
              </div>
              <p className="text-sm text-gray-500 italic mb-4">"{watch('menuDescription') || 'No description provided.'}"</p>
              
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-xs font-bold text-primary-900 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock size={14} className="text-gray-400" /> 3 Courses
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-primary-900 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Banknote size={14} className="text-gray-400" /> ${watch('pricePerPerson') || '0'} / Person
                </span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Service Details</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-6 rounded-2xl">
              <p>
                <strong>Available Dates:</strong> {availableDates.length > 0 ? availableDates.join(', ') : 'None selected'}
              </p>
              <p><strong>Service Windows:</strong> {(watch('serviceWindows') || []).join(', ')}</p>
              <p>
                <strong>Travel Radius:</strong> Up to {watch('travelRadius')} miles around {watch('city') || 'your city'}
              </p>
              <p><strong>Instant Booking:</strong> {watch('instantBooking') ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePreviewModal };
