import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
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

        {/* Welcome Text */}
        <Text style={styles.title}>Niger Money Transfer</Text>
        <Text style={styles.subtitle}>
          Envoyez de l'argent rapidement et en toute sécurité vers l'Afrique
        </Text>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Transferts en quelques minutes</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>Sécurité de niveau bancaire</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureText}>Frais transparents dès 1.5%</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureText}>7 pays d'Afrique de l'Ouest</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <LinearGradient
            colors={['#FF6B35', '#FF8A65']}
            style={styles.startButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.startButtonText}>Commencer maintenant</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/faq')}>
          <Text style={styles.faqText}>Questions fréquentes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  features: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actions: {
    padding: 20,
    gap: 16,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  faqText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});