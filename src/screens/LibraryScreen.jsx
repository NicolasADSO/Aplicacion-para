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
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>por {item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff22',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 8,
  },
  bookImage: {
    width: 100,
    height: 140,
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  info: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#ddd',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#eee',
    marginTop: 6,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#56CCF2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
