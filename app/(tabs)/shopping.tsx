// ShoppingScreen.tsx
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import AddIngredientInput from "../features/shopping/components/add_ingredient_input";
import EmptyList from "../features/shopping/components/empty_list";
import IngredientItem from "../features/shopping/components/ingredient_item";
import styles from "../features/shopping/components/styles";
import useShoppingStore from "../features/shopping/stores/shopping_store";

export default function ShoppingScreen() {
  const {
    ingredients,
    loading,
    fetchIngredients,
    addIngredient,
    removeIngredient,
    toggleBought,
  } = useShoppingStore();

  const [search, setSearch] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    fetchIngredients(); // učitaj listu iz Firestore
  }, []);

  const handleAdd = async () => {
    if (!newIngredient.trim()) return;
    await addIngredient(newIngredient);
    setNewIngredient("");
  };

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f54291" />
        <Text style={{ marginTop: 10 }}>Loading ingredients...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> My Shopping</Text>

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
            toggleBought={() => toggleBought(item.id)}
            removeIngredient={() => removeIngredient(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
        ListEmptyComponent={<EmptyList />}
      />

      <AddIngredientInput
        value={newIngredient}
        onChangeText={setNewIngredient}
        onAdd={handleAdd}
      />
    </SafeAreaView>
  );
}
