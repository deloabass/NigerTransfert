import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, User, Phone, MapPin, CreditCard, Check, Plus } from 'lucide-react-native';
import { formatCurrency } from '@/utils/formatters';
import { mockBeneficiaries } from '@/services/mockData';
import { useRouter } from 'expo-router';
import { useCountry } from '@/contexts/CountryContext';
import CountrySelector from '@/components/CountrySelector';

export default function SendScreen() {
  const router = useRouter();
  const { selectedCountry } = useCountry();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [userCard, setUserCard] = useState(null);

  useEffect(() => {
    setBeneficiaries(mockBeneficiaries);
    // Simuler la carte de l'utilisateur
    setUserCard({
      id: '1',
      cardNumber: '**** **** **** 1234',
      cardType: 'visa',
      cardholderName: 'AMADOU DIALLO',
      expiryDate: '12/26',
    });
  }, []);

  const services = selectedCountry ? selectedCountry.services : [];

  const convertedAmount = amount && selectedCountry ? parseFloat(amount) * selectedCountry.rate : 0;
  const selectedServiceData = services.find(s => s.id === selectedService);
  const fees = selectedServiceData ? (parseFloat(amount) * selectedServiceData.fees) / 100 : 0;
  const totalAmount = parseFloat(amount) + fees;

  const handleNext = () => {
    if (step === 1 && (!amount || parseFloat(amount) <= 0)) {
      Alert.alert('Erreur', 'Veuillez saisir un montant valide');
      return;
    }
    if (step === 2 && !selectedService) {
      Alert.alert('Erreur', 'Veuillez sélectionner un service');
      return;
    }
    if (step === 3 && !selectedBeneficiary) {
      Alert.alert('Erreur', 'Veuillez sélectionner un bénéficiaire');
      return;
    }
    if (step === 4 && !userCard) {
      Alert.alert('Erreur', 'Aucune carte de paiement enregistrée');
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleSend = () => {
    Alert.alert(
      'Confirmer l\'envoi',
      `Envoyer ${formatCurrency(parseFloat(amount), 'EUR')} à ${selectedBeneficiary?.name} via ${selectedServiceData?.name} avec la carte ${userCard?.cardNumber} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          onPress: () => {
            Alert.alert('Succès', 'Transfert initié avec succès!');
            setStep(1);
            setAmount('');
            setSelectedService('');
            setSelectedBeneficiary(null);
          }
        }
      ]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((stepNum) => (
        <View key={stepNum} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            stepNum <= step ? styles.stepCircleActive : styles.stepCircleInactive
          ]}>
            {stepNum < step ? (
              <Check size={16} color="#FFFFFF" />
            ) : (
              <Text style={[
                styles.stepText,
                stepNum <= step ? styles.stepTextActive : styles.stepTextInactive
              ]}>
                {stepNum}
              </Text>
            )}
          </View>
          {stepNum < 4 && (
            <View style={[
              styles.stepLine,
              stepNum < step ? styles.stepLineActive : styles.stepLineInactive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderAmountStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Montant à envoyer</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>€</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
      {amount && (
        <Text style={styles.conversionText}>
          ≈ {formatCurrency(convertedAmount, 'XOF')}
        </Text>
      )}
    </View>
  );

  const renderServiceStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>
        Services disponibles - {selectedCountry?.name}
      </Text>
      
      {!selectedCountry && (
        <View style={styles.noCountryWarning}>
          <Text style={styles.warningText}>
            Veuillez d'abord sélectionner un pays de destination
          </Text>
          <TouchableOpacity 
            style={styles.selectCountryButton}
            onPress={() => router.push('/country-selection')}
          >
            <Text style={styles.selectCountryButtonText}>Sélectionner un pays</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceCard,
            selectedService === service.id && styles.serviceCardSelected
          ]}
          onPress={() => setSelectedService(service.id)}
        >
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceLogo}>{service.logo}</Text>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
            {selectedService === service.id && (
              <Check size={20} color="#2E8B57" />
            )}
          </View>
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceRate}>
              Taux: 1 EUR = {service.rate} {selectedCountry?.currency}
            </Text>
            <Text style={styles.serviceFees}>
              Frais: {service.fees}%
            </Text>
            <Text style={styles.serviceTime}>
              Délai: {service.processingTime}
            </Text>
          </View>
          
          {service.features && (
            <View style={styles.serviceFeatures}>
              {service.features.slice(0, 2).map((feature, index) => (
                <Text key={index} style={styles.serviceFeature}>• {feature}</Text>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBeneficiaryStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Sélectionner le bénéficiaire</Text>
      {beneficiaries.map((beneficiary) => (
        <TouchableOpacity
          key={beneficiary.id}
          style={[
            styles.beneficiaryCard,
            selectedBeneficiary?.id === beneficiary.id && styles.beneficiaryCardSelected
          ]}
          onPress={() => setSelectedBeneficiary(beneficiary)}
        >
          <View style={styles.beneficiaryHeader}>
            <View style={styles.beneficiaryIcon}>
              <User size={20} color="#FF6B35" />
            </View>
            <View style={styles.beneficiaryInfo}>
              <Text style={styles.beneficiaryName}>{beneficiary.name}</Text>
              <View style={styles.beneficiaryDetails}>
                <Phone size={12} color="#666" />
                <Text style={styles.beneficiaryPhone}>{beneficiary.phone}</Text>
              </View>
              <View style={styles.beneficiaryDetails}>
                <MapPin size={12} color="#666" />
                <Text style={styles.beneficiaryLocation}>{beneficiary.location}</Text>
              </View>
            </View>
            {selectedBeneficiary?.id === beneficiary.id && (
              <Check size={20} color="#2E8B57" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSummaryStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Résumé du transfert</Text>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Montant</Text>
          <Text style={styles.summaryValue}>{formatCurrency(parseFloat(amount), 'EUR')}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Frais</Text>
          <Text style={styles.summaryValue}>{formatCurrency(fees, 'EUR')}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabelBold}>Total à débiter</Text>
          <Text style={styles.summaryValueBold}>{formatCurrency(totalAmount, 'EUR')}</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Bénéficiaire</Text>
          <Text style={styles.summaryValue}>{selectedBeneficiary?.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service</Text>
          <Text style={styles.summaryValue}>{selectedServiceData?.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Montant reçu</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(convertedAmount, selectedCountry?.currency || 'XOF')}
          </Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Carte de paiement</Text>
          <Text style={styles.summaryValue}>{userCard?.cardNumber}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Titulaire</Text>
          <Text style={styles.summaryValue}>{userCard?.cardholderName}</Text>
        </View>
      </View>

      {!userCard && (
        <View style={styles.noCardWarning}>
          <Text style={styles.warningText}>
            Aucune carte enregistrée. Veuillez ajouter une carte de paiement.
          </Text>
          <TouchableOpacity 
            style={styles.addCardButton}
            onPress={() => router.push('/(tabs)/cards')}
          >
            <Text style={styles.addCardButtonText}>Ajouter une carte</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Envoyer de l'argent</Text>
          
          {/* Country Selector */}
          <View style={styles.countrySection}>
            <Text style={styles.countryLabel}>Destination :</Text>
            <CountrySelector style={styles.countrySelector} />
          </View>
          
          {renderStepIndicator()}
        </View>

        {step === 1 && renderAmountStep()}
        {step === 2 && renderServiceStep()}
        {step === 3 && renderBeneficiaryStep()}
        {step === 4 && renderSummaryStep()}

        <View style={styles.actions}>
          {step > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(step - 1)}
            >
              <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              step === 1 && { flex: 1 }
            ]}
            onPress={step === 4 ? handleSend : handleNext}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.nextButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.nextButtonText}>
                {step === 4 ? 'Envoyer' : 'Suivant'}
              </Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </LinearGradient>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  countrySection: {
    marginBottom: 20,
  },
  countryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  countrySelector: {
    marginBottom: 0,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#2E8B57',
  },
  stepCircleInactive: {
    backgroundColor: '#E5E5E5',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepTextActive: {
    color: '#FFFFFF',
  },
  stepTextInactive: {
    color: '#666',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#2E8B57',
  },
  stepLineInactive: {
    backgroundColor: '#E5E5E5',
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF6B35',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    minWidth: 100,
  },
  conversionText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  serviceCardSelected: {
    borderColor: '#2E8B57',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLogo: {
    fontSize: 24,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  serviceRate: {
    fontSize: 12,
    color: '#666',
  },
  serviceFees: {
    fontSize: 12,
    color: '#666',
  },
  serviceTime: {
    fontSize: 12,
    color: '#666',
  },
  serviceFeatures: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  serviceFeature: {
    fontSize: 11,
    color: '#2E8B57',
    marginBottom: 2,
  },
  noCountryWarning: {
    backgroundColor: '#FFF3F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 12,
  },
  selectCountryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectCountryButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  beneficiaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  beneficiaryCardSelected: {
    borderColor: '#2E8B57',
  },
  beneficiaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beneficiaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  beneficiaryInfo: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  beneficiaryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  beneficiaryPhone: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  beneficiaryLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  noCardWarning: {
    backgroundColor: '#FFF3F0',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 12,
  },
  addCardButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addCardButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  summaryLabelBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryValueBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  nextButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});