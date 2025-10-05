import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput } from "react-native";
import AddIngredientInput from "../features/shopping/components/add_ingredient_input";
import EmptyList from "../features/shopping/components/empty_list";
import IngredientItem from "../features/shopping/components/ingredient_item";
import styles from "../features/shopping/components/styles";

interface Ingredient {
  id: string;
  name: string;
  bought: boolean;
}

const initialIngredients: Ingredient[] = [
  { id: "1", name: "Tomatoes", bought: false },
  { id: "2", name: "Chicken Breast", bought: false },
  { id: "3", name: "Pasta", bought: false },
  { id: "4", name: "Eggs", bought: false },
  { id: "5", name: "Milk", bought: false },
];

export default function ShoppingScreen() {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);
  const [search, setSearch] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  const toggleBought = (id: string) => {
    setIngredients((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    setIngredients((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newIngredient, bought: false },
    ]);
    setNewIngredient("");
  };

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🛒 My Shopping</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search ingredients..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IngredientItem
            item={item}
            toggleBought={toggleBought}
            removeIngredient={removeIngredient}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
        ListEmptyComponent={<EmptyList />}
      />

      <AddIngredientInput
        value={newIngredient}
        onChangeText={setNewIngredient}
        onAdd={addIngredient}
      />
    </SafeAreaView>
  );
}
