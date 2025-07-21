import React, { createContext, useContext, useState } from 'react';
import CustomAlert from './CustomAlert';

const AlertContext = createContext({});

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (config) => {
    const id = Date.now().toString();
    const alert = { id, ...config };
    
    setAlerts(prev => [...prev, alert]);
    
    return id;
  };

  const hideAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const hideAllAlerts = () => {
    setAlerts([]);
  };

  // Méthodes de convenance
  const showSuccess = (title, message, options = {}) => {
    return showAlert({
      type: 'success',
      title,
      message,
      autoClose: true,
      autoCloseDelay: 3000,
      ...options
    });
  };

  const showError = (title, message, options = {}) => {
    return showAlert({
      type: 'error',
      title,
      message,
      ...options
    });
  };

  const showWarning = (title, message, options = {}) => {
    return showAlert({
      type: 'warning',
      title,
      message,
      ...options
    });
  };

  const showInfo = (title, message, options = {}) => {
    return showAlert({
      type: 'info',
      title,
      message,
      ...options
    });
  };

  const showConfirm = (title, message, onConfirm, onCancel) => {
    return showAlert({
      type: 'warning',
      title,
      message,
      buttons: [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: onCancel
        },
        {
          text: 'Confirmer',
          style: 'destructive',
          onPress: onConfirm
        }
      ]
    });
  };

  const value = {
    showAlert,
    hideAlert,
    hideAllAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.map(alert => (
        <CustomAlert
          key={alert.id}
          visible={true}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          buttons={alert.buttons || []}
          autoClose={alert.autoClose}
          autoCloseDelay={alert.autoCloseDelay}
          onClose={() => hideAlert(alert.id)}
        />
      ))}
    </AlertContext.Provider>
  );
};