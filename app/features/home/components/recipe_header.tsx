import { Image, StyleSheet, Text, View } from "react-native";
import { Recipe } from "./recipe_types";

type Props = { recipe: Recipe };

const RecipeHeader: React.FC<Props> = ({ recipe }) => (
  <View>
    <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
    <Text style={styles.title}>{recipe.strMeal}</Text>
    <View style={styles.tagsContainer}>
      <Text style={styles.tag}>{recipe.strCategory}</Text>
      <Text style={styles.tag}>{recipe.strArea}</Text>
    </View>
  </View>
);

export default RecipeHeader;

const styles = StyleSheet.create({
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
});
