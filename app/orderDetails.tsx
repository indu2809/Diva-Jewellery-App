import { Order } from "@/src/components/OrderSummary";
import ProductCard from "@/src/components/ProductCard";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { getOrderById } from "@/src/services/userService";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderId = {
  id: string;
};
export default function OrderDetailCard({ id }: OrderId) {
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const { colors } = useTheme();
  useEffect(() => {
    const loadOrder = async () => {
      if (!user || !id) return;

      const data = await getOrderById(user.uid, id as string);

      setOrder(data as Order);
    };

    loadOrder();
  }, [id, user]);

  const orderDetails = [
    {
      label: "Order ID",
      value: order?.id,
    },
    {
      label: "Date",
      value: order?.createdAt
        ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
        : "-",
    },
    {
      label: "Status",
      value: order?.status,
    },
    {
      label: "Total Amount",
      value: `₹${order?.totalAmount}`,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Order Details",
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.background },
        }}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingTop: 70,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Order Summary */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.primary,
              marginBottom: 24,
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 16,
              }}
            >
              Order Summary
            </Text>

            {orderDetails.map((item) => (
              <View
                key={item.label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "gray" }}>{item.label}</Text>

                <Text
                  style={{
                    fontWeight: item.label === "Total Amount" ? "700" : "400",
                  }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Items Header */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 20,
              marginHorizontal: 15,
            }}
          >
            Items ({order?.items.length ?? 0})
          </Text>

          {/* Product List */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {order?.items.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
