import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useFonts } from "expo-font";
import { ScaleCarousel } from "@/components/molecules/scale-carousel";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    StretchPro: require("@/assets/fonts/StretchPro.otf"),
  });

  const MOVIES = [
    {
      image: {
        uri: "https://i.pinimg.com/736x/7c/22/18/7c221896796b9c3bc1f462f68957402d.jpg",
      },
      title: "INCEPTION",
      genre: "Sci-Fi",
      rating: "8.8",
    },
    {
      image: {
        uri: "https://i.pinimg.com/1200x/0b/34/ce/0b34ce2145b475247577a5d438a199b0.jpg",
      },
      title: "INTERSTELLAR",
      genre: "Adventure",
      rating: "8.7",
    },
    {
      image: {
        uri: "https://i.pinimg.com/1200x/e1/6c/f5/e16cf5df099827fe785e416c65802b2d.jpg",
      },
      title: "BLADE RUNNER",
      genre: "Thriller",
      rating: "8.1",
    },
    {
      image: {
        uri: "https://i.pinimg.com/736x/13/04/e1/1304e1b74fdbe55bd6c16aa694c447b0.jpg",
      },
      title: "THE MATRIX",
      genre: "Action",
      rating: "8.7",
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <View style={styles.iconButton}>
          <SymbolView name="line.3.horizontal" size={20} tintColor="#fff" />
        </View>
        <Text
          style={[
            styles.topTitle,
            { fontFamily: fontLoaded ? "SfProRounded" : undefined },
          ]}
        >
          CINEMA
        </Text>
        <View style={styles.iconButton}>
          <SymbolView name="magnifyingglass" size={20} tintColor="#fff" />
        </View>
      </View>

      <ScaleCarousel
        data={MOVIES}
        itemWidth={SCREEN_WIDTH}
        itemHeight={SCREEN_HEIGHT * 0.75}
        scaleRange={[1.4, 1, 1.4]}
        rotationRange={[15, 0, -15]}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradient}
            />
            <View style={styles.movieInfo}>
              <View style={styles.ratingBadge}>
                <SymbolView name="star.fill" size={14} tintColor="#FFD700" />
                <Text
                  style={[
                    styles.ratingText,
                    { fontFamily: fontLoaded ? "SfProRounded" : undefined },
                  ]}
                >
                  {item.rating}
                </Text>
              </View>
              <Text
                style={[
                  styles.movieTitle,
                  {
                    fontFamily: fontLoaded ? "StretchPro" : undefined,
                  },
                ]}
              >
                {item.title}
              </Text>
              <View style={styles.genreRow}>
                <View style={styles.genrePill}>
                  <Text
                    style={[
                      styles.genreText,
                      { fontFamily: fontLoaded ? "SfProRounded" : undefined },
                    ]}
                  >
                    {item.genre}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomActions}>
        <View style={[styles.actionButton, styles.primaryButton]}>
          <SymbolView name="play.fill" size={20} tintColor="#000" />
          <Text
            style={[
              styles.primaryButtonText,
              { fontFamily: fontLoaded ? "SfProRounded" : undefined },
            ]}
          >
            Watch Now
          </Text>
        </View>
        <View style={styles.actionButton}>
          <SymbolView name="plus" size={22} tintColor="#fff" />
        </View>
        <View style={styles.actionButton}>
          <SymbolView name="info.circle" size={22} tintColor="#fff" />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 3,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  movieCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "500%",
  },
  movieInfo: {
    gap: 12,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,215,0,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFD700",
  },
  movieTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  genreRow: {
    flexDirection: "row",
    gap: 8,
  },
  genrePill: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  genreText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  bottomActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
    alignItems: "center",
  },
  actionButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
});
