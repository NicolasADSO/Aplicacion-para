import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
    screen: "JuegoColorear",
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
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Juegos Disponibles</Text>
      <FlatList
        data={juegos}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialIcons name={item.icon} size={32} color="#fff" />
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <MaterialIcons name="navigate-next" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#bbbbbb",
    marginTop: 4,
  },
});
