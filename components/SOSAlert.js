// components/SOSAlert.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Vibration,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeartRate } from '../contexts/HeartRateContext';

const { width, height } = Dimensions.get('window');

export default function SOSAlert({ navigation }) {
  const {
    currentAlert,
    sosMode,
    currentBPM,
    dismissSOS,
    contactEmergency,
    emergencyContact
  } = useHeartRate();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Animación de pulso para alerta crítica
  useEffect(() => {
    if (sosMode && currentAlert?.level === 'CRITICAL') {
      // Vibración
      Vibration.vibrate([500, 200, 500, 200, 500]);
      
      // Animación de pulso
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      // Slide up animation
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();

      return () => {
        pulse.stop();
        Vibration.cancel();
      };
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [sosMode, currentAlert]);

  const handleBreathingExercise = () => {
    dismissSOS();
    navigation.navigate('Respiración');
  };

  const handleContactEmergency = () => {
    const result = contactEmergency();
    alert(result.message);
  };

  const handleDismiss = () => {
    dismissSOS();
  };

  if (!currentAlert) return null;

  const isWarning = currentAlert.level === 'WARNING';
  const isCritical = currentAlert.level === 'CRITICAL';

  const alertColors = {
    WARNING: ['#FF9800', '#FFB74D'],
    CRITICAL: ['#F44336', '#E57373']
  };

  return (
    <Modal
      visible={sosMode}
      transparent={true}
      animationType="none"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.alertContainer,
            { transform: [{ translateY: slideAnim }, { scale: pulseAnim }] }
          ]}
        >
          <LinearGradient
            colors={alertColors[currentAlert.level]}
            style={styles.alertContent}
          >
            {/* Header */}
            <View style={styles.alertHeader}>
              <MaterialIcons 
                name={isCritical ? "emergency" : "warning"} 
                size={36} 
                color="#fff" 
              />
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>{currentAlert.message}</Text>
                <Text style={styles.alertBPM}>
                  Ritmo cardíaco: {currentBPM} BPM
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleDismiss}
              >
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Sugerencias */}
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Qué hacer ahora:</Text>
              {currentAlert.suggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <MaterialIcons name="check-circle" size={16} color="#fff" />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>

            {/* Acciones rápidas */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.primaryAction]}
                onPress={handleBreathingExercise}
              >
                <MaterialIcons name="air" size={24} color="#fff" />
                <Text style={styles.actionText}>Respiración SOS</Text>
              </TouchableOpacity>

              {isCritical && emergencyContact.enabled && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.emergencyAction]}
                  onPress={handleContactEmergency}
                >
                  <MaterialIcons name="phone" size={24} color="#fff" />
                  <Text style={styles.actionText}>Contactar Ayuda</Text>
                </TouchableOpacity>  
              )}

              <TouchableOpacity 
                style={[styles.actionButton, styles.soundsAction]}
                onPress={() => {
                  dismissSOS();
                  navigation.navigate('Sonidos');
                }}
              >
                <MaterialIcons name="music-note" size={24} color="#fff" />
                <Text style={styles.actionText}>Sonidos Relajantes</Text>
              </TouchableOpacity>
            </View>

            {/* Información del contacto de emergencia */}
            {isCritical && emergencyContact.enabled && (
              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyText}>
                  💬 Se enviará mensaje a: {emergencyContact.name}
                </Text>
              </View>
            )}

            {/* Cuenta regresiva para auto-acción */}
            {isCritical && (
              <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>
                  ⏰ Ejercicio de respiración automático en 10s
                </Text>
              </View>
            )}
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  alertContent: {
    padding: 20,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  alertInfo: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  alertBPM: {
    fontSize: 14,
    color: '#ffffffcc',
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  primaryAction: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  emergencyAction: {
    backgroundColor: '#D32F2F',
  },
  soundsAction: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emergencyInfo: {
    marginTop: 15,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  countdownContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  countdownText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});