import React, { createContext, useContext, useState } from 'react';
import ToastAlert from './ToastAlert';

const ToastContext = createContext({});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (config) => {
    const id = Date.now().toString();
    const toast = { id, ...config };
    
    setToasts(prev => [...prev, toast]);
    
    return id;
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const hideAllToasts = () => {
    setToasts([]);
  };

  // Méthodes de convenance
  const showSuccess = (title, message, options = {}) => {
    return showToast({
      type: 'success',
      title,
      message,
      duration: 3000,
      ...options
    });
  };

  const showError = (title, message, options = {}) => {
    return showToast({
      type: 'error',
      title,
      message,
      duration: 5000,
      ...options
    });
  };

  const showWarning = (title, message, options = {}) => {
    return showToast({
      type: 'warning',
      title,
      message,
      duration: 4000,
      ...options
    });
  };

  const showInfo = (title, message, options = {}) => {
    return showToast({
      type: 'info',
      title,
      message,
      duration: 3000,
      ...options
    });
  };

  const value = {
    showToast,
    hideToast,
    hideAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map(toast => (
        <ToastAlert
          key={toast.id}
          visible={true}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          position={toast.position}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};