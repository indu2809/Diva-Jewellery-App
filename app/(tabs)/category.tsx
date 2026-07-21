import CategoryTab from "@/src/components/CategoryTabCard";
import SearchBar from "@/src/components/SearchBar";
import { useTheme } from "@/src/context/ThemeContext";
import { Category } from "@/src/data/categories";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//Layout of the category tab in tabBar which reaches out to categoryTab

export default function CategoryScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const filteredCategories = Category.filter(
    (item) =>
      item.category.toLowerCase().includes(searchText.toLowerCase()) ||
      item.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{}}>
        <View style={{ padding: 10, marginBottom: 10 }}>
          <SearchBar value={searchText} onChangeText={setSearchText} />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              padding: 20,
            }}
          >
            {searchText && filteredCategories.length === 0 ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  textAlign: "center",
                  justifyContent: "center",
                  paddingHorizontal: 85,
                  paddingVertical: 320,
                }}
              >
                No categories found
              </Text>
            ) : (
              (searchText ? filteredCategories : Category).map((category) => (
                <CategoryTab
                  key={category.id}
                  category={category.category}
                  title={category.title}
                  image={category.image}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
