# Niger Money Transfer

Une application mobile simple et intuitive pour envoyer de l'argent depuis l'Europe vers l'Afrique de l'Ouest.

## 🎯 Objectif

Faciliter les transferts d'argent rapides et sécurisés vers 7 pays d'Afrique de l'Ouest avec une interface épurée et des frais transparents.

## 🌍 Pays supportés

- 🇳🇪 **Niger** - MyNITA, Amana-ta
- 🇸🇳 **Sénégal** - Orange Money, Wave
- 🇲🇱 **Mali** - Orange Money, Moov Money
- 🇧🇫 **Burkina Faso** - Orange Money, Moov Money
- 🇨🇮 **Côte d'Ivoire** - Orange Money, MTN Money
- 🇬🇭 **Ghana** - MTN MoMo, Vodafone Cash
- 🇳🇬 **Nigeria** - Paystack, Flutterwave

## ✨ Fonctionnalités

### 🏠 Page d'accueil
- Interface épurée et moderne
- Accès rapide au transfert d'argent
- Sélection du pays de destination
- Historique des transferts récents
- Statistiques personnelles

### 💸 Processus de transfert (6 étapes)
1. **Montant** - Saisie du montant en EUR avec conversion automatique
2. **Service** - Choix du service de paiement selon le pays
3. **Bénéficiaire** - Sélection ou ajout d'un nouveau bénéficiaire
4. **Ville** - Choix de la ville de destination
5. **Paiement** - Saisie des informations de carte bancaire
6. **Confirmation** - Résumé et validation finale

### 👥 Gestion des bénéficiaires
- Ajout avec nom, téléphone et ville
- Sélection du service préféré
- Modification et suppression
- Interface moderne avec modales

### 📊 Historique des transactions
- Liste complète des transferts
- Filtres par statut et recherche
- Détails de chaque transaction
- Statuts en temps réel

### ❓ FAQ et support
- Questions fréquentes organisées
- Fonction de recherche
- Support client intégré

## 🎨 Design

### Palette de couleurs
- **Orange principal** : #FF6B35 (couleur du Niger)
- **Vert secondaire** : #2E8B57 (nature africaine)
- **Blanc** : #FFFFFF (clarté et propreté)
- **Arrière-plan** : #F8F9FA (douceur)

### Caractéristiques
- Interface épurée et moderne
- Animations fluides
- Typographie claire
- Icônes expressives
- Design responsive

## 🛠️ Technologies

- **React Native** avec Expo
- **Expo Router** pour la navigation
- **React Native Reanimated** pour les animations
- **Expo Linear Gradient** pour les dégradés
- **Lucide React Native** pour les icônes

## 📱 Structure simplifiée

```
app/
├── (tabs)/              # Navigation principale
│   ├── index.jsx       # Page d'accueil
│   ├── send.jsx        # Transfert d'argent
│   ├── history.jsx     # Historique
│   └── beneficiaries.jsx # Bénéficiaires
├── onboarding/         # Introduction
├── country-selection.jsx # Sélection pays
├── faq.jsx            # FAQ
└── _layout.jsx        # Layout principal

components/            # Composants réutilisables
├── CountrySelector.jsx
├── CitySelector.jsx
├── AlertProvider.jsx
└── ToastProvider.jsx

services/             # Données et services
├── mockData.js
├── countryData.js
└── cityData.js

utils/               # Utilitaires
└── formatters.js
```

## 🚀 Fonctionnalités clés

### Simplicité
- Pas de création de compte obligatoire
- Pas de sauvegarde de cartes bancaires
- Interface intuitive en 6 étapes
- Processus guidé et clair

### Sécurité
- Saisie des données de carte à chaque transfert
- Chiffrement des communications
- Validation des informations
- Confirmation avant envoi

### Rapidité
- Transferts en quelques minutes
- Interface optimisée
- Sélection rapide des bénéficiaires
- Conversion automatique des devises

## 💰 Avantages

- **Frais transparents** : À partir de 1.5% seulement
- **Transferts rapides** : 1-10 minutes selon le service
- **Sécurité maximale** : Chiffrement de niveau bancaire
- **Large couverture** : 7 pays, 15+ services partenaires
- **Interface simple** : Processus en 6 étapes claires

## 🔧 Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

## 📞 Support

- FAQ intégrée dans l'application
- Support client disponible
- Interface de contact simple

---

**Niger Money Transfer** - Connecter l'Europe à l'Afrique 🌍❤️