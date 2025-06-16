import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Modal,
  ScrollView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons} from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import FloatingProfileButton from '../components/FloatingProfileButton';

const yogaPoses = [
  {
    name: 'Pose de la Montaña',
    description: 'Párate recto, con los pies juntos y los brazos a los lados.',
    image: 'https://www.hola.com/horizon/original_aspect_ratio/1aad8a8717df-montana-a.jpg?im=Resize=(960),type=downsize',
  },
  {
    name: 'Pose del Perro Boca Abajo',
    description: 'Coloca las manos y pies en el suelo, levantando las caderas hacia el techo.',
    image: 'https://www.hola.com/horizon/original_aspect_ratio/ead6f342e5a2-perro-yoga-a.jpg?im=Resize=(960),type=downsize',
  },
  {
    name: 'Pose del Guerrero',
    description: 'Da un paso hacia atrás, flexionando una pierna y extendiendo los brazos hacia los lados.',
    image: 'https://th.bing.com/th/id/OIP.O2mRrOPRt1hekxcoGwu9CQHaFj?w=249&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    name: 'Pose del Árbol',
    description: 'Párate sobre una pierna y coloca la otra pierna sobre el muslo o pantorrilla de la pierna de apoyo, con las manos juntas sobre la cabeza.',
    image: 'https://cdn.xuanlanyoga.com/wp-content/uploads/2021/11/postura-del-arbol.jpg',
  },
];

export default function YogaExerciseScreen() {
  const [currentPose, setCurrentPose] = useState(0);
  const [timer, setTimer] = useState(30);
  const [active, setActive] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [mostrarInfo, setMostrarInfo] = useState(true);


  const dingPlayer = useAudioPlayer(require('../assets/sounds/ding.mp3'));


  useFocusEffect(
    React.useCallback(() => {
      setActive(true);
      return () => setActive(false);
    }, [])
  );

  useEffect(() => {
    fadeIn();

    if (!active) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          nextPose();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, currentPose]);

  const nextPose = () => {
    dingPlayer.play();

    fadeOut(() => {
      setCurrentPose((prev) => (prev + 1) % yogaPoses.length);
      setTimer(30);
      fadeIn();
    });
  };

  const fadeIn = () => {
    fadeAnim.setValue(0.8);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(callback);
  };

  const progreso = ((currentPose + 1) / yogaPoses.length) * 100;
  const { name, description, image } = yogaPoses[currentPose];

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* 🧘 MODAL INFORMATIVO */}
      <Modal visible={mostrarInfo} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>¿Cómo funciona esta sesión de yoga?</Text>
              <Text style={styles.modalText}>
                Esta sesión te guía por diferentes posturas de yoga que ayudan a mejorar tu flexibilidad, equilibrio y concentración.
              </Text>
              <Text style={styles.modalText}>
                Cada postura se mantiene durante 30 segundos antes de pasar a la siguiente.
              </Text>
              <Text style={styles.modalText}>
                Trata de mantener la postura lo mejor posible, respira profundamente y mantén tu atención en el presente.
              </Text>
              <TouchableOpacity onPress={() => setMostrarInfo(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>¡Entendido! Comenzar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 🔵 Botón de información */}
      <TouchableOpacity style={styles.infoButton} onPress={() => setMostrarInfo(true)}>
        <Ionicons name="information-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Sesión de Yoga</Text>
      <Text style={styles.subTitle}>Postura {currentPose + 1} de {yogaPoses.length}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progreso}%` }]} />
      </View>

      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }]}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.poseName}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.timer}>⏱ {timer}s</Text>

        <TouchableOpacity style={styles.button} onPress={nextPose}>
          <MaterialIcons name="navigate-next" size={22} color="#fff" />
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </Animated.View>

      <FloatingProfileButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffffff55',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#56CCF2',
  },
  card: {
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  poseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 20,
    color: '#222',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#56CCF2',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },

  // Estilos modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  modalButton: {
    backgroundColor: "#3A6073",
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },

  infoButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});

