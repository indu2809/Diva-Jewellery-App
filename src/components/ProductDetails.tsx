import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
type Product = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  category: string;
  image: any;
  description: string;
};

type Props = {
  product: Product;
};

export default function DetailScreen({ product }: Props) {
  const { colors } = useTheme();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const [MoreProducts] = useState(
    [...products].sort(() => Math.random() - 0.5).slice(0, 10),
  );
  const IsInCart = cartItems.some((item) => item.id === product.id);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <ScrollView>
          <Image source={product.image} style={styles.image} />
          <View style={styles.content}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>{product.title}</Text>
              <TouchableOpacity>
                <FontAwesome
                  name={wishlist.includes(product.id) ? "heart" : "heart-o"}
                  size={28}
                  color={colors.primary}
                  onPress={() => {
                    {
                      if (!wishlist.includes(product.id)) {
                        addToWishlist(product.id);
                      } else {
                        removeFromWishlist(product.id);
                      }
                    }
                    console.log(wishlist);
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.price, { color: colors.primary }]}>
              ₹ {product.price}
            </Text>
            <Text style={{ color: colors.textSecondary }}>
              {product.description}
            </Text>
            <Text
              style={{
                color: "green",
                fontSize: 14,
              }}
            >
              In Stock
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <MaterialIcons name="local-shipping" size={24} color="black" />
                <Text style={{ color: colors.textSecondary }}>
                  Free Delivery
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <AntDesign name="sync" size={24} color="black" />
                <Text style={{ color: colors.textSecondary }}>
                  7 Day Return Policy
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              marginBottom: 15,
              marginHorizontal: 20,
            }}
          >
            You may also like
          </Text>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 0 }}
            style={{ padding: 5 }}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: 20,
              }}
            >
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </View>
          </ScrollView>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              marginBottom: 15,
              marginHorizontal: 20,
            }}
          >
            More Products
          </Text>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
              padding: 10,
            }}
          >
            {MoreProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            marginBottom: 10,
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Button
            mode="outlined"
            textColor={colors.primary}
            style={{
              borderColor: colors.primary,
              justifyContent: "center",
              alignContent: "center",
              flex: 1,
            }}
            onPress={() => {
              if (IsInCart) {
                router.push("/cart");
              } else {
                addToCart(product);
                router.push("/cart");
              }
              console.log(IsInCart);
            }}
          >
            <Text>{IsInCart ? "Go To Cart" : "Add to Cart"}</Text>
          </Button>

          <Button
            mode="contained"
            buttonColor={colors.primary}
            style={{
              height: 50,
              justifyContent: "center",
              alignContent: "center",
              flex: 1,
            }}
            onPress={() => {
              router.push({
                pathname: "/checkout/[id]",
                params: {
                  type: "buyNow",
                  productId: product.id,
                },
              });
              console.log(product.id);
            }}
          >
            Buy Now
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 350,
    width: "100%",
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  price: {
    fontSize: 20,
    fontWeight: 700,
  },
  content: {
    padding: 20,
    gap: 5,
  },
});
