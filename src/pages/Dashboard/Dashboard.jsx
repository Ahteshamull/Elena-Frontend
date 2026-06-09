import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardSidebar } from './components/DashboardSidebar';
import { DashboardBottomNav } from './components/DashboardBottomNav';
import DashboardOverview from './components/DashboardOverview';
import MyBookings from './components/MyBookings';
import BookingDetails from './components/BookingDetails';
import ManageBooking from './components/ManageBooking';
import Payments from './components/Payments';
import SavedChefs from './components/SavedChefs';
import Profile from './components/Profile';
import Messages from './components/Messages';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.role === 'chef') {
    return <Navigate to="/chef-dashboard" replace />;
  }

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen pt-20">
      {/* Sidebar: desktop only */}
      <DashboardSidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 pb-24 md:pb-8 md:p-8 lg:p-12 overflow-x-hidden">
        <div className="max-w-6xl">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="bookings/:id" element={<BookingDetails />} />
            <Route path="bookings/:id/manage" element={<ManageBooking />} />
            <Route path="payments" element={<Payments />} />
            <Route path="saved" element={<SavedChefs />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Nav: mobile only */}
      <DashboardBottomNav />
    </div>
  );
};

export default Dashboard;

