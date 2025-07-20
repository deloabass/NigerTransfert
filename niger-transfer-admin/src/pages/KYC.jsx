import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Camera,
  Download,
  MoreHorizontal,
} from 'lucide-react';

const KYC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const kycApplications = [
    {
      id: '1',
      user: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      status: 'approved',
      submittedDate: '2024-01-18',
      reviewedDate: '2024-01-19',
      documentType: 'Passeport',
      documentNumber: 'NE123456789',
      reviewedBy: 'Admin Niger Transfer',
      notes: 'Documents valides et photo claire',
    },
    {
      id: '2',
      user: 'Mariama Sow',
      email: 'mariama.sow@email.com',
      status: 'pending',
      submittedDate: '2024-01-20',
      reviewedDate: null,
      documentType: 'Carte d\'identité',
      documentNumber: 'CI987654321',
      reviewedBy: null,
      notes: null,
    },
    {
      id: '3',
      user: 'Ousmane Ba',
      email: 'ousmane.ba@email.com',
      status: 'rejected',
      submittedDate: '2024-01-17',
      reviewedDate: '2024-01-18',
      documentType: 'Permis de conduire',
      documentNumber: 'PC456789123',
      reviewedBy: 'Admin Niger Transfer',
      notes: 'Photo floue, document expiré',
    },
    {
      id: '4',
      user: 'Fatou Diop',
      email: 'fatou.diop@email.com',
      status: 'under_review',
      submittedDate: '2024-01-19',
      reviewedDate: null,
      documentType: 'Passeport',
      documentNumber: 'NE789123456',
      reviewedBy: 'Admin Niger Transfer',
      notes: 'En cours de vérification avec les autorités',
    },
    {
      id: '5',
      user: 'Ibrahim Traoré',
      email: 'ibrahim.traore@email.com',
      status: 'pending',
      submittedDate: '2024-01-20',
      reviewedDate: null,
      documentType: 'Carte de séjour',
      documentNumber: 'CS321654987',
      reviewedBy: null,
      notes: null,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'under_review':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-50';
      case 'rejected':
        return 'text-red-700 bg-red-50';
      case 'under_review':
        return 'text-blue-700 bg-blue-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      case 'under_review':
        return 'En révision';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const filteredApplications = kycApplications.filter((application) => {
    const matchesSearch = 
      application.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || application.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: kycApplications.length,
    pending: kycApplications.filter(app => app.status === 'pending').length,
    under_review: kycApplications.filter(app => app.status === 'under_review').length,
    approved: kycApplications.filter(app => app.status === 'approved').length,
    rejected: kycApplications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vérifications KYC</h1>
          <p className="text-gray-600 mt-2">
            Gérez les demandes de vérification d'identité
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En révision</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.under_review}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approuvés</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejetés</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
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
                placeholder="Rechercher par nom, email ou numéro de document..."
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
              <option value="pending">En attente</option>
              <option value="under_review">En révision</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Rejetés</option>
            </select>
          </div>

          <button className="btn-outline flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* KYC Applications Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Document</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date soumission</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date révision</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Révisé par</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id} className="table-row">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {application.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{application.user}</p>
                        <p className="text-sm text-gray-500">{application.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{application.documentType}</p>
                      <p className="text-sm text-gray-500">{application.documentNumber}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusText(application.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {new Date(application.submittedDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {application.reviewedDate 
                      ? new Date(application.reviewedDate).toLocaleDateString('fr-FR')
                      : '-'
                    }
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {application.reviewedBy || '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <XCircle className="w-4 h-4" />
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
            <span className="font-medium">{filteredApplications.length}</span> sur{' '}
            <span className="font-medium">{kycApplications.length}</span> résultats
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

export default KYC;