import CategoryScreen from "@/src/components/categoryScreen";
import { products } from "@/src/data/products";
import { Stack, useLocalSearchParams } from "expo-router";

export default function DetailPage() {
  const { category } = useLocalSearchParams();
  const filteredProducts = products.filter(
    (item) => item.category === category,
  );
  return (
    <>
      <Stack.Screen
        options={{
          title:
            String(category).charAt(0).toUpperCase() +
            String(category).slice(1),
          headerTitleAlign: "center",
        }}
      />
      <CategoryScreen products={filteredProducts} />
    </>
  );
}
