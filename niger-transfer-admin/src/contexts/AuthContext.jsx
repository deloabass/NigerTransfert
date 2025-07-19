import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler la vérification de l'authentification
    const token = localStorage.getItem('admin_token');
    if (token) {
      setUser({
        id: '1',
        name: 'Admin Niger Transfer',
        email: 'admin@nigertransfer.com',
        role: 'admin',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulation de connexion
    if (email === 'admin@nigertransfer.com' && password === 'admin123') {
      const userData = {
        id: '1',
        name: 'Admin Niger Transfer',
        email: 'admin@nigertransfer.com',
        role: 'admin',
      };
      setUser(userData);
      localStorage.setItem('admin_token', 'fake-jwt-token');
      return { success: true };
    }
    return { success: false, error: 'Identifiants invalides' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_token');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};