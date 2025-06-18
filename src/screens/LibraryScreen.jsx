import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const books = [
  {
    title: 'El poder del ahora',
    author: 'Eckhart Tolle',
    description: 'Vive el presente y libérate del estrés y ansiedad.',
    imageUrl: 'https://th.bing.com/th/id/OIP.JOgF3DvfhALeBvDXug2PLQHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    pdfUrl: 'https://training.crecimiento.ws/wp-content/uploads/2020/03/El_Poder_del_Ahora-Eckhart_Tolle.pdf',
  },
  {
    title: 'Casi todo es resuelto',
    author: 'Karen Mcdonnell',
    description: 'Técnicas prácticas para dominar la ansiedad cotidiana.',
    imageUrl: 'https://cdn.bookey.app/files/pdf/book/es/la-teoria-de-casi-todo.pdf',
    pdfUrl: 'https://cdn.bookey.app/files/pdf/book/es/la-teoria-de-casi-todo.pdf',
  },
  {
    title: 'La ansiedad',
    author: 'P. M. Orozco',
    description: 'Aborda tu ansiedad con consciencia y compasión.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQodmbEQsNdaQI4hrgss7sraJMvFaOAPlh1yw&s',
    pdfUrl: 'https://elfindelaansiedad.com/wp-content/uploads/2020/04/ElFinDeLaAnsiedadMuestra.pdf',
  },
];

export default function LibraryScreen() {
  const [mostrarInfo, setMostrarInfo] = useState(true);
  const navigation = useNavigation(); // ✅ ahora correctamente dentro del componente

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>por {item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("BookReader", {
              pdfUrl: item.pdfUrl,
            })
          }
        >
          <Text style={styles.buttonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
      {/* Botón de información */}
      <TouchableOpacity style={styles.infoButton} onPress={() => setMostrarInfo(true)}>
        <Ionicons name="information-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal informativo */}
      <Modal visible={mostrarInfo} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>¿Qué es la Biblioteca de Bienestar?</Text>
              <Text style={styles.modalText}>
                Aquí encontrarás libros seleccionados para ayudarte a comprender, manejar y transformar la ansiedad.
              </Text>
              <Text style={styles.modalText}>
                Cada libro ofrece herramientas prácticas, reflexiones profundas y técnicas para el crecimiento personal y la calma mental.
              </Text>
              <Text style={styles.modalText}>
                Pulsa "Ver más" para explorar o leer el libro completo.
              </Text>
              <TouchableOpacity onPress={() => setMostrarInfo(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>¡Entendido! Explorar libros</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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

  // Estilos para modal
  infoButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
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
});