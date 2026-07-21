// src/services/auth.ts
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../config/firebase";
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();

    const userInfo = await GoogleSignin.signIn();

    const idToken = userInfo.data?.idToken;

    if (!idToken) {
      throw new Error("No ID Token found");
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(auth, googleCredential);

    return userCredential;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
