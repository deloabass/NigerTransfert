import React, { useState } from 'react';
import { 
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Globe
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
  Area
} from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');

  // Données simulées
  const revenueData = [
    { date: '2024-01-09', revenue: 2400, transactions: 45 },
    { date: '2024-01-10', revenue: 1398, transactions: 32 },
    { date: '2024-01-11', revenue: 9800, transactions: 78 },
    { date: '2024-01-12', revenue: 3908, transactions: 56 },
    { date: '2024-01-13', revenue: 4800, transactions: 67 },
    { date: '2024-01-14', revenue: 3800, transactions: 54 },
    { date: '2024-01-15', revenue: 4300, transactions: 61 },
  ];

  const serviceData = [
    { name: 'MyNITA', value: 65, revenue: 45000, color: '#FF6B35' },
    { name: 'Amana-ta', value: 35, revenue: 24000, color: '#2E8B57' },
  ];

  const countryData = [
    { name: 'France', users: 450, transactions: 1200, revenue: 35000 },
    { name: 'Allemagne', users: 280, transactions: 750, revenue: 22000 },
    { name: 'Belgique', users: 180, transactions: 480, revenue: 14000 },
    { name: 'Italie', users: 120, transactions: 320, revenue: 9500 },
    { name: 'Espagne', users: 95, transactions: 250, revenue: 7500 },
  ];

  const hourlyData = [
    { hour: '00h', transactions: 5 },
    { hour: '02h', transactions: 3 },
    { hour: '04h', transactions: 2 },
    { hour: '06h', transactions: 8 },
    { hour: '08h', transactions: 25 },
    { hour: '10h', transactions: 45 },
    { hour: '12h', transactions: 65 },
    { hour: '14h', transactions: 78 },
    { hour: '16h', transactions: 85 },
    { hour: '18h', transactions: 92 },
    { hour: '20h', transactions: 68 },
    { hour: '22h', transactions: 35 },
  ];

  const kpiData = [
    {
      title: 'Revenus aujourd\'hui',
      value: '€4,320',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Nouveaux utilisateurs',
      value: '23',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Transactions/heure',
      value: '12.4',
      change: '-2.1%',
      trend: 'down',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Panier moyen',
      value: '€187',
      change: '+5.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Analyse des performances et statistiques</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="select"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <button className="btn-outline flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue and Transactions Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus et transactions</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#FF6B35"
              fill="#FF6B35"
              fillOpacity={0.3}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="transactions"
              stroke="#2E8B57"
              strokeWidth={3}
              dot={{ fill: '#2E8B57', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par service</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-3">
            {serviceData.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: service.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{service.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{service.value}%</div>
                  <div className="text-xs text-gray-500">€{service.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité par heure</h3>
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

      {/* Geographic Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition géographique</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Pays</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateurs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transactions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenus</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Moyenne/utilisateur</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((country, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{country.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{country.users.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">{country.transactions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">€{country.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">€{(country.revenue / country.users).toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;