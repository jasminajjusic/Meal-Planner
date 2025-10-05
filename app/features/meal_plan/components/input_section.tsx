import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  days: number;
  setDays: (days: number) => void;
  preferences: string;
  setPreferences: (p: string) => void;
  loading: boolean;
  error: string;
  onGenerate: () => void;
};

const InputSection: React.FC<Props> = ({
  days,
  setDays,
  preferences,
  setPreferences,
  loading,
  error,
  onGenerate,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      keyboardType="number-pad"
      value={days.toString()}
      onChangeText={(text) => setDays(Number(text))}
      placeholder="Number of days"
    />
    <TextInput
      style={styles.input}
      value={preferences}
      onChangeText={setPreferences}
      placeholder="Preferences (optional)"
    />
    <TouchableOpacity style={styles.button} onPress={onGenerate}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Generate Meal Plan</Text>
      )}
    </TouchableOpacity>
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

export default InputSection;

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ffb6c1",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ff69b4",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
});
