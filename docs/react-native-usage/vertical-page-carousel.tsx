import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { VerticalPageCarousel } from "@/components/molecules/vertical-page-carousel";

const { height } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    name: "MY DEAR MELANCHOLY",
    artist: "The Weeknd",
    year: "2018",
    image: {
      uri: "https://i.pinimg.com/1200x/18/e6/e8/18e6e8e2d2b8c5b4dd77a4ae705bf96a.jpg",
    },
  },
  {
    id: "2",
    name: "RANDOM ACCESS MEMORIES",
    artist: "Daft Punk",
    year: "2013",
    image: {
      uri: "https://i.pinimg.com/1200x/91/52/b2/9152b2dc174934279cda4509b0931434.jpg",
    },
  },
  {
    id: "3",
    name: "CURRENTS",
    artist: "Tame Impala",
    year: "2015",
    image: {
      uri: "https://i.pinimg.com/1200x/1e/38/7f/1e387f131098067f7a9be0bc68b0b6f2.jpg",
    },
  },
  {
    id: "4",
    name: "PLASTIC BEACH",
    artist: "Gorillaz",
    year: "2010",
    image: {
      uri: "https://i.pinimg.com/736x/43/e0/e0/43e0e0a542c0ccfbc5cf1b802bcf2d66.jpg",
    },
  },
];

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    StretchPro: require("@/assets/fonts/StretchPro.otf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <VerticalPageCarousel
        data={DATA}
        itemHeight={height * 0.65}
        cardMargin={14}
        pagingEnabled
        cardSpacing={6}
        scaleRange={[0.88, 1, 0.88]}
        opacityRange={[0.6, 1, 0.6]}
        useBlur={true}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <View style={styles.info}>
              <Text
                style={[
                  styles.year,
                  fontLoaded && { fontFamily: "SfProRounded" },
                ]}
              >
                {item.year}
              </Text>
              <Text
                style={[
                  styles.name,
                  fontLoaded && { fontFamily: "StretchPro" },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.artist,
                  fontLoaded && { fontFamily: "SfProRounded" },
                ]}
              >
                {item.artist}
              </Text>
            </View>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  info: {
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  year: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
  },
  artist: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
  },
});
