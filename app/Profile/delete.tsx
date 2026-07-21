import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { deleteUserAccount } from "@/src/services/userService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeleteAccountScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const providerId = user?.providerData?.[0]?.providerId;

  const handleDelete = async () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteUserAccount(password);

              router.replace("/login");
            } catch (error: any) {
              Alert.alert("Error", error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Delete Account",
          headerTransparent: true,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="delete-empty"
            size={94}
            color="black"
            style={{ marginBottom: 20, marginLeft: 120 }}
          />

          <Text variant="headlineSmall" style={styles.title}>
            Delete Account
          </Text>

          <Text variant="bodyMedium" style={styles.warning}>
            This action is permanent and cannot be undone.
          </Text>

          <View style={styles.list}>
            <Text style={{ fontSize: 18 }}>• Remove your profile</Text>

            <Text style={{ fontSize: 18 }}>• Remove your wishlist</Text>

            <Text style={{ fontSize: 18 }}>• Remove saved preferences</Text>
          </View>

          {providerId === "password" && (
            <TextInput
              label="Current Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={{ marginTop: 20 }}
            />
          )}

          {providerId === "google.com" && (
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
              }}
            >
              You signed in using Google. You'll be asked to sign in again
              before deletion.
            </Text>
          )}

          <Button
            mode="contained"
            buttonColor={colors.primary}
            loading={loading}
            disabled={loading}
            onPress={handleDelete}
            style={{
              marginTop: 24,
            }}
          >
            Delete Account
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
    marginBottom: 130,
  },

  title: {
    marginBottom: 12,
    fontSize: 25,
  },

  warning: {
    marginBottom: 20,
    fontSize: 18,
  },

  list: {
    gap: 8,
  },
});
