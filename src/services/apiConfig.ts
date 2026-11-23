import Constants from "expo-constants";
import { Platform } from "react-native";

// Expo substitui acessos diretos a EXPO_PUBLIC_* durante o bundle.
const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
const host = Constants.expoConfig?.hostUri?.split(":")[0];
export const API_URL =
  configuredUrl ||
  (Platform.OS === "web"
    ? "http://localhost:3000"
    : `http://${host || (Platform.OS === "android" ? "10.0.2.2" : "localhost")}:3000`);
