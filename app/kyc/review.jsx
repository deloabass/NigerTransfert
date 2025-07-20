import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, CircleCheck as CheckCircle, FileText, User, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ReviewScreen() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/kyc/success');
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
          <Text style={styles.title}>Vérification des documents</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepCompleted]}>
              <CheckCircle size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.progressLine, styles.progressLineActive]} />
            <View style={[styles.progressStep, styles.progressStepCompleted]}>
              <CheckCircle size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.progressLine, styles.progressLineActive]} />
            <View style={[styles.progressStep, styles.progressStepActive]}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
          </View>
          <Text style={styles.progressText}>Étape 3 sur 3: Vérification</Text>
        </View>

        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Clock size={32} color="#FF6B35" />
          <Text style={styles.reviewTitle}>Documents en cours de vérification</Text>
          <Text style={styles.reviewText}>
            Vos documents ont été soumis avec succès. Notre équipe les vérifiera dans les 24 heures.
          </Text>
        </View>

        {/* Submitted Documents */}
        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Documents soumis</Text>
          
          <View style={styles.documentItem}>
            <View style={styles.documentIcon}>
              <FileText size={20} color="#2E8B57" />
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Document d'identité</Text>
              <Text style={styles.documentStatus}>✓ Téléchargé avec succès</Text>
            </View>
            <CheckCircle size={20} color="#2E8B57" />
          </View>

          <View style={styles.documentItem}>
            <View style={styles.documentIcon}>
              <User size={20} color="#2E8B57" />
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Photo selfie</Text>
              <Text style={styles.documentStatus}>✓ Téléchargé avec succès</Text>
            </View>
            <CheckCircle size={20} color="#2E8B57" />
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsSection}>
          <Text style={styles.sectionTitle}>Prochaines étapes</Text>
          
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                Notre équipe vérifie vos documents (24h maximum)
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Vous recevrez une notification par email
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                Vos limites de transfert seront augmentées
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Avantages après vérification</Text>
          
          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.benefitText}>Limites de transfert augmentées</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.benefitText}>Frais réduits sur les transferts</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.benefitText}>Support client prioritaire</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.benefitText}>Accès à tous les services</Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#2E8B57', '#4CAF50']}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.continueButtonText}>Terminer</Text>
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
  progressSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepActive: {
    backgroundColor: '#FF6B35',
  },
  progressStepCompleted: {
    backgroundColor: '#2E8B57',
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: '#2E8B57',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  reviewSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  documentsSection: {
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
    marginBottom: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  documentStatus: {
    fontSize: 12,
    color: '#2E8B57',
  },
  nextStepsSection: {
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
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  benefitsSection: {
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
  benefits: {
    gap: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});