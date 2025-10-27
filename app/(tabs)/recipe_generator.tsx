import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import ErrorMessage from "../features/recipes/components/error_message";
import IngredientsInput from "../features/recipes/components/ingredients_input";
import RecipeCard from "../features/recipes/components/recipe_card";
import styles from "../features/recipes/components/styles";
import { useAIRecipeStore } from "../features/recipes/stores/recipe_generator_store";

export default function AIRecipeScreen() {
  const {
    ingredients,
    setIngredients,
    recipe,
    loading,
    error,
    generateRecipe,
  } = useAIRecipeStore();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Recipe Generator</Text>

      <IngredientsInput
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading || !ingredients.trim() ? styles.buttonDisabled : {},
        ]}
        onPress={generateRecipe}
        disabled={loading || !ingredients.trim()}
      >
        <Text style={styles.buttonText}>
          {loading ? "Generating..." : "Generate Recipe"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="#f54291"
        />
      )}
      {error && <ErrorMessage error={error} />}
      {recipe && <RecipeCard recipe={recipe} />}
    </ScrollView>
  );
}
