import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { mandalasDisponibles } from "../../data/mandalas"; // Asegúrate de tener este archivo con los mandalas

const colores = [
  "#F44336",
  "#2196F3",
  "#4CAF50",
  "#FFEB3B",
  "#9C27B0",
  "#FF9800",
  "#795548",
];

export const JuegoColorear = () => {
  const [mandalaSeleccionada, setMandalaSeleccionada] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState(colores[0]);
  const [zonas, setZonas] = useState(
    Object.fromEntries(Array.from({ length: 30 }, (_, i) => [`zona${i + 1}`, "#ccc"]))
  );

  const pintarZona = (key) => {
    setZonas((prev) => ({ ...prev, [key]: colorSeleccionado }));
  };

  if (!mandalaSeleccionada) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎨 Elige tu Mandala</Text>
        <ScrollView contentContainerStyle={styles.list}>
          {mandalasDisponibles.map((mandala) => (
            <TouchableOpacity
              key={mandala.id}
              style={styles.card}
              onPress={() => setMandalaSeleccionada(mandala)}
            >
              <Text style={styles.cardText}>{mandala.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  const MandalaComponent = mandalaSeleccionada.componente;
  const propsZonas = {};
  for (let i = 1; i <= 30; i++) {
    const key = `zona${i}`;
    propsZonas[key] = {
      fill: zonas[key],
      onPress: () => pintarZona(key),
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 {mandalaSeleccionada.nombre}</Text>

      <View style={styles.paleta}>
        {colores.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorBtn,
              {
                backgroundColor: color,
                borderColor: colorSeleccionado === color ? "#000" : "#444",
              },
            ]}
            onPress={() => setColorSeleccionado(color)}
          />
        ))}
      </View>

      <MandalaComponent {...propsZonas} />

      <TouchableOpacity onPress={() => setMandalaSeleccionada(null)}>
        <Text style={styles.back}>🔙 Cambiar mandala</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  list: { alignItems: "center" },
  card: {
    backgroundColor: "#e0e0e0",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    width: 240,
    alignItems: "center",
  },
  cardText: { fontSize: 16, fontWeight: "600" },
  back: {
    marginTop: 20,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  paleta: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  colorBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 6,
    marginVertical: 4,
    borderWidth: 2,
  },
});
