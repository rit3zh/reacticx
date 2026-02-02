import Accordion from "@/components/molecules/accordion";
import { AccordionTheme } from "@/components/molecules/accordion/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CUSTOM_THEME: AccordionTheme = {
  backgroundColor: "#000",
  borderColor: "#000",
  headlineColor: "#fafafa",
  iconColor: "#fafafa",
  subtitleColor: "#a1a1aa",
};

export default function ProductAccordion() {
  return (
    <View style={styles.container}>
      <Accordion type="single" theme={CUSTOM_THEME} spacing={0}>
        <Accordion.Item value="product-info" icon="cross">
          <Accordion.Trigger>
            <Text style={styles.triggerText}>Product Information</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text style={styles.contentText}>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </Text>
            <Text style={[styles.contentText, { marginTop: 12 }]}>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="shipping">
          <Accordion.Trigger>
            <Text style={styles.triggerText}>Shipping Details</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text style={styles.contentText}>
              Free shipping on orders over $50. Standard delivery takes 3-5
              business days. Express shipping available at checkout.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="returns">
          <Accordion.Trigger>
            <Text style={styles.triggerText}>Return Policy</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text style={styles.contentText}>
              30-day money-back guarantee. Items must be unused and in original
              packaging. Contact support to initiate a return.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  triggerText: {
    color: "#fafafa",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  contentText: {
    color: "#a1a1aa",
    fontSize: 14,
    lineHeight: 22,
  },
});
