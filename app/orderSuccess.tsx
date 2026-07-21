import { useTheme } from "@/src/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
export default function OrderSuccessScreen() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Screen
        options={{ headerTransparent: true, title: "Order Success" }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons
          name="check-circle"
          size={100}
          color="#C9A227"
        />

        <Text variant="headlineMedium" style={styles.title}>
          Order Placed!
        </Text>

        <Text style={styles.subtitle}>Thank you for shopping with Diva.</Text>

        <Text style={styles.message}>
          Your order has been successfully placed and is being processed.
        </Text>

        <Button
          mode="contained"
          buttonColor={colors.primary}
          style={styles.button}
          onPress={() => {
            router.replace("/orders");
          }}
        >
          View Orders
        </Button>

        <Button
          mode="outlined"
          style={styles.secondaryButton}
          textColor={colors.primary}
          onPress={() => router.replace("/(tabs)/home")}
        >
          Continue Shopping
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
  message: {
    marginTop: 12,
    textAlign: "center",
    color: "#888",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 40,
    width: "100%",
    borderRadius: 10,
  },
  secondaryButton: {
    marginTop: 12,
    width: "100%",
    borderRadius: 10,
  },
});
