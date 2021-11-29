import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useAuth();

  return authorized ? children : <Navigate to="/login" />;
};
