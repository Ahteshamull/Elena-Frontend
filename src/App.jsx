import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { VerifyEmail } from './pages/Auth/VerifyEmail';

function App() {
  return (
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
            <Route path="/chef-profile" element={<ChefProfile />} />
            <Route path="/book/:chefId" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/chef-onboarding" element={<ChefOnboarding />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/support" element={<HelpCenter />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/chef-dashboard/*" element={<ChefDashboard />} />
            {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;