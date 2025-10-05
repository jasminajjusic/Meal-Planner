import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface SocialButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  backgroundColor: string;
}

export default function SocialButton({
  children,
  backgroundColor,
  ...rest
}: SocialButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});
