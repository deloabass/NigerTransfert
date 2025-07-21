import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Circle as XCircle, Info, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ToastAlert({ 
  visible, 
  type = 'info', 
  title, 
  message, 
  duration = 4000,
  onClose,
  position = 'top' // 'top' ou 'bottom'
}) {
  const [translateY] = useState(new Animated.Value(position === 'top' ? -100 : 100));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-close
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose && onClose();
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle size={20} color="#FFFFFF" />,
          colors: ['#2E8B57', '#4CAF50'],
        };
      case 'error':
        return {
          icon: <XCircle size={20} color="#FFFFFF" />,
          colors: ['#DC3545', '#FF6B6B'],
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={20} color="#FFFFFF" />,
          colors: ['#FF6B35', '#FF8A65'],
        };
      default:
        return {
          icon: <Info size={20} color="#FFFFFF" />,
          colors: ['#3B82F6', '#60A5FA'],
        };
    }
  };

  const config = getToastConfig();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.topPosition : styles.bottomPosition,
        {
          transform: [{ translateY }],
          opacity,
        }
      ]}
    >
      <LinearGradient
        colors={config.colors}
        style={styles.toastGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.toastContent}>
          <View style={styles.iconContainer}>
            {config.icon}
          </View>
          
          <View style={styles.textContainer}>
            {title && (
              <Text style={styles.toastTitle}>{title}</Text>
            )}
            {message && (
              <Text style={styles.toastMessage}>{message}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
          >
            <X size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 9999,
    elevation: 1000,
  },
  topPosition: {
    top: 60,
  },
  bottomPosition: {
    bottom: 100,
  },
  toastGradient: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  toastMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 18,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});