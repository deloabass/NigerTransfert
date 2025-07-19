import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      phone: '+33 6 12 34 56 78',
      status: 'verified',
      kycStatus: 'completed',
      totalTransactions: 15,
      totalVolume: '€2,450.00',
      joinDate: '2024-01-15',
      lastActivity: '2024-01-20',
    },
    {
      id: '2',
      name: 'Mariama Sow',
      email: 'mariama.sow@email.com',
      phone: '+33 6 23 45 67 89',
      status: 'active',
      kycStatus: 'pending',
      totalTransactions: 8,
      totalVolume: '€1,200.00',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-19',
    },
    {
      id: '3',
      name: 'Ousmane Ba',
      email: 'ousmane.ba@email.com',
      phone: '+33 6 34 56 78 90',
      status: 'suspended',
      kycStatus: 'rejected',
      totalTransactions: 3,
      totalVolume: '€450.00',
      joinDate: '2024-01-05',
      lastActivity: '2024-01-18',
    },
    {
      id: '4',
      name: 'Fatou Diop',
      email: 'fatou.diop@email.com',
      phone: '+33 6 45 67 89 01',
      status: 'verified',
      kycStatus: 'completed',
      totalTransactions: 22,
      totalVolume: '€3,800.00',
      joinDate: '2023-12-20',
      lastActivity: '2024-01-20',
    },
    {
      id: '5',
      name: 'Ibrahim Traoré',
      email: 'ibrahim.traore@email.com',
      phone: '+33 6 56 78 90 12',
      status: 'active',
      kycStatus: 'pending',
      totalTransactions: 5,
      totalVolume: '€750.00',
      joinDate: '2024-01-12',
      lastActivity: '2024-01-19',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-700 bg-green-50';
      case 'active':
        return 'text-blue-700 bg-blue-50';
      case 'suspended':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getKycStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'rejected':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-2">
            Gérez les comptes utilisateurs et leurs vérifications
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">Tous les statuts</option>
              <option value="verified">Vérifiés</option>
              <option value="active">Actifs</option>
              <option value="suspended">Suspendus</option>
            </select>
          </div>

          <button className="btn-outline flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">KYC</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transactions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Volume total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Inscription</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status === 'verified' ? 'Vérifié' : 
                         user.status === 'active' ? 'Actif' : 'Suspendu'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getKycStatusColor(
                        user.kycStatus
                      )}`}
                    >
                      {user.kycStatus === 'completed' ? 'Complété' :
                       user.kycStatus === 'pending' ? 'En attente' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.totalTransactions}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {user.totalVolume}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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
            <span className="font-medium">{filteredUsers.length}</span> sur{' '}
            <span className="font-medium">{users.length}</span> résultats
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

export default Users;