import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type RecipeScreenProps = {
  id: string;
};

export default function RecipeScreen({ id }: RecipeScreenProps) {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleFavorite = () => {
    setFavorite((prev) => !prev);
    Alert.alert(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const shareRecipe = async () => {
    try {
      await Share.share({
        message: `Check out this recipe: ${recipe.strMeal}\n${
          recipe.strSource || ""
        }`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(
          <Text key={i} style={styles.ingredient}>
            • {ingredient} - {measure}
          </Text>
        );
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f54291" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />

      <Text style={styles.title}>{recipe.strMeal}</Text>

      <View style={styles.tagsContainer}>
        <Text style={styles.tag}>{recipe.strCategory}</Text>
        <Text style={styles.tag}>{recipe.strArea}</Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
          <Text style={styles.buttonText}>
            {favorite ? "♥ Favorite" : "♡ Favorite"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareRecipe}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>{renderIngredients()}</View>

      <Text style={styles.sectionTitle}>Instructions:</Text>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    paddingTop: 50,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 280, borderRadius: 12, marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#111827",
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 10,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    fontSize: 14,
    color: "#333",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#f54291",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#111827",
  },
  ingredientsContainer: {
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 8,
    color: "#111827",
    backgroundColor: "#fdf3f6ff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ingredientText: {
    marginLeft: 4,
  },

  instructionsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  instructions: { fontSize: 16, lineHeight: 26, color: "#333" },
});
