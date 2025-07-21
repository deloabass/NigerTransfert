export const westAfricanCountries = [
  {
    code: 'NE',
    name: 'Niger',
    flag: '🇳🇪',
    currency: 'XOF',
    rate: 656,
    services: [
      {
        id: 'mynita',
        name: 'MyNITA',
        logo: '🏦',
        description: 'Service officiel du gouvernement nigérien',
        fees: 2.5,
        rate: 656,
        processingTime: '1-3 minutes',
        features: ['Transfert instantané', 'Sécurisé par l\'État', 'Disponible 24h/24']
      },
      {
        id: 'amana',
        name: 'Amana-ta',
        logo: '💳',
        description: 'Solution de paiement mobile populaire',
        fees: 1.8,
        rate: 654,
        processingTime: '5-10 minutes',
        features: ['Frais réduits', 'Large réseau', 'Interface simple']
      }
    ]
  },
  {
    code: 'SN',
    name: 'Sénégal',
    flag: '🇸🇳',
    currency: 'XOF',
    rate: 656,
    services: [
      {
        id: 'orange_money_sn',
        name: 'Orange Money',
        logo: '🟠',
        description: 'Leader du mobile money au Sénégal',
        fees: 2.2,
        rate: 656,
        processingTime: '2-5 minutes',
        features: ['Réseau étendu', 'Service fiable', 'Support local']
      },
      {
        id: 'wave_sn',
        name: 'Wave',
        logo: '🌊',
        description: 'Solution moderne de paiement mobile',
        fees: 1.5,
        rate: 655,
        processingTime: '1-3 minutes',
        features: ['Frais les plus bas', 'Interface moderne', 'Transfert rapide']
      }
    ]
  },
  {
    code: 'ML',
    name: 'Mali',
    flag: '🇲🇱',
    currency: 'XOF',
    rate: 656,
    services: [
      {
        id: 'orange_money_ml',
        name: 'Orange Money',
        logo: '🟠',
        description: 'Service de référence au Mali',
        fees: 2.3,
        rate: 656,
        processingTime: '2-5 minutes',
        features: ['Couverture nationale', 'Service établi', 'Support 24h/24']
      },
      {
        id: 'moov_money_ml',
        name: 'Moov Money',
        logo: '📱',
        description: 'Alternative populaire au Mali',
        fees: 2.0,
        rate: 655,
        processingTime: '3-7 minutes',
        features: ['Frais compétitifs', 'Bonne couverture', 'Interface simple']
      }
    ]
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    flag: '🇧🇫',
    currency: 'XOF',
    rate: 656,
    services: [
      {
        id: 'orange_money_bf',
        name: 'Orange Money',
        logo: '🟠',
        description: 'Leader au Burkina Faso',
        fees: 2.4,
        rate: 656,
        processingTime: '2-5 minutes',
        features: ['Réseau développé', 'Service fiable', 'Support local']
      },
      {
        id: 'moov_money_bf',
        name: 'Moov Money',
        logo: '📱',
        description: 'Service mobile money populaire',
        fees: 2.1,
        rate: 655,
        processingTime: '3-7 minutes',
        features: ['Bonne couverture', 'Frais raisonnables', 'Service stable']
      }
    ]
  },
  {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    currency: 'XOF',
    rate: 656,
    services: [
      {
        id: 'orange_money_ci',
        name: 'Orange Money',
        logo: '🟠',
        description: 'Service leader en Côte d\'Ivoire',
        fees: 2.2,
        rate: 656,
        processingTime: '1-3 minutes',
        features: ['Réseau étendu', 'Transfert rapide', 'Service établi']
      },
      {
        id: 'mtn_money_ci',
        name: 'MTN Money',
        logo: '💛',
        description: 'Alternative fiable et populaire',
        fees: 1.9,
        rate: 655,
        processingTime: '2-5 minutes',
        features: ['Frais attractifs', 'Bonne couverture', 'Interface moderne']
      }
    ]
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    rate: 12.5,
    services: [
      {
        id: 'mtn_momo_gh',
        name: 'MTN MoMo',
        logo: '💛',
        description: 'Service mobile money leader au Ghana',
        fees: 2.8,
        rate: 12.5,
        processingTime: '1-3 minutes',
        features: ['Réseau national', 'Service rapide', 'Support 24h/24']
      },
      {
        id: 'vodafone_cash_gh',
        name: 'Vodafone Cash',
        logo: '🔴',
        description: 'Alternative populaire au Ghana',
        fees: 2.5,
        rate: 12.4,
        processingTime: '2-5 minutes',
        features: ['Bonne couverture', 'Frais compétitifs', 'Interface simple']
      }
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    currency: 'NGN',
    rate: 1650,
    services: [
      {
        id: 'paystack_ng',
        name: 'Paystack',
        logo: '💳',
        description: 'Plateforme de paiement moderne',
        fees: 1.5,
        rate: 1650,
        processingTime: '1-2 minutes',
        features: ['Transfert instantané', 'Frais bas', 'Technologie avancée']
      },
      {
        id: 'flutterwave_ng',
        name: 'Flutterwave',
        logo: '🦋',
        description: 'Solution de paiement innovante',
        fees: 1.8,
        rate: 1648,
        processingTime: '1-3 minutes',
        features: ['Interface moderne', 'Sécurité renforcée', 'Support excellent']
      }
    ]
  }
];

export const getCountryByCode = (code) => {
  return westAfricanCountries.find(country => country.code === code);
};

export const getServicesByCountry = (countryCode) => {
  const country = getCountryByCode(countryCode);
  return country ? country.services : [];
};