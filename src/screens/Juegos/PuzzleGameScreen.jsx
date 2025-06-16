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





const { width } = Dimensions.get("window");
const boardSize = Math.min(width - 40, 300);

const puzzles = {
  paisaje: require("../../assets/images/paisaje-preview.jpg"),
  perro: require("../../assets/images/preview.jpg"),
  bosque: require("../../assets/images/preview.jpg"),
};

// Reemplaza esta función dentro de tu archivo
const getPieces = (puzzleId, gridSize) => {
  const pieces = {
    paisaje: {
      3: [
        require("../../assets/images/paisaje3x3/paisaje1_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje2_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje3_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje4_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje5_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje6_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje7_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje8_3x3.png"),
        require("../../assets/images/paisaje3x3/paisaje9_3x3.png"),
      ],
      4: [
        require("../../assets/images/paisaje4x4/paisaje1_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje2_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje3_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje4_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje5_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje6_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje7_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje8_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje9_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje10_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje11_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje12_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje13_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje14_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje15_4x4.png"),
        require("../../assets/images/paisaje4x4/paisaje16_4x4.png"),
      ],
      6: [
        require("../../assets/images/paisaje6x6/paisaje1.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje2.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje3.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje4.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje5.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje6.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje7.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje8.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje9.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje10.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje11.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje12.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje13.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje14.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje15.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje16.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje17.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje18.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje19.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje20.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje21.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje22.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje23.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje24.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje25.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje26.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje27.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje28.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje29.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje30.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje31.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje32.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje33.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje34.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje35.6x6.png"),
        require("../../assets/images/paisaje6x6/paisaje36.6x6.png"),
      ]

    },
    perro: {
      3: [
        require("../../assets/images/piece_0.png"),
        require("../../assets/images/piece_1.png"),
        require("../../assets/images/piece_2.png"),
        require("../../assets/images/piece_3.png"),
        require("../../assets/images/piece_4.png"),
        require("../../assets/images/piece_5.png"),
        require("../../assets/images/piece_6.png"),
        require("../../assets/images/piece_7.png"),
        require("../../assets/images/piece_8.png"),
      ]
    },
    bosque: {
      3: [
        require("../../assets/images/piece_0.png"),
        require("../../assets/images/piece_1.png"),
        require("../../assets/images/piece_2.png"),
        require("../../assets/images/piece_3.png"),
        require("../../assets/images/piece_4.png"),
        require("../../assets/images/piece_5.png"),
        require("../../assets/images/piece_6.png"),
        require("../../assets/images/piece_7.png"),
        require("../../assets/images/piece_8.png"),
      ]
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
      Alert.alert("🎉 ¡Excelente!",
        `Has completado el puzzle.\nTiempo: ${elapsed} s\nPuntuación: ${puntuacion}`
      );
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
            style={[
    {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    justifyContent: "center",
    alignItems: "center"
  },
  ficha?.id === i && styles.correctCell
]}

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
            style={[
              styles.pieceButton,
              seleccionada?.id === ficha.id && { borderColor: "#2196F3", borderWidth: 2 },
            ]}
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
  cell: {
    width: boardSize / 3, height: boardSize / 3,
    borderWidth: 1, borderColor: "#B0BEC5",
    justifyContent: "center", alignItems: "center"
  },
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
