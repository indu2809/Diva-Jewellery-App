import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignore: getReactNativePersistence exists in the RN bundle
// but is often missing from public TypeScript definitions.
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArNNFMmjgarhamqB7jLGntzbd6R-TDFeA",
  authDomain: "diva-aec1c.firebaseapp.com",
  projectId: "diva-aec1c",
  storageBucket: "diva-aec1c.firebasestorage.app",
  messagingSenderId: "837840170126",
  appId: "1:837840170126:web:cc4b27703f344520f56ddf",
  measurementId: "G-RY3EX2J9KB",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
