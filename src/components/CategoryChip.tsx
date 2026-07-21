import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CategoryProps = {
  title: string;
  image: any;
  category: string;
};
export default function CategoryCard({
  title,
  image,
  category,
}: CategoryProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => router.push(`/category/${category}`)}>
        <View>
          <Image source={image} style={styles.image} />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  text: {
    padding: 20,
    alignItems: "center",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  },
});
