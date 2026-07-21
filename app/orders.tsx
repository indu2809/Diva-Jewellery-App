import OrderCard from "@/src/components/OrderCard";
import { Order } from "@/src/components/OrderSummary";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { getOrders } from "@/src/services/userService";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function OrdersScreen() {
  const { user } = useAuth();
  const [order, SetOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  useEffect(() => {
    const loadOrder = async () => {
      if (!user) return;
      const data = await getOrders(user.uid);
      SetOrder(data);
      setLoading(false);
    };
    loadOrder();
  }, [user]);

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{ headerTransparent: true, title: "My Orders" }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Loading...
          </Text>
        </View>
      </>
    );
  }
  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: "My Orders" }} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.background, marginTop: 0 }}
      >
        <View style={{ marginTop: 60 }}>
          {order.length == 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 350,
                gap: 20,
              }}
            >
              (
              <Text style={{ fontSize: 20, fontWeight: 500 }}>
                No Orders Yet
              </Text>
              <Button
                onPress={() => router.replace("/(tabs)/home")}
                textColor={colors.card}
                buttonColor={colors.primary}
                labelStyle={{ fontSize: 20 }}
                contentStyle={{ width: 280 }}
              >
                Continue Shopping
              </Button>
            </View>
          ) : null}
          <FlatList
            data={order}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderCard order={item} />}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
