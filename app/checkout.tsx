import Summary from "@/src/components/OrderSummary";
import { useCart } from "@/src/context/CartContext";
type Product = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  category: string;
  image: any;
  description: string;
};

type Props = {
  item: Product[];
};

export default function Checkout({ item }: Props) {
  const { cartItems } = useCart();

  return <Summary items={item} />;
}
