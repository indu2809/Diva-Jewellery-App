import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Order } from "./OrderSummary";
type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  const { colors } = useTheme();
  return (
    <>
      <View>
        <ScrollView>
          <View
            style={{
              padding: 20,
            }}
          >
            <View
              style={{
                borderRadius: 16,
                backgroundColor: colors.card,
                padding: 6,
                paddingHorizontal: 14,
                elevation: 3,
                borderWidth: 2,
                borderColor: colors.primary,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push(`/orders/${order.id}`);
                  console.log(order.id);
                }}
              >
                <Text style={styles.orderId}>Order #{order.id}</Text>

                <Text style={styles.date}>
                  {new Date(
                    order.createdAt.seconds * 1000,
                  ).toLocaleDateString()}
                </Text>

                <View style={styles.row}>
                  <Text>Status</Text>
                  <Text>{order.status}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Items</Text>
                  <Text>{order.items.length}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Total</Text>
                  <Text style={styles.total}>₹{order.totalAmount}</Text>
                </View>

                <Text style={styles.link}>View Details →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  orderId: {
    fontSize: 16,
    fontWeight: "700",
  },

  date: {
    marginTop: 4,
    marginBottom: 12,
    opacity: 0.7,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  total: {
    fontWeight: "700",
    fontSize: 16,
  },

  link: {
    marginTop: 12,
    fontWeight: "600",
  },
});
