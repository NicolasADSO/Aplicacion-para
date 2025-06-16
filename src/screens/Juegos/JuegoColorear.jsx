import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

const colores = ["#F44336", "#2196F3", "#4CAF50", "#FFEB3B", "#9C27B0"];

export const JuegoColorear = () => {
  const [colorSeleccionado, setColorSeleccionado] = useState("#F44336");
  const [zonas, setZonas] = useState({
    zona1: "#ccc",
    zona2: "#ccc",
    zona3: "#ccc",
  });

  const pintarZona = (zona) => {
    setZonas({ ...zonas, [zona]: colorSeleccionado });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 Color Zen</Text>

      {/* Paleta de colores */}
      <View style={styles.paleta}>
        {colores.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorBtn, { backgroundColor: color }]}
            onPress={() => setColorSeleccionado(color)}
          />
        ))}
      </View>

      {/* Figura para colorear */}
      <Svg height="300" width="300">
        <Circle
          cx="150"
          cy="100"
          r="60"
          fill={zonas.zona1}
          onPress={() => pintarZona("zona1")}
        />
        <Rect
          x="80"
          y="180"
          width="50"
          height="50"
          fill={zonas.zona2}
          onPress={() => pintarZona("zona2")}
        />
        <Rect
          x="170"
          y="180"
          width="50"
          height="50"
          fill={zonas.zona3}
          onPress={() => pintarZona("zona3")}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", paddingTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paleta: {
    flexDirection: "row",
    marginBottom: 20,
  },
  colorBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: "#444",
  },
});
