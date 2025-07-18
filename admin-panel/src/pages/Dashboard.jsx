import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Données simulées
  const stats = [
    {
      title: 'Revenus totaux',
      value: '€125,430',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Transactions',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Utilisateurs actifs',
      value: '1,234',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Taux de réussite',
      value: '98.5%',
      change: '+0.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
  ];

  const chartData = [
    { name: 'Jan', transactions: 400, revenus: 2400 },
    { name: 'Fév', transactions: 300, revenus: 1398 },
    { name: 'Mar', transactions: 200, revenus: 9800 },
    { name: 'Avr', transactions: 278, revenus: 3908 },
    { name: 'Mai', transactions: 189, revenus: 4800 },
    { name: 'Jun', transactions: 239, revenus: 3800 },
    { name: 'Jul', transactions: 349, revenus: 4300 },
  ];

  const serviceData = [
    { name: 'MyNITA', value: 65, color: '#FF6B35' },
    { name: 'Amana-ta', value: 35, color: '#2E8B57' },
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      user: 'Amadou Diallo',
      recipient: 'Fatima Oumarou',
      amount: '€150.00',
      service: 'MyNITA',
      status: 'completed',
      time: '2 min',
    },
    {
      id: 'TXN002',
      user: 'Ibrahim Mounkaila',
      recipient: 'Aisha Abdoulaye',
      amount: '€200.00',
      service: 'Amana-ta',
      status: 'pending',
      time: '5 min',
    },
    {
      id: 'TXN003',
      user: 'Moussa Garba',
      recipient: 'Zeinab Hassan',
      amount: '€75.00',
      service: 'MyNITA',
      status: 'failed',
      time: '10 min',
    },
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
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de Niger Money Transfer</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des transactions</h3>
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
                strokeWidth={3}
                dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus mensuels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenus" fill="#2E8B57" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des services</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
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
          <div className="mt-4 space-y-2">
            {serviceData.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: service.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{service.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{service.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transactions récentes</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.user}</p>
                    <p className="text-sm text-gray-600">→ {transaction.recipient}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{transaction.amount}</p>
                  <p className="text-sm text-gray-600">{transaction.service}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1">{getStatusText(transaction.status)}</span>
                  </span>
                  <span className="text-xs text-gray-500">{transaction.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;