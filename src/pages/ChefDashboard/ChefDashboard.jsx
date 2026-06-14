import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChefSidebar } from './components/ChefSidebar';
import { ChefBottomNav } from './components/ChefBottomNav';
import ChefOverview from './components/ChefOverview';
import ChefBookings from './components/ChefBookings';
import ChefBookingDetails from './components/ChefBookingDetails';
import ChefMenus from './components/ChefMenus';
import ChefEarnings from './components/ChefEarnings';
import ChefProfileSettings from './components/ChefProfileSettings';
import ChefMessages from './components/ChefMessages';
import ChefBankOnboarding from './components/ChefBankOnboarding';

const ChefDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user.role !== 'chef') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen pt-20">
      {/* Sidebar: desktop only */}
      <ChefSidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 pb-24 md:pb-8 md:p-8 lg:p-12 overflow-x-hidden">
        <div className="max-w-6xl">
          <Routes>
            <Route index element={<ChefOverview />} />
            <Route path="bookings" element={<ChefBookings />} />
            <Route path="bookings/:id" element={<ChefBookingDetails />} />
            <Route path="menus" element={<ChefMenus />} />
            <Route path="earnings" element={<ChefEarnings />} />
            <Route path="messages" element={<ChefMessages />} />
            <Route path="profile" element={<ChefProfileSettings />} />
            <Route path="bank-onboarding" element={<ChefBankOnboarding />} />
            <Route path="*" element={<Navigate to="/chef-dashboard" replace />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Nav: mobile only */}
      <ChefBottomNav />
    </div>
  );
};

export default ChefDashboard;
