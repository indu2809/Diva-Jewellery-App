import { useCart } from "@/src/context/CartContext";
import { products } from "@/src/data/products";
import { useLocalSearchParams } from "expo-router";
import Checkout from "../checkout";
export default function CheckoutPage() {
  const { type, productId } = useLocalSearchParams();
  const { cartItems } = useCart();

  let items: any[] = [];
  if (type === "cart") {
    items = cartItems;
  } else {
    const product = products.find((item) => item.id === productId);

    if (product) {
      items = [
        {
          ...product,
          quantity: 1,
        },
      ];
    }
  }

  return <Checkout item={items} />;
}
