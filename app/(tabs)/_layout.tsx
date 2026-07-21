import { useTheme } from "@/src/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Tabs } from "expo-router";
export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={focused ? size + 4 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "view-grid" : "view-grid-outline"}
              size={focused ? size + 4 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "My Cart",
          headerTitleAlign: "center",
          headerTransparent: true,

          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={focused ? size + 4 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              size={focused ? size + 3 : size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
