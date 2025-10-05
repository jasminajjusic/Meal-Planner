import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Image
      source={{ uri: "https://img.icons8.com/doodle/96/ff1493/chef-hat.png" }}
      style={styles.emptyImage}
    />
    <Text style={styles.emptyText}>No meal plan generated yet.</Text>
    <Text style={styles.emptySubText}>
      Fill in the details above and tap "Generate Meal Plan"!
    </Text>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyImage: { width: 100, height: 100, marginBottom: 15 },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
