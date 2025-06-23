import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AdminRoute = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && isAdmin() ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;