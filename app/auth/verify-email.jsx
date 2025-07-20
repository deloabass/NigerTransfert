import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail, CheckCircle, RefreshCw } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function VerifyEmailScreen() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    setCanResend(false);
    setCountdown(60);
    
    // Simuler l'envoi d'email
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Email envoyé', 'Un nouvel email de vérification a été envoyé');
    }, 1500);
  };

  const handleVerifyEmail = () => {
    // Simuler la vérification
    setIsVerified(true);
    setTimeout(() => {
      Alert.alert(
        'Email vérifié',
        'Votre email a été vérifié avec succès !',
        [{ text: 'Continuer', onPress: () => router.replace('/(tabs)') }]
      );
    }, 1000);
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
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {isVerified ? (
            <CheckCircle size={80} color="#2E8B57" />
          ) : (
            <Mail size={80} color="#FF6B35" />
          )}
        </View>

        <Text style={styles.title}>
          {isVerified ? 'Email vérifié !' : 'Vérifiez votre email'}
        </Text>

        <Text style={styles.description}>
          {isVerified 
            ? 'Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant utiliser toutes les fonctionnalités de l\'application.'
            : 'Nous avons envoyé un email de vérification à votre adresse. Cliquez sur le lien dans l\'email pour vérifier votre compte.'
          }
        </Text>

        {!isVerified && (
          <>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyEmail}
            >
              <LinearGradient
                colors={['#2E8B57', '#4CAF50']}
                style={styles.verifyButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.verifyButtonText}>
                  Simuler la vérification
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.resendSection}>
              <Text style={styles.resendText}>
                Vous n'avez pas reçu l'email ?
              </Text>
              
              <TouchableOpacity
                style={[styles.resendButton, !canResend && styles.resendButtonDisabled]}
                onPress={handleResendEmail}
                disabled={!canResend || isLoading}
              >
                <RefreshCw size={16} color={canResend ? "#FF6B35" : "#999"} />
                <Text style={[styles.resendButtonText, !canResend && styles.resendButtonTextDisabled]}>
                  {isLoading ? 'Envoi...' : canResend ? 'Renvoyer' : `Renvoyer (${countdown}s)`}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {isVerified && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.continueButtonText}>
                Continuer vers l'application
              </Text>
            </LinearGradient>
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
    padding: 20,
  },
  backButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  verifyButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
  },
  verifyButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resendSection: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  resendButtonTextDisabled: {
    color: '#999',
  },
  continueButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});