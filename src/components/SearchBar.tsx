import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const { colors } = useTheme();
  const [searchText, SetSearchText] = useState("");

  return (
    <View style={{ flexDirection: "row", gap: 15, marginLeft: 17 }}>
      <TextInput
        placeholder="Search Products"
        value={value}
        onChangeText={onChangeText}
        activeOutlineColor={colors.primary}
        left={<TextInput.Icon icon="magnify" />}
        style={{
          width: 320,
          color: colors.background,
          marginTop: 25,
          height: 40,
        }}
        mode="outlined"
        outlineStyle={{ borderRadius: 30 }}
      />
      <FontAwesome
        name="heart-o"
        size={28}
        color="black"
        style={{ marginTop: 32 }}
        onPress={() => router.push("/wishlist")}
      />
    </View>
  );
}
