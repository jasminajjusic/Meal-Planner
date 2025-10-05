import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import MealPlanPage from "./meal_plan";
import AIRecipeScreen from "./recipe_generator";
import ShoppingScreen from "./shopping";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#f54291",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Generate") iconName = "sparkles-outline";
          else if (route.name === "Shopping") iconName = "search-outline";
          else if (route.name === "Meal Plan") iconName = "heart-outline";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Generate" component={AIRecipeScreen} />
      <Tab.Screen name="Shopping" component={ShoppingScreen} />
      <Tab.Screen name="Meal Plan" component={MealPlanPage} />
    </Tab.Navigator>
  );
}
