// screens/SeleccionarDibujoScreen.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const SeleccionarDibujoScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>🖼️ Elige un mandala</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("JuegoColorear", { dibujo: 1 })}>
        <Text style={styles.cardTitle}>🎨 Mándala Clásico</Text>
        <Text style={styles.cardDesc}>Formas simples con triángulo, círculos y cuadrados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("JuegoColorear", { dibujo: 2 })}>
        <Text style={styles.cardTitle}>🌸 Mándala Flor</Text>
        <Text style={styles.cardDesc}>Formas curvas y pétalos geométricos</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff20",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderColor: "#ffffff60",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  cardDesc: {
    color: "#ddd",
    fontSize: 14,
  },
});
