//Librerias
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import colors from "../assets/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

// Imports propios
import { getInfoUser } from "../services/authService";

export default function ProfileScreen({ navigation }) {
  const userName = AsyncStorage.getItem("usuario");

  // Estados
  const [name, setName] = useState("");

  // Obtencion de el nombre de usuario
  useEffect(() => {
    const fetchUserName = async () => {
      // Primero intenta obtener el objeto completo desde AsyncStorage
      const storedUser = await AsyncStorage.getItem("usuario");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser); // Parseamos el objeto
        setName(parsedUser.nombre); // Extraemos solo el nombre y lo seteamos
      } else {
        // Si no existe, intenta obtenerlo desde Supabase
        const fetchedUserName = await getInfoUser();
        if (fetchedUserName) {
          setName(fetchedUserName); // Si se obtiene, actualizamos el estado
        }
      }
    };

    fetchUserName();
  }, []);

  // Logica Cerrar Sesion.
  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("usuario");
            navigation.replace("Login");
          },
        },
      ]
    );
  };
  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
      {/* 👤 Header con avatar */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>
          Hola, {name ? name : "Cargando..."} 👋
        </Text>
        <Text style={styles.subtitle}>Tus estadísticas de bienestar</Text>
      </View>

      {/* 📊 Stats con fondo difuminado */}
      <BlurView intensity={40} tint="light" style={styles.statsCard}>
        <View style={styles.statItem}>
          <MaterialIcons name="check-circle" size={28} color="#56CCF2" />
          <View style={styles.statTextWrapper}>
            <Text style={styles.statTitle}>Sesiones completadas</Text>
            <Text style={styles.statValue}>10</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <MaterialIcons name="self-improvement" size={28} color="#56CCF2" />
          <View style={styles.statTextWrapper}>
            <Text style={styles.statTitle}>Actividad favorita</Text>
            <Text style={styles.statValue}>Respiración</Text>
          </View>
        </View>
      </BlurView>

      {/* 🚪 Botón cerrar sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress = {handleLogout}
      >
        <MaterialIcons name="logout" size={22} color="#fff" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#56CCF2",
    marginBottom: 12,
  },
  username: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  statsCard: {
    width: width - 40,
    borderRadius: 20,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 30,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  statTextWrapper: {
    marginLeft: 14,
  },
  statTitle: {
    fontSize: 14,
    color: "#ddd",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#56CCF2",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
