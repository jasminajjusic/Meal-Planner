import { Alert, Share } from "react-native";
import { create } from "zustand";
import { Recipe } from "../components/recipe_types";

type FavoritesState = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  handleFavorite: (id: string) => Promise<void>;
  shareRecipe: (recipe: Recipe) => Promise<void>;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  isFavorite: (id) => get().favorites.includes(id),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id],
    })),

  handleFavorite: async (id) => {
    const favorite = get().isFavorite(id);
    get().toggleFavorite(id);
    Alert.alert(favorite ? "Removed from favorites" : "Added to favorites");
  },

  shareRecipe: async (recipe) => {
    try {
      const message = ` Check out this recipe: ${recipe.strMeal}

Ingredients:
${Object.keys(recipe)
  .filter((key) => key.startsWith("strIngredient") && recipe[key])
  .map((key) => `• ${recipe[key]}`)
  .join("\n")}

${recipe.strSource ? `Read more: ${recipe.strSource}` : ""}`;

      await Share.share({
        message,
        url: recipe.strMealThumb,
        title: `Recipe: ${recipe.strMeal}`,
      });
    } catch (error) {
      console.error("Error sharing recipe:", error);
      Alert.alert("Error", "Something went wrong while sharing the recipe.");
    }
  },
}));
