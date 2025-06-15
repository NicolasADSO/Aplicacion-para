import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    description: "Yoga y meditación",
  },
  {
    title: "Respiracion",
    icon: "air",
    screen: "Respiracion",
    color: "#56CCF2",
    description: "Técnicas de calma",
  },
  { 
    title: "Sonidos", 
    icon: "music-note", 
    screen: "Sonidos", 
    color: "#43E97B",
    description: "Sonidos relajantes",
  },
  {
    title: "Biblioteca",
    icon: "menu-book",
    screen: "Biblioteca",
    color: "#FDCB6E",
    description: "Recursos y guías",
  },
  {
    title: "Juegos",
    icon: "extension",
    screen: "ListaDeJuegos",
    color: "#9C27B0",
    description: "Entrenamiento mental",
  },
];

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
    const initializeData = async () => {
      const savedRole = await getRole();
      setRole(savedRole || "");

      const userData = await AsyncStorage.getItem('usuario');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.nombre || "Usuario");
      }
    };

    initializeData();
  }, []);

  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return `Buenos días, ${userName}`;
    if (hour < 18) return `Buenas tardes, ${userName}`;
    return `Buenas noches, ${userName}`;
  };

  const getMotivationalMessage = () => {
    if (!isConnected) return "¿Listo para comenzar tu bienestar hoy?";

    const messages = {
      CALM: "¡Perfecto! Mantén este estado de calma 🧘‍♀️",
      NORMAL: "Todo va bien, sigue así 💫",
      ALERT: "Es un buen momento para relajarte 🌿",
      ANXIOUS: "Respira profundo, estamos aquí para ayudarte 💙",
      VERY_ANXIOUS: "Vamos paso a paso, puedes lograrlo 🤗"
    };

    return messages[anxietyLevel] || "¿Cómo te sientes hoy?";
  };

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

  const dynamicGradient = isConnected
    ? [theme.bg[0], theme.bg[1], "#16213e"]
    : ["#1e3c72", "#2a5298", "#16213e"];

  return (
    <LinearGradient colors={dynamicGradient} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <HeartRateWidget />
        </View>

        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{getPersonalizedGreeting()}</Text>
          <Text style={styles.motivationalMessage}>{getMotivationalMessage()}</Text>

          {isConnected && (
            <View style={[styles.statusIndicator, { borderColor: theme.color }]}>
              <Text style={[styles.statusText, { color: theme.color }]}>
                {theme.emoji} Te sientes {theme.name.toLowerCase()}
              </Text>
              {currentBPM && (
                <Text style={styles.bpmIndicator}>
                  💓 {currentBPM} BPM
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Tu progreso hoy</Text>
          <View style={styles.statsGrid}>
            <Stat icon="fitness-center" label="Ejercicios" value={dailyStats.exercisesCompleted} color="#6A82FB" />
            <Stat icon="air" label="Respiración" value={dailyStats.breathingSessions} color="#56CCF2" />
            <Stat icon="schedule" label="Minutos" value={dailyStats.totalMinutes} color="#43E97B" />
            <Stat icon="local-fire-department" label="Racha" value={dailyStats.streak} color="#FF6B6B" />
          </View>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>⚡ Acciones rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {features.slice(0, 2).map((feature) => (
              <QuickAction key={feature.title} feature={feature} />
            ))}
          </View>
        </View>

        {isConnected && getRecommendedActivities().length > 0 && (
          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>💡 Recomendaciones para ti</Text>
            <View style={styles.recommendationTags}>
              {getRecommendedActivities().map((activity, index) => (
                <View key={index} style={[styles.recommendationTag, { backgroundColor: theme.color + '30' }]}>
                  <Text style={[styles.recommendationTagText, { color: theme.color }]}>{activity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>🎯 Todas las herramientas</Text>
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

        <View style={styles.bottomSection}>
          {role === "administrador" && (
            <ActionButton text="Panel Admin" icon="admin-panel-settings" onPress={() => navigation.navigate("AdminScreen")} color="#9b59b6" />
          )}
          <ActionButton text="Mi Perfil" icon="person" onPress={() => navigation.navigate("Perfil")} color="#3498db" />
          <ActionButton text="Cerrar Sesión" icon="logout" onPress={handleLogout} color="#e74c3c" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Subcomponentes reutilizables
const Stat = ({ icon, label, value, color }) => (
  <View style={styles.statCard}>
    <MaterialIcons name={icon} size={24} color={color} />
    <Text style={styles.statNumber}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const QuickAction = ({ feature }) => (
  <TouchableOpacity style={styles.quickActionCard}>
    <LinearGradient colors={[feature.color + '80', feature.color]} style={styles.quickActionGradient}>
      <MaterialIcons name={feature.icon} size={28} color="#fff" />
      <Text style={styles.quickActionTitle}>{feature.title}</Text>
      <Text style={styles.quickActionDescription}>{feature.description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const ActionButton = ({ text, icon, onPress, color }) => (
  <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
    <MaterialIcons name={icon} size={22} color="#fff" />
    <Text style={styles.actionButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 50, paddingBottom: 100 },
  headerSection: { marginBottom: 10 },
  greetingSection: { paddingHorizontal: 24, marginBottom: 25 },
  greeting: { fontSize: 28, color: "#ffffff", fontWeight: "700", marginBottom: 8 },
  motivationalMessage: { fontSize: 16, color: "#f0f0f0", lineHeight: 22, marginBottom: 15 },
  statusIndicator: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: { fontSize: 14, fontWeight: "600" },
  bpmIndicator: { fontSize: 12, color: "#d0d0d0", fontWeight: "500" },
  statsSection: { paddingHorizontal: 24, marginBottom: 25 },
  sectionTitle: { fontSize: 18, color: "#ffffff", fontWeight: "600", marginBottom: 15 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
  },
  statNumber: { fontSize: 20, color: "#ffffff", fontWeight: "bold", marginTop: 5 },
  statLabel: { fontSize: 10, color: "#e0e0e0", marginTop: 2, fontWeight: "500" },
  quickActionsSection: { paddingHorizontal: 24, marginBottom: 25 },
  quickActionsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  quickActionGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  quickActionTitle: { color: "#ffffff", fontSize: 14, fontWeight: "600", marginTop: 8 },
  quickActionDescription: { color: "#f0f0f0", fontSize: 10, textAlign: 'center', marginTop: 4 },
  recommendationsSection: { paddingHorizontal: 24, marginBottom: 25 },
  recommendationTags: { flexDirection: 'row', flexWrap: 'wrap' },
  recommendationTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  recommendationTagText: { fontSize: 12, fontWeight: "500" },
  featuresSection: { paddingHorizontal: 24, marginBottom: 25 },
  featureRow: { justifyContent: 'space-between', marginBottom: 15 },
  bottomSection: { paddingHorizontal: 24, gap: 12 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
  },
  actionButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});
