import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
};

export default function AddIngredientInput({
  value,
  onChangeText,
  onAdd,
}: Props) {
  return (
    <View style={styles.addContainer}>
      <TextInput
        style={styles.addInput}
        placeholder="Add new ingredient..."
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
