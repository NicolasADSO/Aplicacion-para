import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const puzzles = [
  {
    id: "paisaje",
    title: "Paisaje",
    preview: require("../../assets/images/paisaje-preview.jpg"),
  },
  {
    id: "paisaje2",
    title: "montañas",
    preview: require("../../assets/images/paisajeNat.jpg"),
  },
  {
    id: "vaca",
    title: "Vaca",
    preview: require("../../assets/images/vaca.jpg"),
  },
];

const difficulties = [
  { label: "Fácil (3x3)", value: 3 },
  { label: "Media (4x4)", value: 4 },
  { label: "Experto (6x6)", value: 6 },
];

const { width } = Dimensions.get("window");
const cardWidth = width / 3.2;
const cardHeight = cardWidth + 20;

export const Iniciojuego = () => {
  const navigation = useNavigation();
  const [selectedPuzzle, setSelectedPuzzle] = useState("paisaje");
  const [selectedGridSize, setSelectedGridSize] = useState(3);

  const startPuzzle = () => {
    navigation.navigate("Rompecabezas", {
      puzzleId: selectedPuzzle,
      gridSize: selectedGridSize,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Selecciona un Puzzle</Text>

      <FlatList
        horizontal
        data={puzzles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gallery}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.previewBox,
              selectedPuzzle === item.id && styles.selectedBox,
            ]}
            onPress={() => setSelectedPuzzle(item.id)}
          >
            <Image source={item.preview} style={styles.image} />
            <Text style={styles.imageLabel}>{item.title}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.title}>🎯 Dificultad</Text>
      <View style={styles.difficultyContainer}>
        {difficulties.map((dif) => (
          <TouchableOpacity
            key={dif.value}
            style={[
              styles.diffButton,
              selectedGridSize === dif.value && styles.diffSelected,
            ]}
            onPress={() => setSelectedGridSize(dif.value)}
          >
            <Text style={styles.diffText}>{dif.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.playButton} onPress={startPuzzle}>
        <Text style={styles.playText}>🚀 Empezar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#263238",
  },
  gallery: {
    paddingBottom: 4,
    paddingLeft: 4,
    marginBottom: 8,
    alignItems: "flex-start", // evita espacio innecesario
  },
  previewBox: {
    width: cardWidth,
    height: cardHeight,
    marginRight: 12,
    alignItems: "center",
    backgroundColor: "#ECEFF1",
    borderRadius: 16,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: "#1976D2",
  },
  image: {
    width: "100%",
    height: cardWidth,
    borderRadius: 10,
    resizeMode: "cover",
    backgroundColor: "#ccc",
  },
  imageLabel: {
    marginTop: 6,
    fontWeight: "600",
    color: "#455A64",
  },
  difficultyContainer: {
    marginTop: 8,
  },
  diffButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#CFD8DC",
    borderRadius: 8,
    marginBottom: 10,
  },
  diffSelected: {
    backgroundColor: "#4CAF50",
  },
  diffText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263238",
  },
  playButton: {
    marginTop: 20,
    backgroundColor: "#607D8B",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  playText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
