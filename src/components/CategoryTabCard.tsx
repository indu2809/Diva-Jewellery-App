import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

//this is the layout for categories listed on the category tab

type CategoryProps = {
  title: string;
  image: any;
  category: string;
};
export default function CategoryTab({ title, image, category }: CategoryProps) {
  const { colors } = useTheme();
  return (
    <View>
      <TouchableOpacity onPress={() => router.push(`/category/${category}`)}>
        <View>
          <Image
            source={image}
            style={[styles.image, { borderColor: colors.primary }]}
          />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 150,
    borderWidth: 2,
    borderRadius: 20,
  },
  text: {
    padding: 10,
    alignItems: "center",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  },
});
