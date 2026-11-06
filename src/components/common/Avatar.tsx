import { Pressable, StyleSheet, View } from "react-native";
import { getInitials } from "@/services/userService";
import { colors, fonts } from "@/theme";
import { AppText } from "./AppText";

interface AvatarProps {
  name: string;
  size?: "small" | "large";
  onPress?: () => void;
  ariaLabel?: string;
}

export function Avatar({ name, size, onPress, ariaLabel }: AvatarProps) {
  const initials = getInitials(name);
  const isLarge = size === "large";
  const isSmall = size === "small";

  const dimension = isLarge ? 56 : isSmall ? 32 : 38;
  const fontSize = isLarge ? 18 : isSmall ? 11 : 13;

  const content = (
    <View
      style={[
        styles.avatar,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
      ]}
    >
      <AppText
        style={[
          styles.text,
          {
            fontSize,
          },
        ]}
      >
        {initials}
      </AppText>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={ariaLabel}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#eee6fc",
    borderWidth: 2,
    borderColor: "#f8f5fd",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: fonts.bold,
    color: "#8861c5",
  },
  pressed: {
    opacity: 0.8,
  },
});
