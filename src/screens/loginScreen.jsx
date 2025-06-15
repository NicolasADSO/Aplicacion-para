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

import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

import backgroundImage from "../assets/images/fondo-login.jpg";
import { loginUser } from "../services/authService";
import { saveUserSession } from "../utils/session";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password);
      await saveUserSession(userData);

      navigation.replace("MainTabs");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <StatusBar barStyle="dark-content" />

          <Animatable.Text animation="fadeInDown" delay={250} style={styles.header}>
            ¡Bienvenido de nuevo!
          </Animatable.Text>

          <Animatable.Text animation="fadeInDown" delay={500} style={styles.subtext}>
            Te estábamos esperando ✨
          </Animatable.Text>

          <Animatable.View animation="fadeInDown" delay={750} style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#1a1a1a" style={styles.icon} />
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#555"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInDown" delay={800} style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#1a1a1a" style={styles.icon} />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#555"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color="#1a1a1a"
              />
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInDown" delay={850} style={styles.loginContainer}>
            <TouchableHighlight onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.registerText}> Iniciar Sesión </Text>
            </TouchableHighlight>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={850} style={styles.registerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
              <Text style={styles.registerText}>
                ¿No tienes una cuenta? <Text style={styles.link}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.Text animation="fadeInUp" delay={900} style={styles.footer}>
            Te acompañamos en cada respiro 🧘
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
