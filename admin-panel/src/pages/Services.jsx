import React, { useState } from 'react';
import { 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  Edit, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 'mynita',
      name: 'MyNITA',
      description: 'Service officiel du gouvernement nigérien',
      logo: '🏦',
      isActive: true,
      feePercentage: 2.5,
      exchangeRate: 656,
      minAmount: 10,
      maxAmount: 1000,
      dailyLimit: 2000,
      monthlyLimit: 10000,
      processingTime: '1-3 minutes',
      availability: 'online',
      lastUpdate: '2024-01-15 10:30',
      totalTransactions: 1847,
      totalVolume: 275500,
      successRate: 98.5,
    },
    {
      id: 'amana',
      name: 'Amana-ta',
      description: 'Solution de paiement mobile populaire',
      logo: '💳',
      isActive: true,
      feePercentage: 1.8,
      exchangeRate: 654,
      minAmount: 10,
      maxAmount: 1500,
      dailyLimit: 3000,
      monthlyLimit: 15000,
      processingTime: '5-10 minutes',
      availability: 'online',
      lastUpdate: '2024-01-15 09:45',
      totalTransactions: 1203,
      totalVolume: 180450,
      successRate: 96.8,
    },
  ]);

  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleToggleService = (serviceId) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const handleEditService = (service) => {
    setEditingService(service.id);
    setEditForm({ ...service });
  };

  const handleSaveService = () => {
    setServices(services.map(service => 
      service.id === editingService 
        ? { ...editForm, lastUpdate: new Date().toLocaleString('fr-FR') }
        : service
    ));
    setEditingService(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setEditForm({});
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'offline':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'online':
        return 'En ligne';
      case 'maintenance':
        return 'Maintenance';
      case 'offline':
        return 'Hors ligne';
      default:
        return availability;
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'online':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'offline':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services de paiement</h1>
          <p className="text-gray-600">Configuration et gestion des services MyNITA et Amana-ta</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Synchroniser</span>
          </button>
        </div>
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Volume total</p>
              <p className="text-2xl font-bold text-gray-900">
                €{services.reduce((sum, s) => sum + s.totalVolume, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Transactions totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {services.reduce((sum, s) => sum + s.totalTransactions, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux de réussite moyen</p>
              <p className="text-2xl font-bold text-gray-900">
                {(services.reduce((sum, s) => sum + s.successRate, 0) / services.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Configuration */}
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{service.logo}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getAvailabilityColor(service.availability)}`}>
                  {getAvailabilityIcon(service.availability)}
                  <span className="ml-1">{getAvailabilityText(service.availability)}</span>
                </span>
                <button
                  onClick={() => handleToggleService(service.id)}
                  className="flex items-center space-x-2"
                >
                  {service.isActive ? (
                    <ToggleRight className="w-8 h-8 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {editingService === service.id ? (
              /* Edit Mode */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frais (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.feePercentage}
                      onChange={(e) => setEditForm({ ...editForm, feePercentage: parseFloat(e.target.value) })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux de change (XOF)
                    </label>
                    <input
                      type="number"
                      value={editForm.exchangeRate}
                      onChange={(e) => setEditForm({ ...editForm, exchangeRate: parseInt(e.target.value) })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant minimum (€)
                    </label>
                    <input
                      type="number"
                      value={editForm.minAmount}
                      onChange={(e) => setEditForm({ ...editForm, minAmount: parseInt(e.target.value) })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant maximum (€)
                    </label>
                    <input
                      type="number"
                      value={editForm.maxAmount}
                      onChange={(e) => setEditForm({ ...editForm, maxAmount: parseInt(e.target.value) })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Limite quotidienne (€)
                    </label>
                    <input
                      type="number"
                      value={editForm.dailyLimit}
                      onChange={(e) => setEditForm({ ...editForm, dailyLimit: parseInt(e.target.value) })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Limite mensuelle (€)
                    </label>
                    <input
                      type="number"
                      value={editForm.monthlyLimit}
                      onChange={(e) => setEditForm({ ...editForm, monthlyLimit: parseInt(e.target.value) })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temps de traitement
                    </label>
                    <input
                      type="text"
                      value={editForm.processingTime}
                      onChange={(e) => setEditForm({ ...editForm, processingTime: e.target.value })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disponibilité
                    </label>
                    <select
                      value={editForm.availability}
                      onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                      className="select"
                    >
                      <option value="online">En ligne</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="offline">Hors ligne</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="btn-outline"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveService}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Frais</p>
                    <p className="text-lg font-semibold text-gray-900">{service.feePercentage}%</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Taux de change</p>
                    <p className="text-lg font-semibold text-gray-900">1 EUR = {service.exchangeRate} XOF</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Limites</p>
                    <p className="text-lg font-semibold text-gray-900">€{service.minAmount} - €{service.maxAmount}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Temps de traitement</p>
                    <p className="text-lg font-semibold text-gray-900">{service.processingTime}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600">Transactions</p>
                    <p className="text-2xl font-bold text-blue-900">{service.totalTransactions.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600">Volume</p>
                    <p className="text-2xl font-bold text-green-900">€{service.totalVolume.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="text-sm text-primary-600">Taux de réussite</p>
                    <p className="text-2xl font-bold text-primary-900">{service.successRate}%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Dernière mise à jour: {service.lastUpdate}
                  </div>
                  <button
                    onClick={() => handleEditService(service)}
                    className="btn-outline flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;