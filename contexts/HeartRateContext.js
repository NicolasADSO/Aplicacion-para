// contexts/HeartRateContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeartRateContext = createContext();

export const useHeartRate = () => {
  const context = useContext(HeartRateContext);
  if (!context) {
    throw new Error('useHeartRate debe usarse dentro de HeartRateProvider');
  }
  return context;
};

// Rangos de ansiedad basados en ritmo cardíaco
const ANXIETY_LEVELS = {
  CALM: { min: 60, max: 80, color: '#4CAF50', bg: ['#4CAF50', '#81C784'], name: 'Calmado', emoji: '😌' },
  NORMAL: { min: 81, max: 100, color: '#2196F3', bg: ['#2196F3', '#64B5F6'], name: 'Normal', emoji: '🙂' },
  ALERT: { min: 101, max: 120, color: '#FF9800', bg: ['#FF9800', '#FFB74D'], name: 'Alerta', emoji: '😐' },
  ANXIOUS: { min: 121, max: 140, color: '#FF5722', bg: ['#FF5722', '#FF8A65'], name: 'Ansioso', emoji: '😰' },
  VERY_ANXIOUS: { min: 141, max: 200, color: '#F44336', bg: ['#F44336', '#E57373'], name: 'Muy Ansioso', emoji: '😱' }
};

export const HeartRateProvider = ({ children }) => {
  const [currentBPM, setCurrentBPM] = useState(75);
  const [isSimulating, setIsSimulating] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState('NORMAL');
  const [readings, setReadings] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // Simula conexión con reloj

  // Determinar nivel de ansiedad basado en BPM
  const determineAnxietyLevel = (bpm) => {
    for (const [level, range] of Object.entries(ANXIETY_LEVELS)) {
      if (bpm >= range.min && bpm <= range.max) {
        return level;
      }
    }
    return 'NORMAL';
  };

  // Obtener colores actuales según nivel de ansiedad
  const getCurrentTheme = () => {
    return ANXIETY_LEVELS[anxietyLevel];
  };

  // Simulador de ritmo cardíaco para pruebas
  const startSimulation = () => {
    setIsSimulating(true);
    setIsConnected(true);
    
    const interval = setInterval(() => {
      // Simula variaciones realistas del ritmo cardíaco
      const baseRate = 85;
      const variation = Math.random() * 60 - 30; // ±30 BPM de variación
      const newBPM = Math.max(60, Math.min(180, Math.round(baseRate + variation)));
      
      setCurrentBPM(newBPM);
      const newLevel = determineAnxietyLevel(newBPM);
      setAnxietyLevel(newLevel);
      
      // Guardar lectura
      const newReading = {
        bpm: newBPM,
        level: newLevel,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      setReadings(prev => [newReading, ...prev.slice(0, 99)]); // Mantener últimas 100 lecturas
      
    }, 10000); // Actualiza cada 10 segundos

    return interval;
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setIsConnected(false);
  };

  // Obtener sugerencia según nivel de ansiedad
  const getAnxietySuggestion = () => {
    const suggestions = {
      CALM: "¡Excelente! Tu ritmo está muy calmado. Perfecto momento para meditar.",
      NORMAL: "Tu ritmo cardíaco está en un rango normal. Todo va bien.",
      ALERT: "Tu ritmo está un poco elevado. Considera hacer ejercicios de respiración.",
      ANXIOUS: "Detectamos ansiedad. Te recomendamos usar nuestros ejercicios de relajación.",
      VERY_ANXIOUS: "Nivel de ansiedad alto. Es momento de usar técnicas de calma inmediata."
    };
    return suggestions[anxietyLevel];
  };

  // Obtener actividades recomendadas
  const getRecommendedActivities = () => {
    const activities = {
      CALM: ['Biblioteca', 'Sonidos'],
      NORMAL: ['Ejercicios', 'Sonidos'],
      ALERT: ['Respiración', 'Sonidos'],
      ANXIOUS: ['Respiración', 'Ejercicios'],
      VERY_ANXIOUS: ['Respiración']
    };
    return activities[anxietyLevel] || ['Respiración'];
  };

  // Guardar historial en AsyncStorage
  const saveReadingsToStorage = async () => {
    try {
      await AsyncStorage.setItem('heart_rate_readings', JSON.stringify(readings));
    } catch (error) {
      console.error('Error guardando lecturas:', error);
    }
  };

  // Cargar historial desde AsyncStorage
  const loadReadingsFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem('heart_rate_readings');
      if (stored) {
        setReadings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error cargando lecturas:', error);
    }
  };

  useEffect(() => {
    loadReadingsFromStorage();
  }, []);

  useEffect(() => {
    if (readings.length > 0) {
      saveReadingsToStorage();
    }
  }, [readings]);

  const value = {
    // Estado actual
    currentBPM,
    anxietyLevel,
    isSimulating,
    isConnected,
    readings,
    
    // Funciones
    startSimulation,
    stopSimulation,
    getCurrentTheme,
    getAnxietySuggestion,
    getRecommendedActivities,
    
    // Datos de referencia
    ANXIETY_LEVELS,
    setCurrentBPM, // Para conectar con reloj real más adelante
  };

  return (
    <HeartRateContext.Provider value={value}>
      {children}
    </HeartRateContext.Provider>
  );
};