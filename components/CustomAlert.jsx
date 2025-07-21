import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Circle as XCircle, Info, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CustomAlert({ 
  visible, 
  type = 'info', 
  title, 
  message, 
  buttons = [], 
  onClose,
  autoClose = false,
  autoCloseDelay = 3000 
}) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      if (autoClose) {
        progressAnim.setValue(0);
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: autoCloseDelay,
          useNativeDriver: false, // ⚠️ width can't use native driver
        }).start();

        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, autoClose, autoCloseDelay]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose && onClose();
    });
  };

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle size={32} color="#FFFFFF" />,
          colors: ['#2E8B57', '#4CAF50'],
          iconBg: '#2E8B57',
        };
      case 'error':
        return {
          icon: <XCircle size={32} color="#FFFFFF" />,
          colors: ['#DC3545', '#FF6B6B'],
          iconBg: '#DC3545',
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={32} color="#FFFFFF" />,
          colors: ['#FF6B35', '#FF8A65'],
          iconBg: '#FF6B35',
        };
      default:
        return {
          icon: <Info size={32} color="#FFFFFF" />,
          colors: ['#3B82F6', '#60A5FA'],
          iconBg: '#3B82F6',
        };
    }
  };

  const config = getAlertConfig();

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [
                { scale: scaleAnim },
                { translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })
                }
              ]
            }
          ]}
        >
          {/* Header avec icône */}
          <View style={styles.alertHeader}>
            <LinearGradient
              colors={config.colors}
              style={styles.iconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {config.icon}
            </LinearGradient>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleClose}
            >
              <X size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Contenu */}
          <View style={styles.alertContent}>
            {title && <Text style={styles.alertTitle}>{title}</Text>}
            {message && <Text style={styles.alertMessage}>{message}</Text>}
          </View>

          {/* Boutons d'action */}
          {buttons.length > 0 && (
            <View style={styles.alertActions}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    button.style === 'destructive' && styles.destructiveButton,
                    button.style === 'cancel' && styles.cancelButton,
                    buttons.length === 1 && styles.singleButton
                  ]}
                  onPress={() => {
                    button.onPress && button.onPress();
                    handleClose();
                  }}
                >
                  {button.style === 'destructive' ? (
                    <LinearGradient
                      colors={['#DC3545', '#FF6B6B']}
                      style={styles.buttonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.destructiveButtonText}>{button.text}</Text>
                    </LinearGradient>
                  ) : button.style === 'cancel' ? (
                    <View style={styles.cancelButtonContent}>
                      <Text style={styles.cancelButtonText}>{button.text}</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={config.colors}
                      style={styles.buttonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.primaryButtonText}>{button.text}</Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Progress bar animée */}
          {autoClose && (
            <View style={styles.progressContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: config.iconBg,
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, width * 0.9], // 90% de largeur écran
                    }),
                  },
                ]}
              />
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayTouch: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 340,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  alertHeader: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 20,
    position: 'relative',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    padding: 24,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  alertActions: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  singleButton: {
    flex: 1,
  },
  buttonGradient: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  destructiveButton: {},
  destructiveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cancelButtonContent: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  progressContainer: {
    height: 3,
    backgroundColor: '#F0F0F0',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});
