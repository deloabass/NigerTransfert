import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Camera, CircleCheck as CheckCircle, AlertTriangle, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SelfieScreen() {
  const router = useRouter();
  const [selfieTaken, setSelfieTaken] = useState(false);

  const handleTakeSelfie = () => {
    // Simuler la prise de selfie
    Alert.alert(
      'Prendre un selfie',
      'Positionnez votre visage dans le cadre et prenez la photo',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Prendre la photo', onPress: () => simulateSelfie() },
      ]
    );
  };

  const simulateSelfie = () => {
    setSelfieTaken(true);
    Alert.alert('Succès', 'Selfie pris avec succès');
  };

  const handleContinue = () => {
    if (!selfieTaken) {
      Alert.alert('Erreur', 'Veuillez prendre un selfie');
      return;
    }
    router.push('/kyc/review');
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
          <Text style={styles.title}>Photo selfie</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepCompleted]}>
              <CheckCircle size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.progressLine, styles.progressLineActive]} />
            <View style={[styles.progressStep, styles.progressStepActive]}>
              <Text style={styles.progressStepText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
          </View>
          <Text style={styles.progressText}>Étape 2 sur 3: Photo selfie</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <User size={32} color="#FF6B35" />
          <Text style={styles.instructionsTitle}>Prenez un selfie</Text>
          <Text style={styles.instructionsText}>
            Nous avons besoin d'une photo de vous pour vérifier votre identité et la faire correspondre à votre document.
          </Text>
        </View>

        {/* Selfie Area */}
        <View style={styles.selfieSection}>
          <View style={styles.selfieFrame}>
            {selfieTaken ? (
              <View style={styles.selfieSuccess}>
                <CheckCircle size={60} color="#2E8B57" />
                <Text style={styles.selfieSuccessText}>Selfie pris avec succès</Text>
              </View>
            ) : (
              <View style={styles.selfiePrompt}>
                <Camera size={60} color="#CCC" />
                <Text style={styles.selfiePromptText}>Appuyez pour prendre un selfie</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.selfieButton}
            onPress={handleTakeSelfie}
          >
            <LinearGradient
              colors={['#2E8B57', '#4CAF50']}
              style={styles.selfieButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Camera size={24} color="#FFFFFF" />
              <Text style={styles.selfieButtonText}>
                {selfieTaken ? 'Reprendre la photo' : 'Prendre un selfie'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Guidelines */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.guidelinesTitle}>Conseils pour un bon selfie</Text>
          <View style={styles.guidelines}>
            <View style={styles.guideline}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.guidelineText}>Regardez directement la caméra</Text>
            </View>
            <View style={styles.guideline}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.guidelineText}>Assurez-vous d'avoir un bon éclairage</Text>
            </View>
            <View style={styles.guideline}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.guidelineText}>Retirez lunettes de soleil et chapeau</Text>
            </View>
            <View style={styles.guideline}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.guidelineText}>Gardez une expression neutre</Text>
            </View>
            <View style={styles.guideline}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.guidelineText}>Centrez votre visage dans le cadre</Text>
            </View>
          </View>
        </View>

        {/* Warning */}
        <View style={styles.warningSection}>
          <AlertTriangle size={20} color="#FF6B35" />
          <Text style={styles.warningText}>
            Votre selfie sera comparé à votre document d'identité pour vérifier votre identité.
          </Text>
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !selfieTaken && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selfieTaken}
          >
            <LinearGradient
              colors={selfieTaken ? ['#FF6B35', '#FF8A65'] : ['#CCC', '#CCC']}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.continueButtonText}>Continuer</Text>
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
  instructionsSection: {
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
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  selfieSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selfieFrame: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  selfiePrompt: {
    alignItems: 'center',
  },
  selfiePromptText: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 12,
    textAlign: 'center',
  },
  selfieSuccess: {
    alignItems: 'center',
  },
  selfieSuccessText: {
    fontSize: 14,
    color: '#2E8B57',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  selfieButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  selfieButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  selfieButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  guidelinesSection: {
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
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  guidelines: {
    gap: 8,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: '#666',
  },
  warningSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
    gap: 12,
  },
  warningText: {
    fontSize: 12,
    color: '#FF6B35',
    flex: 1,
    lineHeight: 16,
  },
  footer: {
    padding: 20,
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.5,
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