import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Nếu có token, trả về children
  return token ? <>{children}</> : null;
};

export default PrivateRoute;