import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from "react-native";

export const CartaMemorama = ({ carta, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (carta.resuelta) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [carta.resuelta]);

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={onPress}
      disabled={carta.volteada || carta.resuelta}
    >
      <Animated.View
        style={[
          styles.card,
          carta.resuelta && styles.cardResuelta,
          carta.volteada && styles.cardVolteada,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.emoji}>
            {carta.volteada || carta.resuelta ? carta.emoji : "❓"}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    margin: 8,
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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
