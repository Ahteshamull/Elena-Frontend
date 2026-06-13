import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, User, Settings2 } from "lucide-react";
import { Button } from "../ui/Button";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check login state
  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        setIsLoggedIn(true);
        setLoggedInUser(parsed);
      } else {
        setIsLoggedIn(false);
        setLoggedInUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Clear Cookies
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    document.cookie =
      "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

    // Clear state
    setIsLoggedIn(false);
    setLoggedInUser(null);

    // Redirect to home
    window.location.href = "/";
  };

  // Helper: determine the dashboard URL based on role
  const getDashboardUrl = (user) => {
    if (!user) return "/dashboard";
    if (user.role === "chef") return "/chef-dashboard";
    return "/dashboard";
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    // Re-check auth on route change
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      setIsLoggedIn(true);
      setLoggedInUser(parsed);
    } else {
      setIsLoggedIn(false);
      setLoggedInUser(null);
    }
  }, [location.pathname]);

  // Detect scroll for sticky background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    ...(loggedInUser?.role !== "chef"
      ? [{ name: "Browse Chefs", path: "/browse-chefs" }]
      : []),
    { name: "How it works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-white/90 backdrop-blur-sm border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50 relative group">
            <img src="/logo.png" alt="Tableli Logo" className="h-10 w-auto" />
            {/* <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-black">TABLELI</span> */}
            <span className="font-serif italic text-2xl md:text-3xl font-medium tracking-wide text-black">
              Tableli
            </span>
            {/* <span className="font-['Playfair_Display'] italic text-2xl md:text-3xl font-medium tracking-wide text-black">Tableli</span> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors cursor-pointer pb-1 ${
                    isActive
                      ? "text-primary-900 border-b border-primary-900"
                      : "text-gray-700 hover:text-primary-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {loggedInUser?.role !== "chef" && (
                  <Link to="/register?role=chef">
                    <Button
                      variant="primary"
                      className="moving-border-btn rounded-full px-6 h-10 text-sm font-bold"
                    >
                      <span className="relative z-10">Join as a chef</span>
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100">
                  {!location.pathname.includes('/chef-onboarding') && (
                    <Link
                      to={getDashboardUrl(loggedInUser)}
                      className="flex items-center gap-2 text-sm font-bold text-primary-900 hover:bg-white transition-all px-4 py-2 rounded-full"
                    >
                      <User size={16} className="text-accent" />
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 group shadow-sm"
                    title="Logout"
                  >
                    <LogOut
                      size={18}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 h-10 text-sm font-bold border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white transition-all"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register?role=guest">
                  <Button
                    variant="primary"
                    className="rounded-full px-6 h-10 text-sm font-bold"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Hamburger Button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-50 relative focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col px-6 py-6 gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-primary-900 bg-primary-50"
                      : "text-gray-700 hover:text-primary-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
              {isLoggedIn ? (
                <>
                  {loggedInUser?.role !== "chef" && (
                    <Link
                      to="/register?role=chef"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Button
                        variant="primary"
                        className="moving-border-btn rounded-full px-6 w-full h-12 text-base font-bold"
                      >
                        <span className="relative z-10">Join as a chef</span>
                      </Button>
                    </Link>
                  )}
                  {!location.pathname.includes('/chef-onboarding') && (
                    <Link
                      to={getDashboardUrl(loggedInUser)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-3 text-sm font-bold text-primary-900 bg-gray-50 hover:bg-primary-50 transition-all duration-200 py-4 px-4 rounded-2xl w-full"
                    >
                      <User size={18} className="text-accent" />
                      Dashboard Overview
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 text-sm font-black text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 py-4 px-4 rounded-2xl w-full uppercase tracking-widest"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="rounded-full px-6 w-full h-12 text-base font-bold border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white transition-all"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/register?role=guest"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button
                      variant="primary"
                      className="rounded-full px-6 w-full h-12 text-base font-bold"
                    >
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
