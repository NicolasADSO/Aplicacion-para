import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeartRateWidget } from "../components/HeartRateWidget";
import { FeatureCard } from "../components/featureCard";
import { StatsSection } from "../components/stastSection";
import { QuickActionCard } from "../components/quickActionCard"
import { ActionButton } from "../components/actionButton";
import { RecommendationBox } from "../components/recommendationBox";
import { useHeartRate } from "../context/HeartRateContext";
import { getRole } from "../utils/session";
import features from "../data/features";
import { GreetingSection } from "../components/greetingSection";


export const HomeScreen = ({ navigation }) => {
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("Usuario");
  const [dailyStats, setDailyStats] = useState({
    exercisesCompleted: 1,
    breathingSessions: 2,
    totalMinutes: 32,
    streak: 1,
  });


  const {
    getCurrentTheme,
    getRecommendedActivities,
    anxietyLevel,
    isConnected,
    currentBPM,
  } = useHeartRate();
  const theme = getCurrentTheme();

  useEffect(() => {
    (async () => {
      const savedRole = await getRole();
      setRole(savedRole || "");

      const raw = await AsyncStorage.getItem("usuario");
      if (raw) {
        const user = JSON.parse(raw);
        setUserName(user.nombre || "Usuario");
      }
    })();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("usuario");
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  const gradientColors = isConnected
    ? [theme.bg[0], theme.bg[1], "#16213e"]
    : ["#1e3c72", "#2a5298", "#16213e"];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Widget de pulso */}
        <View style={styles.headerSection}>
          <HeartRateWidget />
        </View>

        {/* Saludo y mensaje */}
        <GreetingSection
          name={userName}
          isConnected={isConnected}
          anxietyLevel={anxietyLevel}
          theme={theme}
          currentBPM={currentBPM}
        />

        {/* Progreso diario */}
       <StatsSection stats={dailyStats} />

        {/* Acciones rápidas */}
        <View style={styles.quickSection}>
          <Text style={styles.title}>⚡ Acciones rápidas</Text>
          <View style={styles.quickGrid}>
            {features.slice(0, 2).map((f) => (
              <QuickActionCard
                key={f.title}
                feature={f}
                onPress={() => navigation.navigate(f.screen)}
              />
            ))}
          </View>
        </View>

        {/* Recomendaciones */}
        <RecommendationBox
          theme={theme}
          activities={isConnected ? getRecommendedActivities() : []}
        />

        {/* Todas las herramientas */}
        <View style={styles.featuresSection}>
          <Text style={styles.title}>🎯 Todas las herramientas</Text>
          <FlatList
            data={features}
            renderItem={({ item }) => (
              <FeatureCard item={item} theme={theme} navigation={navigation} />
            )}
            keyExtractor={(item) => item.title}
            numColumns={2}
            columnWrapperStyle={styles.featureRow}
            scrollEnabled={false}
          />
        </View>

        {/* Botones inferiores */}
        <View style={styles.bottomSection}>
          {role === "administrador" && (
            <ActionButton
              icon="admin-panel-settings"
              text="Panel Admin"
              color="#9b59b6"
              onPress={() => navigation.navigate("AdminScreen")}
            />
          )}
          <ActionButton
            icon="person"
            text="Mi Perfil"
            color="#3498db"
            onPress={() => navigation.navigate("Perfil")}
          />
          <ActionButton
            icon="logout"
            text="Cerrar Sesión"
            color="#e74c3c"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 50, paddingBottom: 100 },
  headerSection: { marginBottom: 10, paddingHorizontal: 24 },
  statsSection: { paddingHorizontal: 24, marginBottom: 25 },
  title: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 15,
  },
  statsGrid: { flexDirection: "row", justifyContent: "space-between" },
  quickSection: { paddingHorizontal: 24, marginBottom: 25 },
  quickGrid: { flexDirection: "row", justifyContent: "space-between" },
  featuresSection: { paddingHorizontal: 24, marginBottom: 25 },
  featureRow: { justifyContent: "space-between", marginBottom: 15 },
  bottomSection: { paddingHorizontal: 24, marginBottom: 25 },
});
