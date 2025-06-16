import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const GreetingSection = ({
  name,
  isConnected,
  anxietyLevel,
  theme,
  currentBPM,
}) => {
  const getPersonalizedGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return `Buenos días, ${name}`;
    if (h < 18) return `Buenas tardes, ${name}`;
    return `Buenas noches, ${name}`;
  };

  const getMotivationalMessage = () => {
    if (!isConnected) return "¿Listo para comenzar tu bienestar hoy?";
    const msgs = {
      CALM: "¡Perfecto! Mantén este estado de calma 🧘‍♀️",
      NORMAL: "Todo va bien, sigue así 💫",
      ALERT: "Es un buen momento para relajarte 🌿",
      ANXIOUS: "Respira profundo, estamos aquí para ayudarte 💙",
      VERY_ANXIOUS: "Vamos paso a paso, puedes lograrlo 🤗",
    };
    return msgs[anxietyLevel] || "¿Cómo te sientes hoy?";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getPersonalizedGreeting()}</Text>
      <Text style={styles.motivational}>{getMotivationalMessage()}</Text>
      {isConnected && (
        <View style={[styles.statusBox, { borderColor: theme.color }]}>
          <Text style={[styles.statusText, { color: theme.color }]}>
            {theme.emoji} Te sientes {theme.name.toLowerCase()}
          </Text>
          {currentBPM != null && (
            <Text style={styles.bpm}>💓 {currentBPM} BPM</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 8,
  },
  motivational: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 22,
    marginBottom: 15,
  },
  statusBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  bpm: {
    fontSize: 12,
    color: "#d0d0d0",
    fontWeight: "500",
  },
});
