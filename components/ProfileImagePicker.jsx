import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Camera, User, Upload, X } from 'lucide-react-native';

export default function ProfileImagePicker({ currentImage, onImageSelect, onImageRemove }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleImagePicker = () => {
    Alert.alert(
      'Photo de profil',
      'Choisissez une option',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Prendre une photo', onPress: () => simulateCamera() },
        { text: 'Choisir dans la galerie', onPress: () => simulateGallery() },
        ...(currentImage ? [{ text: 'Supprimer la photo', style: 'destructive', onPress: handleRemoveImage }] : [])
      ]
    );
  };

  const simulateCamera = () => {
    // Simuler la prise de photo
    const mockImageUri = `https://picsum.photos/200/200?random=${Date.now()}`;
    onImageSelect(mockImageUri);
    Alert.alert('Succès', 'Photo prise avec succès');
  };

  const simulateGallery = () => {
    // Simuler la sélection depuis la galerie
    const mockImageUri = `https://picsum.photos/200/200?random=${Date.now()}`;
    onImageSelect(mockImageUri);
    Alert.alert('Succès', 'Photo sélectionnée avec succès');
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Supprimer la photo',
      'Êtes-vous sûr de vouloir supprimer votre photo de profil ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: onImageRemove }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
        {currentImage ? (
          <>
            <Image source={{ uri: currentImage }} style={styles.profileImage} />
            <View style={styles.editOverlay}>
              <Camera size={20} color="#FFFFFF" />
            </View>
          </>
        ) : (
          <View style={styles.placeholderContainer}>
            <User size={40} color="#CCC" />
            <View style={styles.addButton}>
              <Upload size={16} color="#FFFFFF" />
            </View>
          </View>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.changeButton} onPress={handleImagePicker}>
        <Text style={styles.changeButtonText}>
          {currentImage ? 'Changer la photo' : 'Ajouter une photo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  changeButtonText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
});