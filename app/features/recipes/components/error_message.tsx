import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default function ErrorMessage({ error }: { error: string }) {
  return <Text style={styles.errorText}>{error}</Text>;
}
