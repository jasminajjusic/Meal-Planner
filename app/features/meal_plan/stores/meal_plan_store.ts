import { create } from "zustand";
import { MealDay } from "../components/types";

interface MealPlanState {
  mealPlan: MealDay[];
  loading: boolean;
  error: string;
  generateMealPlan: (days: number, preferences: string) => Promise<void>;
}

export const useMealPlanStore = create<MealPlanState>((set) => ({
  mealPlan: [],
  loading: false,
  error: "",
  generateMealPlan: async (days, preferences) => {
    set({ loading: true, error: "" });

    try {
      const res = await fetch("http://192.168.1.6:3000/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, preferences }),
      });

      const data: { mealPlan?: MealDay[]; error?: string } = await res.json();

      set({
        mealPlan: Array.isArray(data.mealPlan) ? data.mealPlan : [],
        error: data.error || "",
      });
    } catch (e: any) {
      set({ mealPlan: [], error: e.message || "Error" });
    }

    set({ loading: false });
  },
}));
