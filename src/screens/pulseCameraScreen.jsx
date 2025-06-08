import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';


/**
 * 
 * Imports personalizados.
 */

import { useHeartRate } from '../context/HeartRateContext';

export const PulseCameraScreen = () => {
  const { setCurrentBPM } = useHeartRate()
  const [permission, requestPermission] = useCameraPermissions();
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [bpm, setBpm] = useState(null);
  const [frames, setFrames] = useState([]);
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos permiso para acceder a la cámara</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startMeasuring = () => {
    setIsMeasuring(true);
    setFrames([]);

    const interval = setInterval(() => {
      const timestamp = Date.now();
      setFrames((prev) => [...prev, { timestamp }]);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setIsMeasuring(false);
      calculateBPM();
    }, 10000);
  };

    const calculateBPM = () => {
    const peaks = Math.floor(frames.length / 2);
    const bpmValue = Math.round((peaks / 10) * 60);
    setBpm(bpmValue);

    setCurrentBPM(bpmValue);
    
    console.log('Frames recolectados:', frames.length);
    console.log('Estimación BPM:', bpmValue);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} enableTorch={true} />
      
      {/* Superposición visual */}
      <View style={styles.overlay}>
        {isMeasuring ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={startMeasuring}>
            <Text style={styles.buttonText}>Iniciar medición</Text>
          </TouchableOpacity>
        )}

        {bpm && (
          <Text style={styles.bpmText}>Pulso estimado: {bpm} BPM</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4e8cff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  bpmText: {
    color: '#fff',
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
  },
});


