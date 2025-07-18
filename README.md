# Niger Money Transfer

Une application mobile innovante et intuitive destinée à la diaspora nigérienne vivant en Europe pour envoyer de l'argent au Niger via MyNITA et Amana-ta.

## 🎯 Objectifs

- Faciliter les transferts d'argent Europe → Niger
- Intégrer les méthodes de paiement locales (MyNITA et Amana-ta)
- Assurer une expérience fluide et sécurisée pour tous les utilisateurs

## 🧩 Fonctionnalités principales

### 🏠 Page d'accueil
- Interface moderne et chaleureuse
- Résumé du solde avec possibilité de masquer/afficher
- Dernières transactions avec statuts en temps réel
- Bouton rapide "Envoyer de l'argent"
- Statistiques mensuelles

### 🔐 Authentification et sécurité
- Connexion par email et mot de passe
- Système d'inscription complet
- Vérification KYC (simulation)
- Interface sécurisée avec gestion des données sensibles

### 💸 Envoi d'argent
- Processus en 4 étapes intuitives
- Conversion automatique EUR → XOF
- Choix entre MyNITA et Amana-ta
- Sélection des bénéficiaires
- Résumé détaillé avant validation
- Animations de confirmation

### 👥 Gestion des bénéficiaires
- Ajout, modification et suppression
- Informations complètes (nom, téléphone, localisation)
- Service préféré par bénéficiaire
- Interface moderne avec modales

### 📊 Historique des transactions
- Liste complète des transferts
- Filtres par statut et recherche
- Détails complets de chaque transaction
- Statistiques de transfert
- Téléchargement des reçus (simulation)

### ❓ FAQ et support
- Questions fréquentes organisées par catégorie
- Fonction de recherche
- Interface de contact support
- Informations détaillées sur les services

### 👤 Profil utilisateur
- Informations personnelles
- Statut de vérification
- Paramètres de sécurité
- Notifications et préférences

## 🎨 Design

### Palette de couleurs
- **Orange principal** : #FF6B35 (couleur du Niger)
- **Vert secondaire** : #2E8B57 (nature africaine)
- **Blanc** : #FFFFFF (clarté et propreté)
- **Arrière-plan** : #F8F9FA (douceur)

### Caractéristiques design
- Interface moderne et épurée
- Animations douces et naturelles
- Typographie lisible et hiérarchisée
- Icônes expressives avec Lucide React Native
- Responsive design pour tous les écrans
- Dégradés et ombres pour la profondeur

## 🛠️ Technologies utilisées

### Frontend
- **React Native** avec Expo
- **Expo Router** pour la navigation
- **React Native Reanimated** pour les animations
- **Expo Linear Gradient** pour les dégradés
- **Lucide React Native** pour les icônes

### Structure du projet
```
app/
├── (tabs)/              # Navigation principale
│   ├── index.jsx       # Page d'accueil
│   ├── send.jsx        # Envoi d'argent
│   ├── history.jsx     # Historique
│   ├── beneficiaries.jsx # Bénéficiaires
│   └── profile.jsx     # Profil
├── auth/               # Authentification
│   ├── login.jsx
│   └── register.jsx
├── faq.jsx            # FAQ
└── _layout.jsx        # Layout principal

components/            # Composants réutilisables
services/             # Services et données mock
utils/               # Utilitaires et formatters
```

## 📱 Fonctionnalités par écran

### Accueil
- Salutation personnalisée
- Carte de solde avec conversion
- Actions rapides
- Transactions récentes
- Statistiques mensuelles

### Envoi d'argent
- Étape 1 : Saisie du montant
- Étape 2 : Choix du service
- Étape 3 : Sélection du bénéficiaire
- Étape 4 : Résumé et confirmation

### Historique
- Filtres par statut
- Recherche textuelle
- Détails complets des transactions
- Statistiques agrégées

### Bénéficiaires
- Liste avec photos de profil
- Ajout via modal
- Édition et suppression
- Organisation par service

### Profil
- Informations utilisateur
- Statut de vérification
- Paramètres de sécurité
- Menu de navigation

## 🔧 Installation et utilisation

### Prérequis
- Node.js
- Expo CLI
- Un émulateur Android/iOS ou un appareil physique

### Lancement
```bash
# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

### Utilisation
1. L'application démarre sur l'écran d'accueil
2. Naviguez entre les onglets via la barre de navigation
3. Testez les fonctionnalités avec les données simulées
4. Toutes les actions sont simulées pour la démonstration

## 🌟 Fonctionnalités avancées

### Animations
- Transitions fluides entre les écrans
- Animations de chargement
- Effets de survol sur les boutons
- Animations de confirmation

### Expérience utilisateur
- Interface intuitive et moderne
- Feedback visuel pour toutes les actions
- Gestion des états de chargement
- Messages d'erreur informatifs

### Sécurité (simulation)
- Authentification simulée
- Vérification KYC
- Masquage du solde
- Gestion des permissions

## 📊 Données simulées

L'application utilise des données mock pour simuler :
- Bénéficiaires pré-enregistrés
- Historique des transactions
- Taux de change EUR/XOF
- Services MyNITA et Amana-ta
- FAQ complètes

## 🚀 Prochaines étapes

Pour une version production :
1. Intégration des vraies API MyNITA et Amana-ta
2. Authentification réelle avec backend
3. Système de paiement sécurisé
4. Vérification KYC automatisée
5. Notifications push
6. Support client intégré
7. Multi-langue (français/haoussa)

## 📞 Support

Pour toute question ou assistance :
- FAQ intégrée dans l'application
- Support client 24h/24 et 7j/7
- Email : support@nigermoneytransfer.com

---

**Niger Money Transfer** - Connecter la diaspora nigérienne à sa famille 🇳🇪❤️