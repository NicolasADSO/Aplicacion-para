import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Audio } from 'expo-audio';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import FloatingProfileButton from '../components/FloatingProfileButton';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

const sounds = [
  {
    id: '1',
    title: 'Lluvia',
    source: require('../assets/sounds/rain.mp3'),
    icon: 'cloud',
    color: ['#314755', '#26a0da'],
  },
  {
    id: '2',
    title: 'Mar',
    source: require('../assets/sounds/ocean.mp3'),
    icon: 'waves',
    color: ['#2b5876', '#4e4376'],
  },
  {
    id: '3',
    title: 'Viento',
    source: require('../assets/sounds/wind.mp3'),
    icon: 'air',
    color: ['#1f4037', '#99f2c8'],
  },
];

export default function SoundsScreen() {
  const soundRef = useRef(null);
  const [activeSound, setActiveSound] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const playOrStopSound = async (sound) => {
    if (activeSound === sound.id && soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setActiveSound(null);
      return;
    }

    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(sound.source, {
      isLooping: true,
      shouldPlay: true,
    });
    soundRef.current = newSound;
    setActiveSound(sound.id);
    animateCard();
  };

  const animateCard = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (soundRef.current) {
          soundRef.current.stopAsync();
          soundRef.current.unloadAsync();
          soundRef.current = null;
          setActiveSound(null);
        }
      };
    }, [])
  );

  const renderItem = ({ item }) => {
    const isActive = item.id === activeSound;

    return (
      <TouchableOpacity onPress={() => playOrStopSound(item)}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: isActive ? scaleAnim : 1 }] },
            isActive && styles.activeCard,
          ]}
        >
          <LinearGradient
            colors={item.color}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons
              name={isActive ? 'stop' : item.icon}
              size={40}
              color="#fff"
            />
            <Text style={styles.titleText}>{item.title}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
      <Text style={styles.header}>Ambientes de Sonido</Text>
      <FlatList
        data={sounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  activeCard: {
    shadowColor: '#56CCF2',
    shadowOpacity: 0.8,
    elevation: 12,
  },
  gradient: {
    width: width - 40,
    height: 130,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
