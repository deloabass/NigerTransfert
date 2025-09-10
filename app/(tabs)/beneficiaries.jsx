import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Plus, Edit2, Trash2, Phone, MapPin, X } from 'lucide-react-native';
import { mockBeneficiaries } from '@/services/mockData';
import { useAlert } from '@/components/AlertProvider';
import { useCountry } from '@/contexts/CountryContext';
import CitySelector from '@/components/CitySelector';

export default function BeneficiariesScreen() {
  const { showError, showSuccess, showConfirm } = useAlert();
  const { selectedCountry } = useCountry();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'mynita',
  });

  useEffect(() => {
    setBeneficiaries(mockBeneficiaries);
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      service: 'mynita',
    });
    setSelectedCity(null);
  };

  const handleAddBeneficiary = () => {
    if (!formData.name || !formData.phone || !selectedCity) {
      showError('Erreur', 'Veuillez remplir tous les champs et sélectionner une ville');
      return;
    }

    const newBeneficiary = {
      id: Date.now().toString(),
      ...formData,
      location: `${selectedCity.name}, ${selectedCountry?.name}`,
      city: selectedCity,
    };

    setBeneficiaries([...beneficiaries, newBeneficiary]);
    setShowAddModal(false);
    resetForm();
    showSuccess('Succès', 'Bénéficiaire ajouté avec succès');
  };

  const handleEditBeneficiary = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setFormData({
      name: beneficiary.name,
      phone: beneficiary.phone,
      service: beneficiary.service,
    });
    setSelectedCity(beneficiary.city);
    setShowAddModal(true);
  };

  const handleUpdateBeneficiary = () => {
    if (!formData.name || !formData.phone || !selectedCity) {
      showError('Erreur', 'Veuillez remplir tous les champs et sélectionner une ville');
      return;
    }

    const updatedBeneficiaries = beneficiaries.map(b =>
      b.id === editingBeneficiary.id ? { 
        ...b, 
        ...formData, 
        location: `${selectedCity.name}, ${selectedCountry?.name}`,
        city: selectedCity 
      } : b
    );

    setBeneficiaries(updatedBeneficiaries);
    setShowAddModal(false);
    setEditingBeneficiary(null);
    resetForm();
    showSuccess('Succès', 'Bénéficiaire modifié avec succès');
  };

  const handleDeleteBeneficiary = (id) => {
    showConfirm(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?',
      () => {
        setBeneficiaries(beneficiaries.filter(b => b.id !== id));
        showSuccess('Succès', 'Bénéficiaire supprimé');
      }
    );
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingBeneficiary(null);
    resetForm();
  };

  const getServiceName = (service) => {
    return service === 'mynita' ? 'MyNITA' : 'Amana-ta';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mes bénéficiaires</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <LinearGradient
              colors={['#2E8B57', '#4CAF50']}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Beneficiaries List */}
        <View style={styles.beneficiariesList}>
          {beneficiaries.length === 0 ? (
            <View style={styles.emptyState}>
              <User size={48} color="#CCC" />
              <Text style={styles.emptyStateTitle}>Aucun bénéficiaire</Text>
              <Text style={styles.emptyStateText}>
                Ajoutez votre premier bénéficiaire pour commencer à envoyer de l'argent
              </Text>
            </View>
          ) : (
            beneficiaries.map((beneficiary) => (
              <View key={beneficiary.id} style={styles.beneficiaryCard}>
                <View style={styles.beneficiaryHeader}>
                  <View style={styles.beneficiaryIcon}>
                    <User size={24} color="#FF6B35" />
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
                  <View style={styles.beneficiaryActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditBeneficiary(beneficiary)}
                    >
                      <Edit2 size={16} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDeleteBeneficiary(beneficiary.id)}
                    >
                      <Trash2 size={16} color="#DC3545" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.beneficiaryFooter}>
                  <View style={styles.serviceTag}>
                    <Text style={styles.serviceTagText}>
                      {getServiceName(beneficiary.service)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingBeneficiary ? 'Modifier le bénéficiaire' : 'Ajouter un bénéficiaire'}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nom complet</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Ex: Fatima Oumarou"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Numéro de téléphone</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  placeholder="Ex: +227 90 12 34 56"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Ville de destination</Text>
                <CitySelector
                  selectedCountry={selectedCountry}
                  selectedCity={selectedCity}
                  onCitySelect={setSelectedCity}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Service préféré</Text>
                <View style={styles.serviceOptions}>
                  <TouchableOpacity
                    style={[
                      styles.serviceOption,
                      formData.service === 'mynita' && styles.serviceOptionActive
                    ]}
                    onPress={() => setFormData({ ...formData, service: 'mynita' })}
                  >
                    <Text style={[
                      styles.serviceOptionText,
                      formData.service === 'mynita' && styles.serviceOptionTextActive
                    ]}>
                      MyNITA
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.serviceOption,
                      formData.service === 'amana' && styles.serviceOptionActive
                    ]}
                    onPress={() => setFormData({ ...formData, service: 'amana' })}
                  >
                    <Text style={[
                      styles.serviceOptionText,
                      formData.service === 'amana' && styles.serviceOptionTextActive
                    ]}>
                      Amana-ta
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={editingBeneficiary ? handleUpdateBeneficiary : handleAddBeneficiary}
              >
                <LinearGradient
                  colors={['#FF6B35', '#FF8A65']}
                  style={styles.saveButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.saveButtonText}>
                    {editingBeneficiary ? 'Modifier' : 'Ajouter'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  beneficiariesList: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  beneficiaryCard: {
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
  beneficiaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  beneficiaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  beneficiaryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  beneficiaryFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  serviceTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: '500',
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
    maxHeight: '90%',
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
  modalBody: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  serviceOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceOption: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  serviceOptionActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF3F0',
  },
  serviceOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  serviceOptionTextActive: {
    color: '#FF6B35',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});