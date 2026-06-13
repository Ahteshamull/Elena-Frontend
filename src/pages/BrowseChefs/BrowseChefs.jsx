import React, { useState, useEffect } from 'react';
import FiltersSidebar from './components/FiltersSidebar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGetAllUsersQuery, useGetFavoritesQuery, useToggleFavoriteMutation } from '../../redux/api/userApi';
import { Heart } from 'lucide-react';

export default function BrowseChefs() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const urlLocation = new URLSearchParams(search).get('location') || '';
  const urlDate = new URLSearchParams(search).get('date') || '';

  const [filters, setFilters] = useState({
    location: urlLocation,
    date: urlDate,
    cuisines: [],
    maxPrice: 100
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('HIGHEST RATED');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const { data: response, isLoading } = useGetAllUsersQuery({ 
    role: 'chef',
    page: currentPage,
    limit: itemsPerPage
  });
  
  const userToken = localStorage.getItem('accessToken');
  const { data: favoritesRes } = useGetFavoritesQuery(undefined, { skip: !userToken });
  const favoriteChefs = favoritesRes?.data || [];
  const [toggleFavorite] = useToggleFavoriteMutation();
  
  const allChefs = response?.data || [];
  const meta = response?.meta || {};
  const backendTotalPages = meta.totalPages || 1;

  const handleBookNow = (e, chefId) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login', { state: { from: `/book/${chefId}` } });
    } else {
      navigate(`/book/${chefId}`);
    }
  };

  const handleToggleFavorite = async (e, chefId) => {
    e.preventDefault();
    e.stopPropagation();
    const user = localStorage.getItem('accessToken');
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await toggleFavorite(chefId).unwrap();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const filteredChefs = allChefs.filter(user => {
    const profile = user.profile || {};
    
    // Location Filter
    if (filters.location && filters.location.trim() !== '') {
      const chefLocation = `${profile.city || ''} ${profile.country || ''} ${profile.travelRadiusLocation || ''}`.toLowerCase();
      const match = chefLocation.includes(filters.location.toLowerCase());
      if (!match) return false;
    }

    // Price Filter
    const startingPrice = profile.startingPricePerPerson || 0;
    if (startingPrice > filters.maxPrice) return false;

    // Date Filter
    if (filters.date) {
      const selectedDate = new Date(filters.date).setHours(0, 0, 0, 0);
      const availableDates = profile.availableDates || [];
      const hasAvailableDate = availableDates.some(d => {
        const chefDate = new Date(d);
        if (isNaN(chefDate.getTime())) return false;
        return chefDate.setHours(0, 0, 0, 0) === selectedDate;
      });
      if (!hasAvailableDate) return false;
    }

    // Cuisine Filter
    if (filters.cuisines.length > 0) {
      const chefCuisines = profile.cuisineSpecialties || [];
      const hasCuisine = filters.cuisines.some(c => 
        chefCuisines.some(chefCuisine => chefCuisine.toLowerCase().includes(c.toLowerCase()))
      );
      if (!hasCuisine) return false;
    }

    return true;
  });

  const sortedChefs = [...filteredChefs].sort((a, b) => {
    const profileA = a.profile || {};
    const profileB = b.profile || {};
    
    if (sortBy === 'PRICE: LOW TO HIGH') {
      return (profileA.startingPricePerPerson || 0) - (profileB.startingPricePerPerson || 0);
    }
    if (sortBy === 'PRICE: HIGH TO LOW') {
      return (profileB.startingPricePerPerson || 0) - (profileA.startingPricePerPerson || 0);
    }
    // HIGHEST RATED
    return (parseFloat(profileB.rating) || 5) - (parseFloat(profileA.rating) || 5);
  });

  const totalPages = backendTotalPages;
  const paginatedChefs = sortedChefs;

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
              <span className="font-bold">{sortedChefs.length}</span> Chefs available {filters.location ? `in ${filters.location}` : ""}
            </span>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <span className="text-sm text-gray-500">Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none text-primary-900 text-sm font-semibold cursor-pointer"
              >
                <option value="HIGHEST RATED">HIGHEST RATED</option>
                <option value="PRICE: LOW TO HIGH">PRICE: LOW TO HIGH</option>
                <option value="PRICE: HIGH TO LOW">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500">
                Loading chefs...
              </div>
            ) : sortedChefs.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500">
                No chefs found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              paginatedChefs.map((user) => {
                const profile = user.profile || {};
                const id = user._id;
                const name = profile.fullName || profile.displayName || user.userName || "Verified Chef";
                
                const rawImage = profile.image || user.image;
                const image = rawImage 
                  ? (rawImage.startsWith('http') ? rawImage : `http://localhost:8005${rawImage}`) 
                  : '/b_1.png';
                  
                const rating = profile.rating || "5.0";
                const reviews = profile.reviewCount || "0";
                const specialty =
                  profile.cuisineSpecialties?.[0] ||
                  profile.chefCategory?.[0] ||
                  "Executive Chef";
                  
                const tags = profile.cuisineSpecialties || [];
                const startingPrice = profile.startingPricePerPerson || 100;
                const isVerified = user.isVerify;
                
                const city = profile.city || "Location not set";
                const availableDates = profile.availableDates || [];
                const nextAvailableDate = availableDates.length > 0 
                  ? new Date(Math.min(...availableDates.map(d => new Date(d)))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : "Check availability";

                const isFavorite = favoriteChefs.some(fav => fav.favoritedUserId?._id === id || fav.favoritedUserId === id);

                return (
                  <Card key={id} className="group border-transparent shadow-none transition-all duration-300">
                    <Link to={`/chef/${id}`} className="block relative h-72 overflow-hidden rounded-t-2xl">
                      <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Top Left Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {isVerified && (
                          <span className="bg-white/95 backdrop-blur-sm text-primary-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                            Verified Professional
                          </span>
                        )}
                      </div>
                      
                      {/* Favorite Button */}
                      <div className="absolute top-4 right-4 z-10">
                        <button 
                          onClick={(e) => handleToggleFavorite(e, id)}
                          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-lg hover:bg-white transition-colors"
                        >
                          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 2} />
                        </button>
                      </div>
                    </Link>
                    <CardContent className="pt-6 px-4 bg-[#FAFAFA]">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-serif font-medium capitalize">{name}</h3>
                        <div className="flex items-center gap-1 text-sm font-semibold">
                          <span className="text-accent">★</span> {rating} <span className="text-gray-400 font-normal">({reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 mb-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500 capitalize">
                          <span className="text-gray-400">📍</span> {city}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="text-gray-400">📅</span> {availableDates.length > 0 ? `Next Available: ${nextAvailableDate}` : nextAvailableDate}
                        </div>
                      </div>
                      
                      {/* Tag Pills (Cuisine Specialties) */}
                      <div className="flex flex-wrap gap-2 mb-8 mt-2">
                        {tags.slice(0, 4).map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full capitalize">
                            {tag}
                          </span>
                        ))}
                        {tags.length > 4 && (
                          <span className="bg-gray-100 text-gray-400 text-xs font-medium px-3 py-1 rounded-full">
                            +{tags.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Bottom Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Starting From</div>
                          <div className="text-lg font-bold text-primary-900">
                            ${startingPrice} <span className="text-sm font-normal text-gray-500">/ person</span>
                          </div>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Link to={`/chef/${id}`} className="text-xs font-bold text-gray-500 hover:text-primary-900 uppercase tracking-widest transition-colors">
                            View Profile
                          </Link>
                          <Button 
                            variant="primary" 
                            className="rounded-none px-6 py-3 font-semibold text-sm"
                            onClick={(e) => handleBookNow(e, id)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-gray-200">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary-900 hover:text-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              <div className="flex items-center gap-6 text-sm font-medium">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <span 
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={
                      currentPage === index + 1 
                      ? "border-b-2 border-primary-900 pb-1 text-primary-900 cursor-pointer" 
                      : "text-gray-500 hover:text-primary-900 cursor-pointer pb-1"
                    }
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary-900 hover:text-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
