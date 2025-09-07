import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Plus, Search, MessageCircle, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SupportTicketsScreen() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simuler des tickets existants
    setTickets([
      {
        id: 'TKT001',
        title: 'Problème de transfert vers MyNITA',
        description: 'Mon transfert de 150€ est bloqué depuis 2 heures',
        status: 'open',
        priority: 'high',
        category: 'Transfert',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T14:20:00Z',
        responses: 2,
      },
      {
        id: 'TKT002',
        title: 'Question sur les frais Amana-ta',
        description: 'Pourquoi les frais ont-ils augmenté ?',
        status: 'resolved',
        priority: 'medium',
        category: 'Frais',
        createdAt: '2024-01-14T09:15:00Z',
        updatedAt: '2024-01-14T16:45:00Z',
        responses: 3,
      },
      {
        id: 'TKT003',
        title: 'Vérification KYC en attente',
        description: 'Mes documents sont en attente depuis 3 jours',
        status: 'in_progress',
        priority: 'medium',
        category: 'Vérification',
        createdAt: '2024-01-13T14:20:00Z',
        updatedAt: '2024-01-15T11:30:00Z',
        responses: 1,
      },
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertTriangle size={16} color="#FF6B35" />;
      case 'in_progress':
        return <Clock size={16} color="#3B82F6" />;
      case 'resolved':
        return <CheckCircle size={16} color="#2E8B57" />;
      default:
        return <MessageCircle size={16} color="#666" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'in_progress':
        return 'En cours';
      case 'resolved':
        return 'Résolu';
      default:
        return 'Inconnu';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#FF6B35';
      case 'in_progress':
        return '#3B82F6';
      case 'resolved':
        return '#2E8B57';
      default:
        return '#666';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#DC3545';
      case 'medium':
        return '#FF6B35';
      case 'low':
        return '#2E8B57';
      default:
        return '#666';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'Tous', count: tickets.length },
    { value: 'open', label: 'Ouverts', count: tickets.filter(t => t.status === 'open').length },
    { value: 'in_progress', label: 'En cours', count: tickets.filter(t => t.status === 'in_progress').length },
    { value: 'resolved', label: 'Résolus', count: tickets.filter(t => t.status === 'resolved').length },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Mes tickets de support</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/support-tickets/create')}
          >
            <Plus size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher dans vos tickets..."
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

        {/* Create Ticket Button */}
        <View style={styles.createTicketSection}>
          <TouchableOpacity
            style={styles.createTicketButton}
            onPress={() => router.push('/support-tickets/create')}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8A65']}
              style={styles.createTicketGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.createTicketText}>Créer un nouveau ticket</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tickets List */}
        <View style={styles.ticketsList}>
          {filteredTickets.length === 0 ? (
            <View style={styles.emptyState}>
              <MessageCircle size={48} color="#CCC" />
              <Text style={styles.emptyStateTitle}>Aucun ticket trouvé</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery ? 'Aucun ticket ne correspond à votre recherche' : 'Vous n\'avez pas encore créé de ticket'}
              </Text>
            </View>
          ) : (
            filteredTickets.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={styles.ticketCard}
                onPress={() => router.push(`/support-tickets/${ticket.id}`)}
              >
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketInfo}>
                    <Text style={styles.ticketTitle}>{ticket.title}</Text>
                    <Text style={styles.ticketId}>#{ticket.id}</Text>
                  </View>
                  <View style={styles.ticketStatus}>
                    {getStatusIcon(ticket.status)}
                    <Text style={[
                      styles.ticketStatusText,
                      { color: getStatusColor(ticket.status) }
                    ]}>
                      {getStatusText(ticket.status)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.ticketDescription} numberOfLines={2}>
                  {ticket.description}
                </Text>

                <View style={styles.ticketMeta}>
                  <View style={styles.ticketCategory}>
                    <Text style={styles.ticketCategoryText}>{ticket.category}</Text>
                  </View>
                  <View style={[
                    styles.ticketPriority,
                    { backgroundColor: `${getPriorityColor(ticket.priority)}20` }
                  ]}>
                    <Text style={[
                      styles.ticketPriorityText,
                      { color: getPriorityColor(ticket.priority) }
                    ]}>
                      {ticket.priority === 'high' ? 'Haute' : ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </Text>
                  </View>
                </View>

                <View style={styles.ticketFooter}>
                  <Text style={styles.ticketDate}>
                    Créé le {formatDate(ticket.createdAt)}
                  </Text>
                  <Text style={styles.ticketResponses}>
                    {ticket.responses} réponse{ticket.responses > 1 ? 's' : ''}
                  </Text>
                </View>
              </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  createButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
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
  createTicketSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  createTicketButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  createTicketGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  createTicketText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ticketsList: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  ticketCard: {
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
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ticketId: {
    fontSize: 12,
    color: '#666',
  },
  ticketStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ticketStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ticketCategory: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ticketCategoryText: {
    fontSize: 10,
    color: '#2E8B57',
    fontWeight: '500',
  },
  ticketPriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ticketPriorityText: {
    fontSize: 10,
    fontWeight: '500',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  ticketDate: {
    fontSize: 12,
    color: '#666',
  },
  ticketResponses: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
});