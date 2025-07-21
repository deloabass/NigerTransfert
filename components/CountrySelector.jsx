import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, ChevronDown } from 'lucide-react-native';
import { useCountry } from '@/contexts/CountryContext';
import { useRouter } from 'expo-router';

export default function CountrySelector({ style }) {
  const { selectedCountry } = useCountry();
  const router = useRouter();

  if (!selectedCountry) {
    return (
      <TouchableOpacity 
        style={[styles.container, styles.noCountry, style]}
        onPress={() => router.push('/country-selection')}
      >
        <MapPin size={20} color="#FF6B35" />
        <Text style={styles.noCountryText}>Sélectionner un pays</Text>
        <ChevronDown size={16} color="#FF6B35" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={() => router.push('/country-selection')}
    >
      <Text style={styles.flag}>{selectedCountry.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{selectedCountry.name}</Text>
        <Text style={styles.countryDetails}>
          {selectedCountry.services.length} service(s) • {selectedCountry.currency}
        </Text>
      </View>
      <ChevronDown size={16} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  noCountry: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF3F0',
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  countryDetails: {
    fontSize: 11,
    color: '#666',
  },
  noCountryText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
});