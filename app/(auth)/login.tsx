import { auth } from "@/src/config/firebase";
import { useTheme } from "@/src/context/ThemeContext";
import { signInWithGoogle } from "@/src/services/authService";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Divider, TextInput } from "react-native-paper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { colors } = useTheme();
  const signIn = async () => {
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    if (!password.trim()) {
      setError("Password Required");
      return;
    }
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(error);
      setError("Invalid Email or Password");
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset ", "Email Sent! Check your inbox ");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          padding: 24,
          gap: 20,
          backgroundColor: colors.background,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontSize: 32,
            fontWeight: "700",
            fontFamily: "PlayfairDisplay-Bold",
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: colors.textSecondary,
            fontSize: 16,
          }}
        >
          Sign in to continue to Diva
        </Text>
        <TextInput
          placeholder="Enter Your Email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          style={styles.TextInput}
          mode="outlined"
          placeholderTextColor={colors.placeholder}
          activeOutlineColor={colors.primary}
          outlineColor={colors.border}
          left={<TextInput.Icon icon="email" color={colors.primary} />}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          mode="outlined"
          style={[
            styles.TextInput,
            {
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholderTextColor={colors.placeholder}
          activeOutlineColor={colors.primary}
          outlineColor={colors.border}
          secureTextEntry
          left={<TextInput.Icon icon="lock" color={colors.primary} />}
        />
        <Text
          style={{ textAlign: "right", color: colors.primary, marginTop: -10 }}
          onPress={resetPassword}
        >
          Forgot Password?
        </Text>
        {error ? (
          <Text
            style={{
              color: colors.error,
              marginTop: 8,
            }}
          >
            {error}
          </Text>
        ) : null}
        <View style={{ marginTop: 10 }}>
          <Button
            mode="contained"
            buttonColor={colors.primary}
            style={styles.button}
            onPress={signIn}
          >
            Login
          </Button>
        </View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Divider style={{ height: 1, width: 145 }} />
          <Text style={{ marginHorizontal: 20, marginTop: -10 }}>Or</Text>
          <Divider style={{ height: 1, width: 145 }} />
        </View>

        <Button
          mode="outlined"
          style={[styles.button, { borderColor: colors.primary }]}
          textColor={colors.text}
          onPress={handleGoogle}
          loading={loading}
          disabled={loading}
          icon={() => <AntDesign name="google" size={18} color="#C9A227" />}
        >
          Continue with Google
        </Button>
        <Text
          style={{
            textAlign: "center",
            color: colors.textSecondary,
            fontSize: 16,
            textDecorationLine: "underline",
          }}
          onPress={() => router.replace("/(auth)/register")}
        >
          Don't have an account ? Sign Up
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    paddingHorizontal: 12,
  },

  button: {
    borderRadius: 14,
    height: 46,
    alignItems: "center",
  },
});
