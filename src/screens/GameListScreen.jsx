import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const juegos = [
  {
    title: "Rompecabezas",
    icon: "extension",
    screen: "InicioJuego",
    description: "Arma la imagen arrastrando las piezas",
  },
  {
    title: "Encuentra el Par",
    icon: "memory",
    screen: "JuegoMemorama",
    description: "Memoriza y encuentra las parejas",
  },
  {
    title: "Color Zen",
    icon: "palette",
    screen: "SeleccionarDibujo",
    description: "Colorea mandalas relajantes",
  },
  {
    title: "Centro y Calma",
    icon: "touch-app",
    screen: "JuegoCírculo",
    description: "Toca el círculo en el momento justo",
  },
];

export const GameListScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>🎮 Juegos Disponibles</Text>
      <FlatList
        data={juegos}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name={item.icon} size={28} color="#fff" />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <MaterialIcons name="navigate-next" size={28} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
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
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 14,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginHorizontal: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
});
