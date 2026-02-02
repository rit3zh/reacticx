import { View, Text, StyleSheet, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { TiltCarousel } from "@/components/molecules/tilt-carousel";
import { LinearGradient } from "expo-linear-gradient";

interface Album {
  id: string;
  image: string;
  title: string;
  artist: string;
}

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
    StretchPro: require("@/assets/fonts/StretchPro.otf"),
  });

  const albums: Album[] = [
    {
      id: "1",
      image: "https://i.scdn.co/image/ab67616d0000b273c5276ed6cb0287df8d9be07f",
      title: "Kill Bill",
      artist: "SZA",
    },
    {
      id: "2",
      image:
        "https://m.media-amazon.com/images/I/91CcNMcqAxL._UF1000,1000_QL80_.jpg",
      title: "Plastic Beach",
      artist: "Gorillaz",
    },
    {
      id: "3",
      image: "https://f4.bcbits.com/img/a3454468726_5.jpg",
      title: "Radical Optimism",
      artist: "Dua Lipa",
    },
    {
      id: "4",
      image:
        "https://www.roughtrade.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0867%2F1120%2F6219%2Ffiles%2F3e7ad5e5-9673-480b-9cbb-e4924836b75e_thumbnail_4096.jpg%3Fv%3D1727333350&w=3840&q=75",
      title: "Future Nostalgia",
      artist: "Dua Lipa",
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      {/* Background */}
      <LinearGradient
        colors={["#000", "#0a0a0a", "#000"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <TiltCarousel
          data={albums}
          itemWidth={350}
          itemHeight={500}
          marginHorizontal={20}
          rotationAngle={16}
          translateYValue={55}
          useBlur={true}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.8)",
                  "rgba(0,0,0,0.95)",
                ]}
                style={styles.gradient}
                locations={[0, 0.5, 0.8, 1]}
              />
              <View style={styles.info}>
                <Text
                  style={[
                    styles.trackTitle,
                    {
                      fontFamily: fontLoaded
                        ? "HelveticaNowDisplay"
                        : undefined,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.artist,
                    { fontFamily: fontLoaded ? "Coolvetica" : undefined },
                  ]}
                  numberOfLines={1}
                >
                  {item.artist}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    color: "#fff",
    letterSpacing: 6,
  },
  carouselContainer: {
    marginTop: 50,
  },
  card: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
  },
  info: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 6,
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 24,
  },
  artist: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 0.8,
  },
});
