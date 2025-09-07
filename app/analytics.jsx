import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { formatCurrency } from '@/utils/formatters';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [analyticsData, setAnalyticsData] = useState({
    totalSent: 3750,
    totalTransactions: 18,
    totalFees: 67.50,
    avgAmount: 208.33,
    successRate: 94.4,
    topDestinations: [
      { country: 'Niger', amount: 2100, percentage: 56 },
      { country: 'Sénégal', amount: 950, percentage: 25.3 },
      { country: 'Mali', amount: 700, percentage: 18.7 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 1200 },
      { month: 'Nov', amount: 1800 },
      { month: 'Déc', amount: 2250 },
      { month: 'Jan', amount: 3750 },
    ],
    serviceBreakdown: [
      { service: 'MyNITA', amount: 1875, count: 9, color: '#FF6B35' },
      { service: 'Orange Money', amount: 950, count: 5, color: '#FF8C00' },
      { service: 'Wave', amount: 625, count: 3, color: '#00CED1' },
      { service: 'Amana-ta', amount: 300, count: 1, color: '#32CD32' },
    ]
  });

  const periods = [
    { value: 'week', label: 'Semaine' },
    { value: 'month', label: 'Mois' },
    { value: 'quarter', label: 'Trimestre' },
    { value: 'year', label: 'Année' },
  ];

  const getChangePercentage = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
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
          <Text style={styles.title}>Analyses et statistiques</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.value}
                style={[
                  styles.periodTab,
                  selectedPeriod === period.value && styles.periodTabActive
                ]}
                onPress={() => setSelectedPeriod(period.value)}
              >
                <Text style={[
                  styles.periodTabText,
                  selectedPeriod === period.value && styles.periodTabTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Métriques clés</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#FF6B35', '#FF8A65']}
                style={styles.metricGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TrendingUp size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>{formatCurrency(analyticsData.totalSent, 'EUR')}</Text>
                <Text style={styles.metricLabel}>Total envoyé</Text>
                <View style={styles.metricChange}>
                  <TrendingUp size={12} color="#FFFFFF" />
                  <Text style={styles.metricChangeText}>+23.5%</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#2E8B57', '#4CAF50']}
                style={styles.metricGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <BarChart3 size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>{analyticsData.totalTransactions}</Text>
                <Text style={styles.metricLabel}>Transferts</Text>
                <View style={styles.metricChange}>
                  <TrendingUp size={12} color="#FFFFFF" />
                  <Text style={styles.metricChangeText}>+12.5%</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#3B82F6', '#60A5FA']}
                style={styles.metricGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <PieChart size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>{formatCurrency(analyticsData.avgAmount, 'EUR')}</Text>
                <Text style={styles.metricLabel}>Montant moyen</Text>
                <View style={styles.metricChange}>
                  <TrendingUp size={12} color="#FFFFFF" />
                  <Text style={styles.metricChangeText}>+8.2%</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#8B5CF6', '#A78BFA']}
                style={styles.metricGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Calendar size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>{analyticsData.successRate}%</Text>
                <Text style={styles.metricLabel}>Taux de succès</Text>
                <View style={styles.metricChange}>
                  <TrendingDown size={12} color="#FFFFFF" />
                  <Text style={styles.metricChangeText}>-1.2%</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Monthly Trend Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Évolution mensuelle</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              {analyticsData.monthlyTrend.map((item, index) => {
                const maxAmount = Math.max(...analyticsData.monthlyTrend.map(d => d.amount));
                const height = (item.amount / maxAmount) * 120;
                
                return (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={styles.chartBarWrapper}>
                      <LinearGradient
                        colors={['#FF6B35', '#FF8A65']}
                        style={[styles.chartBar, { height }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      />
                    </View>
                    <Text style={styles.chartBarLabel}>{item.month}</Text>
                    <Text style={styles.chartBarValue}>{formatCurrency(item.amount, 'EUR')}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Top Destinations */}
        <View style={styles.destinationsSection}>
          <Text style={styles.sectionTitle}>Destinations principales</Text>
          {analyticsData.topDestinations.map((destination, index) => (
            <View key={index} style={styles.destinationItem}>
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationCountry}>{destination.country}</Text>
                <Text style={styles.destinationAmount}>{formatCurrency(destination.amount, 'EUR')}</Text>
              </View>
              <View style={styles.destinationProgress}>
                <View style={styles.destinationProgressBar}>
                  <LinearGradient
                    colors={['#FF6B35', '#FF8A65']}
                    style={[styles.destinationProgressFill, { width: `${destination.percentage}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.destinationPercentage}>{destination.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Service Breakdown */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Répartition par service</Text>
          <View style={styles.servicesGrid}>
            {analyticsData.serviceBreakdown.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={[styles.serviceColorBar, { backgroundColor: service.color }]} />
                <Text style={styles.serviceName}>{service.service}</Text>
                <Text style={styles.serviceAmount}>{formatCurrency(service.amount, 'EUR')}</Text>
                <Text style={styles.serviceCount}>{service.count} transfert{service.count > 1 ? 's' : ''}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Insights personnalisés</Text>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>💡 Économies potentielles</Text>
            <Text style={styles.insightText}>
              En utilisant Wave plus souvent, vous pourriez économiser jusqu'à 15€ par mois sur les frais.
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>📈 Tendance positive</Text>
            <Text style={styles.insightText}>
              Vos transferts ont augmenté de 23% ce mois-ci. Votre famille apprécie votre soutien !
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>⚡ Vitesse optimale</Text>
            <Text style={styles.insightText}>
              MyNITA reste votre service le plus rapide avec une moyenne de 2.3 minutes.
            </Text>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 8,
  },
  periodSelector: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  periodTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  periodTabActive: {
    backgroundColor: '#FF6B35',
  },
  periodTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  periodTabTextActive: {
    color: '#FFFFFF',
  },
  metricsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  metricGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  chartSection: {
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
  chartContainer: {
    marginTop: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    width: 24,
    borderRadius: 12,
  },
  chartBarLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  chartBarValue: {
    fontSize: 10,
    color: '#333',
    fontWeight: '500',
  },
  destinationsSection: {
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
  destinationItem: {
    marginBottom: 16,
  },
  destinationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  destinationCountry: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  destinationAmount: {
    fontSize: 14,
    color: '#666',
  },
  destinationProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  destinationProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  destinationProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  destinationPercentage: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    minWidth: 35,
  },
  servicesSection: {
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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: (width - 64) / 2,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  serviceColorBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 4,
  },
  serviceAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  serviceCount: {
    fontSize: 12,
    color: '#666',
  },
  insightsSection: {
    padding: 20,
    paddingTop: 0,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});