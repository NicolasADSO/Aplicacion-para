import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from "react-native";

export const CartaMemorama = ({ carta, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        carta.resuelta && styles.cardResuelta,
        carta.volteada && styles.cardVolteada,
      ]}
      onPress={onPress}
      disabled={carta.volteada || carta.resuelta}
    >
      <View style={styles.cardContent}>
        <Text style={styles.emoji}>
          {carta.volteada || carta.resuelta ? carta.emoji : "❓"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    margin: 8,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  cardVolteada: {
    backgroundColor: "#4caf50",
  },
  cardResuelta: {
    backgroundColor: "#9c27b0",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 28,
    color: "#fff",
  },
});
