import BannerCard from "@/src/components/Banner";
import CategoryCard from "@/src/components/CategoryChip";
import ProductCard from "@/src/components/ProductCard";
import SearchBar from "@/src/components/SearchBar";
import { useTheme } from "@/src/context/ThemeContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { Category } from "@/src/data/categories";
import { products } from "@/src/data/products";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  const [shuffledProducts] = useState(
    [...products].sort(() => Math.random() - 0.5).slice(0, 16),
  );
  const [FeaturedCategories] = useState([...Category].slice(0, 3));
  const { colors } = useTheme();
  const { wishlist } = useWishlist();
  const [searchText, setSearchText] = useState("");
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView
        style={{
          padding: 10,
          gap: 17,
        }}
      >
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <BannerCard />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>Category</Text>
            <TouchableOpacity onPress={() => router.push("/category")}>
              <Text
                style={{ fontSize: 16, color: colors.primary, marginRight: 10 }}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ gap: 10, padding: 10, backgroundColor: colors.background }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginRight: 10,
              }}
            >
              {FeaturedCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category.category}
                  title={category.title}
                  image={category.image}
                />
              ))}
            </View>
          </ScrollView>
          <Text style={styles.title}>
            {searchText ? "Search Results" : "Featured Collection"}
          </Text>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
            }}
          >
            {filteredProducts.length == 0 ? (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: 500,
                  paddingHorizontal: 120,
                  paddingVertical: 80,
                }}
              >
                No results found
              </Text>
            ) : null}
            {(searchText ? filteredProducts : shuffledProducts).map(
              (product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                />
              ),
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 700,
    marginLeft: 10,
    padding: 10,
  },
});
