import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryTabs from "../features/home/components/category_tabs";
import MealCard from "../features/home/components/meal_card";
import SearchBar from "../features/home/components/search_bar";
import { Meal, useMealStore } from "../features/home/stores/meal_store";
import useUserStore from "../features/home/stores/user_store";

const categories = ["All", "Dessert", "Breakfast", "Lunch", "Dinner"];

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { userName, fetchUser, loadingUser } = useUserStore();
  const { meals, fetchMeals, loadingMeals } = useMealStore();

  useEffect(() => {
    fetchUser();
    fetchMeals();
  }, []);

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "All" || meal.strCategory === selectedCategory;
    const matchesSearch = meal.strMeal
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loadingMeals || loadingUser) return <Loading />;

  return (
    <FlatList<Meal>
      data={filteredMeals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => <MealCard meal={item} />}
      ListHeaderComponent={
        <>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>
              {userName ? `Hello, ${userName}!` : "Hello!"}
            </Text>
            <Text style={styles.subGreetingText}>
              Find your favorite recipes
            </Text>
          </View>

          <SearchBar value={search} onChangeText={setSearch} />
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </>
      }
      contentContainerStyle={styles.container}
    />
  );
};

export default HomeScreen;

const Loading: React.FC = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#f54291" />
    <Text style={{ marginTop: 10 }}>Loading recipes...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    padding: 16,
    paddingTop: 60,
  },
  greetingContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  greetingText: { fontSize: 22, fontWeight: "700", color: "#111827" },
  subGreetingText: { fontSize: 16, color: "#6b7280", marginTop: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
