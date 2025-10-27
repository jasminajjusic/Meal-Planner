import { StyleSheet, Text, View } from "react-native";
import { Recipe } from "./recipe_types";

type Props = { recipe: Recipe };

const RecipeInstructions: React.FC<Props> = ({ recipe }) => (
  <View>
    <Text style={styles.sectionTitle}>Instructions:</Text>
    <View style={styles.instructionsContainer}>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </View>
  </View>
);

export default RecipeInstructions;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#111827",
  },
  instructionsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  instructions: { fontSize: 16, lineHeight: 26, color: "#333" },
});
