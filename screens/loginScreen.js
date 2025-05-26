import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Simulación de validación del rol
    if (email === 'usuario' && password === 'usuario123') {
      // Guardamos el rol de administrador en AsyncStorage
      await AsyncStorage.setItem('role', 'administrador');
      // Redirigimos al administrador
      navigation.navigate('AdminScreen');
    } else if (email && password) {
      // Guardamos el rol de usuario en AsyncStorage
      await AsyncStorage.setItem('role', 'usuario');
      // Redirigimos al usuario regular
      navigation.navigate('MainTabs');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../assets/fondo-login.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <StatusBar barStyle="dark-content" />

          <Animatable.Text animation="fadeInDown" delay={300} style={styles.header}>
            ¡Bienvenido de nuevo!
          </Animatable.Text>
          <Animatable.Text animation="fadeInDown" delay={500} style={styles.subtext}>
            Te estábamos esperando ✨
          </Animatable.Text>

          <Animatable.View animation="fadeInUp" delay={700} style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#1a1a1a" style={styles.icon} />
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#555"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={800} style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#1a1a1a" style={styles.icon} />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#555"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animatable.View>

          <Animatable.View animation="bounceIn" delay={1000} style={styles.loginButton}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={1200} style={styles.registerContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.Text animation="fadeIn" delay={1400} style={styles.footer}>
            Te acompañamos en cada respiro 🧘
          </Animatable.Text>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    color: '#1a1a1a',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtext: {
    color: '#333',
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#1a1a1a',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#ffffffcc',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 18,
  },
  registerText: {
    color: '#4f4f4f',
    fontSize: 14,
  },
  link: {
    color: '#E67E22',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
