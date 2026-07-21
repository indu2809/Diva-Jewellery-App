import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { getUserProfile, updateUserProfile } from "@/src/services/userService";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Snackbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AccountCard() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const profile = await getUserProfile(user.uid);

      if (profile) {
        setName(profile.name || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    if (!name.trim()) {
      Alert.alert("Validation Error", "Name Required");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Validation Error", "Phone number is required");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Validation Error", "Enter a valid 10-digit phone number");
      return;
    }

    if (!address.trim()) {
      Alert.alert("Validation Error", "Address is required");
      return;
    }

    try {
      await updateUserProfile(user.uid, {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });

      setVisible(true);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const details = [
    { label: "Name", value: name || "Not Added" },
    { label: "Email", value: profile?.email || user?.email },
    { label: "Phone", value: phone || "Not Added" },
    { label: "Address", value: address || "Not Added" },
  ];
  return (
    <View style={{ justifyContent: "center" }}>
      <Stack.Screen
        options={{ title: "My Account", headerTransparent: true }}
      />
      <SafeAreaView style={{ marginTop: 20 }}>
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <Avatar.Icon
            size={90}
            icon="account"
            style={{
              backgroundColor: colors.primary,
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: colors.text,
              }}
            >
              {name || "Complete Profile"}
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
              }}
            >
              {profile?.email || user?.email}
            </Text>
          </View>
        </View>
        {!isEditing ? (
          <>
            <View
              style={{
                backgroundColor: colors.background,
                padding: 40,
                margin: 20,
                paddingHorizontal: 20,
                paddingVertical: 20,
                elevation: 12,
                borderRadius: 18,
                justifyContent: "center",
                gap: 20,
              }}
            >
              {details.map((item) => (
                <View
                  key={item.label}
                  style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                >
                  <Text style={{ opacity: 0.7 }}>{item.label}</Text>
                  <Text style={{ fontSize: 16 }}>{item.value}</Text>
                </View>
              ))}
              <Button
                mode="contained"
                buttonColor={colors.primary}
                onPress={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </View>
          </>
        ) : (
          <>
            <View
              style={[
                styles.menu,
                {
                  backgroundColor: colors.background,
                },
              ]}
            >
              <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                cursorColor={colors.primary}
                activeOutlineColor={colors.primary}
                style={{ marginBottom: 12 }}
              />

              <TextInput
                label="Email"
                value={profile?.email || user?.email || ""}
                editable={false}
                mode="outlined"
                style={{ marginBottom: 12 }}
              />

              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                mode="outlined"
                style={{ marginBottom: 12 }}
                cursorColor={colors.primary}
                activeOutlineColor={colors.primary}
              />

              <TextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                mode="outlined"
                cursorColor={colors.primary}
                activeOutlineColor={colors.primary}
                style={{ marginBottom: 20 }}
              />

              <Button
                mode="contained"
                buttonColor={colors.primary}
                onPress={handleSave}
              >
                Save Changes
              </Button>
            </View>
          </>
        )}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
          wrapperStyle={{
            bottom: -160,
            width: 380,
            left: 16,
            right: 16,
          }}
          style={{
            backgroundColor: colors.primary,
          }}
        >
          Profile updated successfully
        </Snackbar>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  headerCard: {
    alignItems: "center",
    margin: 18,
    padding: 16,
    borderRadius: 20,
    elevation: 2,
    gap: 15,
    flexDirection: "row",
    marginTop: 50,
  },
  menu: {
    margin: 16,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 2,
  },
});
