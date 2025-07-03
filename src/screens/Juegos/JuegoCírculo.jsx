import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useAuth } from "../../context/AuthContext";
import { guardarPuntuacionTapping } from "../../services/authService"; // 💾 nuevo

const { width } = Dimensions.get("window");
const centro = width / 2;

const niveles = {
  facil: { intervalo: 1500, margen: 60 },
  normal: { intervalo: 1000, margen: 40 },
  dificil: { intervalo: 600, margen: 25 },
};

export const JuegoCirculo = () => {
  const { user } = useAuth(); // ✅ obtener usuario
  const [puntos, setPuntos] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [vidas, setVidas] = useState(5);
  const [tiempo, setTiempo] = useState(30);
  const [modo, setModo] = useState("vidas");
  const [nivel, setNivel] = useState("normal");

  const intervaloRef = useRef(null);
  const timerRef = useRef(null);

  const { intervalo, margen } = niveles[nivel];

  const posX = useSharedValue(0);
  const scale = useSharedValue(1);
  const color = useSharedValue("#00BFFF");

  const animacionCirculo = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: color.value,
    left: posX.value,
  }));

  const barraProgreso = useSharedValue(0);
  const estiloProgreso = useAnimatedStyle(() => ({
    width: `${barraProgreso.value * 100}%`,
  }));

  const iniciarJuego = () => {
    setPuntos(0);
    setIntentos(0);
    setVidas(5);
    setTiempo(30);
    barraProgreso.value = 0;

    intervaloRef.current = setInterval(() => {
      const nuevaPos = Math.random() * (width - 80);
      posX.value = withTiming(nuevaPos, { duration: 300 });
    }, intervalo);

    if (modo === "tiempo") {
      timerRef.current = setInterval(() => {
        setTiempo((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            barraProgreso.value = 1;
            return 0;
          }
          const nuevoTiempo = t - 1;
          barraProgreso.value = (30 - nuevoTiempo) / 30;
          return nuevoTiempo;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    iniciarJuego();
    return () => {
      clearInterval(intervaloRef.current);
      clearInterval(timerRef.current);
    };
  }, [nivel, modo]);

  const manejarToque = () => {
    const centroCirculo = posX.value + 40;
    const distancia = Math.abs(centroCirculo - centro);

    if (distancia < margen) {
      setPuntos((p) => p + 1);
      animarAcierto();
    } else {
      if (modo === "vidas") setVidas((v) => v - 1);
    }
    setIntentos((i) => i + 1);
  };

  const animarAcierto = () => {
    scale.value = withSequence(
      withTiming(1.3, { duration: 120 }),
      withTiming(1, { duration: 120 })
    );
    color.value = withSequence(
      withTiming("#4CAF50", { duration: 120 }),
      withTiming("#00BFFF", { duration: 120 })
    );
  };

  const juegoTerminado = modo === "vidas" ? vidas <= 0 : tiempo <= 0;

  // ✅ Guardar puntaje cuando el juego termina
  useEffect(() => {
    if (juegoTerminado && user?.id) {
      guardarPuntuacionTapping(user.id, {
        modo,
        nivel,
        puntos,
        intentos,
        tiempo_restante: modo === "tiempo" ? tiempo : null,
      });
    }
  }, [juegoTerminado]);

  return (
    <TouchableWithoutFeedback onPress={manejarToque} disabled={juegoTerminado}>
      <LinearGradient colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>🧘 Mindful Tapping</Text>
          <View style={styles.config}>
            <Text style={styles.configText}>
              Modo: {modo === "vidas" ? `🧡 Vidas: ${vidas}` : `⏱️ Tiempo: ${tiempo}s`}
            </Text>
            <Text style={styles.configText}>Nivel: {nivel}</Text>
          </View>
          <Text style={styles.puntos}>🎯 Puntos: {puntos} / Intentos: {intentos}</Text>
        </View>

        {modo === "tiempo" && (
          <View style={styles.barraContenedor}>
            <Animated.View style={[styles.barraProgreso, estiloProgreso]} />
          </View>
        )}

        <View style={styles.juegoZona}>
          <View style={styles.centroIndicador} />
          {!juegoTerminado ? (
            <Animated.View style={[styles.circulo, animacionCirculo]} />
          ) : (
            <View style={styles.resultado}>
              <Text style={styles.resultadoText}>🏁 Juego Terminado</Text>
              <Text style={styles.resultadoText}>🎯 Puntos: {puntos}</Text>
              <TouchableOpacity onPress={iniciarJuego} style={styles.botonReiniciar}>
                <Text style={styles.botonReiniciarTexto}>🔁 Reiniciar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.seleccionZona}>
          <Text style={styles.subtitulo}>🎚️ Dificultad:</Text>
          <View style={styles.selector}>
            {["facil", "normal", "dificil"].map((niv) => (
              <TouchableOpacity
                key={niv}
                onPress={() => setNivel(niv)}
                style={[styles.nivelBtn, nivel === niv && styles.activo]}
              >
                <Text style={styles.nivelTexto}>{niv}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.subtitulo, { marginTop: 12 }]}>🎮 Modo:</Text>
          <View style={styles.selector}>
            {["vidas", "tiempo"].map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setModo(m)}
                style={[styles.nivelBtn, modo === m && styles.activo]}
              >
                <Text style={styles.nivelTexto}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "space-between" },
  header: { alignItems: "center", marginTop: 20 },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  config: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  configText: { color: "#fff", fontSize: 14 },
  puntos: { fontSize: 16, color: "#fff" },

  barraContenedor: {
    height: 8,
    width: "100%",
    backgroundColor: "#ffffff30",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  barraProgreso: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },

  juegoZona: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centroIndicador: {
    position: "absolute",
    top: "50%",
    left: centro - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "dashed",
    zIndex: 1,
  },
  circulo: {
    position: "absolute",
    top: "50%",
    marginTop: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00BFFF",
    zIndex: 2,
  },
  resultado: {
    alignItems: "center",
    marginTop: 20,
  },
  resultadoText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  botonReiniciar: {
    backgroundColor: "#ffffff20",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  botonReiniciarTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  seleccionZona: {
    marginBottom: 30,
    alignItems: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  selector: {
    flexDirection: "row",
    gap: 12,
  },
  nivelBtn: {
    backgroundColor: "#ffffff30",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: "#fff",
    borderWidth: 1,
  },
  nivelTexto: { color: "#fff", fontWeight: "bold" },
  activo: {
    backgroundColor: "#4CAF50",
    borderColor: "#fff",
  },
});
