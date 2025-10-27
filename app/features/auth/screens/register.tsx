import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import RegisterForm from "../components/register_form";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <RegisterForm router={router} />
    </View>
  );
}
