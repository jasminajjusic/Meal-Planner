import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import InputField from "../components/input_fields";
import SocialButton from "../components/social_buttons";
import useAuthStore from "../stores/auth_store";
import { styles } from "../styles/login_styles";

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
      router.replace("../../../(tabs)/home");
    } else {
      Alert.alert("Login Failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <InputField value={email} onChangeText={setEmail} placeholder="Email" />
      <InputField
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.loginRedirectContainer}>
        <Text style={styles.loginPrompt}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => router.push("/features/auth/screens/register")}
        >
          <Text style={styles.loginLink}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialContainer}>
        <SocialButton backgroundColor="#2f2f2f">
          <FontAwesome name="google" size={28} color="#fff" />
        </SocialButton>
        <SocialButton backgroundColor="#000">
          <Ionicons name="logo-apple" size={28} color="#fff" />
        </SocialButton>
        <SocialButton backgroundColor="#1877F2">
          <FontAwesome name="facebook" size={28} color="#fff" />
        </SocialButton>
      </View>
    </View>
  );
}
