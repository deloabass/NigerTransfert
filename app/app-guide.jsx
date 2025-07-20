import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Play, Home, Send, History, Users, User, CreditCard, Shield, MapPin, FileText, Bell, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AppGuideScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps = [
    {
      title: "Bienvenue dans Niger Money Transfer",
      description: "Découvrez toutes les fonctionnalités de votre application de transfert d'argent internationale",
      icon: <Home size={60} color="#FF6B35" />,
      features: [
        "Transferts vers 15 pays d'Afrique de l'Ouest",
        "Sécurité de niveau bancaire",
        "Frais transparents et compétitifs",
        "Support 24h/24 et 7j/7"
      ]
    },
    {
      title: "🏠 Page d'Accueil",
      description: "Votre tableau de bord principal",
      icon: <Home size={60} color="#2E8B57" />,
      features: [
        "Consultez votre solde (masquable pour la confidentialité)",
        "Bouton rapide 'Envoyer de l'argent'",
        "Transactions récentes avec statuts",
        "Statistiques mensuelles",
        "Bouton 'Choisir un pays' pour sélectionner la destination"
      ],
      navigation: "Onglet 'Accueil' en bas de l'écran"
    },
    {
      title: "💸 Envoi d'Argent",
      description: "Processus en 5 étapes simples",
      icon: <Send size={60} color="#FF6B35" />,
      features: [
        "Étape 1: Saisissez le montant en EUR",
        "Étape 2: Choisissez le service (MyNITA ou Amana-ta)",
        "Étape 3: Sélectionnez le bénéficiaire",
        "Étape 4: Choisissez votre carte de paiement",
        "Étape 5: Confirmez et envoyez",
        "Conversion automatique EUR → XOF",
        "Calcul des frais en temps réel"
      ],
      navigation: "Onglet 'Envoyer' ou bouton depuis l'accueil"
    },
    {
      title: "📊 Historique",
      description: "Suivez toutes vos transactions",
      icon: <History size={60} color="#666" />,
      features: [
        "Liste complète des transferts",
        "Filtres par statut (Terminé, En attente, Échec)",
        "Recherche par bénéficiaire ou service",
        "Détails complets de chaque transaction",
        "Statistiques agrégées",
        "Téléchargement des reçus",
        "Références de transaction"
      ],
      navigation: "Onglet 'Historique'"
    },
    {
      title: "💳 Gestion des Cartes",
      description: "Vos moyens de paiement",
      icon: <CreditCard size={60} color="#3B82F6" />,
      features: [
        "Ajout de nouvelles cartes (Visa, Mastercard)",
        "Gestion des cartes existantes",
        "Définir une carte par défaut",
        "Suppression sécurisée",
        "Chiffrement des données bancaires",
        "Validation en temps réel"
      ],
      navigation: "Onglet 'Cartes'"
    },
    {
      title: "👥 Bénéficiaires",
      description: "Gérez vos contacts au Niger",
      icon: <Users size={60} color="#8B5CF6" />,
      features: [
        "Ajout de nouveaux bénéficiaires",
        "Informations complètes (nom, téléphone, localisation)",
        "Service préféré par bénéficiaire",
        "Modification et suppression",
        "Organisation par service",
        "Recherche rapide"
      ],
      navigation: "Onglet 'Bénéficiaires'"
    },
    {
      title: "👤 Profil & Paramètres",
      description: "Votre compte et préférences",
      icon: <User size={60} color="#DC2626" />,
      features: [
        "Informations personnelles",
        "Statut de vérification KYC",
        "Paramètres de sécurité",
        "Notifications et préférences",
        "Support et aide",
        "Conditions d'utilisation"
      ],
      navigation: "Onglet 'Profil'"
    },
    {
      title: "🛡️ Sécurité Avancée",
      description: "Protection maximale de votre compte",
      icon: <Shield size={60} color="#059669" />,
      features: [
        "Centre de sécurité avec score en temps réel",
        "Authentification à deux facteurs (2FA)",
        "Authentification biométrique",
        "Surveillance des connexions",
        "Alertes de sécurité",
        "Actions d'urgence (blocage de compte)",
        "Historique d'activité détaillé"
      ],
      navigation: "Profil → Centre de sécurité"
    },
    {
      title: "🌍 Sélection de Pays",
      description: "15 pays d'Afrique de l'Ouest supportés",
      icon: <MapPin size={60} color="#7C3AED" />,
      features: [
        "Niger (MyNITA, Amana-ta)",
        "Sénégal (Orange Money, Wave)",
        "Mali, Burkina Faso, Côte d'Ivoire",
        "Ghana, Nigeria, Togo, Bénin",
        "Guinée, Liberia, Sierra Leone",
        "Gambie, Guinée-Bissau, Cap-Vert",
        "Services locaux pour chaque pays",
        "Devises multiples supportées"
      ],
      navigation: "Accueil → Choisir un pays"
    },
    {
      title: "📋 Vérification KYC",
      description: "Augmentez vos limites de transfert",
      icon: <FileText size={60} color="#EA580C" />,
      features: [
        "Téléchargement de documents d'identité",
        "Photo selfie pour vérification",
        "Processus en 3 étapes simples",
        "Vérification sous 24h",
        "Augmentation des limites",
        "Accès à tous les services",
        "Frais réduits"
      ],
      navigation: "Profil → Vérification KYC"
    },
    {
      title: "💰 Limites de Transfert",
      description: "3 niveaux d'utilisateur",
      icon: <TrendingUp size={60} color="#0891B2" />,
      features: [
        "Basique: 500€/jour, 5000€/mois",
        "Vérifié: 2000€/jour, 25000€/mois",
        "Premium: 10000€/jour, 150000€/mois",
        "Suivi de l'utilisation en temps réel",
        "Progression vers le niveau supérieur",
        "Fonctionnalités exclusives par niveau"
      ],
      navigation: "Profil → Limites de transfert"
    },
    {
      title: "❓ Support & Aide",
      description: "Assistance complète 24h/24",
      icon: <HelpCircle size={60} color="#BE185D" />,
      features: [
        "FAQ complète par catégorie",
        "Chat en direct",
        "Support téléphonique",
        "Email support",
        "Formulaire de contact",
        "Guides détaillés",
        "Résolution de problèmes"
      ],
      navigation: "Profil → Aide et support ou FAQ"
    }
  ];

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToFeature = (navigation) => {
    // Logique pour naviguer vers la fonctionnalité
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guide de l'Application</Text>
        <Text style={styles.stepCounter}>{currentStep + 1}/{guideSteps.length}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          <View style={styles.iconContainer}>
            {guideSteps[currentStep].icon}
          </View>
          
          <Text style={styles.stepTitle}>{guideSteps[currentStep].title}</Text>
          <Text style={styles.stepDescription}>{guideSteps[currentStep].description}</Text>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Fonctionnalités :</Text>
            {guideSteps[currentStep].features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {guideSteps[currentStep].navigation && (
            <View style={styles.navigationInfo}>
              <Text style={styles.navigationTitle}>Comment y accéder :</Text>
              <Text style={styles.navigationText}>{guideSteps[currentStep].navigation}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {guideSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentStep ? styles.progressDotActive : styles.progressDotInactive
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft size={20} color={currentStep === 0 ? "#CCC" : "#666"} />
          <Text style={[styles.navButtonText, currentStep === 0 && styles.navButtonTextDisabled]}>
            Précédent
          </Text>
        </TouchableOpacity>

        {currentStep === guideSteps.length - 1 ? (
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => router.back()}
          >
            <LinearGradient
              colors={['#2E8B57', '#4CAF50']}
              style={styles.finishButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.finishButtonText}>Commencer</Text>
              <Play size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={nextStep}>
            <Text style={styles.navButtonText}>Suivant</Text>
            <ArrowRight size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
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
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  stepCounter: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 16,
    color: '#FF6B35',
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  navigationInfo: {
    width: '100%',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2E8B57',
  },
  navigationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E8B57',
    marginBottom: 8,
  },
  navigationText: {
    fontSize: 14,
    color: '#2E8B57',
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressDotActive: {
    backgroundColor: '#FF6B35',
    width: 24,
  },
  progressDotInactive: {
    backgroundColor: '#E5E5E5',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    gap: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  navButtonTextDisabled: {
    color: '#CCC',
  },
  finishButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  finishButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  finishButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});