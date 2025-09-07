import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Send, AlertTriangle, CircleHelp as HelpCircle, CreditCard, User, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAlert } from '@/components/AlertProvider';

export default function CreateTicketScreen() {
  const router = useRouter();
  const { showSuccess } = useAlert();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
  });

  const categories = [
    {
      id: 'transfer',
      title: 'Problème de transfert',
      description: 'Transfert bloqué, échec, ou retard',
      icon: <CreditCard size={20} color="#FF6B35" />,
    },
    {
      id: 'fees',
      title: 'Question sur les frais',
      description: 'Frais inattendus ou tarification',
      icon: <AlertTriangle size={20} color="#FF6B35" />,
    },
    {
      id: 'account',
      title: 'Problème de compte',
      description: 'Connexion, paramètres, ou profil',
      icon: <User size={20} color="#FF6B35" />,
    },
    {
      id: 'verification',
      title: 'Vérification KYC',
      description: 'Documents, identité, ou limites',
      icon: <Shield size={20} color="#FF6B35" />,
    },
    {
      id: 'technical',
      title: 'Problème technique',
      description: 'Bug de l\'application ou erreur',
      icon: <HelpCircle size={20} color="#FF6B35" />,
    },
    {
      id: 'other',
      title: 'Autre',
      description: 'Question générale ou suggestion',
      icon: <HelpCircle size={20} color="#FF6B35" />,
    },
  ];

  const priorities = [
    { value: 'low', label: 'Basse', color: '#2E8B57', description: 'Question générale' },
    { value: 'medium', label: 'Moyenne', color: '#FF6B35', description: 'Problème gênant' },
    { value: 'high', label: 'Haute', color: '#DC3545', description: 'Problème urgent' },
  ];

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.category || !formData.description.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simuler la création du ticket
    const ticketId = 'TKT' + Date.now().toString().slice(-6);
    
    showSuccess(
      'Ticket créé',
      `Votre ticket #${ticketId} a été créé avec succès. Notre équipe vous répondra dans les plus brefs délais.`,
      {
        buttons: [
          { text: 'OK', onPress: () => router.back() }
        ]
      }
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
          <Text style={styles.title}>Créer un ticket</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Titre du problème *</Text>
            <TextInput
              style={styles.titleInput}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Décrivez brièvement votre problème"
              placeholderTextColor="#999"
              maxLength={100}
            />
            <Text style={styles.charCount}>{formData.title.length}/100</Text>
          </View>

          {/* Category */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Catégorie *</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    formData.category === category.id && styles.categoryCardSelected
                  ]}
                  onPress={() => setFormData({ ...formData, category: category.id })}
                >
                  <View style={styles.categoryIcon}>
                    {category.icon}
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Priority */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Priorité</Text>
            <View style={styles.prioritiesContainer}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority.value}
                  style={[
                    styles.priorityOption,
                    formData.priority === priority.value && styles.priorityOptionSelected,
                    { borderColor: priority.color }
                  ]}
                  onPress={() => setFormData({ ...formData, priority: priority.value })}
                >
                  <View style={[styles.priorityDot, { backgroundColor: priority.color }]} />
                  <View style={styles.priorityInfo}>
                    <Text style={styles.priorityLabel}>{priority.label}</Text>
                    <Text style={styles.priorityDescription}>{priority.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Description détaillée *</Text>
            <TextInput
              style={styles.descriptionInput}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Décrivez votre problème en détail. Plus vous donnez d'informations, plus nous pourrons vous aider rapidement."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.charCount}>{formData.description.length}/1000</Text>
          </View>

          {/* Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Conseils pour un ticket efficace</Text>
            <View style={styles.tips}>
              <Text style={styles.tip}>• Soyez précis dans votre description</Text>
              <Text style={styles.tip}>• Incluez les numéros de référence si applicable</Text>
              <Text style={styles.tip}>• Mentionnez les étapes que vous avez déjà essayées</Text>
              <Text style={styles.tip}>• Ajoutez des captures d'écran si nécessaire</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#2E8B57', '#4CAF50']}
              style={styles.submitButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Créer le ticket</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  form: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  categoryCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF3F0',
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  prioritiesContainer: {
    gap: 8,
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
  },
  priorityOptionSelected: {
    backgroundColor: '#F8F9FA',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  priorityInfo: {
    flex: 1,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  priorityDescription: {
    fontSize: 12,
    color: '#666',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
  },
  tipsSection: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
    marginBottom: 12,
  },
  tips: {
    gap: 4,
  },
  tip: {
    fontSize: 14,
    color: '#2E8B57',
    lineHeight: 20,
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
});