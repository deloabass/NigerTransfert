import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Upload, Camera, FileText, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DocumentUploadScreen() {
  const router = useRouter();
  const [uploadedDocument, setUploadedDocument] = useState(null);

  const documentTypes = [
    {
      id: 'passport',
      title: 'Passeport',
      description: 'Pages principales avec photo et informations',
      icon: '📘',
      accepted: true,
    },
    {
      id: 'id_card',
      title: 'Carte d\'identité',
      description: 'Recto et verso de la carte nationale',
      icon: '🆔',
      accepted: true,
    },
    {
      id: 'driving_license',
      title: 'Permis de conduire',
      description: 'Recto et verso du permis',
      icon: '🚗',
      accepted: true,
    },
    {
      id: 'residence_permit',
      title: 'Carte de séjour',
      description: 'Pour les résidents non-européens',
      icon: '🏠',
      accepted: true,
    },
  ];

  const handleDocumentUpload = (type) => {
    // Simuler l'upload de document
    Alert.alert(
      'Télécharger un document',
      'Choisissez votre méthode de téléchargement',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Prendre une photo', onPress: () => simulateUpload(type, 'camera') },
        { text: 'Galerie', onPress: () => simulateUpload(type, 'gallery') },
      ]
    );
  };

  const simulateUpload = (type, method) => {
    setUploadedDocument({ type, method, timestamp: new Date() });
    Alert.alert('Succès', 'Document téléchargé avec succès');
  };

  const handleContinue = () => {
    if (!uploadedDocument) {
      Alert.alert('Erreur', 'Veuillez télécharger un document d\'identité');
      return;
    }
    router.push('/kyc/selfie');
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
          <Text style={styles.title}>Télécharger vos documents</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepActive]}>
              <Text style={styles.progressStepText}>1</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <Text style={styles.progressStepText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
          </View>
          <Text style={styles.progressText}>Étape 1 sur 3: Documents d'identité</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <FileText size={32} color="#FF6B35" />
          <Text style={styles.instructionsTitle}>Téléchargez votre pièce d'identité</Text>
          <Text style={styles.instructionsText}>
            Assurez-vous que votre document est lisible, non expiré et que toutes les informations sont visibles.
          </Text>
        </View>

        {/* Document Types */}
        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Documents acceptés</Text>
          
          {documentTypes.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={[
                styles.documentCard,
                uploadedDocument?.type === doc.id && styles.documentCardSelected
              ]}
              onPress={() => handleDocumentUpload(doc.id)}
            >
              <Text style={styles.documentIcon}>{doc.icon}</Text>
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <Text style={styles.documentDescription}>{doc.description}</Text>
              </View>
              <View style={styles.documentAction}>
                {uploadedDocument?.type === doc.id ? (
                  <CheckCircle size={24} color="#2E8B57" />
                ) : (
                  <Upload size={24} color="#666" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Status */}
        {uploadedDocument && (
          <View style={styles.uploadStatus}>
            <CheckCircle size={20} color="#2E8B57" />
            <Text style={styles.uploadStatusText}>
              Document téléchargé avec succès
            </Text>
          </View>
        )}

        {/* Requirements */}
        <View style={styles.requirementsSection}>
          <Text style={styles.requirementsTitle}>Exigences pour les photos</Text>
          <View style={styles.requirements}>
            <View style={styles.requirement}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.requirementText}>Photo claire et nette</Text>
            </View>
            <View style={styles.requirement}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.requirementText}>Document complet et visible</Text>
            </View>
            <View style={styles.requirement}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.requirementText}>Pas de reflets ou d'ombres</Text>
            </View>
            <View style={styles.requirement}>
              <CheckCircle size={16} color="#2E8B57" />
              <Text style={styles.requirementText}>Document non expiré</Text>
            </View>
          </View>
        </View>

        {/* Warning */}
        <View style={styles.warningSection}>
          <AlertTriangle size={20} color="#FF6B35" />
          <Text style={styles.warningText}>
            Assurez-vous que vos informations correspondent exactement à celles de votre compte.
          </Text>
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !uploadedDocument && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!uploadedDocument}
          >
            <LinearGradient
              colors={uploadedDocument ? ['#FF6B35', '#FF8A65'] : ['#CCC', '#CCC']}
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
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  documentCardSelected: {
    backgroundColor: '#FFF3F0',
    borderColor: '#FF6B35',
  },
  documentIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 12,
    color: '#666',
  },
  documentAction: {
    marginLeft: 12,
  },
  uploadStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    margin: 20,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  uploadStatusText: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '500',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
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