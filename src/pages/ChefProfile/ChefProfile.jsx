import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useGetProfileByUserIdQuery } from "../../redux/api/profileApi";
import { useGetUserReviewsQuery } from "../../redux/api/reviewApi";
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from "../../redux/api/userApi";
import { useCreateConversationMutation } from "../../redux/api/chatApi";
import { Heart, X } from "lucide-react";

export default function ChefProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProfileByUserIdQuery(id, {
    skip: !id,
  });
  const profileResponse = data?.data;

  const { data: reviewsRes } = useGetUserReviewsQuery(id, { skip: !id });
  const reviewsData = reviewsRes?.data?.reviews || [];
  const metaData = reviewsRes?.data?.meta || {};

  const userToken = localStorage.getItem("accessToken");
  const { data: favoritesRes } = useGetFavoritesQuery(undefined, {
    skip: !userToken,
  });
  const favoriteChefs = favoritesRes?.data || [];
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [createConversation, { isLoading: isCreatingChat }] =
    useCreateConversationMutation();

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    if (!userToken) {
      navigate("/login");
      return;
    }
    try {
      await toggleFavorite(id).unwrap();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleMessageChef = async (e) => {
    e.preventDefault();
    if (!userToken) {
      navigate("/login");
      return;
    }
    try {
      const res = await createConversation(id).unwrap();
      const newConvId = res.data._id;
      navigate(`/messages?convId=${newConvId}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  const isFavorite = favoriteChefs.some(
    (fav) => fav._id === id || fav.id === id,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("BIOGRAPHY");
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  // Menu Modal State
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const openMenuModal = (menu) => {
    setSelectedMenu(menu);
    setIsMenuModalOpen(true);
  };

  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
    setTimeout(() => setSelectedMenu(null), 300);
  };

  const scrollToSection = (id) => {
    const sectionMap = {
      BIOGRAPHY: "biography",
      "SIGNATURE MENUS": "menus",
      GALLERY: "gallery",
      REVIEWS: "reviews",
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
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-serif text-2xl">
        Loading Chef Profile...
      </div>
    );
  if (error || !profileResponse)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-serif text-2xl">
        Chef profile not found
      </div>
    );

  const rawImage = profileResponse.image || profileResponse.userId?.image;
  const image = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${import.meta.env.VITE_BASE_URL}${rawImage}`
    : "";
  const fullName =
    profileResponse.fullName ||
    profileResponse.displayName ||
    profileResponse.userId?.userName ||
    "Chef";
  const firstName = fullName.split(" ")[0];
  const specialty =
    profileResponse.cuisineSpecialties?.[0] ||
    profileResponse.chefCategory?.[0] ||
    "";
  const rating = Number(
    metaData.averageRating || profileResponse.userId?.averageRating || 0,
  ).toFixed(1);
  const reviewCount =
    metaData.reviewsReceived || profileResponse.userId?.totalReviews || 0;
  const location =
    [profileResponse.city, profileResponse.country]
      .filter(Boolean)
      .join(", ") ||
    profileResponse.travelRadiusLocation ||
    "Location not provided";
  const aboutMe = profileResponse.aboutMe || "No biography provided.";
  const signatureMenus = profileResponse.menuBuilder || [];

  const rawGallery = [
    ...(profileResponse.dishPhotography || []),
    ...(profileResponse.eventHighlights || []),
  ];

  const finalGallery = rawGallery.map((img) =>
    img.startsWith("http") ? img : `${import.meta.env.VITE_BASE_URL}${img}`,
  );

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center pb-24 font-sans antialiased">
      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-32 pb-12 lg:pt-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          {/* Hero Image (Left) */}
          <div className="w-full lg:w-7/12 shrink-0">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center text-gray-400 aspect-[4/3] md:aspect-[3/2]"
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
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4 md:mb-5">
              VERIFIED MASTER CHEF
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-3 md:mb-4 leading-tight capitalize">
              {fullName}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-500 mb-6 md:mb-8 font-light capitalize">
              {specialty}
            </h2>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-600 mb-8 border-b border-gray-100 pb-10 w-full">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] text-xl">★</span>
                <span className="text-gray-900">
                  {rating}{" "}
                  <span className="font-normal text-gray-400 ml-1">
                    ({reviewCount} Reviews)
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-lg">📍</span>
                <span className="text-gray-900 capitalize">{location}</span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-lg mb-8 md:mb-12 text-base md:text-lg font-light">
              {aboutMe}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-10 w-full sm:w-auto">
                <Link to={`/book/${id}`} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    className="w-full sm:w-auto bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-lg text-xs font-bold tracking-widest uppercase shadow-xl hover:bg-gray-800 transition-all"
                  >
                    BOOK CHEF {fullName.split(" ")[0].toUpperCase()}
                  </Button>
                </Link>
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
                  <button
                    onClick={handleMessageChef}
                    disabled={isCreatingChat}
                    className="group text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2 md:gap-3 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span className="border-b border-transparent group-hover:border-gray-900 pb-1">
                      {isCreatingChat
                        ? "Starting Chat..."
                        : `Message ${fullName.split(" ")[0]}`}
                    </span>
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <button
                    onClick={handleToggleFavorite}
                    className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-red-500 shadow-sm hover:bg-gray-50 transition-colors"
                    title={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <Heart
                      size={20}
                      fill={isFavorite ? "currentColor" : "none"}
                      strokeWidth={isFavorite ? 0 : 2}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Booking Sidebar */}
      <section className="w-full max-w-7xl mx-auto px-6 mt-12 md:mt-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Main Content (8 cols) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col order-2 lg:order-1">
            {/* Navigation Tabs */}
            <div className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur-md pt-4 pb-4 md:pb-6 border-b border-gray-100 mb-10 md:mb-16 flex gap-6 md:gap-12 overflow-x-auto no-scrollbar">
              {["BIOGRAPHY", "SIGNATURE MENUS", "GALLERY", "REVIEWS"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => scrollToSection(tab)}
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap pb-2 md:pb-3 border-b-2 transition-all duration-300 ${
                      activeTab === tab
                        ? "border-[#D4AF37] text-gray-900"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            {/* Biography Section */}
            <div id="biography" className="mb-16 md:mb-24 scroll-mt-32">
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 md:mb-10 leading-tight">
                The Culinary Journey
              </h3>
              <div className="flex flex-col gap-6 md:gap-8 text-gray-500 leading-relaxed text-sm md:text-base font-light max-w-3xl whitespace-pre-wrap">
                <p>{aboutMe}</p>
              </div>

              {/* Badges Row - Showing Languages and Specialties dynamically */}
              <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-12">
                {profileResponse.languages?.map((lang) => (
                  <div
                    key={lang}
                    className="flex items-center gap-2 md:gap-3 bg-gray-100 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white transition-all hover:bg-white hover:shadow-md"
                  >
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-700">
                      {lang}
                    </span>
                  </div>
                ))}
                {profileResponse.cuisineSpecialties?.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 md:gap-3 bg-gray-100 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white transition-all hover:bg-white hover:shadow-md"
                  >
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-700">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Menus Section */}
            <div
              id="menus"
              className="mb-16 md:mb-24 border-t border-gray-100 scroll-mt-32"
              style={{ paddingTop: "60px" }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 md:mb-12 gap-4">
                <h3 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
                  Signature Menus
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {signatureMenus.length > 0 ? (
                  signatureMenus.map((menu) => (
                    <div
                      key={menu._id}
                      className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-50 flex flex-col h-full transition-all hover:shadow-xl group"
                    >
                      {(menu.menuImage || menu.image) && (
                        <div className="w-full h-48 rounded-2xl overflow-hidden mb-8">
                          <img
                            src={
                              (menu.menuImage || menu.image).startsWith("http")
                                ? menu.menuImage || menu.image
                                : `${import.meta.env.VITE_BASE_URL}${menu.menuImage || menu.image}`
                            }
                            alt={menu.title || menu.menuTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <h4 className="text-2xl font-serif text-gray-900 mb-8 leading-tight group-hover:text-[#D4AF37] transition-colors">
                        {menu.title || menu.menuTitle}
                      </h4>
                      <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-50">
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                          {menu.courses} COURSES
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow font-light">
                        {menu.description ||
                          "A meticulously crafted signature menu tailored for your special occasion."}
                      </p>
                      <Button
                        onClick={() => openMenuModal(menu)}
                        variant="outline"
                        className="w-full rounded-full border-gray-200 text-xs font-bold tracking-widest uppercase py-5 hover:bg-black hover:text-white transition-all"
                      >
                        VIEW MENU
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-light">
                    No signature menus available at the moment.
                  </p>
                )}
              </div>
            </div>

            {/* Culinary Gallery Section */}
            <div
              id="gallery"
              className="mb-16 md:mb-24 border-t border-gray-100 scroll-mt-32"
              style={{ paddingTop: "60px" }}
            >
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 md:mb-12 leading-tight">
                Culinary Gallery
              </h3>

              {/* Gallery Slider */}
              <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 md:pb-8 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
                {finalGallery.length > 0 ? (
                  finalGallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="min-w-full sm:min-w-[400px] h-[300px] sm:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm flex-shrink-0 snap-start relative group"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-light px-2">
                    No gallery images provided.
                  </p>
                )}
              </div>
            </div>

            {/* Guest Reflections Section */}
            <div
              id="reviews"
              className="mb-16 md:mb-24 border-t border-gray-100 scroll-mt-32"
              style={{ paddingTop: "60px" }}
            >
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 md:mb-12 leading-tight">
                Guest Reflections
              </h3>

              <div className="flex flex-col gap-8">
                {reviewsData && reviewsData.length > 0 ? (
                  reviewsData.map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8">
                        <div>
                          <h5 className="font-bold text-gray-900 text-lg mb-2">
                            {review.reviewerId?.userName ||
                              review.reviewerId?.name ||
                              "Guest"}
                          </h5>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {review.bookingId?.eventLocation || "Private Event"}
                          </span>
                        </div>
                        <div className="flex gap-1 text-[#FDE047] text-xl">
                          {"★".repeat(review.rating || 5)}
                        </div>
                      </div>
                      <p className="text-gray-500 text-lg leading-relaxed font-light italic">
                        "{review.comment}"
                      </p>
                      <span className="text-xs text-gray-400 mt-4 block">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-light">
                    No reviews yet for this chef.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Sidebar (4 cols) */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 pb-12 order-1 lg:order-2">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-50 w-full relative">
              {/* Card Header */}
              <div className="mb-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                  ESTIMATED TOTAL
                </span>
                <div className="text-3xl font-serif text-gray-900">
                  {profileResponse?.startingPricePerPerson
                    ? `$${profileResponse.startingPricePerPerson * guests}`
                    : "TBD"}
                  <span className="text-sm font-sans font-normal text-gray-400 ml-2 italic tracking-normal">
                    for {guests} guest{guests !== 1 ? "s" : ""}
                  </span>
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
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                    EVENT DATE
                  </label>
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
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                    GUESTS
                  </label>
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
                  startingPricePerPerson:
                    profileResponse?.startingPricePerPerson || 0,
                  totalPrice: profileResponse?.startingPricePerPerson
                    ? profileResponse.startingPricePerPerson * guests
                    : 0,
                }}
              >
                <Button
                  variant="primary"
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-6 text-xs font-bold tracking-widest uppercase shadow-2xl transition-all duration-300 transform active:scale-95 mb-8"
                >
                  BOOK CHEF {firstName.toUpperCase()}
                </Button>
              </Link>

              <p className="text-[11px] text-gray-400 text-center leading-relaxed font-light px-2 italic">
                Pricing includes menu consultation, grocery shopping,
                preparation, service, and kitchen master clean.
              </p>
            </div>

            {/* Why Book Julian? Checklist */}
            <div className="mt-12 px-6">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">
                Why Book {firstName}?
              </h4>
              <ul className="flex flex-col gap-6">
                {[
                  "Full customization and dietary requirements included.",
                  "Setup, service, and clean up for a truly relaxing evening.",
                  "Includes premium tableware and crystal glassware.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 group">
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[#D4AF37] text-[10px] shrink-0 mt-0.5 transition-colors duration-300">
                      ✓
                    </span>
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
      {/* View Menu Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-2xl font-serif text-primary-900 italic">
                Menu Details
              </h3>
              <button
                onClick={closeMenuModal}
                className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 md:p-8">
              {selectedMenu && (
                <div className="flex flex-col gap-8">
                  {selectedMenu.menuImage && (
                    <div className="w-full h-64 rounded-2xl overflow-hidden">
                      <img
                        src={
                          selectedMenu.menuImage.startsWith("http")
                            ? selectedMenu.menuImage
                            : `${import.meta.env.VITE_BASE_URL}${selectedMenu.menuImage}`
                        }
                        alt={selectedMenu.title || selectedMenu.menuTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-accent tracking-widest uppercase">
                      {selectedMenu.menuCategory || "Signature"} •{" "}
                      {selectedMenu.courses || selectedMenu.numberOfCourse || 0}{" "}
                      Courses
                    </span>
                    <h2 className="text-3xl font-serif text-gray-900 leading-tight">
                      {selectedMenu.title || selectedMenu.menuTitle}
                    </h2>
                  </div>

                  <div className="text-gray-600 font-light leading-relaxed">
                    {selectedMenu.description ||
                      "A meticulously crafted signature menu tailored for your special occasion. This menu showcases the best seasonal ingredients and the chef's culinary mastery."}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 tracking-widest uppercase mb-4">
                      Course Breakdown Overview
                    </h4>
                    <p className="text-sm text-gray-500 italic">
                      This is a{" "}
                      {selectedMenu.courses || selectedMenu.numberOfCourse || 0}
                      -course experience. The exact items will be discussed and
                      finalized between you and the chef to accommodate your
                      dietary preferences and seasonal availability.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
              <Button
                onClick={closeMenuModal}
                variant="outline"
                className="rounded-xl px-6 py-2.5 text-sm font-bold border-gray-200"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  closeMenuModal();
                  const target = document.getElementById("booking-section");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="bg-primary-900 text-white rounded-xl px-8 py-2.5 text-sm font-bold hover:bg-black shadow-lg shadow-gray-200"
              >
                Book This Menu
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
