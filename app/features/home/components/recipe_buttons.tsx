import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Recipe } from "./recipe_types";

type Props = {
  recipe: Recipe;
  favorite: boolean;
  setFavorite: (fav: boolean) => void;
};

const RecipeButtons: React.FC<Props> = ({ recipe, favorite, setFavorite }) => {
  const toggleFavorite = () => {
    setFavorite(!favorite);
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

  return (
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
