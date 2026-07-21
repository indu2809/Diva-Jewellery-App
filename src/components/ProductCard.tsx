import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  image: any;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
}: ProductCardProps) {
  const { colors } = useTheme();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push(`/product/${id}`);
          console.log(id);
        }}
        style={[styles.Card, { backgroundColor: colors.card }]}
      >
        <Image source={image} style={[styles.image]} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={{ color: colors.primary }}> ₹ {price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 180,
    borderRadius: 16,
  },
  Card: {
    overflow: "hidden",
    borderRadius: 16,
    width: 173,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  price: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 4,
  },
  content: {
    padding: 8,
  },
});
