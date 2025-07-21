import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Play, Chrome as Home, Send, History, Users, User, CreditCard, Shield, MapPin, FileText, Bell, CircleHelp as HelpCircle, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AppGuideScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps = [
    {
      title: "🌍 Niger Money Transfer",
      description: "L'application de référence pour les transferts d'argent vers l'Afrique de l'Ouest depuis l'Europe",
      icon: <Home size={60} color="#FF6B35" />,
      features: [
        "Transferts vers 7 pays d'Afrique de l'Ouest (Niger, Sénégal, Mali, Burkina Faso, Côte d'Ivoire, Ghana, Nigeria)",
        "Plus de 15 services de paiement mobile partenaires",
        "Sécurité de niveau bancaire avec chiffrement AES-256",
        "Frais transparents à partir de 1.5% seulement",
        "Support client multilingue 24h/24 et 7j/7",
        "Conformité totale aux réglementations européennes et africaines",
        "Interface disponible en français, anglais et langues locales"
      ]
    },
    {
      title: "🏠 Tableau de Bord Principal",
      description: "Votre centre de contrôle pour tous vos transferts",
      icon: <Home size={60} color="#2E8B57" />,
      features: [
        "Solde disponible en temps réel (masquable d'un clic pour la confidentialité)",
        "Conversion automatique EUR ↔ devise locale du pays sélectionné",
        "Bouton d'action rapide 'Envoyer de l'argent' toujours accessible",
        "Affichage du pays de destination sélectionné avec possibilité de changement",
        "Historique des 3 dernières transactions avec statuts en temps réel",
        "Statistiques mensuelles : montant envoyé, nombre de transferts, frais payés",
        "Accès rapide au guide de l'application et aux paramètres",
        "Notifications importantes et alertes de sécurité"
      ],
      navigation: "Onglet 'Accueil' en bas de l'écran"
    },
    {
      title: "💸 Processus de Transfert",
      description: "Système guidé en 5 étapes pour des transferts sécurisés",
      icon: <Send size={60} color="#FF6B35" />,
      features: [
        "Étape 1: Saisie du montant en EUR avec validation des limites",
        "Étape 2: Sélection du service de paiement selon le pays choisi",
        "Étape 3: Choix du bénéficiaire (existant ou nouveau)",
        "Étape 4: Sélection de la carte de paiement (Visa/Mastercard)",
        "Étape 5: Résumé complet et confirmation finale",
        "Conversion automatique EUR → devise locale en temps réel",
        "Calcul transparent des frais selon le service choisi",
        "Indicateur de progression visuel à chaque étape",
        "Possibilité de retour en arrière à tout moment",
        "Génération automatique d'un numéro de référence unique"
      ],
      navigation: "Onglet 'Envoyer' ou bouton depuis l'accueil"
    },
    {
      title: "📊 Gestion de l'Historique",
      description: "Suivi complet et détaillé de toutes vos transactions",
      icon: <History size={60} color="#666" />,
      features: [
        "Liste chronologique complète de tous vos transferts",
        "Filtres avancés : par statut (Terminé, En attente, Échec), par période, par montant",
        "Recherche intelligente par nom de bénéficiaire, service ou référence",
        "Détails exhaustifs : montant envoyé, frais, montant reçu, taux de change",
        "Statuts en temps réel avec notifications push",
        "Statistiques détaillées : total envoyé, frais payés, nombre de transactions",
        "Téléchargement de reçus officiels au format PDF",
        "Numéros de référence pour le suivi auprès des partenaires",
        "Historique d'exportation pour la comptabilité personnelle",
        "Alertes automatiques en cas de problème de transaction"
      ],
      navigation: "Onglet 'Historique'"
    },
    {
      title: "💳 Moyens de Paiement",
      description: "Gestion sécurisée de vos cartes bancaires",
      icon: <CreditCard size={60} color="#3B82F6" />,
      features: [
        "Support complet Visa et Mastercard (débit et crédit)",
        "Ajout sécurisé avec validation en temps réel",
        "Stockage chiffré selon les standards PCI DSS",
        "Gestion de cartes multiples avec carte par défaut",
        "Suppression sécurisée avec confirmation",
        "Vérification automatique de validité et de fonds",
        "Historique des paiements par carte",
        "Alertes de sécurité en cas d'activité suspecte",
        "Sauvegarde automatique pour les futurs transferts",
        "Compatibilité avec Apple Pay et Google Pay (bientôt)"
      ],
      navigation: "Onglet 'Cartes'"
    },
    {
      title: "👥 Carnet de Bénéficiaires",
      description: "Gestion complète de vos contacts dans tous les pays",
      icon: <Users size={60} color="#8B5CF6" />,
      features: [
        "Ajout illimité de bénéficiaires dans tous les pays supportés",
        "Informations complètes : nom, téléphone, adresse, service préféré",
        "Photos de profil pour identification rapide",
        "Historique des transferts par bénéficiaire",
        "Groupes et catégories personnalisables (famille, amis, business)",
        "Validation automatique des numéros de téléphone par pays",
        "Synchronisation sécurisée entre appareils",
        "Sauvegarde et restauration des contacts",
        "Recherche intelligente et filtres avancés",
        "Favoris pour accès rapide aux contacts fréquents"
      ],
      navigation: "Onglet 'Bénéficiaires'"
    },
    {
      title: "👤 Gestion du Profil",
      description: "Contrôle total de votre compte et préférences",
      icon: <User size={60} color="#DC2626" />,
      features: [
        "Informations personnelles complètes et modifiables",
        "Photo de profil et données de contact",
        "Statut de vérification KYC avec progression détaillée",
        "Paramètres de sécurité avancés (2FA, biométrie)",
        "Préférences de notifications granulaires",
        "Gestion des langues et devises d'affichage",
        "Historique de connexions et appareils autorisés",
        "Centre d'aide intégré avec chat en direct",
        "Accès aux conditions d'utilisation et politique de confidentialité",
        "Options de fermeture de compte et export de données"
      ],
      navigation: "Onglet 'Profil'"
    },
    {
      title: "🛡️ Centre de Sécurité",
      description: "Protection multicouche et surveillance continue",
      icon: <Shield size={60} color="#059669" />,
      features: [
        "Score de sécurité dynamique avec recommandations personnalisées",
        "Authentification à deux facteurs (SMS, email, app authenticator)",
        "Authentification biométrique (empreinte, Face ID, reconnaissance vocale)",
        "Surveillance continue des connexions et géolocalisation",
        "Détection automatique d'activités suspectes",
        "Alertes instantanées par email, SMS et push",
        "Historique détaillé de toutes les activités de compte",
        "Actions d'urgence : blocage temporaire, déconnexion globale",
        "Chiffrement de bout en bout pour toutes les communications",
        "Conformité RGPD et certifications de sécurité internationales"
      ],
      navigation: "Profil → Centre de sécurité"
    },
    {
      title: "🌍 Destinations Disponibles",
      description: "Réseau étendu couvrant l'Afrique de l'Ouest",
      icon: <MapPin size={60} color="#7C3AED" />,
      features: [
        "🇳🇪 Niger : MyNITA (officiel), Amana-ta (mobile money)",
        "🇸🇳 Sénégal : Orange Money, Wave (frais les plus bas)",
        "🇲🇱 Mali : Orange Money, Moov Money",
        "🇧🇫 Burkina Faso : Orange Money, Moov Money",
        "🇨🇮 Côte d'Ivoire : Orange Money, MTN Money",
        "🇬🇭 Ghana : MTN MoMo, Vodafone Cash",
        "🇳🇬 Nigeria : Paystack, Flutterwave",
        "Sélection intelligente du pays avec sauvegarde automatique",
        "Services adaptés à chaque pays avec tarifs locaux",
        "Support de 4 devises : XOF, GHS, NGN, EUR",
        "Expansion continue vers d'autres pays africains"
      ],
      navigation: "Accueil → Choisir un pays"
    },
    {
      title: "📋 Processus KYC Complet",
      description: "Vérification d'identité pour débloquer toutes les fonctionnalités",
      icon: <FileText size={60} color="#EA580C" />,
      features: [
        "Documents acceptés : passeport, carte d'identité, permis de conduire, carte de séjour",
        "Téléchargement sécurisé avec guides visuels détaillés",
        "Vérification par selfie avec détection de vivacité",
        "Processus guidé en 3 étapes avec assistance en temps réel",
        "Vérification manuelle par experts sous 24h maximum",
        "Statut de progression visible en temps réel",
        "Augmentation immédiate des limites après validation",
        "Accès à tous les services premium et frais préférentiels",
        "Conformité totale aux réglementations AML/KYC européennes",
        "Support dédié pour les cas complexes"
      ],
      navigation: "Profil → Vérification KYC"
    },
    {
      title: "💰 Système de Limites",
      description: "3 niveaux progressifs selon votre statut de vérification",
      icon: <TrendingUp size={60} color="#0891B2" />,
      features: [
        "🥉 Niveau Basique : 500€/jour, 2000€/semaine, 5000€/mois, 300€/transaction",
        "🥈 Niveau Vérifié : 2000€/jour, 10000€/semaine, 25000€/mois, 1500€/transaction",
        "🥇 Niveau Premium : 10000€/jour, 50000€/semaine, 150000€/mois, 5000€/transaction",
        "Suivi en temps réel de l'utilisation avec barres de progression",
        "Réinitialisation automatique des limites selon les périodes",
        "Alertes préventives avant d'atteindre les limites",
        "Fonctionnalités exclusives : frais réduits, support prioritaire",
        "Possibilité d'augmentation temporaire pour cas exceptionnels",
        "Historique complet de l'utilisation des limites",
        "Progression guidée vers le niveau supérieur"
      ],
      navigation: "Profil → Limites de transfert"
    },
    {
      title: "❓ Écosystème d'Aide",
      description: "Support multicanal et ressources complètes",
      icon: <HelpCircle size={60} color="#BE185D" />,
      features: [
        "FAQ interactive avec plus de 50 questions organisées par catégorie",
        "Moteur de recherche intelligent dans la base de connaissances",
        "Chat en direct avec agents multilingues (français, anglais, haoussa)",
        "Support téléphonique 24h/24 avec numéros locaux européens",
        "Système de tickets par email avec suivi en temps réel",
        "Guides vidéo étape par étape pour chaque fonctionnalité",
        "Centre de résolution automatique des problèmes courants",
        "Communauté d'utilisateurs avec forum de discussion",
        "Webinaires réguliers sur les nouvelles fonctionnalités",
        "Support technique spécialisé pour les entreprises"
      ],
      navigation: "Profil → Aide et support ou FAQ"
    },
    {
      title: "🔄 Fonctionnalités Avancées",
      description: "Outils professionnels et fonctions spécialisées",
      icon: <TrendingUp size={60} color="#6366F1" />,
      features: [
        "Transferts programmés et récurrents (hebdomadaire, mensuel)",
        "Alertes de taux de change avec notifications personnalisées",
        "Mode hors ligne pour préparer les transferts sans connexion",
        "Calculatrice de frais avancée avec comparaison de services",
        "Exportation de données pour déclarations fiscales",
        "API pour intégration avec systèmes comptables d'entreprise",
        "Comptes multi-utilisateurs pour familles et entreprises",
        "Carnet d'adresses partagé entre membres de famille",
        "Notifications de réception confirmées par les bénéficiaires",
        "Système de parrainage avec récompenses"
      ],
      navigation: "Fonctionnalités accessibles depuis différents menus"
    },
    {
      title: "📱 Optimisation Mobile",
      description: "Expérience utilisateur optimisée pour tous les appareils",
      icon: <Smartphone size={60} color="#10B981" />,
      features: [
        "Interface responsive adaptée à tous les écrans (phone, tablet)",
        "Mode sombre automatique selon les préférences système",
        "Gestes intuitifs : glisser pour actualiser, pincer pour zoomer",
        "Raccourcis clavier pour utilisateurs avancés",
        "Widget iOS/Android pour transferts rapides",
        "Intégration Siri et Google Assistant pour commandes vocales",
        "Synchronisation iCloud/Google Drive pour sauvegarde automatique",
        "Mode économie de données pour connexions limitées",
        "Optimisation batterie avec mode économie d'énergie",
        "Accessibilité complète pour utilisateurs malvoyants"
      ],
      navigation: "Optimisations automatiques selon l'appareil"
    },
    {
      title: "🌟 Conseils d'Utilisation",
      description: "Bonnes pratiques pour optimiser votre expérience",
      icon: <CheckCircle size={60} color="#F59E0B" />,
      features: [
        "Vérifiez toujours les informations du bénéficiaire avant envoi",
        "Utilisez la fonction 'Favoris' pour vos contacts fréquents",
        "Activez les notifications pour suivre vos transferts en temps réel",
        "Complétez votre KYC rapidement pour bénéficier de tous les avantages",
        "Surveillez les taux de change pour optimiser vos transferts",
        "Utilisez les transferts programmés pour les envois réguliers",
        "Gardez vos documents d'identité à jour dans votre profil",
        "Contactez le support dès le moindre doute ou problème",
        "Partagez l'application avec votre famille pour les transferts groupés",
        "Consultez régulièrement vos limites pour planifier vos envois"
      ],
      navigation: "Conseils intégrés dans toute l'application"
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