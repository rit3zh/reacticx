import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import type { IPrivacyNoticeLink } from "./PrivacyNoticeLink.type";
import { DEFAULT_SIZE, DEFAULT_TINT } from "./const";

export const PrivacyNoticeLink: React.FC<IPrivacyNoticeLink> &
  React.FunctionComponent<IPrivacyNoticeLink> = memo<IPrivacyNoticeLink>(
  ({
    children,
    ...props
  }: IPrivacyNoticeLink): React.ReactNode &
    React.JSX.Element &
    React.ReactElement => {
    return (
      <View style={[styles.container, props.style]}>
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
          <Text
            style={[
              styles.text,
              {
                color: props.tint ?? DEFAULT_TINT,
                fontSize: props.size ?? DEFAULT_SIZE,
              },
            ]}
          >
            {children}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

export default memo<
  React.FC<IPrivacyNoticeLink> & React.FunctionComponent<IPrivacyNoticeLink>
>(PrivacyNoticeLink);

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "#007AFF",
    fontSize: 14,
  },
});
