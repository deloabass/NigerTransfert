import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Lock, Eye, EyeOff, Shield, Smartphone, Key, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SecurityScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }

    Alert.alert('Succès', 'Mot de passe modifié avec succès');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEnable2FA = () => {
    if (!twoFactorEnabled) {
      Alert.alert(
        'Activer l\'authentification à deux facteurs',
        'Vous allez recevoir un SMS avec un code de vérification',
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Activer', 
            onPress: () => {
              setTwoFactorEnabled(true);
              Alert.alert('Succès', '2FA activé avec succès');
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Désactiver l\'authentification à deux facteurs',
        'Cela réduira la sécurité de votre compte',
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Désactiver', 
            style: 'destructive',
            onPress: () => {
              setTwoFactorEnabled(false);
              Alert.alert('Info', '2FA désactivé');
            }
          }
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
          <Text style={styles.title}>Sécurité</Text>
        </View>

        {/* Security Status */}
        <View style={styles.securityStatus}>
          <LinearGradient
            colors={['#2E8B57', '#4CAF50']}
            style={styles.statusGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Shield size={24} color="#FFFFFF" />
            <Text style={styles.statusTitle}>Compte sécurisé</Text>
            <Text style={styles.statusText}>
              Votre compte bénéficie d'un niveau de sécurité élevé
            </Text>
          </LinearGradient>
        </View>

        {/* Change Password */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Changer le mot de passe</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Mot de passe actuel</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#666" />
              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Mot de passe actuel"
                placeholderTextColor="#999"
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Nouveau mot de passe</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#666" />
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nouveau mot de passe"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Confirmer le nouveau mot de passe</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#666" />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
            <Text style={styles.changePasswordButtonText}>Changer le mot de passe</Text>
          </TouchableOpacity>
        </View>

        {/* Security Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options de sécurité</Text>

          <View style={styles.securityOption}>
            <View style={styles.optionInfo}>
              <View style={styles.optionIcon}>
                <Smartphone size={20} color="#FF6B35" />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Authentification à deux facteurs</Text>
                <Text style={styles.optionDescription}>
                  Sécurisez votre compte avec un code SMS
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={handleEnable2FA}
              trackColor={{ false: '#E5E5E5', true: '#FF6B35' }}
              thumbColor={twoFactorEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.securityOption}>
            <View style={styles.optionInfo}>
              <View style={styles.optionIcon}>
                <Key size={20} color="#FF6B35" />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Authentification biométrique</Text>
                <Text style={styles.optionDescription}>
                  Utilisez votre empreinte ou Face ID
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#E5E5E5', true: '#FF6B35' }}
              thumbColor={biometricEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.securityOption}>
            <View style={styles.optionInfo}>
              <View style={styles.optionIcon}>
                <AlertTriangle size={20} color="#FF6B35" />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Notifications de connexion</Text>
                <Text style={styles.optionDescription}>
                  Recevez un email à chaque connexion
                </Text>
              </View>
            </View>
            <Switch
              value={loginNotifications}
              onValueChange={setLoginNotifications}
              trackColor={{ false: '#E5E5E5', true: '#FF6B35' }}
              thumbColor={loginNotifications ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conseils de sécurité</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>🔒</Text>
              <Text style={styles.tipText}>
                Utilisez un mot de passe unique et complexe
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>📱</Text>
              <Text style={styles.tipText}>
                Activez l'authentification à deux facteurs
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>🚫</Text>
              <Text style={styles.tipText}>
                Ne partagez jamais vos identifiants
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipIcon}>📧</Text>
              <Text style={styles.tipText}>
                Vérifiez toujours l'expéditeur des emails
              </Text>
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
  securityStatus: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statusGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statusText: {
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
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  changePasswordButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  changePasswordButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  securityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
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
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});