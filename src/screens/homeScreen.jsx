/**
 * Librerias para la screen.
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Imports personalizados.
 */
import { HeartRateWidget } from "../components/HeartRateWidget";
import { FeatureCard } from "../components/featureCard";
import { useHeartRate } from "../context/HeartRateContext";
import { getRole } from "../utils/session";

const features = [
  {
    title: "Ejercicios",
    icon: "fitness-center",
    screen: "Ejercicios",
    color: "#6A82FB",
  },
  {
    title: "Respiracion",
    icon: "air",
    screen: "Respiracion",
    color: "#56CCF2",
  },
  { title: "Sonidos", icon: "music-note", screen: "Sonidos", color: "#43E97B" },
  {
    title: "Biblioteca",
    icon: "menu-book",
    screen: "Biblioteca",
    color: "#FDCB6E",
  },
];

export const HomeScreen = ({ navigation }) => {
  const [role, setRole] = useState("");
  const {
    getCurrentTheme,
    getRecommendedActivities,
    anxietyLevel,
    isConnected,
  } = useHeartRate();
  const theme = getCurrentTheme();

  useEffect(() => {
    const fecthRole = async () => {
      const savedRole = await getRole();
      setRole(savedRole);
    };
    fecthRole();
  }, []);

  const dynamicGradient = isConnected
    ? [theme.bg[0], theme.bg[1], "#2c5364"]
    : ["#0f2027", "#203a43", "#2c5364"];

  /**
   * Screen Principal.
   */

  return (
    <LinearGradient colors={dynamicGradient} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HeartRateWidget />

      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}> Bienvenido a ¡PARA!</Text>
        {isConnected ? (
          <Text style={[styles.subtitle, { color: theme.color }]}>
            Te sientes {theme.name.toLowerCase()} {theme.emoji}
          </Text>
        ) : (
          <Text style={styles.subtitle}>¿Que deseas hacer hoy?</Text>
        )}
      </View>

      {isConnected && getRecommendedActivities().length > 0 && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>
            💡Actividades recomendada para ti
          </Text>
        </View>
      )}

      <FlatList
        data={features}
        renderItem={({ item }) => (
          <FeatureCard item={item} theme={theme} navigation={navigation} />
        )}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.featureContainer}
        showsVerticalScrollIndicator={false}
      />

      {role === "administrador" && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace("AdminScreen")}
        >
          <MaterialIcons name="settings" size={22} color="#fff" />
          <Text style={styles.logoutText}>Ir al panel del administrador </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace("Login")}
      >
        <MaterialIcons name="logout" size={22} color="#fff" />
        <Text style={styles.logoutText}> Cerrar Sesión </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  greetingContainer: { paddingHorizontal: 24, marginBottom: 10 },
  greeting: {
    fontSize: 24,
    color: "#ffffffcc",
    marginBottom: 4,
    fontWeight: "300",
  },
  subtitle: { fontSize: 16, color: "#ffffffaa", marginBottom: 20 },
  recommendationContainer: { paddingHorizontal: 24, marginBottom: 10 },
  recommendationTitle: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "500",
  },
  featureContainer: { paddingHorizontal: 24, paddingBottom: 50 },
  row: { justifyContent: "space-between", marginBottom: 20 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34495E",
    padding: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 15,
    marginHorizontal: 24,
  },
  logoutText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
});
