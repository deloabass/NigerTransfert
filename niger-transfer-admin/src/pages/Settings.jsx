import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Users,
  Mail,
  Smartphone,
  Lock,
  Eye,
  Save,
  RefreshCw,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Niger Money Transfer',
    siteDescription: 'Plateforme de transfert d\'argent vers le Niger',
    maintenanceMode: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    adminAlerts: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    ipWhitelist: '',
    
    // Payment Settings
    mynitaEnabled: true,
    amanaEnabled: true,
    mynitaFeeRate: 2.5,
    amanaFeeRate: 1.8,
    minTransferAmount: 10,
    maxTransferAmount: 1000,
    dailyLimit: 5000,
    
    // API Settings
    apiRateLimit: 1000,
    webhookUrl: '',
    apiKey: 'sk_live_...',
  });

  const tabs = [
    { id: 'general', name: 'Général', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'payments', name: 'Paiements', icon: CreditCard },
    { id: 'api', name: 'API', icon: Globe },
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate saving settings
    alert('Paramètres sauvegardés avec succès !');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres généraux
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du site
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              rows={3}
              className="input-field"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Mode maintenance</h4>
              <p className="text-sm text-gray-500">
                Désactive temporairement l'accès à la plateforme
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => updateSetting('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres de notification
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Notifications par email', icon: Mail },
            { key: 'smsNotifications', label: 'Notifications SMS', icon: Smartphone },
            { key: 'pushNotifications', label: 'Notifications push', icon: Bell },
            { key: 'adminAlerts', label: 'Alertes administrateur', icon: Shield },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-500">
                    Recevoir des notifications pour les événements importants
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(e) => updateSetting(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres de sécurité
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h4>
              <p className="text-sm text-gray-500">
                Exiger une authentification à deux facteurs pour tous les administrateurs
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => updateSetting('twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeout de session (minutes)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
              className="input-field"
              min="5"
              max="120"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Politique de mot de passe
            </label>
            <select
              value={settings.passwordPolicy}
              onChange={(e) => updateSetting('passwordPolicy', e.target.value)}
              className="input-field"
            >
              <option value="basic">Basique (6 caractères minimum)</option>
              <option value="medium">Moyen (8 caractères, majuscules/minuscules)</option>
              <option value="strong">Fort (12 caractères, caractères spéciaux)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Liste blanche IP (une par ligne)
            </label>
            <textarea
              value={settings.ipWhitelist}
              onChange={(e) => updateSetting('ipWhitelist', e.target.value)}
              rows={4}
              className="input-field"
              placeholder="192.168.1.1&#10;10.0.0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres de paiement
        </h3>
        
        <div className="space-y-6">
          {/* Services */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Services de transfert</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">MyNITA</h5>
                  <p className="text-sm text-gray-500">Service officiel du gouvernement nigérien</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.mynitaEnabled}
                    onChange={(e) => updateSetting('mynitaEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Amana-ta</h5>
                  <p className="text-sm text-gray-500">Solution de paiement mobile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.amanaEnabled}
                    onChange={(e) => updateSetting('amanaEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Fees */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Frais de service</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frais MyNITA (%)
                </label>
                <input
                  type="number"
                  value={settings.mynitaFeeRate}
                  onChange={(e) => updateSetting('mynitaFeeRate', parseFloat(e.target.value))}
                  className="input-field"
                  step="0.1"
                  min="0"
                  max="10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frais Amana-ta (%)
                </label>
                <input
                  type="number"
                  value={settings.amanaFeeRate}
                  onChange={(e) => updateSetting('amanaFeeRate', parseFloat(e.target.value))}
                  className="input-field"
                  step="0.1"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>
          
          {/* Limits */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Limites de transfert</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant minimum (€)
                </label>
                <input
                  type="number"
                  value={settings.minTransferAmount}
                  onChange={(e) => updateSetting('minTransferAmount', parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant maximum (€)
                </label>
                <input
                  type="number"
                  value={settings.maxTransferAmount}
                  onChange={(e) => updateSetting('maxTransferAmount', parseInt(e.target.value))}
                  className="input-field"
                  min="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limite quotidienne (€)
                </label>
                <input
                  type="number"
                  value={settings.dailyLimit}
                  onChange={(e) => updateSetting('dailyLimit', parseInt(e.target.value))}
                  className="input-field"
                  min="1000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres API
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limite de taux API (requêtes/heure)
            </label>
            <input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => updateSetting('apiRateLimit', parseInt(e.target.value))}
              className="input-field"
              min="100"
              max="10000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Webhook
            </label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => updateSetting('webhookUrl', e.target.value)}
              className="input-field"
              placeholder="https://votre-site.com/webhook"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clé API
            </label>
            <div className="relative">
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => updateSetting('apiKey', e.target.value)}
                className="input-field pr-10"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Sécurité API
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Assurez-vous de garder votre clé API secrète et de la régénérer régulièrement.
                    Utilisez HTTPS pour toutes les communications API.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-2">
            Configurez votre plateforme Niger Money Transfer
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Réinitialiser</span>
          </button>
          <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
            <Save className="w-5 h-5" />
            <span>Sauvegarder</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="card">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'payments' && renderPaymentSettings()}
            {activeTab === 'api' && renderApiSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;