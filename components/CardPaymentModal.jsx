import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, CreditCard, Calendar, Lock, User, Shield } from 'lucide-react-native';

export default function CardPaymentModal({ visible, onClose, onConfirm, amount }) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

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

  const handleConfirm = () => {
    if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const cardNumberClean = cardData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      Alert.alert('Erreur', 'Le numéro de carte doit contenir 16 chiffres');
      return;
    }

    if (cardData.cvv.length !== 3) {
      Alert.alert('Erreur', 'Le CVV doit contenir 3 chiffres');
      return;
    }

    onConfirm(cardData);
    setCardData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
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
            <Text style={styles.title}>Paiement sécurisé</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Montant à débiter</Text>
            <Text style={styles.amountValue}>{amount}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Numéro de carte</Text>
              <View style={styles.inputContainer}>
                <CreditCard size={20} color="#666" />
                <TextInput
                  style={styles.input}
                  value={cardData.cardNumber}
                  onChangeText={(text) => setCardData({ ...cardData, cardNumber: formatCardNumber(text) })}
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
                    style={styles.input}
                    value={cardData.expiryDate}
                    onChangeText={(text) => setCardData({ ...cardData, expiryDate: formatExpiryDate(text) })}
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
                    style={styles.input}
                    value={cardData.cvv}
                    onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
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
                  style={styles.input}
                  value={cardData.cardholderName}
                  onChangeText={(text) => setCardData({ ...cardData, cardholderName: text })}
                  placeholder="AMADOU DIALLO"
                  placeholderTextColor="#999"
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>

          <View style={styles.securityInfo}>
            <Shield size={16} color="#2E8B57" />
            <Text style={styles.securityText}>
              Vos données sont protégées par un chiffrement SSL 256-bit
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <LinearGradient
                colors={['#2E8B57', '#4CAF50']}
                style={styles.confirmButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.confirmButtonText}>Confirmer le paiement</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    maxHeight: '90%',
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
  amountSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
  },
  form: {
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
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    margin: 20,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#2E8B57',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
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
  confirmButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});