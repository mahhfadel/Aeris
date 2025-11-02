'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import authService from '../services/authService';

interface PrivateRouteProps {
  children: ReactNode;
  isAdmRoute: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAdmRoute }) => {
  const [isAdmUser, setIsAdmUser] = useState<Boolean | null>(null);
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const fetchAdmStatus = async () => {
      try {
        const admStatus = await authService.isAdm();
        setIsAdmUser(admStatus);
      } catch (err) {
        console.error('Erro ao verificar se é administrador:', err);
        setIsAdmUser(false);
      }
    };

    fetchAdmStatus();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmRoute && isAdmUser) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmRoute && !isAdmUser) {
    return <Navigate to="/login-colaborador" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
