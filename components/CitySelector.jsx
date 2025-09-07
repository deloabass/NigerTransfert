import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ChevronDown, MapPin, X } from 'lucide-react-native';
import { getCitiesByCountry } from '@/services/cityData';

export default function CitySelector({ selectedCountry, selectedCity, onCitySelect, style }) {
  const [showModal, setShowModal] = useState(false);
  const cities = selectedCountry ? getCitiesByCountry(selectedCountry.code) : [];

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setShowModal(false);
  };

  if (!selectedCountry) {
    return (
      <View style={[styles.container, styles.disabled, style]}>
        <MapPin size={16} color="#CCC" />
        <Text style={styles.disabledText}>Sélectionnez d'abord un pays</Text>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity 
        style={[styles.container, style]}
        onPress={() => setShowModal(true)}
      >
        <MapPin size={16} color="#666" />
        <Text style={styles.cityText}>
          {selectedCity ? selectedCity.name : 'Sélectionner une ville'}
        </Text>
        <ChevronDown size={16} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Villes - {selectedCountry.name}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.citiesList}>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.cityItem,
                    selectedCity?.id === city.id && styles.cityItemSelected
                  ]}
                  onPress={() => handleCitySelect(city)}
                >
                  <MapPin size={16} color="#FF6B35" />
                  <View style={styles.cityInfo}>
                    <Text style={styles.cityName}>{city.name}</Text>
                    <Text style={styles.cityRegion}>{city.region}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
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
    gap: 8,
  },
  disabled: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E5E5E5',
  },
  cityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  disabledText: {
    flex: 1,
    fontSize: 14,
    color: '#CCC',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  citiesList: {
    flex: 1,
    padding: 20,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
    gap: 12,
  },
  cityItemSelected: {
    backgroundColor: '#FFF3F0',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  cityRegion: {
    fontSize: 12,
    color: '#666',
  },
});