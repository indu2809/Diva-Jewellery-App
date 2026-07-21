import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function BannerCard() {
  const banners = [
    require("@/assets/banner/banner1.jpg"),
    require("@/assets/banner/banner2.jpg"),
    require("@/assets/banner/banner3.jpg"),
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / 380);

          setActiveIndex(index);
        }}
      >
        {banners.map((banner, index) => (
          <Image key={index} source={banner} style={styles.banner} />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        {banners.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: activeIndex === index ? "#D4AF37" : "#D3D3D3",
            }}
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  banner: {
    width: 370,
    height: 180,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
});
