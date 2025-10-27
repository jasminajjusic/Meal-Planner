import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MealDay } from "./types";

const MealDayCard: React.FC<{ day: MealDay }> = ({ day }) => {
  return (
    <View style={styles.dayCard}>
      <Text style={styles.dayTitle}>Day {day.day}</Text>

      <View style={[styles.mealRow, { backgroundColor: "#ffe6f0" }]}>
        <Text style={styles.mealLabel}>Breakfast:</Text>
        <Text style={styles.mealText}>{day.breakfast}</Text>
      </View>
      <View style={[styles.mealRow, { backgroundColor: "#fff0f5" }]}>
        <Text style={styles.mealLabel}>Lunch:</Text>
        <Text style={styles.mealText}>{day.lunch}</Text>
      </View>
      <View style={[styles.mealRow, { backgroundColor: "#ffd6e8" }]}>
        <Text style={styles.mealLabel}>Dinner:</Text>
        <Text style={styles.mealText}>{day.dinner}</Text>
      </View>
    </View>
  );
};

export default MealDayCard;

const styles = StyleSheet.create({
  dayCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff1493",
  },
  mealRow: { padding: 10, borderRadius: 10, marginBottom: 8 },
  mealLabel: { fontWeight: "bold", marginBottom: 2, color: "#c71585" },
  mealText: { fontSize: 16, color: "#333" },
});
