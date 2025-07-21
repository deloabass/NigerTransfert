import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Plus, Trash2, X, Check, Shield, Calendar, User } from 'lucide-react-native';

export default function CardsScreen() {
  const [card, setCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  useEffect(() => {
    // Simuler une carte existante
    setCard({
      id: '1',
      cardNumber: '**** **** **** 1234',
      fullCardNumber: '4532123456781234',
      expiryDate: '12/26',
      cardholderName: 'AMADOU DIALLO',
      cardType: 'visa',
    });
  }, []);

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    });
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const getCardType = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    return 'unknown';
  };

  const getCardIcon = (cardType) => {
    switch (cardType) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      default:
        return '💳';
    }
  };

  const handleAddOrUpdateCard = () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
      Alert.alert('Erreur', 'Le numéro de carte doit contenir 16 chiffres');
      return;
    }

    if (formData.cvv.length !== 3) {
      Alert.alert('Erreur', 'Le CVV doit contenir 3 chiffres');
      return;
    }

    const cardData = {
      id: card ? card.id : Date.now().toString(),
      cardNumber: '**** **** **** ' + cardNumber.slice(-4),
      fullCardNumber: cardNumber,
      expiryDate: formData.expiryDate,
      cardholderName: formData.cardholderName.toUpperCase(),
      cardType: getCardType(cardNumber),
    };

    setCard(cardData);
    setShowAddModal(false);
    resetForm();
    Alert.alert('Succès', card ? 'Carte modifiée avec succès' : 'Carte ajoutée avec succès');
  };

  const handleDeleteCard = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette carte ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setCard(null);
            Alert.alert('Succès', 'Carte supprimée');
          },
        },
      ]
    );
  };

  const handleEditCard = () => {
    if (card) {
      setFormData({
        cardNumber: card.fullCardNumber.replace(/(.{4})/g, '$1 ').trim(),
        expiryDate: card.expiryDate,
        cvv: '***',
        cardholderName: card.cardholderName,
      });
      setShowAddModal(true);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mes cartes</Text>
          {!card && (
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
          )}
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Shield size={20} color="#2E8B57" />
          <Text style={styles.securityText}>
            Une seule carte peut être enregistrée pour votre sécurité
          </Text>
        </View>

        {/* Card Display */}
        <View style={styles.cardsList}>
          {!card ? (
            <View style={styles.emptyState}>
              <CreditCard size={48} color="#CCC" />
              <Text style={styles.emptyStateTitle}>Aucune carte</Text>
              <Text style={styles.emptyStateText}>
                Ajoutez votre carte bancaire pour commencer à envoyer de l'argent
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <LinearGradient
                colors={['#FF6B35', '#FF8A65']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>{getCardIcon(card.cardType)}</Text>
                  <Text style={styles.cardType}>{card.cardType.toUpperCase()}</Text>
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Principale</Text>
                  </View>
                </View>
                
                <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardLabel}>Titulaire</Text>
                    <Text style={styles.cardholderName}>{card.cardholderName}</Text>
                  </View>
                  <View>
                    <Text style={styles.cardLabel}>Expire</Text>
                    <Text style={styles.expiryDate}>{card.expiryDate}</Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleEditCard}
                >
                  <Edit2 size={16} color="#2E8B57" />
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={handleDeleteCard}
                >
                  <Trash2 size={16} color="#DC3545" />
                  <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Add Card Button (when card exists) */}
        {card && (
          <View style={styles.replaceCardSection}>
            <Text style={styles.replaceCardTitle}>Remplacer votre carte</Text>
            <Text style={styles.replaceCardText}>
              Vous ne pouvez avoir qu'une seule carte enregistrée. Pour ajouter une nouvelle carte, 
              vous devez d'abord supprimer l'actuelle.
            </Text>
            <TouchableOpacity
              style={styles.replaceCardButton}
              onPress={() => {
                Alert.alert(
                  'Remplacer la carte',
                  'Voulez-vous supprimer la carte actuelle et en ajouter une nouvelle ?',
                  [
                    { text: 'Annuler', style: 'cancel' },
                    { 
                      text: 'Remplacer', 
                      onPress: () => {
                        setCard(null);
                        setShowAddModal(true);
                      }
                    }
                  ]
                );
              }}
            >
              <Text style={styles.replaceCardButtonText}>Remplacer la carte</Text>
            </TouchableOpacity>
          </View>
        )}
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
                {card ? 'Modifier la carte' : 'Ajouter une carte'}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Numéro de carte</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.cardNumber}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(text);
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      setFormData({ ...formData, cardNumber: formatted });
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, styles.formGroupHalf]}>
                  <Text style={styles.formLabel}>Date d'expiration</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.expiryDate}
                    onChangeText={(text) => {
                      const formatted = formatExpiryDate(text);
                      if (formatted.length <= 5) {
                        setFormData({ ...formData, expiryDate: formatted });
                      }
                    }}
                    placeholder="MM/AA"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>

                <View style={[styles.formGroup, styles.formGroupHalf]}>
                  <Text style={styles.formLabel}>CVV</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.cvv}
                    onChangeText={(text) => {
                      if (text.length <= 3) {
                        setFormData({ ...formData, cvv: text });
                      }
                    }}
                    placeholder="123"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nom du titulaire</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.cardholderName}
                  onChangeText={(text) => setFormData({ ...formData, cardholderName: text })}
                  placeholder="Abdoul-Razack AMADOU"
                  placeholderTextColor="#999"
                  autoCapitalize="characters"
                />
              </View>

              {!card && (
                <View style={styles.securityInfo}>
                  <Shield size={16} color="#2E8B57" />
                  <Text style={styles.securityInfoText}>
                    Une seule carte peut être enregistrée pour votre sécurité
                  </Text>
                </View>
              )}
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
                onPress={handleAddOrUpdateCard}
              >
                <LinearGradient
                  colors={['#FF6B35', '#FF8A65']}
                  style={styles.saveButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.saveButtonText}>
                    {card ? 'Modifier' : 'Ajouter'}
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
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#2E8B57',
    flex: 1,
  },
  cardsList: {
    padding: 20,
    paddingTop: 0,
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
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.8,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
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
  cardLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 4,
  },
  cardholderName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  expiryDate: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  deleteButtonText: {
    color: '#DC3545',
  },
  replaceCardSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  replaceCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  replaceCardText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 16,
  },
  replaceCardButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  replaceCardButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
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
  formGroupHalf: {
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
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
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 10,
  },
  securityInfoText: {
    fontSize: 12,
    color: '#2E8B57',
    flex: 1,
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
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteCard(card.id)}
                  >
                    <Trash2 size={16} color="#DC3545" />
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter une carte</Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Numéro de carte</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.cardNumber}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(text);
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      setFormData({ ...formData, cardNumber: formatted });
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, styles.formGroupHalf]}>
                  <Text style={styles.formLabel}>Date d'expiration</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.expiryDate}
                    onChangeText={(text) => {
                      const formatted = formatExpiryDate(text);
                      if (formatted.length <= 5) {
                        setFormData({ ...formData, expiryDate: formatted });
                      }
                    }}
                    placeholder="MM/AA"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>

                <View style={[styles.formGroup, styles.formGroupHalf]}>
                  <Text style={styles.formLabel}>CVV</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.cvv}
                    onChangeText={(text) => {
                      if (text.length <= 3) {
                        setFormData({ ...formData, cvv: text });
                      }
                    }}
                    placeholder="123"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nom du titulaire</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.cardholderName}
                  onChangeText={(text) => setFormData({ ...formData, cardholderName: text })}
                  placeholder="Abdoul-Razack AMADOU"
                  placeholderTextColor="#999"
                  autoCapitalize="characters"
                />
              </View>

              <TouchableOpacity
                style={styles.defaultOption}
                onPress={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
              >
                <View style={[styles.checkbox, formData.isDefault && styles.checkboxActive]}>
                  {formData.isDefault && <Check size={16} color="#FFFFFF" />}
                </View>
                <Text style={styles.defaultOptionText}>Définir comme carte par défaut</Text>
              </TouchableOpacity>
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
                onPress={handleAddCard}
              >
                <LinearGradient
                  colors={['#FF6B35', '#FF8A65']}
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
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#2E8B57',
    flex: 1,
  },
  cardsList: {
    padding: 20,
    paddingTop: 0,
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
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.8,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
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
  cardLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 4,
  },
  cardholderName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  expiryDate: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  deleteButtonText: {
    color: '#DC3545',
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
  formGroupHalf: {
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
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
  defaultOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  defaultOptionText: {
    fontSize: 14,
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