import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(StoreContext);

  // Check if token exists in local storage or context
  const isAuthenticated = token || localStorage.getItem('token');

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;