import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    if (newIngredient.trim() === "") return;
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
          <View style={styles.itemRow}>
            <TouchableOpacity
              style={[styles.itemCard, item.bought ? styles.itemBought : {}]}
              onPress={() => toggleBought(item.id)}
            >
              <Text
                style={item.bought ? styles.itemTextBought : styles.itemText}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <View style={styles.itemActions}>
              <TouchableOpacity onPress={() => toggleBought(item.id)}>
                <Ionicons
                  name={
                    item.bought
                      ? "close-circle-outline"
                      : "checkmark-circle-outline"
                  }
                  size={24}
                  color="#ff1493"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeIngredient(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#ff1493" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="basket-outline" size={80} color="#ddd" />
            <Text style={styles.emptyText}>Your shopping list is empty</Text>
          </View>
        }
      />

      <View style={styles.addContainer}>
        <TextInput
          style={styles.addInput}
          placeholder="Add new ingredient..."
          value={newIngredient}
          onChangeText={setNewIngredient}
        />
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff1493",
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 15,
    borderWidth: 0.8,
    borderColor: "#ffd6e8",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 0,
  },
  itemCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: "#ffd6e8",
  },
  itemBought: {
    backgroundColor: "#ffb6c1",
  },
  itemText: { fontSize: 16, color: "#000" },
  itemTextBought: {
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "line-through",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
  },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 16, color: "#bbb", marginTop: 10 },
  addContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  addInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 0.8,
    borderColor: "#ffd6e8",
  },
  addButton: {
    backgroundColor: "#ff1493",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
