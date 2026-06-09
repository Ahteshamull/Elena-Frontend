import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  ChefHat,
  Utensils,
  Star,
  ShieldCheck,
  AtSign,
  Globe,
  Plus,
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
  Upload,
  Loader2
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

const ChefProfileSettings = () => {
  const [cuisines, setCuisines] = useState(['French', 'Mediterranean', 'Japanese Fusion']);
  const [newCuisine, setNewCuisine] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [gallery, setGallery] = useState([
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400"
  ]);
  const [accreditations, setAccreditations] = useState([
    { id: 'verified', label: 'Verified Professional', icon: '✓', checked: true },
    { id: 'michelin', label: 'Michelin Trained', icon: '✮', checked: true },
    { id: 'sustainability', label: 'Sustainability Award', icon: '🍃', checked: false },
    { id: 'top_rated', label: 'Top Rated Chef', icon: '★', checked: true },
  ]);
  const [radius, setRadius] = useState(50);
  const [socials, setSocials] = useState({ instagram: '', website: '' });

  const handleAddCuisine = () => {
    const trimmedCuisine = newCuisine.trim();
    if (trimmedCuisine && !cuisines.some(c => c.toLowerCase() === trimmedCuisine.toLowerCase())) {
      setCuisines([...cuisines, trimmedCuisine]);
      setNewCuisine('');
    }
  };

  const handleRemoveImage = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleToggleBadge = (id) => {
    setAccreditations(accreditations.map(b =>
      b.id === id ? { ...b, checked: !b.checked } : b
    ));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-32 relative">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Chef Profile</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">Manage your professional bio, specialties, and portfolio.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
            <div className="flex flex-col gap-10">
              {/* Profile Image & Cover */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-primary-900 font-serif italic">Professional Identity</h3>
                  <Badge variant="outline" className="border-gray-100 text-gray-400 text-[8px] uppercase tracking-widest font-black">Verified Chef</Badge>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8">
                  <div className="relative group shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1577219491135-ce39a73e4f83?auto=format&fit=crop&q=80&w=200"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover ring-4 ring-gray-50"
                    />
                    <button className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Camera size={24} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-base md:text-lg font-bold text-primary-900">Chef Julian Vasseur</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">High-quality profile images increase booking rates by up to 40%.</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-full px-6 text-[10px] font-black uppercase tracking-widest border-gray-100 h-10">Change Photo</Button>
                      <Button variant="ghost" className="rounded-full px-6 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 h-10">Remove</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Professional Headline</label>
                  <Input defaultValue="Michelin-trained French Fusion Chef" className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Years of Experience</label>
                  <Input defaultValue="12" type="number" className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">About & Culinary Philosophy</label>
                  <textarea
                    className="min-h-[150px] w-full bg-gray-50 border-transparent rounded-2xl p-6 font-medium text-sm text-gray-700 focus:ring-2 focus:ring-accent outline-none"
                    defaultValue="With over a decade of experience in Michelin-starred kitchens across Paris and Tokyo, I bring a unique blend of classical French technique and contemporary Japanese precision to every private dining experience."
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
            <div className="flex flex-col gap-8">
              <h3 className="text-xl font-bold text-primary-900 font-serif italic">Cuisine Specialties</h3>

              <div className="flex flex-wrap gap-2">
                {cuisines.map((c) => (
                  <Badge key={c} className="bg-primary-900 text-white border-none py-2 px-4 rounded-xl flex items-center gap-2 group">
                    <span className="text-[10px] font-black uppercase tracking-widest">{c}</span>
                    <button onClick={() => setCuisines(cuisines.filter(item => item !== c))} className="hover:text-accent transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Input
                  value={newCuisine}
                  onChange={(e) => setNewCuisine(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCuisine()}
                  placeholder="e.g. Italian, Thai, Vegan"
                  className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold flex-1"
                />
                <Button
                  onClick={handleAddCuisine}
                  className="bg-accent text-primary-900 hover:bg-accent/90 rounded-2xl px-8 font-black text-[10px] uppercase tracking-widest"
                >
                  Add Cuisine
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary-900 font-serif italic">Culinary Gallery</h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{gallery.length}/10 Images</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-3xl overflow-hidden shadow-sm">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => handleRemoveImage(index)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {gallery.length < 10 && (
                  <button className="aspect-square border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all group">
                    <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-accent/10 transition-colors">
                      <Upload size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Dish</span>
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="flex flex-col gap-8">
          <Card className="p-8 border-gray-100 bg-white rounded-[40px] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-primary-900 uppercase tracking-widest">Service Area</h4>
              <Badge className="bg-accent/20 text-accent border-none text-[10px] font-black">{radius}km</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input defaultValue="London, United Kingdom" className="pl-12 h-12 bg-gray-50 border-transparent rounded-xl text-xs font-bold" />
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Travel Radius</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full accent-accent h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Local Only</span>
                  <span>100km</span>
                  <span>Worldwide</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-50">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-50 text-primary-900 border-none text-[9px] font-bold">English (Native)</Badge>
                <Badge className="bg-gray-50 text-primary-900 border-none text-[9px] font-bold">French (Fluent)</Badge>
                <Badge className="bg-gray-50 text-primary-900 border-none text-[9px] font-bold text-gray-300 hover:bg-accent/10 cursor-pointer">+ Add</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-gray-100 bg-white rounded-[40px] flex flex-col gap-6">
            <h4 className="text-sm font-bold text-primary-900 uppercase tracking-widest">Social & Web</h4>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  value={socials.instagram}
                  onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                  placeholder="instagram.com/chefjulian"
                  className="pl-12 h-12 bg-gray-50 border-transparent rounded-xl text-xs font-bold"
                />
                <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <Input
                  value={socials.website}
                  onChange={(e) => setSocials({ ...socials, website: e.target.value })}
                  placeholder="www.chefjulian.com"
                  className="pl-12 h-12 bg-gray-50 border-transparent rounded-xl text-xs font-bold"
                />
                <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <Button className="bg-primary-900 text-white hover:bg-black rounded-full py-4 text-[10px] font-black uppercase tracking-widest">Save Social Links</Button>
          </Card>
        </div>
      </div>

      {/* Fixed Footer Update Button */}
      <div className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-40 px-4 md:px-0 pb-safe">
        <Button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className={`${saveSuccess ? 'bg-green-600' : 'bg-primary-900'} text-white hover:bg-black rounded-none md:rounded-full w-full md:w-auto px-8 md:px-12 py-5 md:py-7 text-xs font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 group mb-0`}
        >
          {isSaving ? 'Updating Profile...' : saveSuccess ? 'Profile Updated Successfully' : 'Update Professional Profile'}
          <div className={`w-8 h-8 rounded-full ${saveSuccess ? 'bg-white text-green-600' : 'bg-accent text-primary-900'} flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg`}>
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ChefProfileSettings;
