import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useHeartRate } from "../context/HeartRateContext";
import AsyncStorage  from "@react-native-async-storage/async-storage";



const { width } = Dimensions.get("window");

export const HeartRateWidget = ({ compact = false }) => {

  const {
    currentBPM,
    anxietyLevel,
    isConnected,
    getCurrentTheme,
    getAnxietySuggestion,
    getRecommendedActivities,
    fetchBPMFromSupabase
  } = useHeartRate();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const theme = getCurrentTheme();
  
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try{
        const userData = await AsyncStorage.getItem('usuario');
        if(userData){
          const user = JSON.parse(userData);
          console.log("📦 Datos de usuario", user);
          await fetchBPMFromSupabase(user.id);
        }
      }catch(err){
        console.error("Error al obtener datos del usuario:", err);
      }
    };

    obtenerDatosUsuario()
  }, []);

  console.log("📡 HeartRateWidget:");
  console.log("→ isConnected:", isConnected);
  console.log("→ currentBPM:", currentBPM);
  console.log("→ anxietyLevel:", anxietyLevel);

  useEffect(() => {
    if (isConnected) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
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
      return () => pulse.stop();
    }
  }, [currentBPM, isConnected]);

  if (compact) {
    return (
      <View style={[styles.compactWidget, { borderColor: theme.color }]}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <MaterialIcons
            name="favorite"
            size={20}
            color={isConnected ? theme.color : "#999"}
          />
        </Animated.View>
        <Text style={[styles.compactBPM, { color: theme.color }]}>
          {isConnected ? `${currentBPM}` : "--"}
        </Text>
        <Text style={styles.compactUnit}>BPM</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={isConnected ? theme.bg : ["#666", "#888"]}
      style={styles.widget}
    >
      <View style={styles.header}>
        <View style={styles.statusRow}>
          <MaterialIcons
            name={isConnected ? "bluetooth-connected" : "bluetooth-disabled"}
            size={20}
            color="#fff"
          />
          <Text style={styles.statusText}>
            {isConnected ? "Conectado" : "Desconectado"}
          </Text>
        </View>
      </View>

      <View style={styles.mainDisplay}>
        <Animated.View
          style={[styles.heartContainer, { transform: [{ scale: pulseAnim }] }]}
        >
          <MaterialIcons
            name="favorite"
            size={32}
            color={isConnected ? "#fff" : "#999"}
          />
        </Animated.View>

        <View style={styles.bpmContainer}>
          <Text style={styles.bpmValue}>{isConnected ? currentBPM : "--"}</Text>
          <Text style={styles.bpmUnit}>BPM</Text>
        </View>
      </View>

      <View style={styles.levelInfo}>
        <Text style={styles.levelEmoji}>{theme.emoji}</Text>
        <Text style={styles.levelName}>{theme.name}</Text>
      </View>

      {isConnected && (
        <View style={styles.suggestion}>
          <Text style={styles.suggestionText}>{getAnxietySuggestion()}</Text>

          <View style={styles.recommendedActivities}>
            <Text style={styles.recommendedTitle}>Recomendado:</Text>
            <View style={styles.activitiesRow}>
              {getRecommendedActivities().map((activity, index) => (
                <View key={index} style={styles.activityTag}>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Widget completo
  widget: {
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 16,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 6,
    fontWeight: "500",
  },
  toggleButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 6,
    borderRadius: 15,
  },
  mainDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heartContainer: {
    marginRight: 15,
  },
  bpmContainer: {
    alignItems: "center",
  },
  bpmValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  bpmUnit: {
    fontSize: 12,
    color: "#ffffffcc",
    fontWeight: "500",
  },
  levelInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  levelEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  levelName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  suggestion: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 12,
  },
  suggestionText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 16,
  },
  recommendedActivities: {
    alignItems: "center",
  },
  recommendedTitle: {
    color: "#ffffffcc",
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 6,
  },
  activitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  activityTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 2,
  },
  activityText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
  },

  // Widget compacto
  compactWidget: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    margin: 4,
  },
  compactBPM: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  compactUnit: {
    fontSize: 10,
    color: "#999",
    marginLeft: 2,
  },
});
