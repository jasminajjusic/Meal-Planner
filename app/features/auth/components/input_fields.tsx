import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: InputFieldProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});
