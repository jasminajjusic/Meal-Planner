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

interface MealDay {
  day: number;
  breakfast: string;
  lunch: string;
  dinner: string;
}

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
        setMealPlan([]);
      } else {
        setMealPlan(Array.isArray(data.mealPlan) ? data.mealPlan : []);
      }
    } catch (e: any) {
      setError(e.message || "Greška prilikom fetch requesta.");
      setMealPlan([]);
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={days.toString()}
          onChangeText={(text) => setDays(Number(text))}
          placeholder="Number of days"
        />
        <TextInput
          style={styles.input}
          value={preferences}
          onChangeText={setPreferences}
          placeholder="Preferences (optional)"
        />
        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Meal Plan</Text>
          )}
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      {mealPlan.length > 0 ? (
        <View style={styles.mealPlanContainer}>
          {mealPlan.map((day) => (
            <View key={day.day} style={styles.dayCard}>
              <Text style={styles.dayTitle}>Day {day.day}</Text>
              <View style={[styles.mealRow, { backgroundColor: "#ffe6f0" }]}>
                <Text style={styles.mealLabel}>Breakfast:</Text>
                <Text style={styles.mealText}>{day.breakfast}</Text>
              </View>
              <View style={[styles.mealRow, { backgroundColor: "#fff0f5" }]}>
                <Text style={styles.mealLabel}>Lunch:</Text>
                <Text style={styles.mealText}>{day.lunch}</Text>
              </View>
              <View style={[styles.mealRow, { backgroundColor: "#ffd6e8" }]}>
                <Text style={styles.mealLabel}>Dinner:</Text>
                <Text style={styles.mealText}>{day.dinner}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={{
              uri: "https://img.icons8.com/doodle/96/ff1493/chef-hat.png",
            }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No meal plan generated yet.</Text>
          <Text style={styles.emptySubText}>
            Fill in the details above and tap "Generate Meal Plan"!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff5f8",
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
    color: "#ff1493",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffb6c1",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ff69b4",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  mealPlanContainer: {
    marginTop: 0,
  },
  dayCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff1493",
  },
  mealRow: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  mealLabel: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#c71585",
  },
  mealText: {
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
