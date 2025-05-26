import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-audio';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../styles/colors';

const BreathingGameScreen = ({ navigation }) => {
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [timer, setTimer] = useState(4);
  const [totalTime, setTotalTime] = useState(120);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.stopAsync();
          audioRef.current.unloadAsync();
          audioRef.current = null;
          setAudioStarted(false);
        }
      };
    }, [])
  );

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/audio.mp3'),
        { isLooping: true }
      );
      audioRef.current = sound;
      if (audioStarted) await sound.playAsync();
    };
    if (audioStarted) loadAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.stopAsync();
        audioRef.current.unloadAsync();
      }
    };
  }, [audioStarted]);

  useEffect(() => {
    let interval;
    if (!isExerciseFinished && totalTime > 0) {
      interval = setInterval(() => {
        setTotalTime((prev) => prev - 1);
      }, 1000);
    } else if (totalTime <= 0) {
      setIsExerciseFinished(true);
    }
    return () => clearInterval(interval);
  }, [isExerciseFinished, totalTime]);

  useEffect(() => {
    if (isExerciseFinished) return;

    let duration = breathingPhase === 'inhale' ? 4 : breathingPhase === 'hold' ? 7 : 8;
    setTimer(duration);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const next =
            breathingPhase === 'inhale' ? 'hold' : breathingPhase === 'hold' ? 'exhale' : 'inhale';
          setBreathingPhase(next);
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breathingPhase, isExerciseFinished]);

  // ⭕️ Pulso animado
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {isExerciseFinished ? (
        <Text style={styles.doneText}>¡Ejercicio completado!</Text>
      ) : (
        <>
          <Animated.View style={[styles.breathCircle, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.phaseText}>{breathingPhase.toUpperCase()}</Text>
          </Animated.View>
          <Text style={styles.timerText}>{timer}</Text>
          <Text style={styles.totalText}>Tiempo restante: {totalTime}s</Text>
        </>
      )}

      {!audioStarted && !isExerciseFinished && (
        <TouchableOpacity style={styles.audioButton} onPress={() => setAudioStarted(true)}>
          <MaterialIcons name="music-note" size={24} color="#fff" />
          <Text style={styles.buttonText}>Música Relajante</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  breathCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  phaseText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  totalText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.subtleText,
  },
  doneText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'lightgreen',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 12,
    marginTop: 30,
    gap: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BreathingGameScreen;
