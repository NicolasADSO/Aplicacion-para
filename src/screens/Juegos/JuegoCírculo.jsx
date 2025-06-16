import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");
const zonaCentro = {
  min: width / 2 - 50,
  max: width / 2 + 50,
};

export const JuegoCírculo = () => {
  const [intentos, setIntentos] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const posicion = useRef(new Animated.Value(0)).current;

  const animarMovimiento = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(posicion, {
          toValue: width - 80,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(posicion, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animarMovimiento();
  }, []);

  const manejarToque = () => {
    posicion.stopAnimation((valor) => {
      const dentro = valor >= zonaCentro.min && valor <= zonaCentro.max;
      setIntentos((prev) => prev + 1);
      if (dentro) {
        setAciertos((prev) => prev + 1);
        Alert.alert("✅ ¡Bien hecho!", "¡Tocaste el círculo en el centro!");
      } else {
        Alert.alert("❌ Casi...", "Tócalo cuando esté más centrado.");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Centro y Calma</Text>
      <View style={styles.zonaCentro} />

      <Animated.View style={[styles.circulo, { left: posicion }]} />

      <TouchableOpacity style={styles.btn} onPress={manejarToque}>
        <Text style={styles.btnText}>Tocar Ahora</Text>
      </TouchableOpacity>

      <Text style={styles.stats}>
        Intentos: {intentos} | Aciertos: {aciertos}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, alignItems: "center", backgroundColor: "#f4f4f4" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  zonaCentro: {
    position: "absolute",
    top: 140,
    left: zonaCentro.min,
    width: zonaCentro.max - zonaCentro.min,
    height: 80,
    backgroundColor: "#d0f0c0",
    borderRadius: 8,
    zIndex: 0,
  },
  circulo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#03A9F4",
    position: "absolute",
    top: 140,
    zIndex: 1,
  },
  btn: {
    marginTop: 250,
    backgroundColor: "#607D8B",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  stats: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
