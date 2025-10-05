import React, { useState } from "react";
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

export default function AIRecipeScreen() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/generate-recipe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        }
      );

      const data = await response.json();
      if (data.recipe?.raw) {
        setRecipe(data.recipe.raw);
      } else {
        setError(data.error || "No recipe received");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🥗 AI Recipe Generator</Text>

      <IngredientsInput
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading || !ingredients.trim() ? styles.buttonDisabled : {},
        ]}
        onPress={handleGenerate}
        disabled={loading || !ingredients.trim()}
      >
        <Text style={styles.buttonText}>
          {loading ? "⏳ Generating..." : " Generate Recipe"}
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
