import { StyleSheet, Text, View } from "react-native";
import { Recipe } from "./recipe_types";

type Props = { recipe: Recipe };

const RecipeIngredients: React.FC<Props> = ({ recipe }) => {
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

  return (
    <View>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>{renderIngredients()}</View>
    </View>
  );
};

export default RecipeIngredients;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#111827",
  },
  ingredientsContainer: { marginVertical: 12, paddingHorizontal: 8 },
  ingredient: {
    fontSize: 16,
    marginBottom: 8,
    color: "#111827",
    backgroundColor: "#fdf3f6ff",
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
});
