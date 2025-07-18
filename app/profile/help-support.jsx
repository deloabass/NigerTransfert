import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MessageCircle, Phone, Mail, CircleHelp as HelpCircle, Send, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HelpSupportScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('email');

  const supportCategories = [
    {
      id: 'transaction',
      title: 'Problème de transaction',
      description: 'Transfert en attente, échec, ou montant incorrect',
      icon: '💸',
    },
    {
      id: 'account',
      title: 'Problème de compte',
      description: 'Connexion, vérification, ou paramètres',
      icon: '👤',
    },
    {
      id: 'payment',
      title: 'Problème de paiement',
      description: 'Carte bancaire, frais, ou remboursement',
      icon: '💳',
    },
    {
      id: 'technical',
      title: 'Problème technique',
      description: 'Bug de l\'application ou erreur système',
      icon: '🔧',
    },
    {
      id: 'other',
      title: 'Autre',
      description: 'Question générale ou suggestion',
      icon: '💬',
    },
  ];

  const contactMethods = [
    {
      id: 'email',
      title: 'Email',
      description: 'Réponse sous 24h',
      icon: <Mail size={20} color="#FF6B35" />,
    },
    {
      id: 'phone',
      title: 'Téléphone',
      description: 'Disponible 24h/24',
      icon: <Phone size={20} color="#FF6B35" />,
    },
    {
      id: 'chat',
      title: 'Chat en direct',
      description: 'Réponse immédiate',
      icon: <MessageCircle size={20} color="#FF6B35" />,
    },
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !message.trim()) {
      Alert.alert('Erreur', 'Veuillez sélectionner une catégorie et saisir votre message');
      return;
    }

    Alert.alert(
      'Message envoyé',
      'Votre demande a été envoyée avec succès. Notre équipe vous répondra dans les plus brefs délais.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Aide et support</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/faq')}>
            <HelpCircle size={24} color="#FF6B35" />
            <Text style={styles.quickActionTitle}>FAQ</Text>
            <Text style={styles.quickActionDescription}>Questions fréquentes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <Phone size={24} color="#2E8B57" />
            <Text style={styles.quickActionTitle}>Appeler</Text>
            <Text style={styles.quickActionDescription}>+33 1 23 45 67 89</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <MessageCircle size={24} color="#666" />
            <Text style={styles.quickActionTitle}>Chat</Text>
            <Text style={styles.quickActionDescription}>Support en direct</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contactez-nous</Text>

          {/* Category Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Catégorie du problème</Text>
            {supportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryOption,
                  selectedCategory === category.id && styles.categoryOptionSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
                {selectedCategory === category.id && (
                  <CheckCircle size={20} color="#2E8B57" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Method */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Méthode de contact préférée</Text>
            <View style={styles.contactMethods}>
              {contactMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.contactMethod,
                    contactMethod === method.id && styles.contactMethodSelected
                  ]}
                  onPress={() => setContactMethod(method.id)}
                >
                  {method.icon}
                  <Text style={[
                    styles.contactMethodTitle,
                    contactMethod === method.id && styles.contactMethodTitleSelected
                  ]}>
                    {method.title}
                  </Text>
                  <Text style={[
                    styles.contactMethodDescription,
                    contactMethod === method.id && styles.contactMethodDescriptionSelected
                  ]}>
                    {method.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Message */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Décrivez votre problème</Text>
            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Décrivez votre problème en détail..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.submitButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Envoyer le message</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Support Hours */}
        <View style={styles.supportHours}>
          <Clock size={20} color="#666" />
          <View style={styles.hoursInfo}>
            <Text style={styles.hoursTitle}>Heures de support</Text>
            <Text style={styles.hoursText}>Lundi - Vendredi: 9h00 - 18h00</Text>
            <Text style={styles.hoursText}>Weekend: 10h00 - 16h00</Text>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryOptionSelected: {
    backgroundColor: '#FFF3F0',
    borderColor: '#FF6B35',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
  },
  contactMethods: {
    flexDirection: 'row',
    gap: 8,
  },
  contactMethod: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  contactMethodSelected: {
    backgroundColor: '#FFF3F0',
    borderColor: '#FF6B35',
  },
  contactMethodTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 2,
  },
  contactMethodTitleSelected: {
    color: '#FF6B35',
  },
  contactMethodDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  contactMethodDescriptionSelected: {
    color: '#FF6B35',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  supportHours: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  hoursInfo: {
    flex: 1,
  },
  hoursTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hoursText: {
    fontSize: 12,
    color: '#666',
  },
});