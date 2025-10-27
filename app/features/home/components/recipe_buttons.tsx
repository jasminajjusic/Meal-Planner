import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavoritesStore } from "./../stores/favorites_store";
import { Recipe } from "./recipe_types";

type Props = {
  recipe: Recipe;
};

const RecipeButtons: React.FC<Props> = ({ recipe }) => {
  const { isFavorite, handleFavorite, shareRecipe } = useFavoritesStore();
  const favorite = isFavorite(recipe.idMeal);

  return (
    <View style={styles.buttonsRow}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleFavorite(recipe.idMeal)}
      >
        <Text style={styles.buttonText}>
          {favorite ? "♥ Favorite" : "♡ Favorite"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => shareRecipe(recipe)}
      >
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
