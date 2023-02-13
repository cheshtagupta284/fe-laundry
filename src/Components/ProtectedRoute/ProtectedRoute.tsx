import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../..';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user] = useRecoilState(userState);

  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
