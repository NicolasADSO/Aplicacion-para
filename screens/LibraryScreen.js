import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import colors from '../styles/colors';
import FloatingProfileButton from '../components/FloatingProfileButton';

const { width } = Dimensions.get('window');

const books = [
  {
    title: 'El poder del ahora',
    author: 'Eckhart Tolle',
    description: 'Vive el presente y libérate del estrés y ansiedad.',
    imageUrl: 'https://th.bing.com/th/id/OIP.JOgF3DvfhALeBvDXug2PLQHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    title: 'Casi todo es resuelto',
    author: 'Karen Mcdonnell',
    description: 'Técnicas prácticas para dominar la ansiedad cotidiana.',
    imageUrl: 'https://th.bing.com/th/id/OIP.uVua4zxYLnFzV360rc_PzwHaMR?w=194&h=321&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    title: 'La ansiedad',
    author: 'P. M. Orozco',
    description: 'Aborda tu ansiedad con consciencia y compasión.',
    imageUrl: 'https://th.bing.com/th/id/OIP.9Zsm9EgGRDRdq2et1-Fg-QHaLU?w=202&h=309&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
];

export default function LibraryScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.imageBg} />
      <BlurView intensity={50} tint="dark" style={styles.blurOverlay}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>por {item.author}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
      <Text style={styles.header}>Biblioteca de Bienestar</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  cardContainer: {
    marginBottom: 24,
    width: width - 32,
    height: 160,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blurOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ccc',
  },
  description: {
    fontSize: 14,
    color: '#eee',
    marginTop: 6,
  },
  button: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#56CCF2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
