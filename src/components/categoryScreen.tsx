import { ScrollView, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ProductCard from "./ProductCard";
//If a Category on home screen is touched it opens this file and list out similar products in that category
type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: any;
  description: string;
};

type Props = {
  products: Product[];
};

export default function CategoryScreen({ products }: Props) {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
              padding: 15,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
