import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal, 
  ScrollView
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";


/**
 * imports personalizados.
 */
import { SoundCard } from "../components/soundCard";
import colors from "../assets/styles/colors";

const { width } = Dimensions.get("window");

const sounds = [
  {
    id: "1",
    title: "Lluvia",
    source: require("../assets/sounds/rain.mp3"),
    icon: "cloud",
    color: ["#314755", "#26a0da"],
  },
  {
    id: "2",
    title: "Mar",
    source: require("../assets/sounds/ocean.mp3"),
    icon: "waves",
    color: ["#2b5876", "#4e4376"],
  },
  {
    id: "3",
    title: "Viento",
    source: require("../assets/sounds/wind.mp3"),
    icon: "air",
    color: ["#1f4037", "#99f2c8"],
  },
];

export default function SoundsScreen() {
  const [activeSound, setActiveSound] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const scaleAnim = new Animated.Value(1);
  const [mostrarInfo, setMostrarInfo] = useState(true);

  const playOrStopSound = async (sound) => {
    if (activeSound === sound.id && currentPlayer) {
      currentPlayer.stop();
      setActiveSound(null);
      setCurrentPlayer(null);
      return;
    }

    if (currentPlayer) {
      currentPlayer.stop();
    }

    const newPlayer = useAudioPlayer(sound.source);
    await newPlayer.play();
    setActiveSound(sound.id);
    setCurrentPlayer(newPlayer);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (currentPlayer) {
          currentPlayer.stop();
        }
      };
    }, [currentPlayer])
  );

  const renderItem = ({ item }) => {
    const isActive = item.id === activeSound;
    return(
      <SoundCard 
        item={item}
        isActive={isActive}
        scaleAnim={scaleAnim}
        onPress={() => playOrStopSound(item)}
      />
    )
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >


       {/* 🔵 Botón de información */}
      <TouchableOpacity style={styles.infoButton} onPress={() => setMostrarInfo(true)}>
        <Ionicons name="information-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* 🧘 MODAL INFORMATIVO */}
      <Modal visible={mostrarInfo} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>¿Qué hacen estos sonidos?</Text>
              <Text style={styles.modalText}>
                Los sonidos relajantes como la lluvia, el mar o el viento ayudan a reducir el estrés,
                mejorar el enfoque, y facilitar el sueño.
              </Text>
              <Text style={styles.modalText}>
                Pulsa sobre un sonido para escucharlo. Si vuelves a pulsar, se detendrá.
              </Text>
              <Text style={styles.modalText}>
                Puedes usar estos sonidos para relajarte antes de dormir, estudiar, o meditar.
              </Text>
              <TouchableOpacity onPress={() => setMostrarInfo(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>¡Entendido! Explorar sonidos</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Text style={styles.header}>Ambientes de Sonido</Text>
      <FlatList
        data={sounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 80,
  },

  // Estilos para el modal informativo
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
