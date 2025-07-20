import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, TrendingUp, Shield, Clock, DollarSign, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { formatCurrency } from '@/utils/formatters';

export default function TransactionLimitsScreen() {
  const router = useRouter();
  const [userLevel, setUserLevel] = useState('verified'); // basic, verified, premium

  const limits = {
    basic: {
      daily: 500,
      weekly: 2000,
      monthly: 5000,
      perTransaction: 300,
      features: ['Transferts de base', 'Support email'],
    },
    verified: {
      daily: 2000,
      weekly: 10000,
      monthly: 25000,
      perTransaction: 1500,
      features: ['Transferts rapides', 'Support prioritaire', 'Frais réduits'],
    },
    premium: {
      daily: 10000,
      weekly: 50000,
      monthly: 150000,
      perTransaction: 5000,
      features: ['Transferts illimités', 'Support VIP', 'Frais minimaux', 'Gestionnaire dédié'],
    },
  };

  const currentUsage = {
    daily: 450,
    weekly: 1200,
    monthly: 3500,
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'basic':
        return '#666';
      case 'verified':
        return '#2E8B57';
      case 'premium':
        return '#FF6B35';
      default:
        return '#666';
    }
  };

  const getLevelName = (level) => {
    switch (level) {
      case 'basic':
        return 'Basique';
      case 'verified':
        return 'Vérifié';
      case 'premium':
        return 'Premium';
      default:
        return 'Inconnu';
    }
  };

  const getUsagePercentage = (used, limit) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return '#DC3545';
    if (percentage >= 70) return '#FF6B35';
    return '#2E8B57';
  };

  const handleUpgrade = () => {
    if (userLevel === 'basic') {
      Alert.alert(
        'Passer au niveau Vérifié',
        'Complétez votre vérification KYC pour augmenter vos limites',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Vérifier', onPress: () => router.push('/kyc') }
        ]
      );
    } else if (userLevel === 'verified') {
      Alert.alert(
        'Passer au niveau Premium',
        'Contactez notre équipe pour accéder au niveau Premium',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Contacter', onPress: () => router.push('/profile/help-support') }
        ]
      );
    }
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
          <Text style={styles.title}>Limites de transfert</Text>
        </View>

        {/* Current Level */}
        <View style={styles.levelSection}>
          <LinearGradient
            colors={[getLevelColor(userLevel), `${getLevelColor(userLevel)}CC`]}
            style={styles.levelGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Shield size={24} color="#FFFFFF" />
            <Text style={styles.levelTitle}>Niveau {getLevelName(userLevel)}</Text>
            <Text style={styles.levelDescription}>
              Vos limites actuelles de transfert
            </Text>
          </LinearGradient>
        </View>

        {/* Current Usage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Utilisation actuelle</Text>
          
          <View style={styles.usageItem}>
            <View style={styles.usageHeader}>
              <Text style={styles.usageLabel}>Aujourd'hui</Text>
              <Text style={styles.usageValue}>
                {formatCurrency(currentUsage.daily, 'EUR')} / {formatCurrency(limits[userLevel].daily, 'EUR')}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${getUsagePercentage(currentUsage.daily, limits[userLevel].daily)}%`,
                    backgroundColor: getUsageColor(getUsagePercentage(currentUsage.daily, limits[userLevel].daily))
                  }
                ]}
              />
            </View>
          </View>

          <View style={styles.usageItem}>
            <View style={styles.usageHeader}>
              <Text style={styles.usageLabel}>Cette semaine</Text>
              <Text style={styles.usageValue}>
                {formatCurrency(currentUsage.weekly, 'EUR')} / {formatCurrency(limits[userLevel].weekly, 'EUR')}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${getUsagePercentage(currentUsage.weekly, limits[userLevel].weekly)}%`,
                    backgroundColor: getUsageColor(getUsagePercentage(currentUsage.weekly, limits[userLevel].weekly))
                  }
                ]}
              />
            </View>
          </View>

          <View style={styles.usageItem}>
            <View style={styles.usageHeader}>
              <Text style={styles.usageLabel}>Ce mois</Text>
              <Text style={styles.usageValue}>
                {formatCurrency(currentUsage.monthly, 'EUR')} / {formatCurrency(limits[userLevel].monthly, 'EUR')}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${getUsagePercentage(currentUsage.monthly, limits[userLevel].monthly)}%`,
                    backgroundColor: getUsageColor(getUsagePercentage(currentUsage.monthly, limits[userLevel].monthly))
                  }
                ]}
              />
            </View>
          </View>
        </View>

        {/* Limits Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comparaison des niveaux</Text>
          
          {Object.entries(limits).map(([level, data]) => (
            <View 
              key={level}
              style={[
                styles.levelCard,
                userLevel === level && styles.levelCardActive
              ]}
            >
              <View style={styles.levelCardHeader}>
                <Text style={[
                  styles.levelCardTitle,
                  userLevel === level && styles.levelCardTitleActive
                ]}>
                  {getLevelName(level)}
                </Text>
                {userLevel === level && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Actuel</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.levelLimits}>
                <View style={styles.limitItem}>
                  <DollarSign size={16} color="#666" />
                  <Text style={styles.limitText}>
                    Par transaction: {formatCurrency(data.perTransaction, 'EUR')}
                  </Text>
                </View>
                <View style={styles.limitItem}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.limitText}>
                    Par jour: {formatCurrency(data.daily, 'EUR')}
                  </Text>
                </View>
                <View style={styles.limitItem}>
                  <TrendingUp size={16} color="#666" />
                  <Text style={styles.limitText}>
                    Par mois: {formatCurrency(data.monthly, 'EUR')}
                  </Text>
                </View>
              </View>

              <View style={styles.levelFeatures}>
                {data.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <CheckCircle size={12} color="#2E8B57" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Upgrade Button */}
        {userLevel !== 'premium' && (
          <View style={styles.upgradeSection}>
            <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
              <LinearGradient
                colors={['#FF6B35', '#FF8A65']}
                style={styles.upgradeButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TrendingUp size={20} color="#FFFFFF" />
                <Text style={styles.upgradeButtonText}>
                  {userLevel === 'basic' ? 'Vérifier mon compte' : 'Passer au Premium'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Important Notice */}
        <View style={styles.noticeSection}>
          <AlertTriangle size={20} color="#FF6B35" />
          <Text style={styles.noticeText}>
            Les limites se réinitialisent automatiquement selon la période (jour, semaine, mois).
            Les transferts sont soumis aux réglementations anti-blanchiment.
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
  levelSection: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  levelGradient: {
    padding: 24,
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
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
    marginBottom: 16,
  },
  usageItem: {
    marginBottom: 20,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  usageLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  usageValue: {
    fontSize: 12,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  levelCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  levelCardActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF3F0',
  },
  levelCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  levelCardTitleActive: {
    color: '#FF6B35',
  },
  currentBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  levelLimits: {
    marginBottom: 12,
  },
  limitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  limitText: {
    fontSize: 12,
    color: '#666',
  },
  levelFeatures: {
    gap: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 11,
    color: '#2E8B57',
  },
  upgradeSection: {
    padding: 20,
    paddingTop: 0,
  },
  upgradeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  upgradeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  noticeSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3F0',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  noticeText: {
    fontSize: 12,
    color: '#FF6B35',
    flex: 1,
    lineHeight: 16,
  },
});