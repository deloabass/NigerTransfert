import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Shield, Eye, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
  const router = useRouter();

  const sections = [
    {
      title: '1. Acceptation des conditions',
      content: 'En utilisant Niger Money Transfer, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre service.',
    },
    {
      title: '2. Description du service',
      content: 'Niger Money Transfer est un service de transfert d\'argent qui permet aux utilisateurs d\'envoyer de l\'argent depuis l\'Europe vers le Niger via les plateformes MyNITA et Amana-ta.',
    },
    {
      title: '3. Inscription et compte utilisateur',
      content: 'Pour utiliser notre service, vous devez créer un compte en fournissant des informations exactes et à jour. Vous êtes responsable de la confidentialité de vos identifiants de connexion.',
    },
    {
      title: '4. Vérification d\'identité (KYC)',
      content: 'Conformément aux réglementations en vigueur, nous devons vérifier votre identité avant d\'autoriser les transferts. Vous devez fournir des documents d\'identité valides.',
    },
    {
      title: '5. Frais et taux de change',
      content: 'Les frais de transfert et les taux de change sont clairement affichés avant chaque transaction. Ces tarifs peuvent varier selon le service choisi (MyNITA ou Amana-ta).',
    },
    {
      title: '6. Limites de transfert',
      content: 'Des limites de transfert s\'appliquent selon votre niveau de vérification. Les limites quotidiennes, hebdomadaires et mensuelles sont indiquées dans votre profil.',
    },
    {
      title: '7. Sécurité et protection des données',
      content: 'Nous utilisons des technologies de chiffrement avancées pour protéger vos données personnelles et financières. Vos informations ne sont jamais partagées avec des tiers non autorisés.',
    },
    {
      title: '8. Responsabilités de l\'utilisateur',
      content: 'Vous vous engagez à utiliser le service uniquement à des fins légales et à fournir des informations exactes concernant les bénéficiaires de vos transferts.',
    },
    {
      title: '9. Annulation et remboursement',
      content: 'Les transferts peuvent être annulés dans un délai de 30 minutes après initiation, sous réserve que le bénéficiaire n\'ait pas encore reçu les fonds.',
    },
    {
      title: '10. Limitation de responsabilité',
      content: 'Niger Money Transfer ne peut être tenu responsable des retards ou échecs de transfert dus à des problèmes techniques des services partenaires (MyNITA, Amana-ta).',
    },
    {
      title: '11. Modification des conditions',
      content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements par email ou notification dans l\'application.',
    },
    {
      title: '12. Résiliation',
      content: 'Vous pouvez fermer votre compte à tout moment. Nous nous réservons le droit de suspendre ou fermer un compte en cas de violation de ces conditions.',
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
          <Text style={styles.title}>Conditions d'utilisation</Text>
        </View>

        {/* Introduction */}
        <View style={styles.introduction}>
          <FileText size={32} color="#FF6B35" />
          <Text style={styles.introTitle}>Conditions d'utilisation</Text>
          <Text style={styles.introText}>
            Dernière mise à jour : 15 janvier 2024
          </Text>
          <Text style={styles.introDescription}>
            Ces conditions d'utilisation régissent votre utilisation de Niger Money Transfer. 
            Veuillez les lire attentivement.
          </Text>
        </View>

        {/* Important Notice */}
        <View style={styles.importantNotice}>
          <AlertTriangle size={20} color="#FF6B35" />
          <Text style={styles.noticeText}>
            En utilisant notre service, vous acceptez automatiquement ces conditions d'utilisation.
          </Text>
        </View>

        {/* Terms Sections */}
        <View style={styles.termsContainer}>
          {sections.map((section, index) => (
            <View key={index} style={styles.termSection}>
              <Text style={styles.termTitle}>{section.title}</Text>
              <Text style={styles.termContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        {/* Additional Information */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Shield size={20} color="#2E8B57" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Protection des données</Text>
              <Text style={styles.infoText}>
                Vos données sont protégées selon le RGPD européen
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Eye size={20} color="#2E8B57" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Transparence</Text>
              <Text style={styles.infoText}>
                Tous les frais et taux sont affichés clairement
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Questions sur ces conditions ?</Text>
          <Text style={styles.contactText}>
            Contactez notre équipe juridique à : legal@nigermoneytransfer.com
          </Text>
          <Text style={styles.contactAddress}>
            Niger Money Transfer SAS{'\n'}
            123 Avenue des Champs-Élysées{'\n'}
            75008 Paris, France
          </Text>
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
  introduction: {
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
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  introDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  importantNotice: {
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
  noticeText: {
    fontSize: 12,
    color: '#FF6B35',
    flex: 1,
    fontWeight: '500',
  },
  termsContainer: {
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
  termSection: {
    marginBottom: 24,
  },
  termTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  termContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  additionalInfo: {
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  contactInfo: {
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
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#FF6B35',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactAddress: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});