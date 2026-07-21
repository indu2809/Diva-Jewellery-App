import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { useTheme } from "@/src/context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const { colors } = useTheme();
  const { user } = useAuth();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 0, backgroundColor: colors.background }}
    >
      {cartItems.length === 0 ? (
        <View
          style={[
            styles.emptyContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Your cart is empty 🛒
          </Text>
        </View>
      ) : (
        <View
          style={{ flex: 1, marginTop: 30, backgroundColor: colors.background }}
        >
          <ScrollView style={{ marginTop: 15 }}>
            {cartItems.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 10,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/product/${item.id}`);
                    console.log(item.id);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 30,
                    }}
                  >
                    <Image source={item.image} style={styles.image} />
                    <View style={{ flexDirection: "column", gap: 10 }}>
                      <Text style={styles.title}>{item.title}</Text>

                      <Text style={styles.price}>₹ {item.price}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Text>Quantity :</Text>
                        <Button
                          compact
                          onPress={() => decreaseQuantity(item.id)}
                        >
                          -
                        </Button>

                        <Text>{item.quantity}</Text>

                        <Button
                          compact
                          onPress={() => increaseQuantity(item.id)}
                        >
                          +
                        </Button>
                        <Feather
                          name="trash"
                          size={24}
                          color={colors.primary}
                          onPress={() => removeFromCart(item.id)}
                          style={{ marginLeft: 50 }}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹ {total}</Text>

            <Button
              mode="contained"
              buttonColor={colors.primary}
              onPress={() =>
                router.push({
                  pathname: "/checkout/[id]",
                  params: {
                    type: "cart",
                  },
                })
              }
            >
              Checkout
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    fontWeight: 500,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
    margin: 10,
    borderRadius: 12,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "700",
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
});
