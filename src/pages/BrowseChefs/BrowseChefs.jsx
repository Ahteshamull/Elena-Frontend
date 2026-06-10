import React, { useState } from 'react';
import FiltersSidebar from './components/FiltersSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { chefsData } from '../../constants/mockData';

export default function BrowseChefs() {
  const [filters, setFilters] = useState({
    location: '',
    cuisines: [],
    maxPrice: 1000
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = (e, chefId) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login', { state: { from: `/book/${chefId}` } });
    } else {
      navigate(`/book/${chefId}`);
    }
  };

  const filteredChefs = chefsData.filter(chef => {
    // Location Filter
    if (filters.location && filters.location.trim() !== '') {
      const match = chef.location?.toLowerCase().includes(filters.location.toLowerCase());
      if (!match) return false;
    }

    // Price Filter
    if (parseInt(chef.price) > filters.maxPrice) return false;

    // Cuisine Filter (simple keyword match against specialty for mock data)
    if (filters.cuisines.length > 0) {
      const hasCuisine = filters.cuisines.some(c => chef.specialty.toLowerCase().includes(c.toLowerCase()));
      if (!hasCuisine) return false;
    }


    return true;
  });

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen">
      
      {/* Page Header */}
      <div className="mb-8 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-3 md:mb-4 text-primary-900 leading-tight">The Culinary Collection</h1>
        <p className="text-gray-500 max-w-2xl text-base md:text-lg">
          Exquisite private dining experiences curated by world-renowned chefs, brought directly to your table.
        </p>
      </div>

      {/* Mobile: Filter toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-full text-sm font-semibold text-primary-900 hover:border-primary-900 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filters {filters.cuisines.length > 0 && `(${filters.cuisines.length})`}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Sidebar */}
        <FiltersSidebar
          filters={filters}
          setFilters={setFilters}
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <span className="text-sm font-semibold text-primary-900">
              <span className="font-bold">{filteredChefs.length}</span> Chefs available in {filters.location || "selected area"}
            </span>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <span className="text-sm text-gray-500">Sort By:</span>
              <select className="bg-transparent border-none outline-none text-primary-900 text-sm font-semibold cursor-pointer">
                <option>HIGHEST RATED</option>
                <option>PRICE: LOW TO HIGH</option>
                <option>PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredChefs.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500">
                No chefs found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              filteredChefs.map((chef) => (
              <Card key={chef.id} className="group border-transparent shadow-none transition-all duration-300">
                <Link to={`/chef-profile`} className="block relative h-72 overflow-hidden rounded-t-2xl">
                  <img 
                    src={chef.image} 
                    alt={chef.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Top Left Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {chef.badges.map(badge => (
                      <span key={badge} className="bg-white/95 backdrop-blur-sm text-primary-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </Link>
                <CardContent className="pt-6 px-4 bg-[#FAFAFA]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-serif font-medium">{chef.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <span className="text-accent">★</span> {chef.rating} <span className="text-gray-400 font-normal">({chef.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">{chef.specialty}</p>
                  
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {chef.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Starting From</div>
                      <div className="text-lg font-bold text-primary-900">
                        ${chef.price} <span className="text-sm font-normal text-gray-500">/ person</span>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Link to={`/chef-profile`} className="text-xs font-bold text-gray-500 hover:text-primary-900 uppercase tracking-widest transition-colors">
                        View Profile
                      </Link>
                      <Button 
                        variant="primary" 
                        className="rounded-none px-6 py-3 font-semibold text-sm"
                        onClick={(e) => handleBookNow(e, chef.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-gray-200">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary-900 hover:text-primary-900 transition-colors">
              &lt;
            </button>
            <div className="flex items-center gap-6 text-sm font-medium">
              <span className="border-b-2 border-primary-900 pb-1 text-primary-900 cursor-pointer">01</span>
              <span className="text-gray-500 hover:text-primary-900 cursor-pointer pb-1">02</span>
              <span className="text-gray-500 hover:text-primary-900 cursor-pointer pb-1">03</span>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary-900 hover:text-primary-900 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
