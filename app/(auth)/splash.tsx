import { Stack } from "expo-router";
import { Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAF7F2",
        }}
      >
        <Image
          source={require("../../assets/logo/splash.png")}
          style={{
            width: 1000,
            height: 800,
            resizeMode: "contain",
          }}
        />
      </View>
    </>
  );
}
