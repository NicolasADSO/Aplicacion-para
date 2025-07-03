import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { tiposDeRespiracion } from "../data/TiposDeRespiracion"; // Importa los tipos de respiración

const TiposDeRespiracionScreen = ({ navigation }) => {

  const handleCardPress = (tipo) => {
    // Aquí se navegaría a la pantalla de ejercicio de respiración, pasando el tipo seleccionado
    // navigation.navigate("EjercicioRespiracionScreen", { tipo });
    console.log("Tipo de respiración seleccionado:", tipo);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item)} // Llama a handleCardPress al presionar cada tarjeta
    >
      <Text style={styles.cardTitle}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipos de Respiración</Text>
      <FlatList
        data={tiposDeRespiracion} // Datos para renderizar las tarjetas
        renderItem={renderItem} // Renderiza cada tarjeta
        keyExtractor={(item) => item.nombre} // Usa el nombre del tipo de respiración como clave
        contentContainerStyle={styles.listContainer} // Estilo del contenedor de la lista
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#203a43",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cardTitle: { color: "#fff", fontSize: 18 },
  listContainer: { width: "100%" },
});

export default TiposDeRespiracionScreen;
