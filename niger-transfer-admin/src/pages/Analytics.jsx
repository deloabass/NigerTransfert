import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  Calendar,
  Download,
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const transactionData = [
    { date: '2024-01-14', transactions: 45, volume: 12000, users: 32 },
    { date: '2024-01-15', transactions: 52, volume: 15000, users: 38 },
    { date: '2024-01-16', transactions: 48, volume: 13500, users: 35 },
    { date: '2024-01-17', transactions: 61, volume: 18000, users: 42 },
    { date: '2024-01-18', transactions: 55, volume: 16500, users: 39 },
    { date: '2024-01-19', transactions: 67, volume: 20000, users: 45 },
    { date: '2024-01-20', transactions: 73, volume: 22000, users: 48 },
  ];

  const serviceData = [
    { name: 'MyNITA', value: 65, color: '#3B82F6' },
    { name: 'Amana-ta', value: 35, color: '#2E8B57' },
  ];

  const countryData = [
    { country: 'Niger', transactions: 156, percentage: 85 },
    { country: 'Mali', transactions: 23, percentage: 12 },
    { country: 'Burkina Faso', transactions: 6, percentage: 3 },
  ];

  const hourlyData = [
    { hour: '00h', transactions: 2 },
    { hour: '02h', transactions: 1 },
    { hour: '04h', transactions: 0 },
    { hour: '06h', transactions: 3 },
    { hour: '08h', transactions: 12 },
    { hour: '10h', transactions: 18 },
    { hour: '12h', transactions: 25 },
    { hour: '14h', transactions: 32 },
    { hour: '16h', transactions: 28 },
    { hour: '18h', transactions: 22 },
    { hour: '20h', transactions: 15 },
    { hour: '22h', transactions: 8 },
  ];

  const kpiData = [
    {
      title: 'Revenus totaux',
      value: '€12,450',
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Nouveaux utilisateurs',
      value: '127',
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Taux de conversion',
      value: '3.2%',
      change: '-0.5%',
      changeType: 'decrease',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Temps moyen de traitement',
      value: '2.3 min',
      change: '-12%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            Analysez les performances et tendances de votre plateforme
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <button className="btn-outline flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ml-1 ${
                      kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Volume */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Volume des transactions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
              />
              <YAxis tickFormatter={(value) => `€${value}`} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Volume']}
                labelFormatter={(label) => formatDate(label)}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#FF6B35"
                fill="#FF6B35"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Count */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nombre de transactions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => formatDate(label)}
              />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#2E8B57"
                strokeWidth={3}
                dot={{ fill: '#2E8B57', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition par service
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {serviceData.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: service.color }}
                ></div>
                <span className="text-sm text-gray-600">
                  {service.name} ({service.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activité par heure
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="#FF6B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Country Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Répartition par pays de destination
        </h3>
        <div className="space-y-4">
          {countryData.map((country, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {country.country.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-gray-900">{country.country}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">
                  {country.percentage}%
                </span>
                <span className="text-sm text-gray-500 w-16">
                  {country.transactions} tx
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Taux de réussite
          </h4>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">98.5%</div>
            <p className="text-sm text-gray-600">Transactions réussies</p>
            <div className="mt-4 flex justify-center">
              <div className="w-20 h-20 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="98.5, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Temps moyen de traitement
          </h4>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">2.3</div>
            <p className="text-sm text-gray-600">Minutes</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>MyNITA: 1.8 min</span>
                <span>Amana-ta: 3.1 min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Satisfaction client
          </h4>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">4.8</div>
            <p className="text-sm text-gray-600">Note moyenne</p>
            <div className="mt-4 flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4.8 ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;