import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Shield, FileText, Camera, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function KycScreen() {
  const router = useRouter();

  const steps = [
    {
      icon: FileText,
      title: 'Documents d\'identité',
      description: 'Téléchargez une pièce d\'identité valide (passeport, carte d\'identité)',
      status: 'pending',
    },
    {
      icon: Camera,
      title: 'Photo selfie',
      description: 'Prenez une photo de vous pour vérifier votre identité',
      status: 'pending',
    },
    {
      icon: CheckCircle,
      title: 'Vérification',
      description: 'Notre équipe vérifiera vos documents sous 24h',
      status: 'pending',
    },
  ];

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
          <Text style={styles.title}>Vérification d'identité</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.iconContainer}>
            <Shield size={60} color="#FF6B35" />
          </View>
          
          <Text style={styles.infoTitle}>Pourquoi vérifier votre identité ?</Text>
          <Text style={styles.infoDescription}>
            La vérification d'identité (KYC) est obligatoire pour assurer la sécurité des transferts 
            et respecter les réglementations financières internationales.
          </Text>

          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <CheckCircle size={20} color="#2E8B57" />
              <Text style={styles.benefitText}>Augmentez vos limites de transfert</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={20} color="#2E8B57" />
              <Text style={styles.benefitText}>Accédez à tous les services</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={20} color="#2E8B57" />
              <Text style={styles.benefitText}>Sécurisez votre compte</Text>
            </View>
          </View>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.stepsTitle}>Étapes de vérification</Text>
          
          {steps.map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepIcon}>
                  <step.icon size={24} color="#FF6B35" />
                </View>
                <View style={styles.stepInfo}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <View style={styles.requirementsSection}>
          <Text style={styles.requirementsTitle}>Documents acceptés</Text>
          <View style={styles.requirements}>
            <Text style={styles.requirement}>• Passeport valide</Text>
            <Text style={styles.requirement}>• Carte d'identité nationale</Text>
            <Text style={styles.requirement}>• Permis de conduire</Text>
            <Text style={styles.requirement}>• Carte de séjour (pour les résidents)</Text>
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push('/kyc/document-upload')}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.startButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.startButtonText}>Commencer la vérification</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.laterText}>Plus tard</Text>
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
  infoSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  benefits: {
    width: '100%',
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  stepsSection: {
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
  stepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  stepCard: {
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  requirementsSection: {
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
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  requirements: {
    gap: 8,
  },
  requirement: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  startButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  laterText: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  },
});