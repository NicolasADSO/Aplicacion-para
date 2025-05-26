import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      {/* 🧑 Avatar + saludo */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Hola, Usuario 👋</Text>
        <Text style={styles.subtitle}>Aquí están tus estadísticas</Text>
      </View>

      {/* 📊 Estadísticas */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <MaterialIcons name="check-circle" size={26} color="#56CCF2" />
          <View style={styles.statTextWrapper}>
            <Text style={styles.statTitle}>Sesiones completadas</Text>
            <Text style={styles.statValue}>10</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <MaterialIcons name="self-improvement" size={26} color="#56CCF2" />
          <View style={styles.statTextWrapper}>
            <Text style={styles.statTitle}>Actividad favorita</Text>
            <Text style={styles.statValue}>Respiración</Text>
          </View>
        </View>
      </View>

      {/* 🚪 Botón cerrar sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
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
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#56CCF2',
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    width: width - 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 40,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statTextWrapper: {
    marginLeft: 12,
  },
  statTitle: {
    color: '#ccc',
    fontSize: 14,
  },
  statValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#56CCF2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
