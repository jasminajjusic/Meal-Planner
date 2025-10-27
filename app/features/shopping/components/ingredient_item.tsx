import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Ingredient {
  id: string;
  name: string;
  bought: boolean;
}

type Props = {
  item: Ingredient;
  toggleBought: (id: string) => void;
  removeIngredient: (id: string) => void;
};

export default function IngredientItem({
  item,
  toggleBought,
  removeIngredient,
}: Props) {
  return (
    <View style={styles.itemRow}>
      <TouchableOpacity
        style={[styles.itemCard, item.bought ? styles.itemBought : {}]}
        onPress={() => toggleBought(item.id)}
      >
        <Text style={item.bought ? styles.itemTextBought : styles.itemText}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => toggleBought(item.id)}>
          <Ionicons
            name={
              item.bought ? "close-circle-outline" : "checkmark-circle-outline"
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
  );
}
