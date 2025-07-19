import React from 'react';
import {
  Users,
  CreditCard,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      name: 'Utilisateurs actifs',
      value: '2,847',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Transactions aujourd\'hui',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'bg-primary-500',
    },
    {
      name: 'Volume total (€)',
      value: '€45,230',
      change: '+23%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-secondary-500',
    },
    {
      name: 'Taux de réussite',
      value: '98.5%',
      change: '+0.5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      user: 'Amadou Diallo',
      recipient: 'Fatima Oumarou',
      amount: '€150.00',
      status: 'completed',
      service: 'MyNITA',
      time: '14:30',
    },
    {
      id: 'TXN002',
      user: 'Mariama Sow',
      recipient: 'Ibrahim Mounkaila',
      amount: '€200.00',
      status: 'pending',
      service: 'Amana-ta',
      time: '14:15',
    },
    {
      id: 'TXN003',
      user: 'Ousmane Ba',
      recipient: 'Aisha Abdoulaye',
      amount: '€100.00',
      status: 'completed',
      service: 'MyNITA',
      time: '13:45',
    },
    {
      id: 'TXN004',
      user: 'Fatou Diop',
      recipient: 'Moussa Garba',
      amount: '€300.00',
      status: 'failed',
      service: 'Amana-ta',
      time: '13:20',
    },
  ];

  const chartData = [
    { name: 'Lun', transactions: 45, volume: 12000 },
    { name: 'Mar', transactions: 52, volume: 15000 },
    { name: 'Mer', transactions: 48, volume: 13500 },
    { name: 'Jeu', transactions: 61, volume: 18000 },
    { name: 'Ven', transactions: 55, volume: 16500 },
    { name: 'Sam', transactions: 67, volume: 20000 },
    { name: 'Dim', transactions: 43, volume: 11000 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échec';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'failed':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble des activités Niger Money Transfer
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ml-1 ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transactions cette semaine
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#FF6B35"
                strokeWidth={2}
                dot={{ fill: '#FF6B35' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Volume des transferts (€)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#2E8B57" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Transactions récentes
          </h3>
          <button className="btn-outline">Voir tout</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Bénéficiaire</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Montant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Heure</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="table-row">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.user}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.recipient}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.service}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {transaction.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;