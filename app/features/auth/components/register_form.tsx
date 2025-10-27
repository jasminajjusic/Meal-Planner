import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import InputField from "../components/input_fields";
import SocialButton from "../components/social_buttons";
import useAuthStore from "../stores/auth_store";
import styles from "../styles/register_styles";

interface Props {
  router: any;
}

export default function RegisterForm({ router }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    await register(email, password, name);

    if (!error) {
      Alert.alert("Success", "User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Sign up to start your meal planning journey
      </Text>

      <InputField value={name} onChangeText={setName} placeholder="Full Name" />

      <InputField value={email} onChangeText={setEmail} placeholder="Email" />
      <InputField
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.loginRedirectContainer}>
        <Text style={styles.loginPrompt}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => router.push("/features/auth/screens/login")}
        >
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.divider} />
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
