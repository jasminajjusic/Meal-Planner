import { create } from "zustand";

interface Meal {
  id: string;
  title: string;
}

interface MealState {
  planner: { [day: string]: Meal[] };
  addMeal: (day: string, meal: Meal) => void;
}

export const useMealStore = create<MealState>((set) => ({
  planner: {},
  addMeal: (day, meal) =>
    set((state) => ({
      planner: {
        ...state.planner,
        [day]: [...(state.planner[day] || []), meal],
      },
    })),
}));
