import { Ionicons, Feather } from "@expo/vector-icons";

export const ICONS = {
  home: "home" as keyof typeof Feather.glyphMap,
  batteryFull: "battery-full" as keyof typeof Ionicons.glyphMap,
  batteryHalf: "battery-half" as keyof typeof Ionicons.glyphMap,
  wifi: "wifi" as keyof typeof Feather.glyphMap,
  sunny: "sunny" as keyof typeof Ionicons.glyphMap,
  info: "information-circle-outline" as keyof typeof Ionicons.glyphMap,
};
