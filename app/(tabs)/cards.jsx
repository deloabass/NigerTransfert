import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Plus, Trash2, X, Lock, Calendar, User } from 'lucide-react-native';
import { useAlert } from '@/components/AlertProvider';

export default function CardsScreen() {
  const { showError, showSuccess, showConfirm } = useAlert();
  const [cards, setCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  useEffect(() => {
    // Simuler des cartes existantes
    setCards([
      {
        id: '1',
        cardNumber: '**** **** **** 1234',
        cardType: 'visa',
        cardholderName: 'AMADOU DIALLO',
        expiryDate: '12/26',
        isDefault: true,
      },
      {
        id: '2',
        cardNumber: '**** **** **** 5678',
        cardType: 'mastercard',
        cardholderName: 'AMADOU DIALLO',
        expiryDate: '08/27',
        isDefault: false,
      },
    ]);
  }, []);

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    });
  };

  const handleAddCard = () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      showError('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Validation basique du numéro de carte
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      showError('Erreur', 'Le numéro de carte doit contenir 16 chiffres');
      return;
    }

    // Déterminer le type de carte
    const cardType = cardNumberClean.startsWith('4') ? 'visa' : 'mastercard';
    const maskedNumber = `**** **** **** ${cardNumberClean.slice(-4)}`;

    const newCard = {
      id: Date.now().toString(),
      cardNumber: maskedNumber,
      cardType,
      cardholderName: formData.cardholderName.toUpperCase(),
      expiryDate: formData.expiryDate,
      isDefault: cards.length === 0,
    };

    setCards([...cards, newCard]);
    setShowAddModal(false);
    resetForm();
    showSuccess('Succès', 'Carte ajoutée avec succès');
  };

  const handleDeleteCard = (id) => {
    showConfirm(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette carte ?',
      () => {
        setCards(cards.filter(card => card.id !== id));
        showSuccess('Succès', 'Carte supprimée');
      }
    );
  };

  const handleSetDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
    showSuccess('Succès', 'Carte définie par défaut');
  };

  const getCardIcon = (type) => {
    return type === 'visa' ? '💳' : '💳';
  };

  const getCardColor = (type) => {
    return type === 'visa' ? ['#1A1F71', '#4338CA'] : ['#EB001B', '#FF5F00'];
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mes cartes</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Cards List */}
        <View style={styles.cardsList}>
          {cards.length === 0 ? (
            <View style={styles.emptyState}>
              <CreditCard size={48} color="#CCC" />
              <Text style={styles.emptyStateTitle}>Aucune carte enregistrée</Text>
              <Text style={styles.emptyStateText}>
                Ajoutez votre première carte pour effectuer des transferts
              </Text>
            </View>
          ) : (
            cards.map((card) => (
              <View key={card.id} style={styles.cardContainer}>
                <LinearGradient
                  colors={getCardColor(card.cardType)}
                  style={styles.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>{getCardIcon(card.cardType)}</Text>
                    <Text style={styles.cardType}>{card.cardType.toUpperCase()}</Text>
                    {card.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Défaut</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardLabel}>Titulaire</Text>
                      <Text style={styles.cardValue}>{card.cardholderName}</Text>
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardLabel}>Expire</Text>
                      <Text style={styles.cardValue}>{card.expiryDate}</Text>
                    </View>
                  </View>
                </LinearGradient>

                <View style={styles.cardActions}>
                  {!card.isDefault && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSetDefault(card.id)}
                    >
                      <Text style={styles.actionButtonText}>Définir par défaut</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteCard(card.id)}
                  >
                    <Trash2 size={16} color="#DC3545" />
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Lock size={20} color="#2E8B57" />
          <Text style={styles.securityText}>
            Vos informations de carte sont chiffrées et sécurisées selon les standards PCI DSS
          </Text>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter une carte</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Numéro de carte</Text>
                <View style={styles.inputContainer}>
                  <CreditCard size={20} color="#666" />
                  <TextInput
                    style={styles.formInput}
                    value={formData.cardNumber}
                    onChangeText={(text) => setFormData({ ...formData, cardNumber: formatCardNumber(text) })}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, styles.formGroupHalf]}>
                  <Text style={styles.formLabel}>Date d'expiration</Text>
                  <View style={styles.inputContainer}>
                    <Calendar size={20} color="#666" />
                    <TextInput
                      style={styles.formInput}
                      value={formData.expiryDate}
                      onChangeText={(text) => setFormData({ ...formData, expiryDate: formatExpiryDate(text) })}
                      placeholder="MM/AA"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View style={[styles.formGroup, styles.formGroupHalf]}>
                  <Text style={styles.formLabel}>CVV</Text>
                  <View style={styles.inputContainer}>
                    <Lock size={20} color="#666" />
                    <TextInput
                      style={styles.formInput}
                      value={formData.cvv}
                      onChangeText={(text) => setFormData({ ...formData, cvv: text })}
                      placeholder="123"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nom du titulaire</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#666" />
                  <TextInput
                    style={styles.formInput}
                    value={formData.cardholderName}
                    onChangeText={(text) => setFormData({ ...formData, cardholderName: text })}
                    placeholder="AMADOU DIALLO"
                    placeholderTextColor="#999"
                    autoCapitalize="characters"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddCard}
              >
                <LinearGradient
                  colors={['#2E8B57', '#4CAF50']}
                  style={styles.saveButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.saveButtonText}>Ajouter la carte</Text>
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
  cardsList: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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
  cardContainer: {
    marginBottom: 20,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#DC3545',
    fontWeight: '500',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  securityText: {
    fontSize: 12,
    color: '#2E8B57',
    flex: 1,
    lineHeight: 16,
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
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  formGroupHalf: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  formInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
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