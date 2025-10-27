import React from "react";
import { Image, Text, View } from "react-native";
import RecipeActions from "./recipe_actions";
import styles from "./styles";

type Props = {
  recipe: string;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <View style={styles.recipeContainer}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
        }}
        style={styles.recipeImage}
      />

      <Text style={styles.recipeTitle}> Your Recipe</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Ingredients & Steps</Text>
        <View style={styles.divider} />
        <Text style={styles.recipeText}>{recipe}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Tips</Text>
        <View style={styles.divider} />
        <Text style={styles.recipeText}>
          Add spices or garnish to taste. You can serve it with rice, bread, or
          salad. Enjoy cooking!
        </Text>
      </View>

      <RecipeActions />
    </View>
  );
}
