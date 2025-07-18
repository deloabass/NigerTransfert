import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, TrendingUp, CircleCheck as CheckCircle, Clock, Circle as XCircle, Download } from 'lucide-react-native';
import { formatCurrency } from '@/utils/formatters';
import { mockTransactions } from '@/services/mockData';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (searchQuery) {
      filtered = filtered.filter(transaction =>
        transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === filterStatus);
    }

    setFilteredTransactions(filtered);
  }, [searchQuery, filterStatus, transactions]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#2E8B57" />;
      case 'pending':
        return <Clock size={20} color="#FF6B35" />;
      case 'failed':
        return <XCircle size={20} color="#DC3545" />;
      default:
        return <Clock size={20} color="#666" />;
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
        return 'Inconnu';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#2E8B57';
      case 'pending':
        return '#FF6B35';
      case 'failed':
        return '#DC3545';
      default:
        return '#666';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Toutes', count: transactions.length },
    { value: 'completed', label: 'Terminées', count: transactions.filter(t => t.status === 'completed').length },
    { value: 'pending', label: 'En attente', count: transactions.filter(t => t.status === 'pending').length },
    { value: 'failed', label: 'Échouées', count: transactions.filter(t => t.status === 'failed').length },
  ];

  const totalSent = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.fees, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Historique des transferts</Text>
          
          {/* Search */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher par bénéficiaire ou service..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.filterTab,
                  filterStatus === option.value && styles.filterTabActive
                ]}
                onPress={() => setFilterStatus(option.value)}
              >
                <Text style={[
                  styles.filterTabText,
                  filterStatus === option.value && styles.filterTabTextActive
                ]}>
                  {option.label} ({option.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(totalSent, 'EUR')}</Text>
            <Text style={styles.statLabel}>Total envoyé</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(totalFees, 'EUR')}</Text>
            <Text style={styles.statLabel}>Frais payés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{transactions.length}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Aucune transaction trouvée</Text>
            </View>
          ) : (
            filteredTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionHeader}>
                  <View style={styles.transactionIcon}>
                    <TrendingUp size={20} color="#FF6B35" />
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionRecipient}>
                      {transaction.recipient}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaction.date} • {transaction.time}
                    </Text>
                  </View>
                  <View style={styles.transactionAmount}>
                    <Text style={styles.transactionAmountText}>
                      -{formatCurrency(transaction.amount, 'EUR')}
                    </Text>
                  </View>
                </View>

                <View style={styles.transactionDetails}>
                  <View style={styles.transactionRow}>
                    <Text style={styles.transactionLabel}>Service:</Text>
                    <Text style={styles.transactionValue}>{transaction.service}</Text>
                  </View>
                  <View style={styles.transactionRow}>
                    <Text style={styles.transactionLabel}>Frais:</Text>
                    <Text style={styles.transactionValue}>
                      {formatCurrency(transaction.fees, 'EUR')}
                    </Text>
                  </View>
                  <View style={styles.transactionRow}>
                    <Text style={styles.transactionLabel}>Montant reçu:</Text>
                    <Text style={styles.transactionValue}>
                      {formatCurrency(transaction.receivedAmount, 'XOF')}
                    </Text>
                  </View>
                  <View style={styles.transactionRow}>
                    <Text style={styles.transactionLabel}>Référence:</Text>
                    <Text style={styles.transactionValue}>{transaction.reference}</Text>
                  </View>
                </View>

                <View style={styles.transactionFooter}>
                  <View style={styles.transactionStatus}>
                    {getStatusIcon(transaction.status)}
                    <Text style={[
                      styles.transactionStatusText,
                      { color: getStatusColor(transaction.status) }
                    ]}>
                      {getStatusText(transaction.status)}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Download size={16} color="#666" />
                    <Text style={styles.downloadButtonText}>Reçu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterTabActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterTabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  transactionsList: {
    padding: 20,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionRecipient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDetails: {
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionLabel: {
    fontSize: 12,
    color: '#666',
  },
  transactionValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  transactionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transactionStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  downloadButtonText: {
    fontSize: 12,
    color: '#666',
  },
});