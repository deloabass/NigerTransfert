import React, { useState } from 'react';
import { 
  Save,
  Bell,
  Shield,
  Globe,
  Mail,
  Database,
  Key,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Niger Money Transfer',
    siteDescription: 'Service de transfert d\'argent vers le Niger',
    supportEmail: 'support@nigermoneytransfer.com',
    supportPhone: '+33 1 23 45 67 89',
    maintenanceMode: false,
    
    // Security Settings
    twoFactorRequired: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    adminAlerts: true,
    
    // Transaction Settings
    defaultFeePercentage: 2.5,
    minTransactionAmount: 10,
    maxTransactionAmount: 1000,
    dailyTransactionLimit: 2000,
    monthlyTransactionLimit: 10000,
    
    // API Settings
    mynitaApiKey: '••••••••••••••••',
    amanaApiKey: '••••••••••••••••',
    exchangeRateProvider: 'xe.com',
    rateCacheTime: 300,
  });

  const tabs = [
    { id: 'general', name: 'Général', icon: SettingsIcon },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'transactions', name: 'Transactions', icon: Database },
    { id: 'api', name: 'API', icon: Key },
  ];

  const handleSave = () => {
    // Logique de sauvegarde
    console.log('Saving settings:', settings);
    alert('Paramètres sauvegardés avec succès !');
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du site
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email de support
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleInputChange('supportEmail', e.target.value)}
              className="input"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description du site
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              rows={3}
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone de support
            </label>
            <input
              type="tel"
              value={settings.supportPhone}
              onChange={(e) => handleInputChange('supportPhone', e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mode maintenance</h3>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="maintenanceMode" className="text-sm text-gray-700">
            Activer le mode maintenance
          </label>
        </div>
        {settings.maintenanceMode && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-700">
                Le site sera inaccessible aux utilisateurs en mode maintenance
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Authentification</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="twoFactorRequired"
              checked={settings.twoFactorRequired}
              onChange={(e) => handleInputChange('twoFactorRequired', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="twoFactorRequired" className="text-sm text-gray-700">
              Authentification à deux facteurs obligatoire
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeout de session (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tentatives de connexion max
              </label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longueur min. mot de passe
              </label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                className="input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Types de notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Notifications par email</p>
                <p className="text-sm text-gray-600">Envoyer des emails pour les événements importants</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Notifications push</p>
                <p className="text-sm text-gray-600">Notifications push pour l'application mobile</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Alertes administrateur</p>
                <p className="text-sm text-gray-600">Alertes pour les événements critiques</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.adminAlerts}
              onChange={(e) => handleInputChange('adminAlerts', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactionSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres des transactions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frais par défaut (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={settings.defaultFeePercentage}
              onChange={(e) => handleInputChange('defaultFeePercentage', parseFloat(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant minimum (€)
            </label>
            <input
              type="number"
              value={settings.minTransactionAmount}
              onChange={(e) => handleInputChange('minTransactionAmount', parseInt(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant maximum (€)
            </label>
            <input
              type="number"
              value={settings.maxTransactionAmount}
              onChange={(e) => handleInputChange('maxTransactionAmount', parseInt(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limite quotidienne (€)
            </label>
            <input
              type="number"
              value={settings.dailyTransactionLimit}
              onChange={(e) => handleInputChange('dailyTransactionLimit', parseInt(e.target.value))}
              className="input"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limite mensuelle (€)
            </label>
            <input
              type="number"
              value={settings.monthlyTransactionLimit}
              onChange={(e) => handleInputChange('monthlyTransactionLimit', parseInt(e.target.value))}
              className="input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Clés API</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clé API MyNITA
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={settings.mynitaApiKey}
                onChange={(e) => handleInputChange('mynitaApiKey', e.target.value)}
                className="input flex-1"
              />
              <button className="btn-outline">Tester</button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clé API Amana-ta
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={settings.amanaApiKey}
                onChange={(e) => handleInputChange('amanaApiKey', e.target.value)}
                className="input flex-1"
              />
              <button className="btn-outline">Tester</button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Taux de change</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fournisseur de taux
            </label>
            <select
              value={settings.exchangeRateProvider}
              onChange={(e) => handleInputChange('exchangeRateProvider', e.target.value)}
              className="select"
            >
              <option value="xe.com">XE.com</option>
              <option value="fixer.io">Fixer.io</option>
              <option value="exchangerate-api.com">ExchangeRate-API</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cache des taux (secondes)
            </label>
            <input
              type="number"
              value={settings.rateCacheTime}
              onChange={(e) => handleInputChange('rateCacheTime', parseInt(e.target.value))}
              className="input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Configuration du système et des services</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Save className="w-4 h-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="card">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'transactions' && renderTransactionSettings()}
            {activeTab === 'api' && renderApiSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;