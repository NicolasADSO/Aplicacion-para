import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoriaClinicaScreen() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [nivelAnsiedad, setNivelAnsiedad] = useState('');

  const validarFormulario = () => {
    if (!nombre.trim()) {
      Alert.alert('Validación', 'El nombre es obligatorio.');
      return false;
    }
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum <= 0) {
      Alert.alert('Validación', 'La edad debe ser un número válido y positivo.');
      return false;
    }
    if (sintomas.trim().length < 10) {
      Alert.alert('Validación', 'Describe los síntomas con al menos 10 caracteres.');
      return false;
    }
    const ansiedadNum = parseInt(nivelAnsiedad);
    if (isNaN(ansiedadNum) || ansiedadNum < 1 || ansiedadNum > 10) {
      Alert.alert('Validación', 'El nivel de ansiedad debe estar entre 1 y 10.');
      return false;
    }
    return true;
  };

  const guardarHistoriaClinica = async () => {
    if (validarFormulario()) {
      const historia = { nombre, edad, sintomas, nivelAnsiedad };
      try {
        const historiasGuardadas = await AsyncStorage.getItem('historias');
        const historias = historiasGuardadas ? JSON.parse(historiasGuardadas) : [];
        historias.push(historia);
        await AsyncStorage.setItem('historias', JSON.stringify(historias));
        Alert.alert('Éxito', 'Historia del aprendiz guardada.');
        setNombre('');
        setEdad('');
        setSintomas('');
        setNivelAnsiedad('');
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar la historia del aprendiz.');
      }
    }
  };

  return (
    <LinearGradient colors={['#16222A', '#3A6073']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Historial de paciente</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="accessibility" size={24} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={edad}
            onChangeText={setEdad}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="description" size={24} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Síntomas"
            placeholderTextColor="#888"
            value={sintomas}
            onChangeText={setSintomas}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="sentiment-satisfied" size={24} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nivel de Ansiedad (1-10)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={nivelAnsiedad}
            onChangeText={setNivelAnsiedad}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={guardarHistoriaClinica}>
          <Text style={styles.buttonText}>Guardar Historial</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff22',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#203a43',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
