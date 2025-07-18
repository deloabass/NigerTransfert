import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  RefreshCw,
  Calendar,
  DollarSign
} from 'lucide-react';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactions = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      time: '14:30',
      user: 'Amadou Diallo',
      userEmail: 'amadou.diallo@email.com',
      recipient: 'Fatima Oumarou',
      recipientPhone: '+227 90 12 34 56',
      amount: 150.00,
      fees: 3.75,
      receivedAmount: 98400,
      service: 'MyNITA',
      status: 'completed',
      reference: 'MTN240115001',
      location: 'Niamey, Niger',
    },
    {
      id: 'TXN002',
      date: '2024-01-15',
      time: '13:15',
      user: 'Ibrahim Mounkaila',
      userEmail: 'ibrahim.m@email.com',
      recipient: 'Aisha Abdoulaye',
      recipientPhone: '+227 94 56 78 90',
      amount: 200.00,
      fees: 3.60,
      receivedAmount: 130800,
      service: 'Amana-ta',
      status: 'pending',
      reference: 'AMN240115002',
      location: 'Maradi, Niger',
    },
    {
      id: 'TXN003',
      date: '2024-01-15',
      time: '12:45',
      user: 'Moussa Garba',
      userEmail: 'moussa.garba@email.com',
      recipient: 'Zeinab Hassan',
      recipientPhone: '+227 92 34 56 78',
      amount: 75.00,
      fees: 1.35,
      receivedAmount: 49200,
      service: 'MyNITA',
      status: 'failed',
      reference: 'MTN240115003',
      location: 'Zinder, Niger',
    },
    {
      id: 'TXN004',
      date: '2024-01-15',
      time: '11:20',
      user: 'Halima Souley',
      userEmail: 'halima.s@email.com',
      recipient: 'Mariama Issoufou',
      recipientPhone: '+227 96 78 90 12',
      amount: 300.00,
      fees: 5.40,
      receivedAmount: 196200,
      service: 'Amana-ta',
      status: 'completed',
      reference: 'AMN240115004',
      location: 'Tahoua, Niger',
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
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesService = serviceFilter === 'all' || transaction.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const handleRetryTransaction = (transactionId) => {
    // Logique pour relancer une transaction
    console.log('Retry transaction:', transactionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Gestion et suivi des transferts d'argent</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-outline flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select"
          >
            <option value="all">Tous les statuts</option>
            <option value="completed">Terminé</option>
            <option value="pending">En attente</option>
            <option value="failed">Échec</option>
          </select>
          
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="select"
          >
            <option value="all">Tous les services</option>
            <option value="MyNITA">MyNITA</option>
            <option value="Amana-ta">Amana-ta</option>
          </select>
          
          <button className="btn-outline flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bénéficiaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.reference}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {transaction.date} {transaction.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.user}</div>
                      <div className="text-sm text-gray-500">{transaction.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.recipient}</div>
                      <div className="text-sm text-gray-500">{transaction.recipientPhone}</div>
                      <div className="text-sm text-gray-500">{transaction.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">€{transaction.amount.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Frais: €{transaction.fees.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{transaction.receivedAmount.toLocaleString()} XOF</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {transaction.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">{getStatusText(transaction.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {transaction.status === 'failed' && (
                        <button
                          onClick={() => handleRetryTransaction(transaction.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Détails de la transaction
                </h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Informations générales</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Référence:</span>
                      <span className="font-medium">{selectedTransaction.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedTransaction.date} {selectedTransaction.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedTransaction.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                        {getStatusIcon(selectedTransaction.status)}
                        <span className="ml-1">{getStatusText(selectedTransaction.status)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Montants</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant envoyé:</span>
                      <span className="font-medium">€{selectedTransaction.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais:</span>
                      <span className="font-medium">€{selectedTransaction.fees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Total débité:</span>
                      <span className="font-medium">€{(selectedTransaction.amount + selectedTransaction.fees).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant reçu:</span>
                      <span className="font-medium">{selectedTransaction.receivedAmount.toLocaleString()} XOF</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Expéditeur</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium">{selectedTransaction.user}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedTransaction.userEmail}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Bénéficiaire</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium">{selectedTransaction.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="font-medium">{selectedTransaction.recipientPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Localisation:</span>
                      <span className="font-medium">{selectedTransaction.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="btn-outline"
              >
                Fermer
              </button>
              {selectedTransaction.status === 'failed' && (
                <button
                  onClick={() => handleRetryTransaction(selectedTransaction.id)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Relancer</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;