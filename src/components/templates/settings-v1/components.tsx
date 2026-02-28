import React, { createContext, useMemo } from "react";
import {
  View,
  Text,
  Switch,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  Image,
} from "react-native";
import { COLOR_SCHEME } from "./const";
import type {
  ISettingsRoot,
  ISettingsSectionProps,
  ISettingsGroupProps,
  ISettingsLabelProps,
  ISettingsFooterProps,
  ISettingsItemProps,
  ISettingsIconProps,
  ISettingsContentProps,
  ISettingsTitleProps,
  ISettingsValueProps,
  ISettingsSwitchProps,
  ISettingsChevronProps,
  ISettingsSeparatorProps,
  ISettingsGroupContext,
} from "./types";

const SettingsGroupContext = createContext<ISettingsGroupContext>({
  hasIcon: false,
});

function groupHasIcon(children: React.ReactNode): boolean {
  let hasIconfound = false;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<any>(child)) return;
    const props = child.props as { children?: React.ReactNode };
    if (props?.children) {
      React.Children.forEach(props.children, (inner) => {
        if (React.isValidElement(inner) && inner.type === SettingsIcon) {
          hasIconfound = true;
        }
      });
    }
  });
  return hasIconfound;
}
function SettingsRoot({ children, style }: ISettingsRoot) {
  return <View style={[styles.root, style]}>{children}</View>;
}

function SettingsSection({ children, style }: ISettingsSectionProps) {
  return <View style={[styles.section, style]}>{children}</View>;
}

function SettingsGroup({ children, style }: ISettingsGroupProps) {
  const hasIcon = useMemo(() => groupHasIcon(children), [children]);

  const items = React.Children.toArray(children).filter(React.isValidElement);
  const withSeparators: React.ReactNode[] = [];

  items.forEach((child, index) => {
    withSeparators.push(
      React.cloneElement(child, { key: `item-${index}` } as any),
    );
    if (index < items.length - 1) {
      withSeparators.push(
        <SettingsSeparator key={`sep-${index}`} inset={hasIcon ? 54 : 16} />,
      );
    }
  });

  return (
    <SettingsGroupContext.Provider value={{ hasIcon }}>
      <View style={[styles.group, style]}>{withSeparators}</View>
    </SettingsGroupContext.Provider>
  );
}

function SettingsLabel({ children }: ISettingsLabelProps) {
  return <Text style={styles.label}>{children.toUpperCase()}</Text>;
}

function SettingsFooter({ children }: ISettingsFooterProps) {
  return <Text style={styles.footer}>{children}</Text>;
}

function SettingsItem({
  children,
  onPress,
  disabled,
  style,
}: ISettingsItemProps) {
  const content = <View style={[styles.itemRow, style]}>{children}</View>;

  if (!onPress || disabled) return content;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.itemPressed]}
      android_ripple={{ color: "rgba(255,255,255,0.08)" }}
    >
      {content}
    </Pressable>
  );
}

function SettingsIcon({
  icon,
  color = "#8E8E93",
  size = 29,
  borderRadius = 6,
}: ISettingsIconProps) {
  return (
    <View
      style={[
        styles.iconBadge,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius,
        },
      ]}
    >
      {icon}
    </View>
  );
}
function SettingsContent({ children, style }: ISettingsContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

function SettingsTitle({ children, style }: ISettingsTitleProps) {
  return (
    <Text style={[styles.title, style]} numberOfLines={1}>
      {children}
    </Text>
  );
}

function SettingsValue({ children }: ISettingsValueProps) {
  return <Text style={styles.valueText}>{children}</Text>;
}

function SettingsSwitch({
  value,
  onValueChange,
  disabled,
}: ISettingsSwitchProps) {
  return (
    <View style={{ transform: [{ scale: 0.85 }] }}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: "#39393D", true: "#34C759" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#39393D"
      />
    </View>
  );
}

function SettingsLargeItem({ children, onPress, style }: ISettingsItemProps) {
  const content = <View style={[styles.largeItemRow, style]}>{children}</View>;

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.itemPressed]}
    >
      {content}
    </Pressable>
  );
}

function SettingsAvatar({ source, size = 64 }: { source: any; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        backgroundColor: "#2C2C2E",
      }}
    >
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
}

function SettingsSubtitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

function SettingsAvatarStack({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {React.Children.map(children, (child, index) => (
        <View
          style={{
            marginLeft: index === 0 ? 0 : -12,
            borderWidth: 2,
            borderColor: COLOR_SCHEME.CARD_ELEVATED,
            borderRadius: 20,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

function SettingsChevron({
  color = "#48484A",
  size = 14,
}: ISettingsChevronProps) {
  return (
    <View style={styles.chevronContainer}>
      <View
        style={[
          styles.chevron,
          {
            width: size * 0.6,
            height: size * 0.6,
            borderColor: color,
          },
        ]}
      />
    </View>
  );
}

function SettingsSeparator({ inset = 16 }: ISettingsSeparatorProps) {
  return (
    <View style={[styles.separatorContainer, { paddingLeft: inset }]}>
      <View style={styles.separator} />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "100%",
    gap: 28,
  } as ViewStyle,

  section: {
    width: "100%",
  } as ViewStyle,

  group: {
    backgroundColor: COLOR_SCHEME.CARD_ELEVATED,
    borderRadius: 12,
    overflow: "hidden",
  } as ViewStyle,

  label: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0.5,
    color: "#8E8E93",
    marginBottom: 8,
    paddingHorizontal: 14,
  } as TextStyle,

  footer: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    color: "#8E8E93",
    marginTop: 8,
    paddingHorizontal: 14,
    maxWidth: "95%",
  } as TextStyle,

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    minHeight: 48,
    gap: 12,
  } as ViewStyle,

  itemPressed: {
    backgroundColor: "rgba(255,255,255,0.08)",
  } as ViewStyle,

  iconBadge: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  content: {
    flex: 1,
    justifyContent: "center",
  } as ViewStyle,

  title: {
    fontSize: 17,
    fontWeight: "400",
    color: "#FFFFFF",
  } as TextStyle,

  valueText: {
    fontSize: 17,
    color: "#8E8E93",
    marginRight: 4,
  } as TextStyle,

  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 12,
  } as ViewStyle,

  chevron: {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "-45deg" }],
  } as ViewStyle,

  separatorContainer: {
    paddingLeft: 16,
  } as ViewStyle,

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#38383A",
  } as ViewStyle,

  largeItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  } as ViewStyle,

  subtitle: {
    fontSize: 15,
    color: "#8E8E93",
    marginTop: 2,
  } as TextStyle,
});

export {
  SettingsRoot as Root,
  SettingsGroup as Group,
  SettingsSection as Section,
  SettingsLabel as Label,
  SettingsFooter as Footer,
  SettingsItem as Item,
  SettingsIcon as Icon,
  SettingsContent as Content,
  SettingsTitle as Title,
  SettingsValue as Value,
  SettingsSwitch as Switch,
  SettingsChevron as Chevron,
  SettingsSeparator as Separator,
  SettingsLargeItem as LargeItem,
  SettingsAvatar as Avatar,
  SettingsSubtitle as Subtitle,
  SettingsAvatarStack as AvatarStack,
};
