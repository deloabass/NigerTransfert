import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountryContext = createContext({});

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSelectedCountry();
  }, []);

  const loadSelectedCountry = async () => {
    try {
      const savedCountry = await AsyncStorage.getItem('selectedCountry');
      if (savedCountry) {
        setSelectedCountry(JSON.parse(savedCountry));
      } else {
        // Pays par défaut : Niger
        const defaultCountry = {
          code: 'NE',
          name: 'Niger',
          flag: '🇳🇪',
          currency: 'XOF',
          services: [
            {
              id: 'mynita',
              name: 'MyNITA',
              logo: '🏦',
              description: 'Service officiel du gouvernement nigérien',
              fees: 2.5,
              rate: 656,
              processingTime: '1-3 minutes',
              features: ['Transfert instantané', 'Sécurisé par l\'État', 'Disponible 24h/24']
            },
            {
              id: 'amana',
              name: 'Amana-ta',
              logo: '💳',
              description: 'Solution de paiement mobile populaire',
              fees: 1.8,
              rate: 654,
              processingTime: '5-10 minutes',
              features: ['Frais réduits', 'Large réseau', 'Interface simple']
            }
          ]
        };
        setSelectedCountry(defaultCountry);
        await AsyncStorage.setItem('selectedCountry', JSON.stringify(defaultCountry));
      }
    } catch (error) {
      console.error('Error loading selected country:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCountry = async (country) => {
    try {
      setSelectedCountry(country);
      await AsyncStorage.setItem('selectedCountry', JSON.stringify(country));
    } catch (error) {
      console.error('Error saving selected country:', error);
    }
  };

  const value = {
    selectedCountry,
    selectCountry,
    isLoading,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};