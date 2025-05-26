import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors'; // Asegúrate de tener colores más modernos o usa los actuales

export default function AdminScreen({ navigation }) {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    const obtenerHistorias = async () => {
      try {
        const historiasGuardadas = await AsyncStorage.getItem('historias');
        if (historiasGuardadas) {
          setHistorias(JSON.parse(historiasGuardadas));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHistorias();
  }, []);

  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}
    >
      <Text style={styles.title}>Historias Clínicas</Text>

      {historias.length === 0 ? (
        <Text style={styles.noStoriesText}>No hay historias clínicas guardadas.</Text>
      ) : (
        historias.map((historia, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {historia.nombre}</Text>
            <Text>Edad: {historia.edad}</Text>
            <Text>Síntomas: {historia.sintomas}</Text>
            <Text>Nivel de Ansiedad: {historia.nivelAnsiedad}</Text>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  noStoriesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#ffffff22',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#263B5E',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
