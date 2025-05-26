import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function RespiracionScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [fase, setFase] = useState('Presiona iniciar');
  const [activo, setActivo] = useState(false);
  const faseIndex = useRef(0);
  const intervalRef = useRef(null);

  const fases = [
    { texto: 'Inhala', duracion: 4000 },
    { texto: 'Mantén', duracion: 2000 },
    { texto: 'Exhala', duracion: 4000 },
  ];

  const iniciarRespiracion = () => {
    if (activo) {
      clearInterval(intervalRef.current);
      setActivo(false);
      setFase('Presiona iniciar');
      return;
    }

    setActivo(true);
    faseIndex.current = 0;
    cambiarFase();

    intervalRef.current = setInterval(() => {
      faseIndex.current = (faseIndex.current + 1) % fases.length;
      cambiarFase();
    }, 10000);
  };

  const cambiarFase = () => {
    const { texto, duracion } = fases[faseIndex.current];
    setFase(texto);

    Animated.timing(scaleAnim, {
      toValue: texto === 'Exhala' ? 0.6 : 1.2,
      duration: duracion,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <LinearGradient colors={['#16222A', '#3A6073']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]} />
        <Text style={styles.instruction}>{fase}</Text>

        <TouchableOpacity style={styles.button} onPress={iniciarRespiracion}>
          <MaterialIcons name={activo ? 'pause' : 'play-arrow'} size={28} color="#fff" />
          <Text style={styles.buttonText}>{activo ? 'Detener' : 'Iniciar'}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#ffffff22',
    marginBottom: 50,
  },
  instruction: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#203a43',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
