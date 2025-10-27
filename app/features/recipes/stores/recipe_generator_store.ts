import { create } from "zustand";

interface AIRecipeState {
  ingredients: string;
  recipe: string | null;
  loading: boolean;
  error: string | null;
  setIngredients: (value: string) => void;
  generateRecipe: () => Promise<void>;
}

export const useAIRecipeStore = create<AIRecipeState>((set, get) => ({
  ingredients: "",
  recipe: null,
  loading: false,
  error: null,

  setIngredients: (value) => set({ ingredients: value }),

  generateRecipe: async () => {
    const ingredients = get().ingredients;
    if (!ingredients.trim()) return;

    set({ loading: true, error: null, recipe: null });

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/generate-recipe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        }
      );

      const data = await res.json();

      if (data.recipe?.raw) {
        set({ recipe: data.recipe.raw });
      } else {
        set({ error: data.error || "No recipe received" });
      }
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
