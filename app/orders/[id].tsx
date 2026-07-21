import { useLocalSearchParams } from "expo-router";
import OrderDetailCard from "../orderDetails";
export default function OrderPage() {
  const { id } = useLocalSearchParams();

  return <OrderDetailCard id={id as string} />;
}
