import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  loginButton: {
    backgroundColor: "#f54291",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  loginButtonText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center", marginBottom: 16 },
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
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
