import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default function EmptyList() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="basket-outline" size={80} color="#ddd" />
      <Text style={styles.emptyText}>Your shopping list is empty</Text>
    </View>
  );
}
