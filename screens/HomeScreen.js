import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';

// Importar el widget y el context
import HeartRateWidget from '../components/HeartRateWidget';
import { useHeartRate } from '../contexts/HeartRateContext';

const { width } = Dimensions.get('window');

const features = [
  { title: 'Ejercicios', icon: 'fitness-center', screen: 'Ejercicios', color: '#6A82FB' },
  { title: 'Respiración', icon: 'air', screen: 'Respiración', color: '#56CCF2' },
  { title: 'Sonidos', icon: 'music-note', screen: 'Sonidos', color: '#43E97B' },
  { title: 'Biblioteca', icon: 'menu-book', screen: 'Biblioteca', color: '#FDCB6E' },
];

export default function HomeScreen({ navigation }) {
  const [role, setRole] = useState('');
  
  // Usar el context de Heart Rate
  const { getCurrentTheme, getRecommendedActivities, anxietyLevel, isConnected } = useHeartRate();
  const theme = getCurrentTheme();

  useEffect(() => {
    const checkRole = async () => {
      const userRole = await AsyncStorage.getItem('role');
      setRole(userRole);
    };

    checkRole();
  }, []);

  // Filtrar y resaltar actividades recomendadas
  const getFeatureStyle = (feature) => {
    const recommended = getRecommendedActivities();
    const isRecommended = recommended.includes(feature.title);
    
    return {
      ...styles.card,
      borderWidth: isRecommended && isConnected ? 3 : 0,
      borderColor: isRecommended && isConnected ? theme.color : 'transparent',
      elevation: isRecommended && isConnected ? 8 : 5,
    };
  };

  const renderItem = ({ item }) => {
    const recommended = getRecommendedActivities();
    const isRecommended = recommended.includes(item.title);
    
    return (
      <TouchableOpacity
        style={getFeatureStyle(item)}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[item.color, '#fff0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardInner}
        >
          <MaterialIcons name={item.icon} size={36} color="#fff" />
          <Text style={styles.cardText}>{item.title}</Text>
          
          {/* Indicador de recomendado */}
          {isRecommended && isConnected && (
            <View style={[styles.recommendedBadge, { backgroundColor: theme.color }]}>
              <MaterialIcons name="star" size={14} color="#fff" />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // Colores dinámicos basados en el ritmo cardíaco
  const dynamicGradient = isConnected 
    ? [theme.bg[0], theme.bg[1], '#2c5364'] 
    : ['#0f2027', '#203a43', '#2c5364'];

  return (
    <LinearGradient
      colors={dynamicGradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Widget de Ritmo Cardíaco */}
      <HeartRateWidget />
      
      {/* Saludo personalizado según ansiedad */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Bienvenido a ¡PARA!</Text>
        
        {isConnected ? (
          <Text style={[styles.subtitle, { color: theme.color }]}>
            Te sientes {theme.name.toLowerCase()} {theme.emoji}
          </Text>
        ) : (
          <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>
        )}
      </View>

      {/* Actividades recomendadas */}
      {isConnected && getRecommendedActivities().length > 0 && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>
            💡 Actividades recomendadas para ti:
          </Text>
        </View>
      )}

      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.featureContainer}
        showsVerticalScrollIndicator={false}
      />

      {role === 'administrador' && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace('AdminScreen')}
        >
          <MaterialIcons name="settings" size={22} color="#fff" />
          <Text style={styles.logoutText}>Ir al Panel de Administrador</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
        <MaterialIcons name="logout" size={22} color="#fff" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Reducido para dar espacio al widget
  },
  greetingContainer: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    color: '#ffffffcc',
    marginBottom: 4,
    fontWeight: '300',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffffaa',
    marginBottom: 20,
  },
  recommendationContainer: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  featureContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: width * 0.42,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff22',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495E',
    padding: 12,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 24,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
});