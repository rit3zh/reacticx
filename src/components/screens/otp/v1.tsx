import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React, { memo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

const SPACING = 10;
const WIDTH = Dimensions.get("window").width;

export const OtpV1: React.FunctionComponent & React.FC = memo(
  (): React.ReactNode & React.JSX.Element => {
    const [pin, setPin] = useState<string[]>(["", "", "", ""]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleKeyPress = (value: string) => {
      if (pin[activeIndex] !== "") return;

      impactAsync(ImpactFeedbackStyle.Medium);
      if (activeIndex < 4) {
        const newPin = [...pin];
        newPin[activeIndex] = value;
        setPin(newPin);
        if (activeIndex < 3) {
          setActiveIndex(activeIndex + 1);
        }
      }
    };

    const handleBackspace = () => {
      impactAsync(ImpactFeedbackStyle.Soft);
      if (activeIndex > 0 || pin[activeIndex] !== "") {
        const newPin = [...pin];
        if (pin[activeIndex] !== "") {
          newPin[activeIndex] = "";
          setPin(newPin);
        } else {
          setActiveIndex(activeIndex - 1);
          newPin[activeIndex - 1] = "";
          setPin(newPin);
        }
      }
    };

    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>Enter Transaction Pin</Text>
          <Text style={styles.headingSubtitle}>
            Enter your PIN to authorize this transaction
          </Text>
        </View>

        <View style={styles.otpBoxContainer}>
          {Array.from({ length: 4 }).map((_, index: number) => (
            <View
              key={index}
              style={[
                styles.otpBox,
                activeIndex === index && styles.otpBoxActive,
              ]}
            >
              <Text style={styles.otpText}>{pin[index] ? "●" : ""}</Text>
            </View>
          ))}
        </View>

        <View style={styles.keyboardContainer}>
          <View style={styles.keyboardView}>
            <View style={styles.keyboardHeader}>
              <Ionicons name="shield-checkmark" size={16} color="#71717a" />
              <Text style={styles.keyboardHeaderText}>Secure Keypad</Text>
            </View>

            <View style={styles.keyboardGrid}>
              <View style={styles.keyboardRow}>
                <KeypadButton value="1" onPress={handleKeyPress} />
                <KeypadButton value="2" onPress={handleKeyPress} />
                <KeypadButton value="3" onPress={handleKeyPress} />
              </View>
              <View style={styles.keyboardRow}>
                <KeypadButton value="4" onPress={handleKeyPress} />
                <KeypadButton value="5" onPress={handleKeyPress} />
                <KeypadButton value="6" onPress={handleKeyPress} />
              </View>
              <View style={styles.keyboardRow}>
                <KeypadButton value="7" onPress={handleKeyPress} />
                <KeypadButton value="8" onPress={handleKeyPress} />
                <KeypadButton value="9" onPress={handleKeyPress} />
              </View>

              <View style={styles.keyboardRow}>
                <KeypadButton value="•" onPress={() => {}} disabled />
                <KeypadButton value="0" onPress={handleKeyPress} />
                <KeypadButton
                  value="backspace"
                  onPress={handleBackspace}
                  isBackspace
                />
              </View>
            </View>
          </View>
          <View style={styles.footerRow}>
            <Pressable style={[styles.confirmButton]} onPress={() => {}}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </Pressable>
            <Pressable style={styles.fingerPrint} onPress={() => {}}>
              <Ionicons name="finger-print" size={20} color="#71717a" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  },
);

interface KeypadButtonProps {
  value: string;
  onPress: (value: string) => void;
  disabled?: boolean;
  isBackspace?: boolean;
}

const KeypadButton: React.FC<KeypadButtonProps> = memo(
  ({ value, onPress, disabled, isBackspace }) => {
    return (
      <Pressable
        style={styles.keypadButton}
        onPress={() => !disabled && onPress(value)}
        disabled={disabled}
      >
        {isBackspace ? (
          <Ionicons name="backspace-outline" size={22} color="#fafafa" />
        ) : (
          <Text
            style={[styles.keypadButtonText, disabled && styles.disabledText]}
          >
            {value}
          </Text>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING * 6,
    gap: SPACING * 1.2,
  },
  lockIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#18181b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING,
  },
  headingTitle: {
    marginTop: SPACING,
    fontSize: 22,
    color: "#fafafa",
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  headingSubtitle: {
    fontSize: 13.5,
    color: "#71717a",
    fontWeight: "400",
  },
  otpBox: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 6,
    borderWidth: 1.5,
    borderColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  otpBoxActive: {
    borderColor: "#fafafa",
    backgroundColor: "#18181b",
  },
  otpText: {
    fontSize: 24,
    color: "#fafafa",
    fontWeight: "400",
  },
  otpBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING * 4,
  },
  keyboardContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  keyboardView: {
    backgroundColor: "#09090b",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#27272a",
    overflow: "hidden",
  },
  keyboardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "center",
  },
  keyboardHeaderText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#71717a",
    letterSpacing: 0.2,
  },
  keyboardGrid: {
    gap: 12,
  },
  keyboardRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  keypadButton: {
    height: 54,
    backgroundColor: "#18181b",
    borderRadius: 10,
    alignItems: "center",
    width: (WIDTH - 64) / 3 - 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  keypadButtonPressed: {
    backgroundColor: "#27272a",
    transform: [{ scale: 0.98 }],
  },
  keypadButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fafafa",
  },
  disabledText: {
    opacity: 0.2,
  },
  footerRow: {
    marginTop: SPACING * 1.5,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  confirmButtonText: {
    color: "#09090b",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  fingerPrint: {
    backgroundColor: "#18181b",
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
});
