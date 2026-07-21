import { router, Stack } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { createOrder, getUserProfile } from "../services/userService";
export type Order = {
  id: string;
  items: Product[];
  totalAmount: number;
  status: string;
  createdAt: Timestamp;
};
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
  items: Product[];
};

export default function Summary({ items }: Props) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const { cartItems } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const handlePlaceOrder = async () => {
    if (!user) return;
    if (!phone) {
      setError("Update Phone number in profile and try again");
      setVisible(true);
      return;
    }
    if (!address) {
      setError("Update Address in profile and try again");
      setVisible(true);
      return;
    }
    try {
      setLoading(true);

      const order = {
        id: Date.now().toString(),
        items,
        totalAmount: total,
        status: "Placed",
        createdAt: Timestamp.now(),
      };
      await createOrder(user.uid, order);
      console.log("Order Placed");
      router.replace("/orderSuccess");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const profile = await getUserProfile(user.uid);

      if (profile) {
        setProfile(profile);
        setName(profile.name || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
      }
    };

    loadProfile();
  }, [user]);

  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: "Checkout" }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          padding: 16,
        }}
      >
        <View
          style={{
            marginTop: 50,
            backgroundColor: colors.background,
          }}
        >
          <ScrollView>
            {/* Address Card */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={styles.heading}>Shipping Address</Text>
              <Text>Name : {profile?.name}</Text>
              <Text>Phone : {profile?.phone}</Text>
              <Text>Address : {profile?.address}</Text>
            </View>

            {/* Order Summary */}
            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, marginTop: 16 },
              ]}
            >
              <Text style={styles.heading}>Order Summary</Text>

              {items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Image source={item.image} style={styles.image} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>Qty: {item.quantity}</Text>
                    <Text>₹{item.price}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Price Details */}
            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, marginTop: 16 },
              ]}
            >
              <View style={styles.priceRow}>
                <Text>Subtotal</Text>
                <Text>₹{total}</Text>
              </View>

              <View style={styles.priceRow}>
                <Text>Shipping</Text>
                <Text>₹0</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceRow}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.total}>₹{total}</Text>
              </View>
            </View>

            <Button
              mode="contained"
              buttonColor={colors.primary}
              style={{ marginTop: 24 }}
              onPress={handlePlaceOrder}
            >
              Place Order
            </Button>
          </ScrollView>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={4000}
            wrapperStyle={{
              bottom: -240,
              width: 370,
              left: 12,
              right: 17,
            }}
            style={{
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {error}
          </Snackbar>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
});
