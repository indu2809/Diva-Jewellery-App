import { createContext, useState } from "react";
import { products } from "../data/products";
import { useAuth } from "./AuthContext";
type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: any;
  description: string;
};

type Order = {
  id: string;
  items: Product[];
  totalAmount: number;
  status: string;
  createdAt: string;
};
type OrderContextType = {
  Order: Order[];
  placeOrder: (id: string) => Promise<void>;
  getOrder: (id: string) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [order, SetOrder] = useState<Order[]>([]);
  const { user } = useAuth();
  const placeOrder = (id: string) => {
    if (!user) return;
    const orderItem = products.find((product) => product.id === id);
    /* if (orderItem) {
      SetOrder((prev) => [...prev, orderItem]);
    }*/
  };
}
