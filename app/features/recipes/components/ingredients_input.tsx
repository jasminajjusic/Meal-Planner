import React from "react";
import { Text, TextInput } from "react-native";
import styles from "./styles";

type Props = {
  ingredients: string;
  setIngredients: (text: string) => void;
};

export default function IngredientsInput({
  ingredients,
  setIngredients,
}: Props) {
  return (
    <>
      <Text style={styles.label}>
        Enter ingredients you have (comma separated):
      </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. tomato, onion, cheese"
        value={ingredients}
        onChangeText={setIngredients}
      />
    </>
  );
}
