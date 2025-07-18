import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Mail, Smartphone, DollarSign, Shield, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyStatements: true,
  });

  const updateNotification = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const notificationCategories = [
    {
      title: 'Notifications générales',
      items: [
        {
          key: 'pushNotifications',
          title: 'Notifications push',
          description: 'Recevez des notifications sur votre appareil',
          icon: <Bell size={20} color="#FF6B35" />,
        },
        {
          key: 'emailNotifications',
          title: 'Notifications par email',
          description: 'Recevez des emails pour les événements importants',
          icon: <Mail size={20} color="#FF6B35" />,
        },
        {
          key: 'smsNotifications',
          title: 'Notifications SMS',
          description: 'Recevez des SMS pour les alertes critiques',
          icon: <Smartphone size={20} color="#FF6B35" />,
        },
      ],
    },
    {
      title: 'Alertes de transaction',
      items: [
        {
          key: 'transactionAlerts',
          title: 'Alertes de transaction',
          description: 'Notifications pour tous vos transferts',
          icon: <DollarSign size={20} color="#2E8B57" />,
        },
        {
          key: 'securityAlerts',
          title: 'Alertes de sécurité',
          description: 'Notifications pour les activités suspectes',
          icon: <Shield size={20} color="#DC3545" />,
        },
      ],
    },
    {
      title: 'Rapports et marketing',
      items: [
        {
          key: 'weeklyReports',
          title: 'Rapports hebdomadaires',
          description: 'Résumé de vos activités de la semaine',
          icon: <TrendingUp size={20} color="#666" />,
        },
        {
          key: 'monthlyStatements',
          title: 'Relevés mensuels',
          description: 'Relevé détaillé de vos transactions',
          icon: <TrendingUp size={20} color="#666" />,
        },
        {
          key: 'marketingEmails',
          title: 'Emails marketing',
          description: 'Offres spéciales et nouveautés',
          icon: <Mail size={20} color="#666" />,
        },
      ],
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
          <Text style={styles.title}>Notifications</Text>
        </View>

        {/* Notification Categories */}
        {notificationCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            
            {category.items.map((item, itemIndex) => (
              <View key={item.key} style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={styles.notificationIcon}>
                    {item.icon}
                  </View>
                  <View style={styles.notificationDetails}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>{item.description}</Text>
                  </View>
                </View>
                <Switch
                  value={notifications[item.key]}
                  onValueChange={(value) => updateNotification(item.key, value)}
                  trackColor={{ false: '#E5E5E5', true: '#FF6B35' }}
                  thumbColor={notifications[item.key] ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
            ))}
          </View>
        ))}

        {/* Notification Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horaires de notification</Text>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleText}>
              Les notifications sont envoyées entre 8h00 et 22h00 (heure locale)
            </Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Modifier les horaires</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Shield size={20} color="#2E8B57" />
          <Text style={styles.privacyText}>
            Vos préférences de notification sont privées et ne sont jamais partagées avec des tiers.
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  scheduleInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  scheduleText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  scheduleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  privacyText: {
    fontSize: 12,
    color: '#2E8B57',
    flex: 1,
    lineHeight: 16,
  },
});