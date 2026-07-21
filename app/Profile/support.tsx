import { useTheme } from "@/src/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Support() {
  const { colors } = useTheme();
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add your favorites to the cart, and proceed to checkout.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Order tracking will be available in the My Orders section once your purchase is confirmed.",
    },
    {
      question: "What is the return policy?",
      answer:
        "Products can be returned within 7 days if they meet our return conditions.",
    },
    {
      question: "Are the jewelry products certified?",
      answer:
        "Yes, all jewelry pieces are quality checked and come with certification where applicable.",
    },
    {
      question: "Is Cash on Delivery available?",
      answer:
        "Cash on Delivery availability depends on your delivery location.",
    },
  ];
  return (
    <>
      <Stack.Screen
        options={{ title: "Help & Support", headerTransparent: true }}
      />
      <SafeAreaView style={{ marginTop: 40 }}>
        <ScrollView
          contentContainerStyle={{
            padding: 16,
          }}
        >
          <View style={styles.header}>
            <AntDesign name="customer-service" size={50} color="black" />

            <Text style={[styles.title, { color: colors.text }]}>
              Need Assistance?
            </Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              We're here to help with your orders, products, and account-related
              questions.
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Frequently Asked Questions
          </Text>

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            {faqs.map((faq, index) => (
              <List.Accordion key={index} title={faq.question}>
                <List.Item title={faq.answer} />
              </List.Accordion>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Contact Us
          </Text>

          <View style={[styles.contactCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons
              name="phone-outline"
              size={24}
              color={colors.primary}
            />

            <View>
              <Text style={[styles.label, { color: colors.text }]}>
                Customer Care
              </Text>

              <Text style={{ color: colors.textSecondary }}>
                +91 98765 43210
              </Text>
            </View>
          </View>

          <View style={[styles.contactCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color={colors.primary}
            />

            <View>
              <Text style={[styles.label, { color: colors.text }]}>
                Email Support
              </Text>

              <Text style={{ color: colors.textSecondary }}>
                customersupport@divajewels.com.in
              </Text>
            </View>
          </View>

          <View style={[styles.contactCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={colors.primary}
            />

            <View>
              <Text style={[styles.label, { color: colors.text }]}>
                Working Hours
              </Text>

              <Text style={{ color: colors.textSecondary }}>
                Monday - Saturday
              </Text>

              <Text style={{ color: colors.textSecondary }}>
                9:00 AM - 8:00 PM
              </Text>
            </View>
          </View>

          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Thank you for choosing Diva ✨
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 10,
  },

  sectionCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },

  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    fontSize: 15,
  },
});
