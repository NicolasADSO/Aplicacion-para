import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import colors from "../assets/styles/colors";
import { registerUser } from "../services/authService";
import backgroundImage from "../assets/images/fondo-login.jpg"; // usa la misma que login

export const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const validatePassword = (text) => {
    setPasswordCriteria({
      length: text.length >= 8,
      upper: /[A-Z]/.test(text),
      lower: /[a-z]/.test(text),
      number: /\d/.test(text),
      special: /[@$!%*?&_\-#]/.test(text),
    });
  };

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-#])[A-Za-z\d@$!%*?&_\-#]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.");
      return;
    }

    try {
      await registerUser(userName, email, password);
      setErrorMessage("");
      navigation.navigate("Login");
    } catch (error) {
      const message =
        error.message?.includes("already registered") ||
        error.message?.includes("email") ||
        error.message?.includes("exists")
          ? "Este correo ya está registrado."
          : "No se pudo completar el registro.";
      setErrorMessage(message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <StatusBar barStyle="dark-content" />
          <Animatable.Text animation="fadeInDown" delay={200} style={styles.header}>
            ¡Regístrate!
          </Animatable.Text>
          <Animatable.Text animation="fadeInDown" delay={400} style={styles.subtext}>
            Crea tu cuenta para comenzar 🌟
          </Animatable.Text>

          <Animatable.View animation="fadeInDown" delay={600} style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#1a1a1a" style={styles.icon} />
            <TextInput
              placeholder="Nombre de usuario"
              placeholderTextColor="#555"
              style={styles.input}
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
                setErrorMessage("");
              }}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInDown" delay={700} style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#1a1a1a" style={styles.icon} />
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#555"
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage("");
              }}
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
              onChangeText={(text) => {
                setPassword(text);
                validatePassword(text);
                setErrorMessage("");
              }}
              onFocus={() => setPasswordFocused(true)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color="#1a1a1a"
              />
            </TouchableOpacity>
          </Animatable.View>

          {passwordFocused && (
            <View style={styles.criteriaContainer}>
              <Text style={{ color: passwordCriteria.length ? "green" : "#444" }}>
                • Al menos 8 caracteres
              </Text>
              <Text style={{ color: passwordCriteria.upper ? "green" : "#444" }}>
                • Una letra mayúscula
              </Text>
              <Text style={{ color: passwordCriteria.lower ? "green" : "#444" }}>
                • Una letra minúscula
              </Text>
              <Text style={{ color: passwordCriteria.number ? "green" : "#444" }}>
                • Un número
              </Text>
              <Text style={{ color: passwordCriteria.special ? "green" : "#444" }}>
                • Un carácter especial (@$!%*?&_-#)
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerText}>Registrarse</Text>
          </TouchableOpacity>

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginRedirect}>
              ¿Ya tienes una cuenta? <Text style={styles.link}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>

          <Animatable.Text animation="fadeInUp" delay={1000} style={styles.footer}>
            Te damos la bienvenida a la app 🧘‍♂️
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
  criteriaContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#ffffffcc",
    paddingVertical: 14,
    borderRadius: 14,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginRedirect: {
    marginTop: 18,
    color: "#000",
    fontSize: 14,
  },
  link: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 40,
    fontSize: 13,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
});
