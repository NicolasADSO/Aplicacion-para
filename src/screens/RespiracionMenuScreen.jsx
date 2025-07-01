import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ejercicios = [
  {
    nombre: "Respiración Básica",
    descripcion: "Inhala 4s · Mantén 2s · Exhala 4s",
    ruta: "RespiracionScreen",
    icon: "air",
  },
  {
    nombre: "Box Breathing",
    descripcion: "4 fases de 4 segundos",
    ruta: "EjercicioBoxBreathing",
    icon: "crop-square",
  },
  {
    nombre: "Respiración 4-7-8",
    descripcion: "Relajación profunda",
    ruta: "Ejercicio478",
    icon: "timer",
  },
  {
    nombre: "Respiración 5-5-5",
    descripcion: "Equilibrio emocional",
    ruta: "Ejercicio555",
    icon: "change-history",
  },
];

export function RespiracionMenu() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>🌬️ Elige un ejercicio de respiración</Text>

      <FlatList
        data={ejercicios}
        keyExtractor={(item) => item.ruta}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => navigation.navigate(item.ruta)}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name={item.icon} size={28} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardDescription}>{item.descripcion}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 14,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
});
