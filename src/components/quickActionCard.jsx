import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export const QuickActionCard = ({ feature, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <LinearGradient
      colors={[feature.color + "80", feature.color]}
      style={styles.gradient}
    >
      <MaterialIcons name={feature.icon} size={28} color="#fff" />
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.description}>{feature.description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  gradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  description: {
    color: "#f0f0f0",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },
});
