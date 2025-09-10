import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, TrendingUp, Clock, CircleCheck as CheckCircle, MapPin, Globe, Users, History as HistoryIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { formatCurrency } from '@/utils/formatters';
import { mockTransactions } from '@/services/mockData';
import { useCountry } from '@/contexts/CountryContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    totalSent: 1250,
    totalTransactions: 7,
    avgAmount: 178.57,
    successRate: 95.2,
  });
  const router = useRouter();
  const { selectedCountry } = useCountry();

  useEffect(() => {
    setRecentTransactions(mockTransactions.slice(0, 3));
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#2E8B57" />;
      case 'pending':
        return <Clock size={16} color="#FF6B35" />;
      default:
        return <Clock size={16} color="#666" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échec';
      default:
        return 'Inconnu';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logo}>🇳🇪</Text>
            </LinearGradient>
          </View>
          <Text style={styles.appTitle}>Niger Money Transfer</Text>
          <Text style={styles.appSubtitle}>Envoyez de l'argent facilement vers l'Afrique</Text>
        </View>

        {/* Selected Country Display */}
        {selectedCountry && (
          <View style={styles.countryDisplay}>
            <View style={styles.countryInfo}>
              <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
              <View style={styles.countryDetails}>
                <Text style={styles.countryName}>Destination: {selectedCountry.name}</Text>
                <Text style={styles.countryServices}>
                  {selectedCountry.services.length} service(s) disponible(s)
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.changeCountryButton}
              onPress={() => router.push('/country-selection')}
            >
              <Text style={styles.changeCountryText}>Changer</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Main Action */}
        <View style={styles.mainAction}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => router.push('/(tabs)/send')}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.sendButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Send size={32} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Envoyer de l'argent</Text>
              <Text style={styles.sendButtonSubtext}>Transfert rapide et sécurisé</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => router.push('/country-selection')}
          >
            <View style={styles.quickActionIcon}>
              <Globe size={24} color="#FF6B35" />
            </View>
            <Text style={styles.quickActionTitle}>Choisir un pays</Text>
            <Text style={styles.quickActionSubtitle}>7 pays disponibles</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => router.push('/(tabs)/beneficiaries')}
          >
            <View style={styles.quickActionIcon}>
              <Users size={24} color="#2E8B57" />
            </View>
            <Text style={styles.quickActionTitle}>Mes bénéficiaires</Text>
            <Text style={styles.quickActionSubtitle}>Gérer les contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => router.push('/(tabs)/history')}
          >
            <View style={styles.quickActionIcon}>
              <HistoryIcon size={24} color="#3B82F6" />
            </View>
            <Text style={styles.quickActionTitle}>Historique</Text>
            <Text style={styles.quickActionSubtitle}>Voir les transferts</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transferts récents</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.sectionLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length === 0 ? (
            <View style={styles.emptyTransactions}>
              <TrendingUp size={48} color="#CCC" />
              <Text style={styles.emptyTransactionsTitle}>Aucun transfert</Text>
              <Text style={styles.emptyTransactionsText}>
                Commencez votre premier transfert vers l'Afrique
              </Text>
            </View>
          ) : (
            recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <TrendingUp size={20} color="#FF6B35" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionRecipient}>
                    {transaction.recipient}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date} • {transaction.service}
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.transactionAmountText}>
                    {formatCurrency(transaction.amount, 'EUR')}
                  </Text>
                  <View style={styles.transactionStatus}>
                    {getStatusIcon(transaction.status)}
                    <Text style={styles.transactionStatusText}>
                      {getStatusText(transaction.status)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Vos statistiques</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B35', '#FF8A65']}
                style={styles.statGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TrendingUp size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{formatCurrency(monthlyStats.totalSent, 'EUR')}</Text>
                <Text style={styles.statLabel}>Total envoyé</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#2E8B57', '#4CAF50']}
                style={styles.statGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Send size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{monthlyStats.totalTransactions}</Text>
                <Text style={styles.statLabel}>Transferts</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Why Choose Us */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Pourquoi nous choisir ?</Text>
          
          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>⚡</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Transferts instantanés</Text>
                <Text style={styles.featureText}>Vos proches reçoivent l'argent en quelques minutes</Text>
              </View>
            </View>
            
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔒</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>100% sécurisé</Text>
                <Text style={styles.featureText}>Chiffrement bancaire et protection des données</Text>
              </View>
            </View>
            
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💰</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Frais transparents</Text>
                <Text style={styles.featureText}>Pas de frais cachés, tarifs clairs</Text>
              </View>
            </View>
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
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    fontSize: 24,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  countryDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryDetails: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  countryServices: {
    fontSize: 12,
    color: '#666',
  },
  changeCountryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeCountryText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  mainAction: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sendButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    alignItems: 'center',
    padding: 32,
  },
  sendButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  sendButtonSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  quickActionCard: {
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  emptyTransactions: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  emptyTransactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyTransactionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionRecipient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  transactionStatusText: {
    fontSize: 12,
    color: '#666',
  },
  statsSection: {
    margin: 20,
    marginTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresSection: {
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
  features: {
    marginTop: 16,
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});