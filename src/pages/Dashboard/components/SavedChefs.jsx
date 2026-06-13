import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ChefHat, 
  Heart, 
  ArrowRight,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useGetFavoritesQuery, useToggleFavoriteMutation } from '../../../redux/api/userApi';

const SavedChefs = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('accessToken');
  
  const { data: favoritesRes, isLoading } = useGetFavoritesQuery(undefined, { skip: !userToken });
  const [toggleFavorite] = useToggleFavoriteMutation();
  
  const savedChefs = favoritesRes?.data || [];

  const handleToggleFavorite = async (e, chefId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleFavorite(chefId).unwrap();
    } catch (error) {
      console.error("Failed to unfavorite:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Saved Chefs</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">Your curated collection of elite culinary talent.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-3 text-center py-10 text-gray-500">Loading your favorites...</div>
        ) : savedChefs.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500 bg-white rounded-3xl border border-gray-100">
            You haven't saved any chefs yet.
          </div>
        ) : (
          savedChefs.map((fav) => {
            const chefUser = fav.favoritedUserId || {};
            const profile = chefUser.profile || {};
            const chefId = chefUser._id;
            
            const name = profile.fullName || profile.displayName || chefUser.userName || "Verified Chef";
            const specialty = profile.cuisineSpecialties?.[0] || profile.chefCategory?.[0] || "Executive Chef";
            const location = `${profile.city || ''} ${profile.country || ''}`.trim() || "Location not set";
            const rating = profile.rating || "5.0";
            const reviews = profile.reviewCount || "0";
            
            const rawImage = profile.image || chefUser.image;
            const image = rawImage 
              ? (rawImage.startsWith('http') ? rawImage : `http://localhost:8005${rawImage}`) 
              : '/b_1.png';
              
            const isVerified = chefUser.isVerify;
            const price = profile.startingPricePerPerson ? `$${profile.startingPricePerPerson}` : "$100";

            return (
              <Card key={chefId || Math.random()} className="group overflow-hidden border-transparent bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-[32px]">
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate(`/chef/${chefId}`)}>
                  <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={(e) => handleToggleFavorite(e, chefId)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-lg hover:bg-white transition-colors"
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-accent text-primary-900 border-none font-black text-[8px] tracking-widest px-3">
                        TOP RATED
                      </Badge>
                      {isVerified && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <ShieldCheck size={12} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-1 cursor-pointer" onClick={() => navigate(`/chef/${chefId}`)}>
                    <h3 className="text-xl font-bold text-primary-900 leading-tight">{name}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Utensils size={14} className="text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">{specialty}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-xs font-medium">{location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-primary-900">{rating}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Starting from</span>
                        <span className="text-lg font-bold text-primary-900">{price}<span className="text-[10px] text-gray-400">/pp</span></span>
                      </div>
                      <Button 
                        className="rounded-full bg-primary-900 text-white hover:bg-black text-[9px] font-black tracking-widest uppercase px-6 py-3 shadow-lg"
                        onClick={() => navigate(`/book/${chefId}`)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}

        {/* Placeholder for adding more */}
        <button 
          onClick={() => navigate('/browse-chefs')}
          className="flex flex-col items-center justify-center p-8 md:p-12 rounded-[32px] border-2 border-dashed border-gray-100 bg-gray-50/30 hover:bg-gray-50 hover:border-accent transition-all group gap-4 min-h-[280px] md:min-h-[450px]"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover:text-accent group-hover:scale-110 transition-all shadow-sm">
            <ChefHat size={32} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-bold text-primary-900">Discover More</h4>
            <p className="text-xs text-gray-400 font-medium max-w-[180px]">Add more elite talent to your private collection.</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-accent font-black text-[10px] tracking-widest uppercase">
            Browse Chefs <ArrowRight size={14} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SavedChefs;
