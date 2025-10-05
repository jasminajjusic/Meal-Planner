import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useAuthStore from "../stores/auth_store";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const router = useRouter();

  const handleLogin = async () => {
    await login(email, password);
    if (!error) {
      Alert.alert("Success", "Logged in successfully!");
      setEmail("");
      setPassword("");
      router.replace("/home");
    } else {
      Alert.alert("Login Failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.loginRedirectContainer}>
        <Text style={styles.loginPrompt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("../register")}>
          <Text style={styles.loginLink}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#2f2f2f" }]}
        >
          <FontAwesome name="google" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#000" }]}
        >
          <Ionicons name="logo-apple" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#1877F2" }]}
        >
          <FontAwesome name="facebook" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
    justifyContent: "center",
    marginBottom: 50,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 24,
  },
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
  registerButton: {
    backgroundColor: "#f54291",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  loginRedirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginPrompt: {
    fontSize: 14,
    color: "#6b7280",
    marginRight: 6,
    marginBottom: 20,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f54291",
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d5db",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#6b7280",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialIconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});
