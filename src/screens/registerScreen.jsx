import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import colors from "../assets/styles/colors";
import { registerUser } from "../services/authService";

export const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      Alert.alert("Campos requeridos", "Todos los campos son obligatorios.");
      return;
    }

    try {
      await registerUser(userName, email, password);
      Alert.alert("Registro exitoso", "Revisa tu correo para verificar tu cuenta.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Alert.alert("Error", error.message || "No se pudo completar el registro.");
    }
  };

  return (
    <LinearGradient colors={["#2C3E50", "#1c2833"]} style={styles.gradient}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Animatable.View style={styles.card} animation="fadeInUp" duration={1000}>
            <MaterialIcons name="person-add" size={44} color="#fff" style={{ marginBottom: 15 }} />
            <Text style={styles.title}>Crea tu cuenta</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#bbb"
              value={userName}
              onChangeText={setUserName}
            />

            <TextInput
              style={styles.input}
              placeholder="Ingresa tu correo electrónico"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Escribe tu contraseña"
                placeholderTextColor="#bbb"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={22}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerText}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  card: {
    backgroundColor: "#ffffff0f",
    padding: 28,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: {
    width: 280,
    height: 50,
    backgroundColor: "#ffffff1c",
    borderRadius: 12,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: "#ffffff33",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 280,
    height: 50,
    backgroundColor: "#ffffff1c",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#ffffff33",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  eyeIcon: { padding: 5 },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  footerText: {
    color: "#ccc",
    marginTop: 20,
    fontStyle: "italic",
  },
});
