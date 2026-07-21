import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { useAuth } from "./AuthContext";
type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: any;
  description: string;
  quantity: number;
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;

      const profile = await getUserProfile(user.uid);

      setCartItems(profile?.cart || []);
    };

    loadCart();
  }, [user]);

  const addToCart = async (product: Product) => {
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      if (!user) return;
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      setCartItems(updatedCart);

      try {
        await updateUserProfile(user.uid, { cart: updatedCart });
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!user) return;
      const updatedCart = [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
      setCartItems(updatedCart);
      try {
        await updateUserProfile(user.uid, { cart: updatedCart });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((product) => product.id !== id);
    setCartItems(updatedCart);
  };
  const increaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product,
      ),
    );
  };
  const decreaseQuantity = (id: string) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
