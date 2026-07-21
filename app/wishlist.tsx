import ProductCard from "@/src/components/ProductCard";
import { useTheme } from "@/src/context/ThemeContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { products } from "@/src/data/products";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function WishlistScreen() {
  const { wishlist } = useWishlist();
  const { colors } = useTheme();
  const wishlistedProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  if (wishlistedProducts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ fontSize: 20 }}>Your wishlist is empty ❤️</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerTransparent: true }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView style={{ padding: 10, marginTop: 0 }}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
              marginBottom: 110,
              marginTop: 60,
            }}
          >
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
