import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RecipeButtons from "./../components/recipe_buttons";
import RecipeHeader from "./../components/recipe_header";
import RecipeIngredients from "./../components/recipe_ingredients";
import RecipeInstructions from "./../components/recipe_instructions";
import { Recipe } from "./../components/recipe_types";

const RecipeScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // 👈 ovo je ključno
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals?.[0] || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe(); // 👈 da ne puca ako id nije još učitan
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f54291" />
      </View>
    );

  if (!recipe)
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <RecipeHeader recipe={recipe} />
      <RecipeButtons
        recipe={recipe}
        favorite={favorite}
        setFavorite={setFavorite}
      />
      <RecipeIngredients recipe={recipe} />
      <RecipeInstructions recipe={recipe} />
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    paddingTop: 50,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
