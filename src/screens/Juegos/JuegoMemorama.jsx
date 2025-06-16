import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { CartaMemorama } from "../Juegos/CartaMemorama";

const emojisDisponibles = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝"];

const generarCartas = () => {
  const cartasBase = emojisDisponibles.flatMap((emoji) => [
    { id: `${emoji}-1`, emoji, volteada: false, resuelta: false },
    { id: `${emoji}-2`, emoji, volteada: false, resuelta: false },
  ]);
  return cartasBase.sort(() => Math.random() - 0.5);
};

export const JuegoMemorama = () => {
  const [cartas, setCartas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {
    setCartas(generarCartas());
  }, []);

  const manejarToque = (id) => {
    const index = cartas.findIndex((c) => c.id === id);
    if (cartas[index].volteada || cartas[index].resuelta) return;

    const nuevasCartas = [...cartas];
    nuevasCartas[index].volteada = true;
    setCartas(nuevasCartas);

    const nuevasSeleccionadas = [...seleccionadas, index];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      const [i1, i2] = nuevasSeleccionadas;
      if (cartas[i1].emoji === cartas[i2].emoji) {
        // ¡Correcto!
        nuevasCartas[i1].resuelta = true;
        nuevasCartas[i2].resuelta = true;
        setCartas([...nuevasCartas]);
      }

      setTimeout(() => {
        const reinicio = nuevasCartas.map((c, idx) =>
          c.resuelta ? c : { ...c, volteada: false }
        );
        setCartas(reinicio);
        setSeleccionadas([]);
      }, 800);
    }

    // ¿Juego terminado?
    const terminado = nuevasCartas.every((c) => c.resuelta);
    if (terminado) {
      setTimeout(() => {
        Alert.alert("¡Ganaste!", "Has completado el memorama 🎉", [
          {
            text: "Jugar de nuevo",
            onPress: () => {
              setCartas(generarCartas());
              setSeleccionadas([]);
            },
          },
        ]);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Encuentra el Par</Text>
      <FlatList
        data={cartas}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <CartaMemorama carta={item} onPress={() => manejarToque(item.id)} />
        )}
        contentContainerStyle={styles.board}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#121212" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  board: {
    alignItems: "center",
    paddingBottom: 40,
  },
});
