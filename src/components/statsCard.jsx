import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const StatCard = ({ icon, label, value, color }) => {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={24} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 3,
  },
  value: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
  label: {
    fontSize: 10,
    color: "#e0e0e0",
    marginTop: 2,
    fontWeight: "500",
  },
});