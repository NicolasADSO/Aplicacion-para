import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
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
  testButton: {
    backgroundColor: "#ffffff33",
    padding: 6,
    borderRadius: 20,
  },
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
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  activeCard: {
    shadowColor: "#56CCF2",
    shadowOpacity: 0.8,
    elevation: 12,
  },
  gradient: {
    width: width - 40,
    height: 130,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  titleText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
