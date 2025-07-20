import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ArrowLeft, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CountrySelectionScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const westAfricanCountries = [
    { code: 'NE', name: 'Niger', flag: '🇳🇪', currency: 'XOF', services: ['MyNITA', 'Amana-ta'] },
    { code: 'SN', name: 'Sénégal', flag: '🇸🇳', currency: 'XOF', services: ['Orange Money', 'Wave'] },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', currency: 'XOF', services: ['Orange Money', 'Moov Money'] },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', currency: 'XOF', services: ['Orange Money', 'Moov Money'] },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', currency: 'XOF', services: ['Orange Money', 'MTN Money'] },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', services: ['MTN MoMo', 'Vodafone Cash'] },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', services: ['Paystack', 'Flutterwave'] },
    { code: 'TG', name: 'Togo', flag: '🇹🇬', currency: 'XOF', services: ['Moov Money', 'T-Money'] },
    { code: 'BJ', name: 'Bénin', flag: '🇧🇯', currency: 'XOF', services: ['MTN Money', 'Moov Money'] },
    { code: 'GN', name: 'Guinée', flag: '🇬🇳', currency: 'GNF', services: ['Orange Money', 'MTN Money'] },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷', currency: 'LRD', services: ['Orange Money', 'Lonestar Cell'] },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', currency: 'SLL', services: ['Orange Money', 'Africell'] },
    { code: 'GM', name: 'Gambie', flag: '🇬🇲', currency: 'GMD', services: ['QMoney', 'Africell'] },
    { code: 'GW', name: 'Guinée-Bissau', flag: '🇬🇼', currency: 'XOF', services: ['Orange Money'] },
    { code: 'CV', name: 'Cap-Vert', flag: '🇨🇻', currency: 'CVE', services: ['Unitel Money'] },
  ];

  const filteredCountries = westAfricanCountries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    // Ici vous pouvez sauvegarder le pays sélectionné et rediriger
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Choisir le pays de destination</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un pays..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView style={styles.countriesList} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <MapPin size={16} color="#666" />
          <Text style={styles.sectionTitle}>Afrique de l'Ouest</Text>
        </View>

        {filteredCountries.map((country) => (
          <TouchableOpacity
            key={country.code}
            style={styles.countryItem}
            onPress={() => handleCountrySelect(country)}
          >
            <Text style={styles.countryFlag}>{country.flag}</Text>
            <View style={styles.countryInfo}>
              <Text style={styles.countryName}>{country.name}</Text>
              <Text style={styles.countryCurrency}>Devise: {country.currency}</Text>
              <View style={styles.servicesContainer}>
                {country.services.map((service, index) => (
                  <View key={index} style={styles.serviceTag}>
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Plus de pays seront ajoutés prochainement
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  countriesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  countryFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  countryCurrency: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  serviceTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  serviceText: {
    fontSize: 10,
    color: '#2E8B57',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});