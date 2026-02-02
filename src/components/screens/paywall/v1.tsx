import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line, Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const SPACING = 20;
const ICON_SIZE = 50;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const MAX_TEXT_WIDTH = WIDTH - SPACING * 6 - ICON_SIZE;

interface Benefits {
  title: string;
  description: string;
  icon: React.ReactNode;
  done?: boolean;
}

const CheckIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke="#000"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BENEFITS: Benefits[] = [
  {
    title: "Get your Focus Diagnosis",
    description: "You successfully started your journey",
    icon: <CheckIcon />,
    done: true,
  },
  {
    title: "Today: Improve Your Focus",
    description:
      "Block Apps automatically, get your detailed stats and stay on track",
    icon: <LockIcon />,
    done: false,
  },
  {
    title: "Day 6: See first results",
    description:
      "We'll send you a notification with a report to see how you improved this week",
    icon: <BellIcon />,
    done: false,
  },
  {
    title: "Day 7: Trial Ends",
    description:
      "Your subscription will start on day 7. Cancel anytime within 24hrs",
    icon: <StarIcon />,
    done: false,
  },
];

interface TimelineItemProps {
  item: Benefits;
  index: number;
  isLast: boolean;
}

const TimelineItem = memo(({ item, index, isLast }: TimelineItemProps) => {
  const LINE_HEIGHT = item.done ? 50 : 100;

  return (
    <View
      style={[
        styles.timelineItem,
        {
          marginBottom: item.done ? 30 : 40,
        },
      ]}
    >
      <View style={styles.timelineColumn}>
        <View
          style={[styles.iconContainer, item.done && styles.iconContainerDone]}
        >
          {item.icon}
        </View>

        {!isLast && (
          <View style={styles.lineContainer}>
            <Svg height={LINE_HEIGHT} width={6}>
              {!item.done && (
                <Defs>
                  <LinearGradient
                    id={`gradient${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <Stop offset="0" stopColor="#4a4a4a" stopOpacity="1" />
                    <Stop offset="0.6" stopColor="#2a2a2a" stopOpacity="1" />
                    <Stop offset="1" stopColor="#0a0a0a" stopOpacity="0.5" />
                  </LinearGradient>
                </Defs>
              )}
              <Line
                x1={3}
                y1="0"
                x2={3}
                y2={LINE_HEIGHT}
                stroke={item.done ? "#fff" : `url(#gradient${index})`}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={item.done ? "0" : "4,8"}
              />
            </Svg>
          </View>
        )}
      </View>

      <View style={styles.contentColumn}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
});

export const PayV1: React.FunctionComponent & React.FC = memo(
  (): React.ReactNode & React.JSX.Element => {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={styles.floatingCancelButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </View>

          <View style={styles.headingTitleContainer}>
            <Text style={styles.headingTitle}>
              Start your Free Week and gain{" "}
              <Text style={styles.boldText}>2+ hours</Text> back
            </Text>
          </View>

          <View style={styles.timelineContainer}>
            {BENEFITS.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLast={index === BENEFITS.length - 1}
              />
            ))}
          </View>

          <View
            style={{
              backgroundColor: "#0f0f0f",
              height: HEIGHT * 2,
              borderRadius: 30,
            }}
          >
            <View style={styles.footer}>
              <Text style={styles.footerHeadingTopTitle}>
                Try free For 1 week
              </Text>

              <Text style={styles.footerHeadingSecondTitle}>
                $99.99/year ($8.33/month)
              </Text>

              <Text style={styles.footerHeadingSubTitle}>
                + share with up to 5 family members
              </Text>

              <View style={styles.footerButtonContainer}>
                <Text style={styles.footerButtonText}>
                  Start Your Free Week
                </Text>
              </View>

              <View style={styles.footerTextRow}>
                <Ionicons name="checkmark" color={"#6B6B6B"} size={12} />
                <Text style={styles.footerText}>No payment due now!</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020202",
  },

  floatingCancelButton: {
    position: "absolute",
    top: SPACING / 1.5,
    right: SPACING,
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: "#000",
    borderColor: "#1a1a1a",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  container: {
    flex: 1,
  },
  headingTitleContainer: {
    alignItems: "center",
    paddingTop: SPACING * 4,
    paddingBottom: SPACING * 1,
    paddingHorizontal: SPACING,
  },
  headingTitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
    maxWidth: WIDTH - SPACING * 2,
  },
  boldText: {
    fontWeight: "bold",
  },
  timelineContainer: {
    paddingHorizontal: SPACING * 1.5,
    paddingTop: SPACING,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: SPACING / 2,
  },
  timelineColumn: {
    alignItems: "center",
    marginRight: SPACING * 1.5,
    width: ICON_SIZE,
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1a1a1a",
    marginBottom: 8,
  },
  iconContainerDone: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  lineContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentColumn: {
    flex: 1,
    paddingTop: 4,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    color: "#999",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: MAX_TEXT_WIDTH,
  },

  footer: { marginTop: SPACING * 1.5, gap: SPACING / 2, alignItems: "center" },

  footerHeadingTopTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  footerHeadingSecondTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  footerHeadingSubTitle: {
    color: "#6B6B6B",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  footerButtonContainer: {
    marginTop: SPACING / 1.5,
    backgroundColor: "#fff",
    paddingVertical: SPACING,
    paddingHorizontal: SPACING * 5,
    borderRadius: 30,
  },

  footerButton: {},
  footerButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  footerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: SPACING / 2,
  },
  footerText: {
    color: "#6B6B6B",
    fontSize: 12,
  },
});
