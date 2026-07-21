import DetailScreen from "@/src/components/ProductDetails";
import { products } from "@/src/data/products";
import { useLocalSearchParams } from "expo-router";

export default function ProductPage() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  if (!product) return null;

  return <DetailScreen product={product} />;
}
