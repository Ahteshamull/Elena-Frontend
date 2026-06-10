import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');
  const location = useLocation();

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    let user = null;
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error("Error parsing user data in ProtectedRoute", e);
    }

    if (!user || !allowedRoles.includes(user.role)) {
      // If user role doesn't match allowed roles, redirect to home or login
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
