import { } from "@/src/config/firebase";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider } from "firebase/auth";
import { Order } from "../components/OrderSummary";
import { auth, db } from "../config/firebase";

export const createUserProfile = async (
  uid: string,
  email: string,
  name = " ",
) => {
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    phone: "",
    address: "",
    wishlist: [],
    cart: [],
    createdAt: new Date(),
  });
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDoc(doc(db, "users", uid));

  return snapshot.data();
};

export const updateUserProfile = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};
export const deleteUserAccount = async (password?: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not found");
  }

  const providerId = user.providerData[0]?.providerId;

  if (providerId === "password") {
    if (!password) {
      throw new Error("Password is required");
    }

    const credential = EmailAuthProvider.credential(user.email!, password);

    await reauthenticateWithCredential(user, credential);
  }

  if (providerId === "google.com") {
    await GoogleSignin.hasPlayServices();

    const signInResult = await GoogleSignin.signIn();

    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error("Failed to get Google token");
    }

    const credential = GoogleAuthProvider.credential(idToken);

    await reauthenticateWithCredential(user, credential);
  }
  await deleteDoc(doc(db, "users", user.uid));

  await deleteUser(user);
};

export const createOrder = async (uid: string, order: Order) => {
  await setDoc(doc(db, "users", uid, "orders", order.id), order);
};

export const getOrders = async (uid: string) => {
  const snapshot = await getDocs(collection(db, "users", uid, "orders"));

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Order),
  }));
};

export const getOrderById = async (uid: string, orderId: string) => {
  const snapshot = await getDoc(doc(db, "users", uid, "orders", orderId));

  return snapshot.data();
};
