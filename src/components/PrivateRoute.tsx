'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react"; 
import authService from '../services/authService';

interface PrivateRouteProps {
  children: ReactNode;
  isAdmRoute: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAdmRoute }) => {
  const [isAdmUser, setIsAdmUser] = useState<Boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const admStatus = await authService.isAdm();
        setIsAdmUser(admStatus);
      } catch (err) {
        console.error('Erro ao verificar admin:', err);
        setIsAdmUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, isAdmRoute]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '1rem'
      }}>
        <Spinner size="xl" />
        <p>Verificando permissões...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmRoute && isAdmUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isAdmRoute && !isAdmUser) {
    return <Navigate to="/colaborador/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;