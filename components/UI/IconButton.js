import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable>
      <Ionicons name={icon} color={color} size={size} onPress={onPress} />
    </Pressable>
  );
}
