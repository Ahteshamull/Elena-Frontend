import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useGetProfileByUserIdQuery } from '../../redux/api/profileApi';

export default function ChefProfile() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProfileByUserIdQuery(id, { skip: !id });
  const profileResponse = data?.data;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('BIOGRAPHY');
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');

  const scrollToSection = (id) => {
    const sectionMap = {
      'BIOGRAPHY': 'biography',
      'SIGNATURE MENUS': 'menus',
      'GALLERY': 'gallery',
      'REVIEWS': 'reviews'
    };
    
    const element = document.getElementById(sectionMap[id]);
    if (element) {
      const offset = 120; // Accounting for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-serif text-2xl">Loading Chef Profile...</div>;
  if (error || !profileResponse) return <div className="min-h-screen flex items-center justify-center text-red-500 font-serif text-2xl">Chef profile not found</div>;

  const rawImage = profileResponse.image || profileResponse.userId?.image;
  const image = rawImage ? (rawImage.startsWith('http') ? rawImage : `http://localhost:8005${rawImage}`) : "";
  const fullName = profileResponse.fullName || profileResponse.displayName || profileResponse.userId?.userName || "Chef";
  const firstName = fullName.split(' ')[0];
  const specialty = profileResponse.cuisineSpecialties?.[0] || profileResponse.chefCategory?.[0] || "";
  const rating = profileResponse.rating || 0;
  const reviewCount = profileResponse.reviewCount || 0;
  const location = [profileResponse.city, profileResponse.country].filter(Boolean).join(', ') || profileResponse.travelRadiusLocation || "Location not provided";
  const aboutMe = profileResponse.aboutMe || "No biography provided.";
  const signatureMenus = profileResponse.menuBuilder || [];

  const rawGallery = [
    ...(profileResponse.dishPhotography || []),
    ...(profileResponse.eventHighlights || [])
  ];
  
  const finalGallery = rawGallery.map(img => img.startsWith('http') ? img : `http://localhost:8005${img}`);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center pb-24 font-sans antialiased">

      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-32 pb-12 lg:pt-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

          {/* Hero Image (Left) */}
          <div className="w-full lg:w-7/12 shrink-0">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center text-gray-400"
              style={{ aspectRatio: '3/2', minHeight: '400px' }}
            >
              {image ? (
                <img
                  src={image}
                  alt={fullName}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : (
                <span>No Image Available</span>
              )}
            </div>
          </div>

          {/* Hero Content (Right) */}
          <div className="w-full lg:w-5/12 flex flex-col items-start lg:pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-5">
              VERIFIED MASTER CHEF
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-4 leading-tight capitalize">
              {fullName}
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif italic text-gray-500 mb-8 font-light capitalize">
              {specialty}
            </h2>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-600 mb-8 border-b border-gray-100 pb-10 w-full">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] text-xl">★</span>
                <span className="text-gray-900">{rating} <span className="font-normal text-gray-400 ml-1">({reviewCount} Reviews)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-lg">📍</span>
                <span className="text-gray-900 capitalize">{location}</span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-lg mb-12 text-lg font-light">
              {aboutMe}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10">
              <Link to={`/book/${id}`}>
                <Button variant="primary" className="bg-black text-white px-10 py-5 rounded-lg text-xs font-bold tracking-widest uppercase shadow-xl hover:bg-gray-800 transition-all">
                  BOOK CHEF {fullName.split(' ')[0].toUpperCase()}
                </Button>
              </Link>
              <Link to={`/messages?userId=${id}`} className="group text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-3 transition-all">
                <span className="border-b border-transparent group-hover:border-gray-900 pb-1">Message {fullName.split(' ')[0]}</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Booking Sidebar */}
      <section className="w-full max-w-7xl mx-auto px-6 mt-12 md:mt-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Main Content (8 cols) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col">

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur-md pt-4 pb-6 border-b border-gray-100 mb-16 flex gap-12 overflow-x-auto no-scrollbar">
              {['BIOGRAPHY', 'SIGNATURE MENUS', 'GALLERY', 'REVIEWS'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap pb-3 border-b-2 transition-all duration-300 ${activeTab === tab
                      ? 'border-[#D4AF37] text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Biography Section */}
            <div id="biography" className="mb-24">
              <h3 className="text-4xl font-serif text-gray-900 mb-10 leading-tight">The Culinary Journey</h3>
              <div className="flex flex-col gap-8 text-gray-500 leading-relaxed text-base font-light max-w-3xl whitespace-pre-wrap">
                <p>{aboutMe}</p>
              </div>

              {/* Badges Row - Showing Languages and Specialties dynamically */}
              <div className="flex flex-wrap gap-4 mt-12">
                {profileResponse.languages?.map((lang) => (
                  <div key={lang} className="flex items-center gap-3 bg-gray-100 px-6 py-4 rounded-2xl border border-white transition-all hover:bg-white hover:shadow-md">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-700">{lang}</span>
                  </div>
                ))}
                {profileResponse.cuisineSpecialties?.map((spec) => (
                  <div key={spec} className="flex items-center gap-3 bg-gray-100 px-6 py-4 rounded-2xl border border-white transition-all hover:bg-white hover:shadow-md">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Menus Section */}
            <div id="menus" className="mb-24 border-t border-gray-100" style={{ paddingTop: '100px' }}>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 gap-4">
                <h3 className="text-4xl font-serif text-gray-900 leading-tight">Signature Menus</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {signatureMenus.length > 0 ? (
                  signatureMenus.map((menu) => (
                    <div key={menu._id} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-50 flex flex-col h-full transition-all hover:shadow-xl group">
                      <h4 className="text-2xl font-serif text-gray-900 mb-8 leading-tight group-hover:text-[#D4AF37] transition-colors">{menu.title}</h4>
                      <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-50">
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{menu.courses} COURSES</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow font-light">
                        {menu.description || "A meticulously crafted signature menu tailored for your special occasion."}
                      </p>
                      <Button variant="outline" className="w-full rounded-full border-gray-200 text-xs font-bold tracking-widest uppercase py-5 hover:bg-black hover:text-white transition-all">
                        VIEW MENU
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-light">No signature menus available at the moment.</p>
                )}
              </div>
            </div>

            {/* Culinary Gallery Section */}
            <div id="gallery" className="mb-24 border-t border-gray-100" style={{ paddingTop: '100px' }}>
              <h3 className="text-4xl font-serif text-gray-900 mb-12 leading-tight">
                Culinary Gallery
              </h3>

              {/* Gallery Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: finalGallery.length > 2 ? '2fr 1fr 1fr' : '1fr 1fr',
                  gridAutoRows: '340px',
                  gap: '16px',
                }}
              >
                {finalGallery.length > 0 ? (
                  finalGallery.slice(0, 4).map((img, idx) => {
                    // Dynamically set grid columns to replicate the asymmetric layout
                    let gridColumn = 'span 1';
                    if (finalGallery.length >= 3) {
                      if (idx === 0) gridColumn = '1 / 3'; // top left
                      if (idx === 1) gridColumn = '3'; // top right
                      if (idx === 2) gridColumn = '1'; // bottom left
                      if (idx === 3) gridColumn = '2 / 4'; // bottom right
                    }

                    return (
                      <div key={idx} className="rounded-2xl overflow-hidden shadow-lg" style={{ gridColumn }}>
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 font-light">No gallery images provided.</p>
                )}
              </div>
            </div>

            {/* Guest Reflections Section */}
            <div id="reviews" className="mb-24 border-t border-gray-100" style={{ paddingTop: '100px' }}>
              <h3 className="text-4xl font-serif text-gray-900 mb-12 leading-tight">Guest Reflections</h3>

              <div className="flex flex-col gap-8">
                {profileResponse.reviews && profileResponse.reviews.length > 0 ? (
                  profileResponse.reviews.map((review, idx) => (
                    <div key={idx} className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-50">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8">
                        <div>
                          <h5 className="font-bold text-gray-900 text-lg mb-2">{review.name}</h5>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.event}</span>
                        </div>
                        <div className="flex gap-1 text-[#FDE047] text-xl">
                          {'★'.repeat(review.rating || 5)}
                        </div>
                      </div>
                      <p className="text-gray-500 text-lg leading-relaxed font-light italic">
                        "{review.text}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-light">No reviews yet for this chef.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Sidebar (4 cols) */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 pb-12">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-50 w-full relative">

              {/* Card Header */}
              <div className="mb-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">ESTIMATED TOTAL</span>
                <div className="text-3xl font-serif text-gray-900">
                  {profileResponse?.startingPricePerPerson ? `$${profileResponse.startingPricePerPerson * guests}` : "TBD"} 
                  <span className="text-sm font-sans font-normal text-gray-400 ml-2 italic tracking-normal">for {guests} guest{guests !== 1 ? 's' : ''}</span>
                </div>
                {profileResponse?.startingPricePerPerson > 0 && (
                  <div className="text-sm text-gray-400 mt-2">
                    (${profileResponse.startingPricePerPerson} per person)
                  </div>
                )}
              </div>

              {/* Form Section */}
              <div className="flex flex-col gap-8 mb-10">
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">EVENT DATE</label>
                  <div className="relative group">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-100 px-5 py-4 text-sm text-gray-900 focus:outline-none focus:border-[#D4AF37] transition-all rounded-t-xl cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">GUESTS</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1" 
                      value={guests} 
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full bg-gray-50 border-b-2 border-gray-100 px-5 py-4 text-sm text-gray-900 focus:outline-none focus:border-[#D4AF37] transition-all rounded-t-xl"
                    />
                  </div>
                </div>
              </div>

              <Link 
                to={`/book/${id}`}
                state={{
                  chefId: id,
                  chefName: firstName,
                  guests,
                  selectedDate,
                  startingPricePerPerson: profileResponse?.startingPricePerPerson || 0,
                  totalPrice: profileResponse?.startingPricePerPerson ? profileResponse.startingPricePerPerson * guests : 0
                }}
              >
                <Button variant="primary" className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-6 text-xs font-bold tracking-widest uppercase shadow-2xl transition-all duration-300 transform active:scale-95 mb-8">
                  BOOK CHEF {firstName.toUpperCase()}
                </Button>
              </Link>

              <p className="text-[11px] text-gray-400 text-center leading-relaxed font-light px-2 italic">
                Pricing includes menu consultation, grocery shopping, preparation, service, and kitchen master clean.
              </p>
            </div>

            {/* Why Book Julian? Checklist */}
            <div className="mt-12 px-6">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Why Book {firstName}?</h4>
              <ul className="flex flex-col gap-6">
                {[
                  'Full customization and dietary requirements included.',
                  'Setup, service, and clean up for a truly relaxing evening.',
                  'Includes premium tableware and crystal glassware.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 group">
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[#D4AF37] text-[10px] shrink-0 mt-0.5 transition-colors duration-300">✓</span>
                    <span className="text-xs text-gray-500 leading-relaxed font-light transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
