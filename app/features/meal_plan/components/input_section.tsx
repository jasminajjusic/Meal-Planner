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
  <View style={styles.container}>
    <View style={styles.inputsRow}>
      <TextInput
        style={[styles.input, { flex: 1, marginRight: 10 }]}
        keyboardType="number-pad"
        value={days.toString()}
        onChangeText={(text) => setDays(Number(text))}
        placeholder="Days"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={[styles.input, { flex: 2 }]}
        value={preferences}
        onChangeText={setPreferences}
        placeholder="Preferences"
        placeholderTextColor="#aaa"
      />
    </View>

    <TouchableOpacity
      style={styles.button}
      onPress={onGenerate}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Generate Meal Plan</Text>
      )}
    </TouchableOpacity>

    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

export default InputSection;

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  inputsRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ffb6c1",
  },
  button: {
    backgroundColor: "#ff1493",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#ff1493",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
  },
});
