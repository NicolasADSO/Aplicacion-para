import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CartaMemorama } from "./CartaMemorama";
import { useAuth } from "../../context/AuthContext";
import { guardarPuntuacionEnSupabase } from "../../services/authService";

const obtenerEmojisPorDificultad = (nivel) => {
  switch (nivel) {
    case "facil":
      return ["🍎", "🍌", "🍇"];
    case "media":
      return ["🍎", "🍌", "🍇", "🍓"];
    case "dificil":
      return ["🍎", "🍌", "🍇", "🍓", "🍍"];
    case "experto":
      return ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝"];
    default:
      return ["🍎", "🍌", "🍇"];
  }
};

const obtenerTiempoPorDificultad = (nivel) => {
  switch (nivel) {
    case "facil":
      return 40;
    case "media":
      return 60;
    case "dificil":
      return 90;
    case "experto":
      return 120;
    default:
      return 60;
  }
};

const generarCartas = (emojis) => {
  const cartasBase = emojis.flatMap((emoji) => [
    { id: `${emoji}-1`, emoji, volteada: false, resuelta: false },
    { id: `${emoji}-2`, emoji, volteada: false, resuelta: false },
  ]);
  return cartasBase.sort(() => Math.random() - 0.5);
};

export function JuegoMemorama() {
  const { user } = useAuth();
  const [dificultad, setDificultad] = useState("facil");
  const [cartas, setCartas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(obtenerTiempoPorDificultad("facil"));
  const timerRef = useRef(null);

  useEffect(() => {
    iniciarJuego(dificultad);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (tiempoRestante <= 0) {
      clearInterval(timerRef.current);
      Alert.alert("⏳ Se acabó el tiempo", "Intenta de nuevo");
      iniciarJuego(dificultad);
    }
  }, [tiempoRestante]);

  const iniciarJuego = (nivel) => {
    const emojis = obtenerEmojisPorDificultad(nivel);
    setCartas(generarCartas(emojis));
    setSeleccionadas([]);
    setTiempoRestante(obtenerTiempoPorDificultad(nivel));
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);
  };

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
      }, 700);
    }

    const terminado = nuevasCartas.every((c) => c.resuelta);
    if (terminado) {
      clearInterval(timerRef.current);
      const paresResueltos = nuevasCartas.length / 2;
      const puntaje = paresResueltos * 10;
      const nuevaPuntuacion = {
        dificultad,
        puntaje,
        tiempo_restante: tiempoRestante,
      };

      if (user?.id) {
        guardarPuntuacionEnSupabase(user.id, nuevaPuntuacion);
      }

      setTimeout(() => {
        Alert.alert("🎉 ¡Ganaste!", `Puntaje: ${puntaje}`, [
          {
            text: "Jugar otra vez",
            onPress: () => iniciarJuego(dificultad),
          },
        ]);
      }, 600);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Encuentra el Par</Text>

      <Text style={styles.tiempo}>⏱ Tiempo restante: {tiempoRestante}s</Text>

      <View style={styles.niveles}>
        {["facil", "media", "dificil", "experto"].map((nivel) => (
          <TouchableOpacity
            key={nivel}
            onPress={() => iniciarJuego(nivel)}
            style={[
              styles.botonNivel,
              dificultad === nivel && styles.botonActivo,
            ]}
          >
            <Text style={styles.textoNivel}>{nivel.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={cartas}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <CartaMemorama carta={item} onPress={() => manejarToque(item.id)} />
        )}
        contentContainerStyle={styles.board}
      />

      <TouchableOpacity
        style={styles.botonReiniciar}
        onPress={() => iniciarJuego(dificultad)}
      >
        <Text style={styles.botonTexto}>🔄 Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#121212" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  tiempo: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  niveles: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  botonNivel: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 10,
  },
  botonActivo: {
    backgroundColor: "#4caf50",
  },
  textoNivel: {
    color: "#fff",
    fontWeight: "bold",
  },
  board: {
    alignItems: "center",
    paddingBottom: 40,
  },
  botonReiniciar: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
