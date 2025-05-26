import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import colors from '../styles/colors';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    Alert.alert('Registro exitoso 🎉', '¡Ahora puedes iniciar sesión!');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient colors={['#2C3E50', '#1c2833']} style={styles.gradient}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <MaterialIcons name="person-add" size={44} color="#fff" style={{ marginBottom: 15 }} />
            <Text style={styles.title}>Crea tu cuenta</Text>

            <Animatable.View animation="fadeInUp" delay={300}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#bbb"
                value={username}
                onChangeText={setUsername}
              />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={500}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#bbb"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={700}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#bbb"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={900}>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarme</Text>
              </TouchableOpacity>
            </Animatable.View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerText}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#ffffff0f',
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: 280,
    height: 50,
    backgroundColor: '#ffffff1c',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: '#ffffff33',
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  footerText: {
    color: '#ccc',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
