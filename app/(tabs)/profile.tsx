import { auth } from "@/src/config/firebase";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { getUserProfile } from "@/src/services/userService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useFocusEffect } from "expo-router";
import { signOut } from "firebase/auth";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItem = {
  icon: string;
  title: string;
  path: string;
  action: string;
};

export default function ProfileScreen({ icon, title, path, action }: MenuItem) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const menuItems = [
    {
      icon: "heart-outline",
      title: "Wishlist",
      path: "/wishlist",
    },
    {
      icon: "cart",
      title: "My Cart",
      path: "/(tabs)/cart",
    },

    {
      icon: "account-outline",
      title: "Account Details",
      path: "/Profile/account",
    },

    {
      icon: "delete-outline",
      title: "Delete Account",
      path: "Profile/delete",
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      path: "/Profile/support",
    },
  ] as const;

  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        if (!user) return;

        const profile = await getUserProfile(user.uid);

        if (profile) {
          setProfile(profile);
          setName(profile.name || "");
        }
      };

      loadProfile();
    }, [user]),
  );
  const handlelogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}

        <View
          style={[styles.headerCard, { backgroundColor: colors.background }]}
        >
          <Avatar.Icon
            size={90}
            icon="account"
            style={{ backgroundColor: colors.primary }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.name, { color: colors.text }]}>
              {profile?.name || "Username"}
            </Text>

            <Text style={[styles.email, { color: colors.textSecondary }]}>
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.quickCard,

              {
                justifyContent: "space-between",
                backgroundColor: colors.background,
              },
            ]}
            onPress={() => router.push("/orders")}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  backgroundColor: colors.background,
                  gap: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={28}
                color={colors.primary}
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ color: colors.text, fontSize: 18, fontWeight: 500 }}
                >
                  My Orders
                </Text>
                <Text>View your order history</Text>
              </View>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Menu */}

        <View
          style={[styles.menuContainer, { backgroundColor: colors.background }]}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.path)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={colors.primary}
                />

                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                  }}
                >
                  {item.title}
                </Text>
              </View>

              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}

        <Button
          mode="contained"
          buttonColor={colors.primary}
          style={styles.logoutButton}
          onPress={handlelogout}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerCard: {
    alignItems: "center",
    margin: 18,
    padding: 16,
    borderRadius: 20,
    elevation: 2,
    flexDirection: "row",
    gap: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
  },

  email: {
    marginTop: 5,
    fontSize: 14,
  },

  quickActions: {
    marginHorizontal: 12,
    padding: 5,
  },

  quickCard: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 23,
    borderRadius: 16,
    elevation: 2,
    padding: 10,
    alignItems: "center",
    gap: 10,
  },

  menuContainer: {
    margin: 16,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 2,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },

  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 12,
  },
});
