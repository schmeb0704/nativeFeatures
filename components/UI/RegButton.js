import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function RegButton({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50,
  },
});
