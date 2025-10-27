import { create } from "zustand";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  [key: string]: any;
}

interface MealState {
  meals: Meal[];
  loadingMeals: boolean;
  error: string | null;
  fetchMeals: () => Promise<void>;
}

export const useMealStore = create<MealState>((set) => ({
  meals: [],
  loadingMeals: false,
  error: null,

  fetchMeals: async () => {
    set({ loadingMeals: true, error: null });

    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
      );
      const data = await res.json();
      set({ meals: data.meals || [], loadingMeals: false });
    } catch (error) {
      console.error("Error fetching meals:", error);
      set({ error: "Failed to fetch meals.", loadingMeals: false });
    }
  },
}));
