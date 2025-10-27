import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Meal } from "../stores/meal_store";

interface Props {
  meal: Meal;
}

const MealCard: React.FC<Props> = ({ meal }) => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{meal.strMeal}</Text>
        <Text style={styles.subtext}>
          {meal.strCategory} • {meal.strArea}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push(`/features/home/screens/recipe?id=${meal.idMeal}`)
          }
        >
          <Text style={styles.buttonText}>View Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: { width: "100%", height: 180 },
  cardContent: { padding: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 4 },
  subtext: { fontSize: 14, color: "#6b7280", marginBottom: 8 },
  button: {
    backgroundColor: "#f54291",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
