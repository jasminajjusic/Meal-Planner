import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import EmptyState from "../features/meal_plan/components/empty_state";
import InputSection from "../features/meal_plan/components/input_section";
import MealPlanList from "../features/meal_plan/components/meal_plan_list";
import { useMealPlanStore } from "../features/meal_plan/stores/meal_plan_store";

export default function MealPlanPage() {
  const [days, setDays] = useState(3);
  const [preferences, setPreferences] = useState("");

  const { mealPlan, loading, error, generateMealPlan } = useMealPlanStore();

  const handleGenerate = () => {
    generateMealPlan(days, preferences);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>

      <InputSection
        days={days}
        setDays={setDays}
        preferences={preferences}
        setPreferences={setPreferences}
        loading={loading}
        error={error}
        onGenerate={handleGenerate}
      />

      {mealPlan.length > 0 ? (
        <MealPlanList mealPlan={mealPlan} />
      ) : (
        <EmptyState />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff5f8", flexGrow: 1 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
    color: "#ff1493",
  },
});
