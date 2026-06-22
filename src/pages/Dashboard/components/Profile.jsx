import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  Bell,
  Lock,
  ChevronRight,
  Camera,
  Heart,
  AlertCircle,
  Plus,
  Home,
  Briefcase,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Badge } from "../../../components/ui/Badge";
import { cn } from "../../../utils/cn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetCurrentUserQuery,
  useDeleteMyAccountMutation,
  useChangePasswordMutation,
} from "../../../redux/api/authApi";
import { useUpdateUserProfileMutation } from "../../../redux/api/userApi";

const ModalOverlay = ({
  title,
  description,
  children,
  onClose,
  onConfirm,
  confirmText,
  variant = "primary",
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
            className={cn(
              "flex-1 rounded-full py-4 text-[10px] font-black uppercase tracking-widest shadow-xl",
              variant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700 shadow-red-200"
                : "bg-primary-900 text-white hover:bg-black shadow-gray-200",
            )}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Card>
  </div>
);

const Profile = () => {
  const { data: userRes, isLoading } = useGetCurrentUserQuery();
  const profileData = userRes?.data;

  const [updateUser, { isLoading: isUpdatingUser }] =
    useUpdateUserProfileMutation();
  const [deleteAccount, { isLoading: isDeleting }] =
    useDeleteMyAccountMutation();

  const navigate = useNavigate();

  // --- States ---
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [languages, setLanguages] = React.useState("");
  const [aboutMe, setAboutMe] = React.useState("");

  const [dietary, setDietary] = React.useState([
    "Peanuts",
    "Shellfish",
    "Dairy-Free",
  ]);
  const [cuisines, setCuisines] = React.useState([
    "French Gastronomy",
    "Modern Italian",
    "Japanese Omakase",
  ]);
  const [isAddingDietary, setIsAddingDietary] = React.useState(false);
  const [isAddingCuisine, setIsAddingCuisine] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");

  const [notifications, setNotifications] = React.useState({
    updates: true,
    messages: true,
    exclusives: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [activeModal, setActiveModal] = React.useState(null); // 'password', 'notifications', 'deactivate'
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [passwords, setPasswords] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [addresses, setAddresses] = React.useState([
    {
      id: 1,
      label: "Home",
      address: "Loading...",
      icon: Home,
      isEditing: false,
    },
  ]);

  React.useEffect(() => {
    if (profileData?.profile || profileData) {
      setFullName(
        profileData?.profile?.fullName || profileData?.userName || "",
      );
      setPhone(profileData?.profile?.phone || profileData?.phone || "");
      setLanguages(profileData?.profile?.languages?.join(", ") || "English");
      setAboutMe(profileData?.profile?.aboutMe || "");

      if (profileData?.profile?.cuisineSpecialties?.length > 0) {
        setCuisines(profileData?.profile?.cuisineSpecialties);
      }

      const locs = [];
      if (profileData?.profile?.city || profileData?.profile?.country) {
        locs.push({
          id: 1,
          label: "Primary Location",
          address:
            `${profileData?.profile?.city || ""}, ${profileData?.profile?.country || ""}`.replace(
              /^,\s*/,
              "",
            ),
          icon: Home,
          isEditing: false,
        });
      }
      if (profileData?.profile?.travelRadiusLocation) {
        locs.push({
          id: 2,
          label: "Service Area",
          address: profileData?.profile?.travelRadiusLocation,
          icon: Briefcase,
          isEditing: false,
        });
      }
      if (locs.length > 0) {
        setAddresses(locs);
      }
    }
  }, [profileData]);

  // --- Handlers ---
  const toggleEditAddress = (id) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, isEditing: !addr.isEditing } : addr,
      ),
    );
  };

  const handleUpdateAddress = (id, newAddress) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id
          ? { ...addr, address: newAddress, isEditing: false }
          : addr,
      ),
    );
  };
  const handleAddTag = (type) => {
    if (!newTag.trim()) return;
    if (type === "dietary") {
      setDietary([...dietary, newTag]);
      setIsAddingDietary(false);
    } else {
      setCuisines([...cuisines, newTag]);
      setIsAddingCuisine(false);
    }
    setNewTag("");
  };

  const handleRemoveTag = (type, tagToRemove) => {
    if (type === "dietary") {
      setDietary(dietary.filter((t) => t !== tagToRemove));
    } else {
      setCuisines(cuisines.filter((t) => t !== tagToRemove));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // Build a single FormData combining User and Profile fields
      const formData = new FormData();
      formData.append("userName", fullName);
      formData.append("phone", phone);
      formData.append("aboutMe", aboutMe);

      cuisines.forEach((c) => formData.append("cuisineSpecialties", c));

      const langArray = languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);
      langArray.forEach((l) => formData.append("languages", l));

      // Call the unified update endpoint
      await updateUser(formData).unwrap();

      toast.success("Profile updated successfully!");
      triggerSuccess();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        error?.data?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal(null);
    }, 2000);
  };

  const handleDeactivateAccount = async () => {
    try {
      await deleteAccount().unwrap();
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      triggerSuccess();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to deactivate account:", error);
      alert("Failed to deactivate account. Please try again.");
    }
  };

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
      console.error("Failed to change password:", error);
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  // --- Render ---

  return (
    <div className="relative flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">
          Account Profile
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Your personal details, dining preferences, and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Col: Main Sections */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Section: Personal Information */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px]">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary-900">
                  Personal Details
                </h3>
                <Badge
                  variant="success"
                  className="bg-green-50 text-green-700 border-none font-black text-[8px] tracking-widest px-3"
                >
                  VERIFIED HOST
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 bg-gray-50">
                    <img
                      src={
                        profileData?.profile?.image
                          ? profileData.profile.image.startsWith("http")
                            ? profileData.profile.image
                            : `${import.meta.env.VITE_BASE_URL}${profileData.profile.image}`
                          : "/b_1.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-900 text-white flex items-center justify-center border-4 border-white hover:bg-black transition-colors shadow-lg">
                    <Camera size={12} />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl md:text-2xl font-serif text-primary-900 italic">
                    {profileData?.profile?.fullName ||
                      profileData?.userName ||
                      "Loading..."}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    Member since{" "}
                    {profileData?.createdAt
                      ? new Date(profileData.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "long", year: "numeric" },
                        )
                      : "..."}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <Input
                    value={profileData?.email || ""}
                    disabled
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Primary Language
                  </label>
                  <Input
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="e.g. English, French"
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section: Saved Locations */}
          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900">
                    Saved Locations
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={cn(
                      "p-6 rounded-2xl border transition-all relative group",
                      addr.isEditing
                        ? "border-accent bg-accent/5"
                        : "border-gray-50 bg-gray-50/30 hover:border-accent/20",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400">
                        <addr.icon size={18} />
                      </div>
                      <div className="flex flex-col flex-1 gap-2">
                        <span className="text-sm font-bold text-primary-900">
                          {addr.label}
                        </span>
                        {addr.isEditing ? (
                          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-1">
                            <Input
                              autoFocus
                              defaultValue={addr.address}
                              onKeyDown={(e) =>
                                e.key === "Enter" &&
                                handleUpdateAddress(addr.id, e.target.value)
                              }
                              className="h-10 text-xs bg-white"
                              id={`addr-input-${addr.id}`}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  const val = document.getElementById(
                                    `addr-input-${addr.id}`,
                                  ).value;
                                  handleUpdateAddress(addr.id, val);
                                }}
                                className="text-[9px] font-black uppercase text-accent hover:underline"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => toggleEditAddress(addr.id)}
                                className="text-[9px] font-black uppercase text-gray-400 hover:underline"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500 leading-relaxed">
                            {addr.address}
                          </span>
                        )}
                      </div>
                      {!addr.isEditing && (
                        <button
                          onClick={() => toggleEditAddress(addr.id)}
                          className="text-[10px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Settings */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">
              Security & Notifications
            </h4>
            <button
              onClick={() => setActiveModal("password")}
              className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-900 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900 group-hover:bg-primary-900 group-hover:text-white transition-all">
                  <Lock size={18} />
                </div>
                <span className="text-sm font-bold text-primary-900">
                  Change Password
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
            <button
              onClick={() => setActiveModal("notifications")}
              className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-900 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-900 group-hover:bg-primary-900 group-hover:text-white transition-all">
                  <Bell size={18} />
                </div>
                <span className="text-sm font-bold text-primary-900">
                  Notification Alerts
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-red-50/10 border border-red-50 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-red-900">Danger Zone</h4>
            <p className="text-[10px] text-gray-500 font-medium">
              Deactivating your account will cancel all upcoming bookings and
              remove your data.
            </p>
            <button
              onClick={() => setActiveModal("deactivate")}
              className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline text-left"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 md:mt-12 flex justify-center">
        <Button
          onClick={handleUpdateProfile}
          disabled={isUpdatingUser}
          className="bg-primary-900 text-white hover:bg-black rounded-full w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 text-sm font-black tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 group transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isUpdatingUser ? "Updating..." : "Update Profile Information"}
          {!isUpdatingUser && (
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
        </Button>
      </div>

      {/* --- MODALS --- */}

      {/* Password Modal */}
      {activeModal === "password" && (
        <ModalOverlay
          title="Change Password"
          description="Protect your account with a secure, unique password."
          confirmText={isChangingPassword ? "Updating..." : "Update Password"}
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

      {/* Notifications Modal */}
      {activeModal === "notifications" && (
        <ModalOverlay
          title="Notification Settings"
          description="Choose how you'd like to stay informed about your bookings."
          confirmText="Save Preferences"
          onClose={() => setActiveModal(null)}
          onConfirm={triggerSuccess}
        >
          <div className="flex flex-col gap-6">
            {[
              {
                id: "updates",
                label: "Booking Updates",
                desc: "Alerts for confirmed or rescheduled experiences.",
              },
              {
                id: "messages",
                label: "Direct Messages",
                desc: "Notifications for new messages from your chefs.",
              },
              {
                id: "exclusives",
                label: "Elena Exclusives",
                desc: "Elite access to seasonal menus and new chefs.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 cursor-pointer"
                onClick={() => toggleNotification(item.id)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-primary-900">
                    {item.label}
                  </span>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                    notifications[item.id] ? "bg-accent" : "bg-gray-200",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm",
                      notifications[item.id] ? "right-1" : "left-1",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </ModalOverlay>
      )}

      {/* Deactivate Modal */}
      {activeModal === "deactivate" && (
        <ModalOverlay
          title="Deactivate Account"
          description="This action is irreversible. All your data will be permanently removed."
          confirmText={isDeleting ? "Deactivating..." : "Confirm Deactivation"}
          variant="danger"
          onClose={() => !isDeleting && setActiveModal(null)}
          onConfirm={handleDeactivateAccount}
        >
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
            <AlertTriangle className="text-red-600 mt-1" size={24} />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-red-900 uppercase tracking-widest">
                Aesthetic Warning
              </span>
              <p className="text-xs text-red-700/70 leading-relaxed font-medium">
                Your elite status, booking history, and saved chefs will be
                lost. Please ensure you have no pending reservations.
              </p>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default Profile;
