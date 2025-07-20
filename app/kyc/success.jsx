import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, Home, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['#2E8B57', '#4CAF50']}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <CheckCircle size={60} color="#FFFFFF" />
          </LinearGradient>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Vérification soumise !</Text>
        <Text style={styles.description}>
          Vos documents ont été soumis avec succès. Notre équipe les vérifiera dans les 24 heures et vous recevrez une notification par email.
        </Text>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Une fois vérifié, vous pourrez :</Text>
          
          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <TrendingUp size={20} color="#2E8B57" />
              <Text style={styles.benefitText}>Augmenter vos limites de transfert</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={20} color="#2E8B57" />
              <Text style={styles.benefitText}>Bénéficier de frais réduits</Text>
            </View>
            <View style={styles.benefit}>
              <CheckCircle size={20} color="#2E8B57" />
              <Text style={styles.benefitText}>Accéder au support prioritaire</Text>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>Prochaines étapes :</Text>
          <Text style={styles.nextStepsText}>
            1. Nous vérifions vos documents (24h max){'\n'}
            2. Vous recevez un email de confirmation{'\n'}
            3. Vos nouvelles limites sont activées
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <LinearGradient
            colors={['#FF6B35', '#FF8A65']}
            style={styles.homeButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Home size={20} color="#FFFFFF" />
            <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.limitsButton}
          onPress={() => router.push('/transaction-limits')}
        >
          <Text style={styles.limitsButtonText}>Voir mes limites actuelles</Text>
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
    padding: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#2E8B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    marginBottom: 32,
  },
  benefitsContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  benefits: {
    gap: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  nextSteps: {
    width: '100%',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2E8B57',
  },
  nextStepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E8B57',
    marginBottom: 8,
  },
  nextStepsText: {
    fontSize: 12,
    color: '#2E8B57',
    lineHeight: 18,
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  homeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  homeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  limitsButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  limitsButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});