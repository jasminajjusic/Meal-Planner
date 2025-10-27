import React from "react";
import { View } from "react-native";
import MealDayCard from "./meal_day_card";
import { MealDay } from "./types";

const MealPlanList: React.FC<{ mealPlan: MealDay[] }> = ({ mealPlan }) => (
  <View>
    {mealPlan.map((day) => (
      <MealDayCard key={day.day} day={day} />
    ))}
  </View>
);

export default MealPlanList;
