import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Mail,
  Phone
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      phone: '+33 6 12 34 56 78',
      country: 'France',
      city: 'Paris',
      registrationDate: '2023-03-15',
      lastLogin: '2024-01-15 14:30',
      status: 'active',
      verification: 'verified',
      kycStatus: 'completed',
      totalTransactions: 25,
      totalSent: 3750.00,
      avatar: null,
    },
    {
      id: 2,
      name: 'Ibrahim Mounkaila',
      email: 'ibrahim.m@email.com',
      phone: '+33 7 23 45 67 89',
      country: 'France',
      city: 'Lyon',
      registrationDate: '2023-05-20',
      lastLogin: '2024-01-14 09:15',
      status: 'active',
      verification: 'pending',
      kycStatus: 'pending',
      totalTransactions: 12,
      totalSent: 1800.00,
      avatar: null,
    },
    {
      id: 3,
      name: 'Halima Souley',
      email: 'halima.s@email.com',
      phone: '+33 6 34 56 78 90',
      country: 'Belgique',
      city: 'Bruxelles',
      registrationDate: '2023-07-10',
      lastLogin: '2024-01-10 16:45',
      status: 'suspended',
      verification: 'rejected',
      kycStatus: 'rejected',
      totalTransactions: 5,
      totalSent: 500.00,
      avatar: null,
    },
    {
      id: 4,
      name: 'Moussa Garba',
      email: 'moussa.garba@email.com',
      phone: '+33 6 45 67 89 01',
      country: 'Allemagne',
      city: 'Berlin',
      registrationDate: '2023-09-05',
      lastLogin: '2024-01-13 11:20',
      status: 'active',
      verification: 'verified',
      kycStatus: 'completed',
      totalTransactions: 18,
      totalSent: 2700.00,
      avatar: null,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'suspended':
        return 'Suspendu';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'suspended':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getVerificationIcon = (verification) => {
    switch (verification) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getVerificationText = (verification) => {
    switch (verification) {
      case 'verified':
        return 'Vérifié';
      case 'rejected':
        return 'Rejeté';
      case 'pending':
        return 'En attente';
      default:
        return verification;
    }
  };

  const getVerificationColor = (verification) => {
    switch (verification) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || user.verification === verificationFilter;
    
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const handleSuspendUser = (userId) => {
    console.log('Suspend user:', userId);
  };

  const handleActivateUser = (userId) => {
    console.log('Activate user:', userId);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600">Gestion des comptes utilisateurs</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Nouvel utilisateur</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En attente de vérification</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.verification === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Suspendus</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'suspended').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
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
            <option value="active">Actif</option>
            <option value="suspended">Suspendu</option>
            <option value="pending">En attente</option>
          </select>
          
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="select"
          >
            <option value="all">Toutes les vérifications</option>
            <option value="verified">Vérifié</option>
            <option value="pending">En attente</option>
            <option value="rejected">Rejeté</option>
          </select>
          
          <button className="btn-outline flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vérification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.city}</div>
                    <div className="text-sm text-gray-500">{user.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.totalTransactions} transactions</div>
                    <div className="text-sm text-gray-500">€{user.totalSent.toFixed(2)} envoyés</div>
                    <div className="text-sm text-gray-500">Dernière connexion: {user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="ml-1">{getStatusText(user.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getVerificationColor(user.verification)}`}>
                      {getVerificationIcon(user.verification)}
                      <span className="ml-1">{getVerificationText(user.verification)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Profil utilisateur - {selectedUser.name}
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Informations personnelles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom complet:</span>
                      <span className="font-medium">{selectedUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="font-medium">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pays:</span>
                      <span className="font-medium">{selectedUser.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ville:</span>
                      <span className="font-medium">{selectedUser.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inscription:</span>
                      <span className="font-medium">{selectedUser.registrationDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Statut et vérification</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut du compte:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                        {getStatusIcon(selectedUser.status)}
                        <span className="ml-1">{getStatusText(selectedUser.status)}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vérification:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(selectedUser.verification)}`}>
                        {getVerificationIcon(selectedUser.verification)}
                        <span className="ml-1">{getVerificationText(selectedUser.verification)}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KYC:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(selectedUser.kycStatus)}`}>
                        {getVerificationIcon(selectedUser.kycStatus)}
                        <span className="ml-1">{getVerificationText(selectedUser.kycStatus)}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dernière connexion:</span>
                      <span className="font-medium">{selectedUser.lastLogin}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Activité</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.totalTransactions}</p>
                    <p className="text-sm text-gray-600">Transactions totales</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">€{selectedUser.totalSent.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Montant total envoyé</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">€{(selectedUser.totalSent * 0.025).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Frais générés</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn-outline"
              >
                Fermer
              </button>
              {selectedUser.status === 'active' ? (
                <button
                  onClick={() => handleSuspendUser(selectedUser.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Suspendre
                </button>
              ) : (
                <button
                  onClick={() => handleActivateUser(selectedUser.id)}
                  className="btn-secondary"
                >
                  Activer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;