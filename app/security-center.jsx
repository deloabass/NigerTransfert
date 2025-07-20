import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Smartphone, Key, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SecurityCenterScreen() {
  const router = useRouter();
  const [securityScore, setSecurityScore] = useState(85);

  const securityItems = [
    {
      id: 'password',
      title: 'Mot de passe fort',
      description: 'Votre mot de passe respecte les critères de sécurité',
      status: 'good',
      icon: Lock,
      action: () => router.push('/profile/security'),
    },
    {
      id: '2fa',
      title: 'Authentification à deux facteurs',
      description: '2FA activé avec SMS',
      status: 'good',
      icon: Smartphone,
      action: () => router.push('/profile/security'),
    },
    {
      id: 'biometric',
      title: 'Authentification biométrique',
      description: 'Non configuré',
      status: 'warning',
      icon: Key,
      action: () => router.push('/profile/security'),
    },
    {
      id: 'login-alerts',
      title: 'Alertes de connexion',
      description: 'Notifications activées',
      status: 'good',
      icon: Bell,
      action: () => router.push('/profile/notifications'),
    },
    {
      id: 'device-trust',
      title: 'Appareils de confiance',
      description: '2 appareils enregistrés',
      status: 'good',
      icon: Shield,
      action: () => Alert.alert('Info', 'Fonctionnalité bientôt disponible'),
    },
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Connexion réussie',
      device: 'iPhone 13',
      location: 'Paris, France',
      time: 'Il y a 2 heures',
      status: 'success',
    },
    {
      id: '2',
      action: 'Transfert de 150€',
      device: 'iPhone 13',
      location: 'Paris, France',
      time: 'Il y a 1 jour',
      status: 'success',
    },
    {
      id: '3',
      action: 'Tentative de connexion échouée',
      device: 'Appareil inconnu',
      location: 'Londres, UK',
      time: 'Il y a 3 jours',
      status: 'warning',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#2E8B57';
      case 'warning':
        return '#FF6B35';
      case 'danger':
        return '#DC3545';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle size={16} color="#2E8B57" />;
      case 'warning':
        return <AlertTriangle size={16} color="#FF6B35" />;
      case 'danger':
        return <AlertTriangle size={16} color="#DC3545" />;
      default:
        return null;
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
          <Text style={styles.title}>Centre de sécurité</Text>
        </View>

        {/* Security Score */}
        <View style={styles.scoreSection}>
          <LinearGradient
            colors={securityScore >= 80 ? ['#2E8B57', '#4CAF50'] : securityScore >= 60 ? ['#FF6B35', '#FF8A65'] : ['#DC3545', '#FF6B6B']}
            style={styles.scoreGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Shield size={32} color="#FFFFFF" />
            <Text style={styles.scoreTitle}>Score de sécurité</Text>
            <Text style={styles.scoreValue}>{securityScore}/100</Text>
            <Text style={styles.scoreDescription}>
              {securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Bon' : 'À améliorer'}
            </Text>
          </LinearGradient>
        </View>

        {/* Security Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres de sécurité</Text>
          
          {securityItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.securityItem}
              onPress={item.action}
            >
              <View style={styles.itemIcon}>
                <item.icon size={20} color="#FF6B35" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.itemStatus}>
                {getStatusIcon(item.status)}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityDetails}>
                  {activity.device} • {activity.location}
                </Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <View style={[
                styles.activityStatus,
                { backgroundColor: activity.status === 'success' ? '#E8F5E8' : '#FFF3F0' }
              ]}>
                {activity.status === 'success' ? (
                  <CheckCircle size={16} color="#2E8B57" />
                ) : (
                  <AlertTriangle size={16} color="#FF6B35" />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conseils de sécurité</Text>
          
          <View style={styles.tipsContainer}>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>🔐</Text>
              <Text style={styles.tipText}>
                Activez l'authentification à deux facteurs pour une sécurité renforcée
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>📱</Text>
              <Text style={styles.tipText}>
                Utilisez l'authentification biométrique quand c'est possible
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>🚨</Text>
              <Text style={styles.tipText}>
                Surveillez régulièrement votre activité de compte
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>🔄</Text>
              <Text style={styles.tipText}>
                Changez votre mot de passe régulièrement
              </Text>
            </View>
          </View>
        </View>

        {/* Emergency Actions */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Actions d'urgence</Text>
          
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir bloquer votre compte ?')}
          >
            <Text style={styles.emergencyButtonText}>Bloquer mon compte</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir déconnecter tous les appareils ?')}
          >
            <Text style={styles.emergencyButtonText}>Déconnecter tous les appareils</Text>
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
  scoreSection: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  scoreGradient: {
    padding: 24,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scoreDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
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
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
  itemStatus: {
    marginLeft: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#999',
  },
  activityStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsContainer: {
    gap: 12,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    lineHeight: 16,
  },
  emergencySection: {
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
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#DC3545',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  emergencyButtonText: {
    fontSize: 14,
    color: '#DC3545',
    fontWeight: '500',
  },
});