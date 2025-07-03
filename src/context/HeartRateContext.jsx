// contexts/HeartRateContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLastBPMByUser } from "../services/bpmService";

const HeartRateContext = createContext();

export const useHeartRate = () => {
  const context = useContext(HeartRateContext);
  if (!context) {
    throw new Error("useHeartRate debe usarse dentro de HeartRateProvider");
  }
  return context;
};

// Rangos de ansiedad basados en BPM
const ANXIETY_LEVELS = {
  CALM: {
    min: 60,
    max: 80,
    color: "#4CAF50",
    bg: ["#4CAF50", "#81C784"],
    name: "Calmado",
    emoji: "😌",
  },
  NORMAL: {
    min: 81,
    max: 100,
    color: "#2196F3",
    bg: ["#2196F3", "#64B5F6"],
    name: "Normal",
    emoji: "🙂",
  },
  ALERT: {
    min: 101,
    max: 120,
    color: "#FF9800",
    bg: ["#FF9800", "#FFB74D"],
    name: "Alerta",
    emoji: "😐",
  },
  ANXIOUS: {
    min: 121,
    max: 140,
    color: "#FF5722",
    bg: ["#FF5722", "#FF8A65"],
    name: "Ansioso",
    emoji: "😰",
  },
  VERY_ANXIOUS: {
    min: 141,
    max: 200,
    color: "#F44336",
    bg: ["#F44336", "#E57373"],
    name: "Muy Ansioso",
    emoji: "😱",
  },
};

export const HeartRateProvider = ({ children }) => {
  const [currentBPM, setCurrentBPM] = useState(null);
  const [anxietyLevel, setAnxietyLevel] = useState("NORMAL");
  const [readings, setReadings] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const determineAnxietyLevel = (bpm) => {
    for (const [level, range] of Object.entries(ANXIETY_LEVELS)) {
      if (bpm >= range.min && bpm <= range.max) return level;
    }
    return "NORMAL";
  };

  const getCurrentTheme = () => ANXIETY_LEVELS[anxietyLevel];

  const updateBPMState = (bpm) => {
    setCurrentBPM(bpm);
    const level = determineAnxietyLevel(bpm);
    setAnxietyLevel(level);

    const newReading = {
      bpm,
      level,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };

    setReadings((prev) => [newReading, ...prev.slice(0, 99)]);
  };

  const fetchBPMFromSupabase = async (userId) => {
    try {
      setLoading(true);
      console.log("🔄 Buscando BPM en Supabase para:", userId);
      const result = await getLastBPMByUser(userId);
      if (result?.bpm) {
        console.log("📈 BPM obtenido:", result.bpm);
        updateBPMState(result.bpm);
        setIsConnected(true);
      } else {
        console.warn("⚠️ No se encontró BPM para el usuario.");
      }
    } catch (error) {
      console.error("❌ Error general en fetchBPMFromSupabase:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAnxietySuggestion = () => {
    const suggestions = {
      CALM: "¡Excelente! Tu ritmo está muy calmado. Perfecto momento para meditar.",
      NORMAL: "Tu ritmo cardíaco está en un rango normal. Todo va bien.",
      ALERT:
        "Tu ritmo está un poco elevado. Considera hacer ejercicios de respiración.",
      ANXIOUS:
        "Detectamos ansiedad. Te recomendamos usar nuestros ejercicios de relajación.",
      VERY_ANXIOUS:
        "Nivel de ansiedad alto. Es momento de usar técnicas de calma inmediata.",
    };
    return suggestions[anxietyLevel];
  };

  const getRecommendedActivities = () => {
    const activities = {
      CALM: ["Biblioteca", "Sonidos"],
      NORMAL: ["Ejercicios", "Sonidos"],
      ALERT: ["Respiración", "Sonidos"],
      ANXIOUS: ["Respiración", "Ejercicios"],
      VERY_ANXIOUS: ["Respiración"],
    };
    return activities[anxietyLevel] || ["Respiración"];
  };

  const saveReadingsToStorage = async () => {
    try {
      await AsyncStorage.setItem(
        "heart_rate_readings",
        JSON.stringify(readings)
      );
    } catch (error) {
      console.error("Error guardando lecturas:", error);
    }
  };

  const loadReadingsFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem("heart_rate_readings");
      if (stored) {
        setReadings(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error cargando lecturas:", error);
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
    currentBPM,
    anxietyLevel,
    isConnected,
    readings,
    loading,
    setCurrentBPM,
    fetchBPMFromSupabase,
    getCurrentTheme,
    getAnxietySuggestion,
    getRecommendedActivities,
    ANXIETY_LEVELS,
  };

  return (
    <HeartRateContext.Provider value={value}>
      {children}
    </HeartRateContext.Provider>
  );
};
