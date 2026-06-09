import React, { useState } from 'react';
import { X } from 'lucide-react';

const CUISINES = [
  "Italian",
  "Mediterranean",
  "Japanese / Sushi / Omakase",
  "Asian Fusion",
  "Thai",
  "Vietnamese",
  "Korean",
  "Chinese",
  "French",
  "Mexican",
  "Peruvian",
  "Cuban",
  "Argentine",
  "American Steakhouse",
  "BBQ Experience",
  "Seafood",
  "Hibachi Experience",
  "Middle Eastern",
  "Lebanese",
  "Turkish",
  "Greek",
  "Moroccan",
  "Indian",
  "Spanish / Tapas",
  "Paella Experience",
  "Vegan",
  "Vegetarian",
  "Healthy Meal Prep",
  "Organic Cuisine",
  "Gluten-Free",
  "Paleo",
  "Keto",
  "Wellness Cuisine",
  "Farm-to-Table",
  "Brunch Experience",
  "Romantic Dinner",
  "Family Style Dining",
  "Tasting Menu Experience",
  "Wine Pairing Dinner"
];

export default function FiltersSidebar({ filters, setFilters, isOpen, onClose }) {
  const [showAllCuisines, setShowAllCuisines] = useState(false);

  const toggleCuisine = (cuisine) => {
    if (filters.cuisines.includes(cuisine)) {
      setFilters({ ...filters, cuisines: filters.cuisines.filter(c => c !== cuisine) });
    } else {
      setFilters({ ...filters, cuisines: [...filters.cuisines, cuisine] });
    }
  };

  const LOCATIONS = [
    "New York City, NY",
    "Los Angeles, CA",
    "Miami, FL",
    "London, UK",
    "Paris, France",
    "Dubai, UAE"
  ];

  const handleLocationKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentVal = filters.location.toLowerCase();
      const matches = LOCATIONS.filter(loc => loc.toLowerCase().includes(currentVal));
      if (matches.length === 1) {
        setFilters({ ...filters, location: matches[0] });
      }
      e.target.blur();
    }
  };

  const visibleCuisines = showAllCuisines ? CUISINES : CUISINES.slice(0, 5);

  const filterContent = (
    <div className="flex flex-col gap-8">
      {/* Location */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Location</h4>
        <input 
          type="text" 
          list="location-options"
          placeholder="Enter location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          onKeyDown={handleLocationKeyDown}
          className="w-full bg-transparent border-b border-gray-300 outline-none text-primary-900 focus:border-primary-900 py-2 text-sm" 
        />
        <datalist id="location-options">
          {LOCATIONS.map(loc => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
      </div>

      {/* Cuisine */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Cuisine</h4>
        <div className="flex flex-col gap-3">
          {visibleCuisines.map((cuisine) => (
            <label key={cuisine} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.cuisines.includes(cuisine)}
                onChange={() => toggleCuisine(cuisine)}
                className="w-4 h-4 rounded-sm border-gray-300 text-primary-900 focus:ring-primary-900 cursor-pointer" 
              />
              <span className="text-sm text-primary-900">{cuisine}</span>
            </label>
          ))}
          {CUISINES.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllCuisines(!showAllCuisines)}
              className="text-left text-xs font-bold text-accent hover:text-[#B89020] transition-all mt-1 cursor-pointer w-max"
            >
              {showAllCuisines ? "Show Less" : "View All"}
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price Range</h4>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-900 mb-2" 
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$100</span>
          <span className="text-primary-900 font-medium">Up to ${filters.maxPrice} per guest</span>
          <span>$5000</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Availability</h4>
        <input 
          type="date" 
          className="w-full bg-transparent border-b border-gray-300 outline-none text-primary-900 focus:border-primary-900 py-2 text-sm cursor-pointer" 
        />
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-10 border-r border-gray-200 pr-10 pb-10">
        {filterContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-primary-900">Filters</h3>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {filterContent}
              <button
                onClick={onClose}
                className="mt-8 w-full bg-primary-900 text-white rounded-full py-4 text-sm font-bold uppercase tracking-widest"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
