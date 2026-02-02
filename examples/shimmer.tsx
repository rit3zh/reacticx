import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import { ShimmerGroup, Shimmer } from "@/components";
import { useState, useEffect } from "react";

export default function App(_$_: Record<string, unknown>) {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined },
          ]}
        >
          Profile
        </Text>
        <View style={styles.iconButton}>
          <SymbolView name="gear" size={20} tintColor="#fff" />
        </View>
      </View>

      <View style={styles.profileCard}>
        <ShimmerGroup
          isLoading={isLoading}
          preset="dark"
          duration={1000}
          direction="leftToRight"
        >
          <Shimmer style={styles.avatar}>
            <View style={styles.avatarPlaceholder}>
              <SymbolView name="person.fill" size={32} tintColor="#666" />
            </View>
          </Shimmer>
          <Shimmer style={styles.nameSkeleton}>
            <Text
              style={[
                styles.name,
                {
                  fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
                },
              ]}
            >
              Rit3zh
            </Text>
          </Shimmer>
          <Shimmer style={styles.usernameSkeleton}>
            <Text
              style={[
                styles.username,
                { fontFamily: fontLoaded ? "SfProRounded" : undefined },
              ]}
            >
              @rit3zh
            </Text>
          </Shimmer>

          <View style={styles.statsRow}>
            <Shimmer style={styles.statBox}>
              <View style={styles.statContent}>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      fontFamily: fontLoaded
                        ? "HelveticaNowDisplay"
                        : undefined,
                    },
                  ]}
                >
                  124
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    {
                      fontFamily: fontLoaded ? "SfProRounded" : undefined,
                    },
                  ]}
                >
                  Posts
                </Text>
              </View>
            </Shimmer>

            <Shimmer style={styles.statBox}>
              <View style={styles.statContent}>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      fontFamily: fontLoaded
                        ? "HelveticaNowDisplay"
                        : undefined,
                    },
                  ]}
                >
                  1.2K
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    {
                      fontFamily: fontLoaded ? "SfProRounded" : undefined,
                    },
                  ]}
                >
                  Followers
                </Text>
              </View>
            </Shimmer>

            <Shimmer style={styles.statBox}>
              <View style={styles.statContent}>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      fontFamily: fontLoaded
                        ? "HelveticaNowDisplay"
                        : undefined,
                    },
                  ]}
                >
                  856
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    {
                      fontFamily: fontLoaded ? "SfProRounded" : undefined,
                    },
                  ]}
                >
                  Following
                </Text>
              </View>
            </Shimmer>
          </View>

          <Shimmer style={styles.buttonSkeleton}>
            <View style={styles.buttonInner}>
              <Text
                style={[
                  styles.buttonText,
                  { fontFamily: fontLoaded ? "SfProRounded" : undefined },
                ]}
              >
                Edit Profile
              </Text>
            </View>
          </Shimmer>
        </ShimmerGroup>
      </View>

      <Text
        style={[
          styles.infoText,
          { fontFamily: fontLoaded ? "SfProRounded" : undefined },
        ]}
      >
        {isLoading ? "Loading profile..." : "Profile loaded!"}
      </Text>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    marginHorizontal: 24,
    backgroundColor: "#141414",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameSkeleton: {
    width: 180,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
  usernameSkeleton: {
    width: 120,
    height: 18,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -8,
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    width: "100%",
  },
  statBox: {
    flex: 1,
    height: 70,
    borderRadius: 16,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },
  statContent: {
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
  },
  buttonSkeleton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1c1c1c",
    marginTop: 8,
    overflow: "hidden",
  },
  buttonInner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 24,
  },
});
