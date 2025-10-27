import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const EmptyState = () => (
  <View style={styles.container}>
    <View style={styles.iconWrapper}>
      <Image
        source={{ uri: "https://img.icons8.com/doodle/96/ff1493/chef-hat.png" }}
        style={styles.icon}
      />
    </View>
    <Text style={styles.title}>No meal plan yet!</Text>
    <Text style={styles.subtitle}>
      Add your preferences and tap "Generate Meal Plan" to get started
    </Text>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  iconWrapper: {
    backgroundColor: "#ffe6f0",
    padding: 20,
    borderRadius: 100,
    shadowColor: "#ff1493",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  icon: { width: 80, height: 80 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ff1493",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
