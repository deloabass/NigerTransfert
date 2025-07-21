// Exemples d'utilisation des alertes personnalisées

import { useAlert } from '@/components/AlertProvider';
import { useToast } from '@/components/ToastProvider';

// Exemple d'utilisation dans un composant
export const AlertExamples = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useAlert();
  const { showSuccess: toastSuccess, showError: toastError } = useToast();

  // Alerte de succès simple
  const handleSuccess = () => {
    showSuccess('Transfert réussi', 'Votre argent a été envoyé avec succès');
  };

  // Alerte d'erreur avec bouton personnalisé
  const handleError = () => {
    showError('Erreur de connexion', 'Impossible de se connecter au serveur', {
      buttons: [
        { text: 'Réessayer', onPress: () => console.log('Retry') },
        { text: 'Annuler', style: 'cancel' }
      ]
    });
  };

  // Alerte de confirmation
  const handleDelete = () => {
    showConfirm(
      'Supprimer le bénéficiaire',
      'Cette action est irréversible. Êtes-vous sûr ?',
      () => {
        // Action de suppression
        toastSuccess('Supprimé', 'Bénéficiaire supprimé avec succès');
      },
      () => {
        console.log('Suppression annulée');
      }
    );
  };

  // Toast notification
  const handleToastNotification = () => {
    toastSuccess('Sauvegardé', 'Vos modifications ont été sauvegardées');
  };

  // Alerte d'avertissement avec auto-close
  const handleWarning = () => {
    showWarning('Limite atteinte', 'Vous avez atteint votre limite mensuelle', {
      autoClose: true,
      autoCloseDelay: 5000
    });
  };

  return {
    handleSuccess,
    handleError,
    handleDelete,
    handleToastNotification,
    handleWarning
  };
};

// Types d'alertes disponibles :
/*
1. showSuccess(title, message, options)
2. showError(title, message, options)
3. showWarning(title, message, options)
4. showInfo(title, message, options)
5. showConfirm(title, message, onConfirm, onCancel)

Options disponibles :
- buttons: Array de boutons personnalisés
- autoClose: Boolean pour fermeture automatique
- autoCloseDelay: Délai en millisecondes
- type: 'success', 'error', 'warning', 'info'

Styles de boutons :
- 'destructive': Bouton rouge pour actions dangereuses
- 'cancel': Bouton gris pour annulation
- Par défaut: Bouton avec couleur du type d'alerte
*/