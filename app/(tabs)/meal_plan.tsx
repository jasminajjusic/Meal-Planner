import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import EmptyState from "../features/meal_plan/components/empty_state";
import InputSection from "../features/meal_plan/components/input_section";
import MealPlanList from "../features/meal_plan/components/meal_plan_list";
import { MealDay } from "../features/meal_plan/components/types";

export default function MealPlanPage() {
  const [mealPlan, setMealPlan] = useState<MealDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [days, setDays] = useState(3);
  const [preferences, setPreferences] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setMealPlan([]);

    try {
      const res = await fetch("http://192.168.1.6:3000/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, preferences }),
      });

      const data: { mealPlan?: MealDay[]; error?: string } = await res.json();
      if (!res.ok || !data.mealPlan) {
        setError(data.error || "Greška prilikom generisanja meal plana.");
      } else {
        setMealPlan(Array.isArray(data.mealPlan) ? data.mealPlan : []);
      }
    } catch (e: any) {
      setError(e.message || "Greška prilikom fetch requesta.");
    }
    setLoading(false);
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
