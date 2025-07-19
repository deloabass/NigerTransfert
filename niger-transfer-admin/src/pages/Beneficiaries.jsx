import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Phone,
  User,
  MoreHorizontal,
} from 'lucide-react';

const Beneficiaries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');

  const beneficiaries = [
    {
      id: '1',
      name: 'Fatima Oumarou',
      phone: '+227 90 12 34 56',
      location: 'Niamey, Niger',
      service: 'MyNITA',
      addedBy: 'Amadou Diallo',
      addedDate: '2024-01-15',
      totalReceived: '€1,250.00',
      transactionCount: 8,
      lastTransaction: '2024-01-20',
    },
    {
      id: '2',
      name: 'Ibrahim Mounkaila',
      phone: '+227 96 78 90 12',
      location: 'Zinder, Niger',
      service: 'Amana-ta',
      addedBy: 'Mariama Sow',
      addedDate: '2024-01-10',
      totalReceived: '€800.00',
      transactionCount: 4,
      lastTransaction: '2024-01-19',
    },
    {
      id: '3',
      name: 'Aisha Abdoulaye',
      phone: '+227 94 56 78 90',
      location: 'Maradi, Niger',
      service: 'MyNITA',
      addedBy: 'Ousmane Ba',
      addedDate: '2024-01-08',
      totalReceived: '€450.00',
      transactionCount: 3,
      lastTransaction: '2024-01-18',
    },
    {
      id: '4',
      name: 'Moussa Garba',
      phone: '+227 92 34 56 78',
      location: 'Tahoua, Niger',
      service: 'Amana-ta',
      addedBy: 'Fatou Diop',
      addedDate: '2023-12-25',
      totalReceived: '€2,100.00',
      transactionCount: 12,
      lastTransaction: '2024-01-20',
    },
    {
      id: '5',
      name: 'Zeinab Hassan',
      phone: '+227 98 76 54 32',
      location: 'Agadez, Niger',
      service: 'MyNITA',
      addedBy: 'Ibrahim Traoré',
      addedDate: '2024-01-12',
      totalReceived: '€650.00',
      transactionCount: 5,
      lastTransaction: '2024-01-19',
    },
  ];

  const getServiceColor = (service) => {
    switch (service) {
      case 'MyNITA':
        return 'text-blue-700 bg-blue-50';
      case 'Amana-ta':
        return 'text-green-700 bg-green-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(amount.replace('€', '').replace(',', '')));
  };

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
    const matchesSearch = 
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.addedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = filterService === 'all' || beneficiary.service === filterService;
    
    return matchesSearch && matchesService;
  });

  const totalBeneficiaries = beneficiaries.length;
  const totalReceived = beneficiaries.reduce((sum, b) => {
    return sum + parseFloat(b.totalReceived.replace('€', '').replace(',', ''));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bénéficiaires</h1>
          <p className="text-gray-600 mt-2">
            Gérez tous les bénéficiaires des transferts
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau bénéficiaire</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total bénéficiaires</p>
              <p className="text-2xl font-bold text-gray-900">{totalBeneficiaries}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Montant total reçu</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReceived.toString())}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {beneficiaries.reduce((sum, b) => sum + b.transactionCount, 0)}
              </p>
            </div>
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-secondary-600" />
            </div>
          </div>
        </div>
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
                placeholder="Rechercher par nom, téléphone, localisation ou utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
          </div>

          {/* Service Filter */}
          <div className="sm:w-48">
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
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Bénéficiaire</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Localisation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Ajouté par</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transactions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total reçu</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Dernière transaction</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="table-row">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{beneficiary.name}</p>
                        <p className="text-sm text-gray-500">ID: {beneficiary.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{beneficiary.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{beneficiary.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getServiceColor(
                        beneficiary.service
                      )}`}
                    >
                      {beneficiary.service}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{beneficiary.addedBy}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(beneficiary.addedDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {beneficiary.transactionCount}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {beneficiary.totalReceived}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(beneficiary.lastTransaction).toLocaleDateString('fr-FR')}
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
            <span className="font-medium">{filteredBeneficiaries.length}</span> sur{' '}
            <span className="font-medium">{beneficiaries.length}</span> résultats
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

export default Beneficiaries;