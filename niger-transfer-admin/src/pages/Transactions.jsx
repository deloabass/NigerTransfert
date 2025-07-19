import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      user: 'Amadou Diallo',
      recipient: 'Fatima Oumarou',
      amount: 150.00,
      fees: 3.75,
      receivedAmount: 98400,
      service: 'MyNITA',
      status: 'completed',
      date: '2024-01-20',
      time: '14:30',
      reference: 'MTN240120001',
      country: 'Niger',
    },
    {
      id: 'TXN002',
      user: 'Mariama Sow',
      recipient: 'Ibrahim Mounkaila',
      amount: 200.00,
      fees: 3.60,
      receivedAmount: 130800,
      service: 'Amana-ta',
      status: 'pending',
      date: '2024-01-20',
      time: '14:15',
      reference: 'AMN240120001',
      country: 'Niger',
    },
    {
      id: 'TXN003',
      user: 'Ousmane Ba',
      recipient: 'Aisha Abdoulaye',
      amount: 100.00,
      fees: 2.50,
      receivedAmount: 65600,
      service: 'MyNITA',
      status: 'failed',
      date: '2024-01-20',
      time: '13:45',
      reference: 'MTN240120002',
      country: 'Niger',
    },
    {
      id: 'TXN004',
      user: 'Fatou Diop',
      recipient: 'Moussa Garba',
      amount: 300.00,
      fees: 5.40,
      receivedAmount: 196200,
      service: 'Amana-ta',
      status: 'completed',
      date: '2024-01-20',
      time: '13:20',
      reference: 'AMN240120002',
      country: 'Niger',
    },
    {
      id: 'TXN005',
      user: 'Ibrahim Traoré',
      recipient: 'Zeinab Hassan',
      amount: 250.00,
      fees: 6.25,
      receivedAmount: 164000,
      service: 'MyNITA',
      status: 'processing',
      date: '2024-01-20',
      time: '12:50',
      reference: 'MTN240120003',
      country: 'Niger',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'processing':
        return 'text-blue-700 bg-blue-50';
      case 'failed':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En cours';
      case 'failed':
        return 'Échec';
      default:
        return status;
    }
  };

  const formatCurrency = (amount, currency = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesService = filterService === 'all' || transaction.service === filterService;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = transactions.reduce((sum, t) => sum + t.fees, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">
            Gérez et surveillez toutes les transactions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Volume total</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalVolume)}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Frais collectés</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalFees)}</p>
            </div>
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par ID, utilisateur, bénéficiaire ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminé</option>
              <option value="pending">En attente</option>
              <option value="processing">En cours</option>
              <option value="failed">Échec</option>
            </select>
          </div>

          {/* Service Filter */}
          <div className="lg:w-48">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="input-field"
            >
              <option value="all">Tous les services</option>
              <option value="MyNITA">MyNITA</option>
              <option value="Amana-ta">Amana-ta</option>
            </select>
          </div>

          <button className="btn-outline flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transaction</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Bénéficiaire</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Montant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Frais</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date/Heure</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="table-row">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                      <p className="text-xs text-gray-500">{transaction.reference}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.user}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{transaction.recipient}</p>
                      <p className="text-xs text-gray-500">{transaction.country}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.receivedAmount.toLocaleString()} XOF
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {formatCurrency(transaction.fees)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {transaction.service}
                    </span>
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
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.time}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {transaction.status === 'failed' && (
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                      {transaction.status === 'pending' && (
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Affichage de <span className="font-medium">1</span> à{' '}
            <span className="font-medium">{filteredTransactions.length}</span> sur{' '}
            <span className="font-medium">{transactions.length}</span> résultats
          </p>
          <div className="flex space-x-2">
            <button className="btn-outline">Précédent</button>
            <button className="btn-outline">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;