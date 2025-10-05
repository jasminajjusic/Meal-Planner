import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AIRecipe() {
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

      <Text style={styles.label}>
        Enter ingredients you have (comma separated):
      </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. tomato, onion, cheese"
        value={ingredients}
        onChangeText={setIngredients}
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

      {error && <Text style={styles.errorText}>{error}</Text>}

      {recipe && (
        <View style={styles.recipeContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
            }}
            style={styles.recipeImage}
          />

          <Text style={styles.recipeTitle}>🍽 Your Recipe</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🍅 Ingredients & Steps</Text>
            <View style={styles.divider} />
            <Text style={styles.recipeText}>{recipe}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Tips</Text>
            <View style={styles.divider} />
            <Text style={styles.recipeText}>
              Add spices or garnish to taste. You can serve it with rice, bread,
              or salad. Enjoy cooking! 🍴
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => alert("Recipe saved!")}
            >
              <Text style={styles.secondaryButtonText}>💾 Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => alert("Added to Favorites!")}
            >
              <Text style={styles.secondaryButtonText}>⭐ Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f9f9f9",
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f54291",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f54291",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#f54291",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#f5a5c3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    fontSize: 16,
    textAlign: "center",
  },
  recipeContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f54291",
    marginBottom: 12,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f54291",
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#fcd3e0",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#f54291",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f54291",
    textAlign: "center",
  },
});
