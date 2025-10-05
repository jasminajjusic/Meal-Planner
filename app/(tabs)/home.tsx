import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Dessert", "Breakfast", "Lunch", "Dinner"];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f54291" />
        <Text style={{ marginTop: 10 }}>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hello, Jasmina! 👋</Text>
        <Text style={styles.subGreetingText}>Find your favorite recipes</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.tab,
              selectedCategory === cat ? styles.tabActive : {},
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat ? styles.tabTextActive : {},
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.strMeal}</Text>
              <Text style={styles.subtext}>
                {item.strCategory} • {item.strArea}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push(`../recipe/${item.idMeal}`)}
              >
                <Text style={styles.buttonText}>View Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  greetingText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subGreetingText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  tabActive: {
    backgroundColor: "#f54291",
  },
  tabText: {
    color: "#333",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#f54291",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
