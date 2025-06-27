import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Switch,
  Modal,
  Animated,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { guardarPuntuacionRompecabezas } from "../../services/authService";

const { width } = Dimensions.get("window");
const boardSize = Math.min(width - 40, 300);

const puzzles = {
  paisaje: require("../../assets/images/biblioteca.jpg"),
  Paisaje2: require("../../assets/images/biblioteca.jpg"),
  Vaca: require("../../assets/images/biblioteca.jpg"),
};
const getPieces = (puzzleId, gridSize) => {
  const pieces = {
    paisaje: {
    }
  };

  return pieces[puzzleId]?.[gridSize] || [];
};

export const PuzzleGameScreen = () => {
  const route = useRoute();
  const puzzleId = route.params?.puzzleId || "paisaje";
  const gridSize = route.params?.gridSize || 3;

  const cellSize = Math.floor(boardSize / gridSize);
  const piezas = getPieces(puzzleId, gridSize);

  const [tablero, setTablero] = useState(Array(gridSize * gridSize).fill(null));
  const [fichasDisponibles, setFichasDisponibles] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { user } = useAuth();

  useEffect(() => {
    reiniciar();
  }, []);

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const reiniciar = () => {
    const mezcladas = piezas
      .map((img, i) => ({ id: i, img }))
      .sort(() => Math.random() - 0.5);
    setFichasDisponibles(mezcladas);
    setTablero(Array(gridSize * gridSize).fill(null));
    setSeleccionada(null);
    setStartTime(Date.now());
    setElapsed(0);
  };

  const colocarFicha = (index) => {
    if (!seleccionada || tablero[index]) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = seleccionada;
    setTablero(nuevoTablero);

    const nuevasFichas = fichasDisponibles.filter(f => f.id !== seleccionada.id);
    setFichasDisponibles(nuevasFichas);
    setSeleccionada(null);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();

    if (nuevoTablero.every((ficha, i) => ficha && ficha.id === i)) {
      const puntuacion = Math.max(1000 - elapsed * 10, 100);
      Alert.alert("🎉 ¡Excelente!", `Has completado el puzzle.\nTiempo: ${elapsed} s\nPuntuación: ${puntuacion}`);

      if (user?.id) {
        const dificultadTexto = gridSize === 3 ? "fácil" : gridSize === 4 ? "media" : "difícil";
        guardarPuntuacionRompecabezas(user.id, {
          dificultad: dificultadTexto,
          puntaje: puntuacion,
          tiempo_restante: 0,
        });
      } else {
        console.warn("⚠️ No se pudo guardar: el usuario no está autenticado.");
      }
    }
  };

  const completadas = tablero.filter((ficha, i) => ficha?.id === i).length;

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>🧩 Puzzle: {puzzleId}</Text>

      <View style={styles.themeToggle}>
        <Text style={{ color: theme.text, marginRight: 6 }}>🌗 Modo oscuro</Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <Text style={[styles.timer, { color: theme.text }]}>⏱ Tiempo: {elapsed}s</Text>
      <Text style={[styles.progress, { color: theme.text }]}>✔️ {completadas} / {gridSize * gridSize}</Text>

      <View style={[styles.grid, { backgroundColor: theme.board, width: boardSize, height: boardSize }]}>
        {tablero.map((ficha, i) => (
          <TouchableOpacity
            key={i}
            style={[{
              width: cellSize,
              height: cellSize,
              borderWidth: 1,
              borderColor: "#B0BEC5",
              justifyContent: "center",
              alignItems: "center"
            }, ficha?.id === i && styles.correctCell]}
            onPress={() => colocarFicha(i)}
          >
            {ficha && (
              <Animated.Image
                source={ficha.img}
                style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.subtitle, { color: theme.text }]}>Fichas disponibles</Text>
      <View style={styles.pool}>
        {fichasDisponibles.map((ficha) => (
          <TouchableOpacity
            key={ficha.id}
            style={[styles.pieceButton, seleccionada?.id === ficha.id && { borderColor: "#2196F3", borderWidth: 2 }]}
            onPress={() => setSeleccionada(seleccionada?.id === ficha.id ? null : ficha)}
          >
            <Image source={ficha.img} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={reiniciar} style={styles.resetButton}>
        <MaterialIcons name="refresh" size={20} color="#fff" />
        <Text style={styles.resetText}>Reiniciar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPreviewVisible(true)} style={styles.previewButton}>
        <Entypo name="eye" size={20} color="#fff" />
        <Text style={styles.resetText}>Ver original</Text>
      </TouchableOpacity>

      <Modal visible={previewVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Image source={puzzles[puzzleId]} style={styles.previewImage} />
          <TouchableOpacity style={styles.modalClose} onPress={() => setPreviewVisible(false)}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const lightTheme = {
  bg: "#F4F6F8",
  text: "#263238",
  board: "#ECEFF1",
};
const darkTheme = {
  bg: "#121212",
  text: "#FAFAFA",
  board: "#1E1E1E",
};

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 30, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  themeToggle: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  timer: { fontSize: 14, marginBottom: 2 },
  progress: { fontSize: 13, marginBottom: 10 },
  subtitle: { fontSize: 14, fontWeight: "600", marginTop: 24, marginBottom: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", borderRadius: 12, overflow: "hidden" },
  correctCell: {
    borderColor: "#4CAF50",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  pool: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", paddingHorizontal: 10 },
  pieceButton: {
    width: 80, height: 80,
    borderWidth: 1,
    borderColor: "#90A4AE",
    borderRadius: 6,
    margin: 3,
    backgroundColor: "#fff",
  },
  image: { width: "100%", height: "100%", borderRadius: 4, resizeMode: "cover" },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#546E7A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  previewButton: {
    backgroundColor: "#607D8B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  resetText: { color: "#fff", fontWeight: "600", fontSize: 14, marginLeft: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center"
  },
  previewImage: {
    width: 280,
    height: 280,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  modalClose: {
    marginTop: 20,
    backgroundColor: "#546E7A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
