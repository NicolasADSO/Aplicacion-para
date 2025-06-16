import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Modal,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";

const fases = [
  { texto: "Inhala", duracion: 4000 },
  { texto: "Mantén", duracion: 2000 },
  { texto: "Exhala", duracion: 4000 },
];

export default function RespiracionScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [fase, setFase] = useState("Presiona iniciar");
  const [activo, setActivo] = useState(false);
  const faseIndex = useRef(0);
  const intervalRef = useRef(null);
  const [mostrarInfo, setMostrarInfo] = useState(true);

  // 🎵 Cargar los sonidos
  const playerInhala = useAudioPlayer(require("../assets/sounds/inhale.mp3"));
  const playerSosten = useAudioPlayer(require("../assets/sounds/sosten.mp3"));
  const playerExhala = useAudioPlayer(require("../assets/sounds/exhala.mp3"));

  const reproducirSonidoFase = (texto) => {
    switch (texto) {
      case "Inhala":
        playerInhala.play();
        break;
      case "Mantén":
        playerSosten.play();
        break;
      case "Exhala":
        playerExhala.play();
        break;
    }
  };

  const iniciarRespiracion = () => {
    if (activo) {
      clearInterval(intervalRef.current);
      setActivo(false);
      setFase("Presiona iniciar");
      return;
    }

    setActivo(true);
    faseIndex.current = 0;
    cambiarFase();

    intervalRef.current = setInterval(() => {
      faseIndex.current = (faseIndex.current + 1) % fases.length;
      cambiarFase();
    }, 10000);
  };

  const cambiarFase = () => {
    const { texto, duracion } = fases[faseIndex.current];
    setFase(texto);
    fadeText();
    reproducirSonidoFase(texto);

    Animated.timing(scaleAnim, {
      toValue: texto === "Exhala" ? 0.6 : 1.2,
      duration: duracion,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const fadeText = () => {
    opacityAnim.setValue(0);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <LinearGradient colors={["#16222A", "#3A6073"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🧠 MODAL INFORMATIVO */}
      <Modal visible={mostrarInfo} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>¿Cómo funciona este ejercicio?</Text>
              <Text style={styles.modalText}>
                Este ejercicio te guía a través de un ciclo de respiración consciente que ayuda a calmar tu sistema nervioso.
              </Text>
              <Text style={styles.modalText}>
                🔹 <Text style={styles.modalBold}>Inhala:</Text> Respira profundamente por la nariz durante 4 segundos.
              </Text>
              <Text style={styles.modalText}>
                🔸 <Text style={styles.modalBold}>Mantén:</Text> Retén el aire durante 2 segundos.
              </Text>
              <Text style={styles.modalText}>
                🔹 <Text style={styles.modalBold}>Exhala:</Text> Suelta el aire por la boca durante 4 segundos.
              </Text>
              <Text style={styles.modalText}>
                Repite este ciclo varias veces y observa cómo tu cuerpo se relaja con cada respiración.
              </Text>

              <TouchableOpacity
                onPress={() => setMostrarInfo(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>¡Entendido! Comenzar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 🔵 Botón Info en la esquina */}
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => setMostrarInfo(true)}
      >
        <Ionicons name="information-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}> Ejercicio de Respiración </Text>
        <Animated.View
          style={[
            styles.circleContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <LinearGradient
            colors={["#A1C4FD", "#C2E9FB"]}
            style={styles.circle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <Animated.Text style={[styles.instruction, { opacity: opacityAnim }]}>
          {fase}
        </Animated.Text>

        <TouchableOpacity style={styles.button} onPress={iniciarRespiracion}>
          <MaterialIcons
            name={activo ? "pause" : "play-arrow"}
            size={28}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {activo ? "Detener" : "Iniciar"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },

  circleContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: "hidden",
    marginBottom: 50,
  },
  circle: { flex: 1, borderRadius: 110 },

  instruction: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 30,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#203a43",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },

  // 🧠 Estilos para el Modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  modalBold: {
    fontWeight: "bold",
    color: "#000",
  },
  modalButton: {
    backgroundColor: "#3A6073",
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },

  infoButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});

