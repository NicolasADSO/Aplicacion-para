import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useHeartRate } from "../context/HeartRateContext";

const { width } = Dimensions.get("window");

export const FeatureCard = ({ item, theme, navigation }) => {
  const { getRecommendedActivities, isConnected } = useHeartRate();
  const recommended = getRecommendedActivities();
  const isRecommended = recommended.includes(item.title);

  const images = {
    Ejercicios: require("../assets/images/ejercicios.jpg"),
    Respiracion: require("../assets/images/respiracion.jpg"),
    Sonidos: require("../assets/images/sonidos.jpg"),
    Biblioteca: require("../assets/images/biblioteca.jpg"),
    Juegos: require("../assets/images/juegos.jpg"),
    defaultImage: require("../assets/images/defecto.jpg")
  };


  const imageSource = images[item.title] || images.defaultImage;  

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isRecommended &&
          isConnected && {
            borderWidth: 2,
            borderColor: theme.color,
            elevation: 8,
          },
      ]}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <MaterialIcons name={item.icon} size={32} color="#fff" />
          <Text style={styles.cardText}>{item.title}</Text>
        </View>

        {isRecommended && isConnected && (
          <View
            style={[styles.recommendedBadge, { backgroundColor: theme.color }]}
          >
            <MaterialIcons name="star" size={14} color="#fff" />
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.42,
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#00000022",
    marginBottom: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    marginTop: 4,
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  recommendedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});