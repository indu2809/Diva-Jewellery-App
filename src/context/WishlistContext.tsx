import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { useAuth } from "./AuthContext";

type wishlistContextType = {
  wishlist: string[];
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
};

const wishlistContext = createContext<wishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, SetWishlist] = useState<string[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) return;

      const profile = await getUserProfile(user.uid);

      SetWishlist(profile?.wishlist || []);
    };

    loadWishlist();
  }, [user]);

  const addToWishlist = async (id: string) => {
    if (!user) return;

    const updatedWishlist = wishlist.includes(id)
      ? wishlist
      : [...wishlist, id];

    SetWishlist(updatedWishlist);
    try {
      await updateUserProfile(user.uid, {
        wishlist: updatedWishlist,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!user) return;

    const updatedWishlist = wishlist.filter((item) => item !== id);

    SetWishlist(updatedWishlist);
    try {
      await updateUserProfile(user.uid, {
        wishlist: updatedWishlist,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <wishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(wishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};
