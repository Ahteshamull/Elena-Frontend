import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { MotionConfig, MotionGlobalConfig } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import AllChefs from './pages/AllChefs/AllChefs';
import BrowseChefs from './pages/BrowseChefs/BrowseChefs';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import About from './pages/About/About';
// import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import ChefProfile from './pages/ChefProfile/ChefProfile';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import ForgotPass from './pages/Auth/Forgot-Pass';
import { ChefOnboarding } from './pages/ChefOnboarding/ChefOnboarding';
import ChefDashboard from './pages/ChefDashboard/ChefDashboard';
import Dashboard from './pages/Dashboard/Dashboard';
// import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ScrollToTop from './components/layout/ScrollToTop';
import HelpCenter from './pages/Support/HelpCenter';
import { Terms, Privacy } from './pages/Support/Legal';
import FAQPage from './pages/Support/FAQPage';
import Careers from './pages/Support/Careers';
import Booking from './pages/Booking/Booking';
import Checkout from './pages/Checkout/Checkout';
import PaymentSuccess from './pages/Checkout/PaymentSuccess';
import PaymentCancel from './pages/Checkout/PaymentCancel';
import Messages from './pages/Messages/Messages';
import { VerifyEmail } from './pages/Auth/VerifyEmail';
import CancellationPolicy from './pages/Support/cancellation';
import ProtectedRoute from './components/layout/ProtectedRoute';
import StripeRefresh from './pages/ChefOnboarding/StripeRefresh';
import StripeReturn from './pages/ChefOnboarding/StripeReturn';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      MotionGlobalConfig.skipAnimations = mobile;
    };
    
    // Set initial value
    MotionGlobalConfig.skipAnimations = window.innerWidth < 768;
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
      <Router>
        <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#FAFAFA]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-chefs" element={<AllChefs />} />
            <Route path="/browse-chefs" element={<BrowseChefs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/chef/:id" element={<ChefProfile />} />
            <Route path="/book/:chefId" element={<Booking />} />
            <Route path="/checkout/:bookingId" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/payment/success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
            <Route path="/payment/cancel" element={
              <ProtectedRoute>
                <PaymentCancel />
              </ProtectedRoute>
            } />
            <Route path="/stripe-refresh" element={
              <ProtectedRoute>
                <StripeRefresh />
              </ProtectedRoute>
            } />
            <Route path="/stripe-return" element={
              <ProtectedRoute>
                <StripeReturn />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/chef-onboarding" element={<ChefOnboarding />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/support" element={<HelpCenter />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/refund-policy" element={<CancellationPolicy />} />
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chef-dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['chef']}>
                  <ChefDashboard />
                </ProtectedRoute>
              } 
            />
            {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={true} 
        closeOnClick 
        pauseOnHover 
        theme="colored"
        toastClassName="custom-toast"
      />
    </Router>
    </MotionConfig>
  );
}

export default App;