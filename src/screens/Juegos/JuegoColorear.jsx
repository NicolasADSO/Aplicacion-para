import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DibujoMandalado from "../../components/DibujoMandalado";

const colores = ["#F44336", "#2196F3", "#4CAF50", "#FFEB3B", "#9C27B0"];

export const JuegoColorear = () => {
  const [colorSeleccionado, setColorSeleccionado] = useState("#F44336");
  const [zonas, setZonas] = useState({
    zona1: "#ccc",
    zona2: "#ccc",
    zona3: "#ccc",
    zona4: "#ccc",
    zona5: "#ccc",
  });

  const pintarZona = (zona) => {
    setZonas({ ...zonas, [zona]: colorSeleccionado });
  };

  const reiniciar = () => {
    setZonas({
      zona1: "#ccc",
      zona2: "#ccc",
      zona3: "#ccc",
      zona4: "#ccc",
      zona5: "#ccc",
    });
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>🎨 Color Zen</Text>

      {/* Paleta de colores */}
      <View style={styles.paleta}>
        {colores.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorBtn,
              {
                backgroundColor: color,
                borderWidth: color === colorSeleccionado ? 3 : 1.5,
                borderColor: color === colorSeleccionado ? "#fff" : "#333",
                transform: [{ scale: color === colorSeleccionado ? 1.1 : 1 }],
              },
            ]}
            onPress={() => setColorSeleccionado(color)}
          />
        ))}
      </View>

      {/* Dibujo Mandalado */}
      <DibujoMandalado zonas={zonas} pintarZona={pintarZona} />

      <TouchableOpacity style={styles.resetBtn} onPress={reiniciar}>
        <Text style={styles.resetText}>🔄 Reiniciar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  paleta: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    flexWrap: "wrap",
    gap: 12,
  },
  colorBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  resetBtn: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff20",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  resetText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
