/**
 * Import de librerias para la pantalla.
 */
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

/**
 * Import de assets o servicios necesarios
 */

import colors from "../assets/styles/colors";
import { registerUser } from "../services/authService";

/**
 * Screen principal
 */
export const RegisterScreen = ({navigation}) => {
  // Estados para manejar el formulario
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleRegister = async () =>{
    try {
        await registerUser(userName, email, password);
        Alert.alert("Registro exitoso", "Tu cuenta ha sido creada correctamente.");
        navigation.navigate('Login'); 
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
    }
  }

  return (
    <LinearGradient colors={["#2C3E50", "#1c2833"]} style={styles.gradient}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Animatable.View
            style={styles.card}
            animation="fadeInUp"
            duration={1000}
          >
            <MaterialIcons
              name="person-add"
              size={44}
              color="#ff"
              style={{ marginBottom: 15 }}
            />
            <Text>Crea tu cuenta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#bbb"
              value={userName}
              onChange={setUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu correo electronico"
              placeholderTextColor="#bbb"
              value={email}
              onChange={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu contaseña"
              placeholderTextColor="#bbb"
              value={password}
              onChange={setPassword}
              secureTextEntry
            />
            // TODO handleRegister
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            // TODO handle
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.footerText}>
              <Text style={styles.footerText}>
                ¿Ya tienes una cuenta?, Inicia sesion
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
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
