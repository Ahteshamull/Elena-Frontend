import React, { useState } from "react";
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
  Upload,
  Loader2,
  X,
} from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Badge } from "../../../components/ui/Badge";
import { cn } from "../../../utils/cn";
import { useChangePasswordMutation } from "../../../redux/api/authApi";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/api/profileApi";
import { toast } from "react-toastify";

const ModalOverlay = ({
  title,
  description,
  children,
  onClose,
  onConfirm,
  confirmText,
  variant = "primary",
  isLoading = false,
}) => (
  <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-300">
    <div
      className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm"
      onClick={onClose}
    />
    <Card className="relative w-full max-w-lg bg-white p-6 md:p-8 rounded-t-[40px] md:rounded-[40px] shadow-2xl border-transparent animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-serif text-primary-900 italic">
            {title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{description}</p>
        </div>

        <div className="py-4">{children}</div>

        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-full py-4 text-[10px] font-black uppercase tracking-widest border-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1 rounded-full py-4 text-[10px] font-black uppercase tracking-widest shadow-xl",
              variant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700 shadow-red-200"
                : "bg-primary-900 text-white hover:bg-black shadow-gray-200",
            )}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </Card>
  </div>
);

const ChefProfileSettings = () => {
  const { data: profileRes, isLoading, refetch } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const profile = profileRes?.data || {};

  const [cuisines, setCuisines] = useState([]);
  const [newCuisine, setNewCuisine] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [gallery, setGallery] = useState([]);

  // Controlled fields
  const [headline, setHeadline] = useState("");
  const [years, setYears] = useState("");
  const [about, setAbout] = useState("");
  const [radius, setRadius] = useState(50);
  const [location, setLocation] = useState("");
  const [socials, setSocials] = useState({ instagram: "", website: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // New Expanded Fields
  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    displayName: "",
    phone: "",
    city: "",
    country: "",
  });
  const [pricing, setPricing] = useState({
    startingPricePerPerson: "",
    minimumBookingAmount: "",
    sampleMenuTitle: "",
    menuDescription: "",
  });
  const [serviceSettings, setServiceSettings] = useState({
    chefCategory: [],
    serviceWindows: [],
    instantBooking: false,
  });
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");

  const [activeModal, setActiveModal] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      }).unwrap();
      setActiveModal(null);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(res.message || "Password changed successfully");
    } catch (error) {
      console.error("Failed to change password", error);
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  // Sync with fetched data
  React.useEffect(() => {
    if (profileRes?.data) {
      setCuisines(profile.cuisineSpecialties || []);
      setGallery(profile.dishPhotography || []);
      setHeadline(profile.currentPosition || "");
      setYears(profile.yearsOfExperience || "");
      setAbout(profile.aboutMe || "");
      setRadius(profile.travelRadius || 50);
      setLocation(profile.travelRadiusLocation || "");
      setSocials({
        instagram: profile.instagramProfile || "",
        website: profile.portfolioWebsite || "",
      });
      setProfileImage(profile.image || null);

      setBasicInfo({
        fullName: profile.fullName || "",
        displayName: profile.displayName || "",
        phone: profile.phone || "",
        city: profile.city || "",
        country: profile.country || "",
      });

      setPricing({
        startingPricePerPerson: profile.startingPricePerPerson || "",
        minimumBookingAmount: profile.minimumBookingAmount || "",
        sampleMenuTitle: profile.sampleMenuTitle || "",
        menuDescription: profile.menuDescription || "",
      });

      setServiceSettings({
        chefCategory: profile.chefCategory || [],
        serviceWindows: profile.serviceWindows || [],
        instantBooking: profile.instantBooking || false,
      });

      setLanguages(profile.languages || []);
    }
  }, [profileRes]);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("blob:")) return url;
    // Assuming backend is at localhost:8005
    return `https://api.tableli.com${url}`;
  };

  const handleAddCuisine = () => {
    const trimmedCuisine = newCuisine.trim();
    if (
      trimmedCuisine &&
      !cuisines.some((c) => c.toLowerCase() === trimmedCuisine.toLowerCase())
    ) {
      setCuisines([...cuisines, trimmedCuisine]);
      setNewCuisine("");
    }
  };

  const handleRemoveImage = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setGalleryFiles([...galleryFiles, ...files]);
      const newUrls = files.map((f) => URL.createObjectURL(f));
      setGallery([...gallery, ...newUrls]);
    }
  };

  const handleToggleBadge = (id) => {
    // Left empty for now, as we're managing accreditations elsewhere
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const payload = new FormData();
      if (headline) payload.append("currentPosition", headline);
      if (years) payload.append("yearsOfExperience", years);
      if (about) payload.append("aboutMe", about);
      if (radius) payload.append("travelRadius", radius);
      if (location) payload.append("travelRadiusLocation", location);
      if (socials.instagram)
        payload.append("instagramProfile", socials.instagram);
      if (socials.website) payload.append("portfolioWebsite", socials.website);

      // Basic Info
      if (basicInfo.fullName) payload.append("fullName", basicInfo.fullName);
      if (basicInfo.displayName)
        payload.append("displayName", basicInfo.displayName);
      if (basicInfo.phone) payload.append("phone", basicInfo.phone);
      if (basicInfo.city) payload.append("city", basicInfo.city);
      if (basicInfo.country) payload.append("country", basicInfo.country);

      // Pricing
      if (pricing.startingPricePerPerson)
        payload.append(
          "startingPricePerPerson",
          pricing.startingPricePerPerson,
        );
      if (pricing.minimumBookingAmount)
        payload.append("minimumBookingAmount", pricing.minimumBookingAmount);
      if (pricing.sampleMenuTitle)
        payload.append("sampleMenuTitle", pricing.sampleMenuTitle);
      if (pricing.menuDescription)
        payload.append("menuDescription", pricing.menuDescription);

      // Service
      payload.append("instantBooking", serviceSettings.instantBooking);
      payload.append(
        "chefCategory",
        JSON.stringify(serviceSettings.chefCategory),
      );
      payload.append(
        "serviceWindows",
        JSON.stringify(serviceSettings.serviceWindows),
      );

      // Languages
      payload.append("languages", JSON.stringify(languages));

      if (profileImageFile) {
        payload.append("image", profileImageFile);
      }

      // existing URLs to keep vs new files
      const existingGalleryUrls = gallery.filter(
        (url) => !url.startsWith("blob:"),
      );
      payload.append("dishPhotography", JSON.stringify(existingGalleryUrls));

      galleryFiles.forEach((file) => {
        payload.append("dishPhotography", file);
      });

      payload.append("cuisineSpecialties", JSON.stringify(cuisines));

      await updateProfile(payload).unwrap();
      refetch();

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-32 relative">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">
          Chef Profile
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Manage your professional bio, specialties, and portfolio.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
            <div className="flex flex-col gap-10">
              {/* Profile Image & Cover */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-primary-900 font-serif italic">
                    Professional Identity
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-gray-100 text-gray-400 text-[8px] uppercase tracking-widest font-black"
                  >
                    Verified Chef
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8">
                  <div className="relative group shrink-0">
                    <img
                      src={
                        getImageUrl(profileImage) ||
                        "https://images.unsplash.com/photo-1577219491135-ce39a73e4f83?auto=format&fit=crop&q=80&w=200"
                      }
                      className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover ring-4 ring-gray-50"
                    />
                    <label className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                      <Camera size={24} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-base md:text-lg font-bold text-primary-900">
                      {profile.fullName || profile.displayName || "Chef"}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      High-quality profile images increase booking rates by up
                      to 40%.
                    </p>
                    <div className="flex gap-2">
                      <label className="cursor-pointer flex items-center justify-center rounded-full px-6 text-[10px] font-black uppercase tracking-widest border border-gray-100 h-10 hover:bg-gray-50 transition-colors">
                        Change Photo
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setProfileImage(null);
                          setProfileImageFile(null);
                        }}
                        className="rounded-full px-6 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 h-10"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Full Legal Name
                  </label>
                  <Input
                    value={basicInfo.fullName}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, fullName: e.target.value })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Display Name
                  </label>
                  <Input
                    value={basicInfo.displayName}
                    onChange={(e) =>
                      setBasicInfo({
                        ...basicInfo,
                        displayName: e.target.value,
                      })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <Input
                    value={basicInfo.phone}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, phone: e.target.value })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    City
                  </label>
                  <Input
                    value={basicInfo.city}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, city: e.target.value })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Country
                  </label>
                  <Input
                    value={basicInfo.country}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, country: e.target.value })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
              </div>

              {/* Professional Identity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Professional Headline
                  </label>
                  <Input
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Years of Experience
                  </label>
                  <Input
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    type="number"
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    About & Culinary Philosophy
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="min-h-[150px] w-full bg-gray-50 border-transparent rounded-2xl p-6 font-medium text-sm text-gray-700 focus:ring-2 focus:ring-accent outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
            <div className="flex flex-col gap-8">
              <h3 className="text-xl font-bold text-primary-900 font-serif italic">
                Cuisine Specialties
              </h3>

              <div className="flex flex-wrap gap-2">
                {cuisines.map((c) => (
                  <Badge
                    key={c}
                    className="bg-primary-900 text-white border-none py-2 px-4 rounded-xl flex items-center gap-2 group"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {c}
                    </span>
                    <button
                      onClick={() =>
                        setCuisines(cuisines.filter((item) => item !== c))
                      }
                      className="hover:text-accent transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Input
                  value={newCuisine}
                  onChange={(e) => setNewCuisine(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCuisine()}
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
              <h3 className="text-xl font-bold text-primary-900 font-serif italic">
                Menu & Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Starting Price Per Person ($)
                  </label>
                  <Input
                    type="number"
                    value={pricing.startingPricePerPerson}
                    onChange={(e) =>
                      setPricing({
                        ...pricing,
                        startingPricePerPerson: e.target.value,
                      })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Minimum Booking Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={pricing.minimumBookingAmount}
                    onChange={(e) =>
                      setPricing({
                        ...pricing,
                        minimumBookingAmount: e.target.value,
                      })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Sample Menu Title
                  </label>
                  <Input
                    value={pricing.sampleMenuTitle}
                    onChange={(e) =>
                      setPricing({
                        ...pricing,
                        sampleMenuTitle: e.target.value,
                      })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Menu Description
                  </label>
                  <textarea
                    value={pricing.menuDescription}
                    onChange={(e) =>
                      setPricing({
                        ...pricing,
                        menuDescription: e.target.value,
                      })
                    }
                    className="min-h-[100px] w-full bg-gray-50 border-transparent rounded-2xl p-6 font-medium text-sm text-gray-700 focus:ring-2 focus:ring-accent outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary-900 font-serif italic">
                  Culinary Gallery
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {gallery.length}/10 Images
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-3xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={getImageUrl(img)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {gallery.length < 10 && (
                  <label className="cursor-pointer aspect-square border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all group">
                    <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-accent/10 transition-colors">
                      <Upload size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Upload Dish
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleGalleryUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 border-gray-100 bg-white rounded-[40px] shadow-sm mt-8">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary-900 font-serif italic">
                  Identity & Verification
                </h3>
                {profile.status === "approved" && (
                  <Badge className="bg-green-100 text-green-700 border-none font-bold">
                    Approved
                  </Badge>
                )}
              </div>
              <div className="flex flex-col gap-4 text-sm text-gray-600">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold">Government ID</span>
                  {profile.governmentId ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <span className="text-red-400">Missing</span>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold">Food Safety Certificate</span>
                  {profile.foodSafetyCertificate ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <span className="text-red-400">Missing</span>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold">Professional CV</span>
                  {profile.cv ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <span className="text-red-400">Missing</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400">
                To update verification documents, please contact support.
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="flex flex-col gap-8">
          <Card className="p-8 border-gray-100 bg-white rounded-[40px] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-primary-900 uppercase tracking-widest">
                Service Area
              </h4>
              <Badge className="bg-accent/20 text-accent border-none text-[10px] font-black">
                {radius}km
              </Badge>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. London, United Kingdom"
                  className="pl-12 h-12 bg-gray-50 border-transparent rounded-xl text-xs font-bold"
                />
                <MapPin
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Travel Radius
                </span>
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
            <div className="pt-6 border-t border-gray-50">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {languages.map((lang) => (
                  <Badge
                    key={lang}
                    className="bg-gray-50 text-primary-900 border-none text-[9px] font-bold py-1.5 px-3 flex items-center gap-1 group"
                  >
                    {lang}
                    <Trash2
                      size={10}
                      className="text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        setLanguages(languages.filter((l) => l !== lang))
                      }
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newLanguage.trim()) {
                      setLanguages([...languages, newLanguage.trim()]);
                      setNewLanguage("");
                    }
                  }}
                  placeholder="e.g. English"
                  className="h-10 bg-gray-50 border-transparent rounded-xl text-xs font-bold"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (newLanguage.trim()) {
                      setLanguages([...languages, newLanguage.trim()]);
                      setNewLanguage("");
                    }
                  }}
                  className="h-10 px-4 text-[10px] font-black uppercase tracking-widest"
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Service Settings
              </h4>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceSettings.instantBooking}
                    onChange={(e) =>
                      setServiceSettings({
                        ...serviceSettings,
                        instantBooking: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-bold text-primary-900">
                    Enable Instant Booking
                  </span>
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["personal", "event", "yacht", "villa"].map((cat) => (
                      <Badge
                        key={cat}
                        onClick={() =>
                          setServiceSettings({
                            ...serviceSettings,
                            chefCategory: serviceSettings.chefCategory.includes(
                              cat,
                            )
                              ? serviceSettings.chefCategory.filter(
                                  (c) => c !== cat,
                                )
                              : [...serviceSettings.chefCategory, cat],
                          })
                        }
                        className={`cursor-pointer border-none text-[9px] font-bold py-1.5 px-3 ${serviceSettings.chefCategory.includes(cat) ? "bg-primary-900 text-white" : "bg-gray-50 text-gray-500"}`}
                      >
                        {cat.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Service Windows
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Breakfast", "Brunch", "Lunch", "Dinner"].map((win) => (
                      <Badge
                        key={win}
                        onClick={() =>
                          setServiceSettings({
                            ...serviceSettings,
                            serviceWindows:
                              serviceSettings.serviceWindows.includes(win)
                                ? serviceSettings.serviceWindows.filter(
                                    (w) => w !== win,
                                  )
                                : [...serviceSettings.serviceWindows, win],
                          })
                        }
                        className={`cursor-pointer border-none text-[9px] font-bold py-1.5 px-3 ${serviceSettings.serviceWindows.includes(win) ? "bg-primary-900 text-white" : "bg-gray-50 text-gray-500"}`}
                      >
                        {win.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-gray-100 bg-white rounded-[40px] flex flex-col gap-6">
            <h4 className="text-sm font-bold text-primary-900 uppercase tracking-widest">
              Social & Web
            </h4>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  value={socials.instagram}
                  onChange={(e) =>
                    setSocials({ ...socials, instagram: e.target.value })
                  }
                  placeholder="instagram.com/chefjulian"
                  className="pl-12 h-12 bg-gray-50 border-transparent rounded-xl text-xs font-bold"
                />
                <AtSign
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <div className="relative">
                <Input
                  value={socials.website}
                  onChange={(e) =>
                    setSocials({ ...socials, website: e.target.value })
                  }
                  placeholder="www.chefjulian.com"
                  className="pl-12 h-12 bg-gray-50 border-transparent rounded-xl text-xs font-bold"
                />
                <Globe
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <Button className="bg-primary-900 text-white hover:bg-black rounded-full py-4 text-[10px] font-black uppercase tracking-widest">
              Save Social Links
            </Button>
            <Button
              onClick={() => setActiveModal("password")}
              className="bg-primary-900 text-white hover:bg-black rounded-full py-4 text-[10px] font-black uppercase tracking-widest"
            >
              Change Your Password
            </Button>
          </Card>
        </div>
      </div>

      {/* Fixed Footer Update Button */}
      <div className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-40 px-4 md:px-0 pb-safe">
        <Button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className={`${saveSuccess ? "bg-green-600" : "bg-primary-900"} text-white hover:bg-black rounded-none md:rounded-full w-full md:w-auto px-8 md:px-12 py-5 md:py-7 text-xs font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 group mb-0`}
        >
          {isSaving
            ? "Updating Profile..."
            : saveSuccess
              ? "Profile Updated Successfully"
              : "Update Professional Profile"}
          <div
            className={`w-8 h-8 rounded-full ${saveSuccess ? "bg-white text-green-600" : "bg-accent text-primary-900"} flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg`}
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <CheckCircle2 size={16} />
            )}
          </div>
        </Button>
      </div>

      {activeModal === "password" && (
        <ModalOverlay
          title="Change Password"
          description="Protect your account with a secure, unique password."
          confirmText="Update Password"
          isLoading={isChangingPassword}
          onClose={() => setActiveModal(null)}
          onConfirm={handlePasswordChange}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Current Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
                className="h-12 bg-gray-50 border-transparent rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                New Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                className="h-12 bg-gray-50 border-transparent rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                className="h-12 bg-gray-50 border-transparent rounded-xl"
              />
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ChefProfileSettings;
