// src/components/SoundCard.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';

const { width } = Dimensions.get('window');

export const  SoundCard = ({ item, isActive, scaleAnim, onPress }) => {
  const player = useAudioPlayer(item.source);

  return (
    <TouchableOpacity onPress={onPress}>
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
          <View style={styles.content}>
            <MaterialIcons
              name={isActive ? 'stop' : item.icon}
              size={40}
              color="#fff"
            />
            <Text style={styles.titleText}>{item.title}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => player.play()} style={styles.iconBtn}>
              <MaterialIcons name="play-arrow" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => player.pause()} style={styles.iconBtn}>
              <MaterialIcons name="pause" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    backgroundColor: '#ffffff33',
    padding: 6,
    borderRadius: 20,
  },
});
