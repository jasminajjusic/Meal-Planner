import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavoritesStore } from "./../stores/favorites_store";
import { Recipe } from "./recipe_types";

type Props = {
  recipe: Recipe;
};

const RecipeButtons: React.FC<Props> = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(recipe.idMeal);

  const handleFavorite = async () => {
    await toggleFavorite(recipe.idMeal);
    Alert.alert(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const shareRecipe = async () => {
    try {
      const message = `🍽️ Check out this recipe: ${recipe.strMeal}

Ingredients:
${Object.keys(recipe)
  .filter((key) => key.startsWith("strIngredient") && recipe[key])
  .map((key) => `• ${recipe[key]}`)
  .join("\n")}

${recipe.strSource ? `Read more: ${recipe.strSource}` : ""}
`;

      await Share.share({
        message,
        url: recipe.strMealThumb,
        title: `Recipe: ${recipe.strMeal}`,
      });
    } catch (error) {
      console.error("Error sharing recipe:", error);
      Alert.alert("Error", "Something went wrong while sharing the recipe.");
    }
  };

  return (
    <View style={styles.buttonsRow}>
      <TouchableOpacity style={styles.button} onPress={handleFavorite}>
        <Text style={styles.buttonText}>
          {favorite ? "♥ Favorite" : "♡ Favorite"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={shareRecipe}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeButtons;

const styles = StyleSheet.create({
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
});
