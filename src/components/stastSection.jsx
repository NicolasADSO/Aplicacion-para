import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatCard } from "./statsCard";

export const StatsSection = ({ stats }) => (
  <View style={styles.container}>
    <Text style={styles.title}>📊 Tu progreso hoy</Text>
    <View style={styles.grid}>
      <StatCard
        icon="fitness-center"
        value={stats.exercisesCompleted}
        label="Ejercicios"
        color="#6A82FB"
      />
      <StatCard
        icon="air"
        value={stats.breathingSessions}
        label="Respiración"
        color="#56CCF2"
      />
      <StatCard
        icon="schedule"
        value={stats.totalMinutes}
        label="Minutos"
        color="#43E97B"
      />
      <StatCard
        icon="local-fire-department"
        value={stats.streak}
        label="Racha"
        color="#FF6B6B"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
