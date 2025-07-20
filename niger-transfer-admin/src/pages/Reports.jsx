import React, { useState } from 'react';
import {
  Download,
  Calendar,
  FileText,
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('transactions');

  const reportData = [
    { date: '2024-01-01', transactions: 45, volume: 12000, users: 32, revenue: 300 },
    { date: '2024-01-02', transactions: 52, volume: 15000, users: 38, revenue: 375 },
    { date: '2024-01-03', transactions: 48, volume: 13500, users: 35, revenue: 337 },
    { date: '2024-01-04', transactions: 61, volume: 18000, users: 42, revenue: 450 },
    { date: '2024-01-05', transactions: 55, volume: 16500, users: 39, revenue: 412 },
    { date: '2024-01-06', transactions: 67, volume: 20000, users: 45, revenue: 500 },
    { date: '2024-01-07', transactions: 73, volume: 22000, users: 48, revenue: 550 },
  ];

  const reportTypes = [
    { value: 'transactions', label: 'Rapport des transactions', icon: CreditCard },
    { value: 'users', label: 'Rapport des utilisateurs', icon: Users },
    { value: 'revenue', label: 'Rapport des revenus', icon: DollarSign },
    { value: 'performance', label: 'Rapport de performance', icon: TrendingUp },
  ];

  const quickReports = [
    {
      title: 'Transactions quotidiennes',
      description: 'Rapport détaillé des transactions du jour',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600',
      downloadUrl: '#',
    },
    {
      title: 'Utilisateurs actifs',
      description: 'Liste des utilisateurs actifs ce mois',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      downloadUrl: '#',
    },
    {
      title: 'Revenus mensuels',
      description: 'Analyse des revenus par service',
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
      downloadUrl: '#',
    },
    {
      title: 'Rapport KYC',
      description: 'Statut des vérifications d\'identité',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      downloadUrl: '#',
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  const getChartData = () => {
    switch (reportType) {
      case 'transactions':
        return { dataKey: 'transactions', color: '#3B82F6', label: 'Transactions' };
      case 'users':
        return { dataKey: 'users', color: '#10B981', label: 'Utilisateurs' };
      case 'revenue':
        return { dataKey: 'revenue', color: '#F59E0B', label: 'Revenus (€)' };
      case 'performance':
        return { dataKey: 'volume', color: '#8B5CF6', label: 'Volume (€)' };
      default:
        return { dataKey: 'transactions', color: '#3B82F6', label: 'Transactions' };
    }
  };

  const chartConfig = getChartData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
          <p className="text-gray-600 mt-2">
            Générez et téléchargez des rapports détaillés
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter tout</span>
          </button>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickReports.map((report, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${report.color}`}>
                <report.icon className="w-6 h-6" />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {report.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {report.description}
            </p>
            <button className="btn-outline w-full">
              Télécharger
            </button>
          </div>
        ))}
      </div>

      {/* Custom Report Generator */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Générateur de rapports personnalisés
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de rapport
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-field"
            >
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début
            </label>
            <input
              type="date"
              className="input-field"
              defaultValue="2024-01-01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              className="input-field"
              defaultValue="2024-01-07"
            />
          </div>
        </div>

        {/* Chart Preview */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Aperçu du rapport - {reportTypes.find(t => t.value === reportType)?.label}
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
              />
              <YAxis 
                tickFormatter={reportType === 'revenue' ? formatCurrency : undefined}
              />
              <Tooltip 
                formatter={(value) => [
                  reportType === 'revenue' ? formatCurrency(value) : value,
                  chartConfig.label
                ]}
                labelFormatter={(label) => formatDate(label)}
              />
              <Line
                type="monotone"
                dataKey={chartConfig.dataKey}
                stroke={chartConfig.color}
                strokeWidth={3}
                dot={{ fill: chartConfig.color, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="btn-outline flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtres avancés</span>
            </button>
            <button className="btn-outline flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Planifier</span>
            </button>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Générer le rapport</span>
          </button>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Rapports programmés
          </h3>
          <button className="btn-outline">
            Nouveau rapport programmé
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Nom du rapport</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Fréquence</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Prochaine exécution</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  Rapport quotidien des transactions
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">Transactions</td>
                <td className="py-3 px-4 text-sm text-gray-900">Quotidien</td>
                <td className="py-3 px-4 text-sm text-gray-900">21/01/2024 09:00</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-green-700 bg-green-50">
                    Actif
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="table-row">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  Rapport hebdomadaire des revenus
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">Revenus</td>
                <td className="py-3 px-4 text-sm text-gray-900">Hebdomadaire</td>
                <td className="py-3 px-4 text-sm text-gray-900">22/01/2024 08:00</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-green-700 bg-green-50">
                    Actif
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;