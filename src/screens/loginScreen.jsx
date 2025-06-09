/**
 * Librerias para el funcionamiento del componente
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

/**
 * Import de assets o servicios necesarios
 */
import backgroundImage from "../assets/images/fondo-login.jpg";
import { loginUser } from "../services/authService";
import { saveRole } from "../utils/session";

/**
 *
 * Screen de login
 */

export const LoginScreen = ({ navigation }) => {
  // Estados para manejar los datos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Funcion para manejar el LOGIN
  const handleLogin = async () => {
    try {
    const role = await loginUser(email.toLowerCase(), password.toLowerCase());

      try{
        await saveRole(role);
        await AsyncStorage.setItem('usuario', JSON.stringify({email}))
        console.log(`Datos guardados del login: ${email}`)

      }catch(err){
        console.error("Error al guardar el rol:", err);
      }
      if (role === "administrador") {
        navigation.replace("AdminScreen");
      } else {
        navigation.replace("MainTabs");
      }
    } catch (error) {
      alert(`Error al iniciar sesión: ${error} `, );
    }
  };
  // To do function to handle register

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <StatusBar barStyle="dark-content" />

          <Animatable.Text
            animation="fadeInDown"
            delay={250}
            style={styles.header}
          >
            ¡Bienvenido de nuevo!
          </Animatable.Text>

          <Animatable.Text
            animation="fadeInDown"
            delay={500}
            style={styles.subtext}
          >
            Te estabamos esperando ✨
          </Animatable.Text>

          <Animatable.View
            animation="fadeInDown"
            delay={750}
            style={styles.inputContainer}
          >
            <MaterialIcons
              name="email"
              size={20}
              color="#1a1a1a"
              style={styles.icon}
            />

            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#555"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </Animatable.View>

          <Animatable.View
            animation="fadeInDown"
            delay={800}
            style={styles.inputContainer}
          >
            <MaterialIcons
              name="lock"
              size={20}
              color="#1a1a1a"
              style={styles.icon}
            />

            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#555"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animatable.View>

          <Animatable.View
            animation="fadeInDown"
            delay={850}
            style={styles.loginContainer}
          >
            <TouchableHighlight onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.registerText}> Iniciar Sesion </Text>
            </TouchableHighlight>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={850}
            style={styles.registerContainer}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button} >
              <Text style={styles.registerText}>
                ¿No tienes una cuenta <Text style={styles.link}> Registrate </Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.Text
            animation="fadeInUp"
            delay={900}
            style={styles.registerFooter}
          >
            Te Acompañamos en cada respiro 🧘
          </Animatable.Text>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: "#1a1a1a",
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtext: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#1a1a1a",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#ffffffcc",
    paddingVertical: 14,
    borderRadius: 14,
    width: "200",
    height: "auto",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 18,
  },
  registerText: {
    color: "black",
    fontSize: 14,
  },
  link: {
    color: "black",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 40,
    fontSize: 13,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },
});
