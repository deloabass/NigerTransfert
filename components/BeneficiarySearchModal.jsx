import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Search, User, Phone, MapPin, Plus } from 'lucide-react-native';

export default function BeneficiarySearchModal({ 
  visible, 
  onClose, 
  onSelect, 
  onAddNew,
  beneficiaries = [],
  selectedCountry 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBeneficiaries(beneficiaries);
    } else {
      const filtered = beneficiaries.filter(beneficiary =>
        beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beneficiary.phone.includes(searchQuery) ||
        beneficiary.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBeneficiaries(filtered);
    }
  }, [searchQuery, beneficiaries]);

  const handleSelect = (beneficiary) => {
    onSelect(beneficiary);
    setSearchQuery('');
  };

  const handleAddNew = () => {
    onAddNew();
    setSearchQuery('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Choisir un bénéficiaire</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher par nom, téléphone ou ville..."
              placeholderTextColor="#999"
            />
          </View>

          <ScrollView style={styles.beneficiariesList}>
            <TouchableOpacity style={styles.addNewButton} onPress={handleAddNew}>
              <LinearGradient
                colors={['#FF6B35', '#FF8A65']}
                style={styles.addNewGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Plus size={20} color="#FFFFFF" />
                <Text style={styles.addNewText}>Ajouter un nouveau bénéficiaire</Text>
              </LinearGradient>
            </TouchableOpacity>

            {filteredBeneficiaries.length === 0 ? (
              <View style={styles.emptyState}>
                <User size={48} color="#CCC" />
                <Text style={styles.emptyStateText}>
                  {searchQuery ? 'Aucun bénéficiaire trouvé' : 'Aucun bénéficiaire enregistré'}
                </Text>
              </View>
            ) : (
              filteredBeneficiaries.map((beneficiary) => (
                <TouchableOpacity
                  key={beneficiary.id}
                  style={styles.beneficiaryItem}
                  onPress={() => handleSelect(beneficiary)}
                >
                  <View style={styles.beneficiaryIcon}>
                    <User size={20} color="#FF6B35" />
                  </View>
                  <View style={styles.beneficiaryInfo}>
                    <Text style={styles.beneficiaryName}>{beneficiary.name}</Text>
                    <View style={styles.beneficiaryDetails}>
                      <Phone size={12} color="#666" />
                      <Text style={styles.beneficiaryPhone}>{beneficiary.phone}</Text>
                    </View>
                    <View style={styles.beneficiaryDetails}>
                      <MapPin size={12} color="#666" />
                      <Text style={styles.beneficiaryLocation}>{beneficiary.location}</Text>
                    </View>
                  </View>
                  <View style={styles.serviceTag}>
                    <Text style={styles.serviceTagText}>
                      {beneficiary.service === 'mynita' ? 'MyNITA' : 'Amana-ta'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    margin: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  beneficiariesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addNewButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  addNewGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  addNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  beneficiaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  beneficiaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  beneficiaryInfo: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  beneficiaryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  beneficiaryPhone: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  beneficiaryLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  serviceTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceTagText: {
    fontSize: 10,
    color: '#2E8B57',
    fontWeight: '500',
  },
});