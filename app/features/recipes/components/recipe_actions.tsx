import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function RecipeActions() {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => alert("Recipe saved!")}
      >
        <Text style={styles.secondaryButtonText}> Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => alert("Added to Favorites!")}
      >
        <Text style={styles.secondaryButtonText}> Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}
