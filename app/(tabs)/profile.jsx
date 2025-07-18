import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Shield, Bell, CircleHelp as HelpCircle, FileText, LogOut, ChevronRight, CircleCheck as CheckCircle, Circle as XCircle, Camera, CreditCard, Smartphone, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const userInfo = {
    name: 'Amadou Diallo',
    email: 'amadou.diallo@email.com',
    phone: '+33 6 12 34 56 78',
    verificationStatus: 'verified',
    kycStatus: 'completed',
    memberSince: 'Mars 2023',
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnecter', style: 'destructive', onPress: () => {
          Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès');
        }},
      ]
    );
  };

  const menuItems = [
    {
      icon: <Settings size={20} color="#666" />,
      title: 'Paramètres du compte',
      subtitle: 'Modifiez vos informations personnelles',
      action: () => router.push('/profile/account-settings'),
    },
    {
      icon: <Shield size={20} color="#666" />,
      title: 'Sécurité',
      subtitle: 'Changez votre mot de passe, 2FA',
      action: () => router.push('/profile/security'),
    },
    {
      icon: <CreditCard size={20} color="#666" />,
      title: 'Moyens de paiement',
      subtitle: 'Gérez vos cartes et comptes',
      action: () => router.push('/(tabs)/cards'),
    },
    {
      icon: <Bell size={20} color="#666" />,
      title: 'Notifications',
      subtitle: 'Configurez vos préférences',
      action: () => router.push('/profile/notifications'),
    },
    {
      icon: <HelpCircle size={20} color="#666" />,
      title: 'Aide et support',
      subtitle: 'FAQ, contactez-nous',
      action: () => router.push('/profile/help-support'),
    },
    {
      icon: <FileText size={20} color="#666" />,
      title: 'Conditions d\'utilisation',
      subtitle: 'Consultez nos termes',
      action: () => router.push('/profile/terms'),
    },
  ];

  const getVerificationIcon = (status) => {
    return status === 'verified' ? (
      <CheckCircle size={16} color="#2E8B57" />
    ) : (
      <XCircle size={16} color="#DC3545" />
    );
  };

  const getVerificationText = (status) => {
    return status === 'verified' ? 'Vérifié' : 'Non vérifié';
  };

  const getVerificationColor = (status) => {
    return status === 'verified' ? '#2E8B57' : '#DC3545';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#FF6B35', '#FF8A65']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User size={32} color="#FFFFFF" />
                </View>
                <TouchableOpacity style={styles.cameraButton}>
                  <Camera size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{userInfo.name}</Text>
                <Text style={styles.userEmail}>{userInfo.email}</Text>
                <Text style={styles.memberSince}>Membre depuis {userInfo.memberSince}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Verification Status */}
        <View style={styles.verificationSection}>
          <View style={styles.verificationItem}>
            <View style={styles.verificationIcon}>
              <Smartphone size={20} color="#666" />
            </View>
            <View style={styles.verificationInfo}>
              <Text style={styles.verificationTitle}>Téléphone</Text>
              <Text style={styles.verificationSubtitle}>{userInfo.phone}</Text>
            </View>
            <View style={styles.verificationStatus}>
              {getVerificationIcon(userInfo.verificationStatus)}
              <Text style={[
                styles.verificationStatusText,
                { color: getVerificationColor(userInfo.verificationStatus) }
              ]}>
                {getVerificationText(userInfo.verificationStatus)}
              </Text>
            </View>
          </View>

          <View style={styles.verificationItem}>
            <View style={styles.verificationIcon}>
              <FileText size={20} color="#666" />
            </View>
            <View style={styles.verificationInfo}>
              <Text style={styles.verificationTitle}>Vérification KYC</Text>
              <Text style={styles.verificationSubtitle}>Documents d'identité</Text>
            </View>
            <View style={styles.verificationStatus}>
              {getVerificationIcon(userInfo.kycStatus)}
              <Text style={[
                styles.verificationStatusText,
                { color: getVerificationColor(userInfo.kycStatus) }
              ]}>
                {getVerificationText(userInfo.kycStatus)}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.quickSettings}>
          <View style={styles.quickSettingItem}>
            <View style={styles.quickSettingInfo}>
              <Bell size={20} color="#666" />
              <Text style={styles.quickSettingTitle}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E5E5', true: '#FF6B35' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.quickSettingItem}>
            <View style={styles.quickSettingInfo}>
              <Lock size={20} color="#666" />
              <Text style={styles.quickSettingTitle}>Authentification biométrique</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#E5E5E5', true: '#FF6B35' }}
              thumbColor={biometricEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuIcon}>
                {item.icon}
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#DC3545" />
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.versionText}>© 2024 Niger Money Transfer</Text>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  profileCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileGradient: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  verificationSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verificationInfo: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  verificationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verificationStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  quickSettings: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickSettingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickSettingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickSettingTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  logoutSection: {
    margin: 20,
    marginTop: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
  },
  versionInfo: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});