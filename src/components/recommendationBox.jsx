import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RecommendationBox = ({ theme, activities }) => {
  if (!activities || activities.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💡 Recomendado para ti</Text>
      <Text style={styles.subtitle}>
        Basado en tu nivel de ansiedad actual, te sugerimos:
      </Text>
      <View style={styles.tags}>
        {activities.map((activity, index) => (
          <View
            key={index}
            style={[
              styles.tag,
              { backgroundColor: theme.color + "30", borderColor: theme.color },
            ]}
          >
            <Text style={[styles.tagText, { color: theme.color }]}>
              {activity}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 25,
    marginHorizontal: 24,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#e8e8e8",
    marginBottom: 12,
    lineHeight: 18,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
