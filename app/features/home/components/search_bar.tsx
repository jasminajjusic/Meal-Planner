import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search recipes..."
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
