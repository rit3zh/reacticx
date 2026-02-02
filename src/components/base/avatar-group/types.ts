import type { SharedValue } from "react-native-reanimated";

interface AvatarItem {
  readonly id: string;
  readonly uri?: string;
  readonly name?: string;
}

interface IAnimatedAvatar {
  avatar: {
    id: string;
    uri?: string;
    name?: string;
  };
  size: number;
  overlap: number;
  index: number;
  activeIndex: SharedValue<number>;
}

interface AvatarGroupProps {
  avatars: readonly AvatarItem[];
  readonly size?: number;
  readonly max?: number;
  readonly overlap?: number;
  readonly onPress?: (id: AvatarItem["id"]) => void;
}

export type { AvatarGroupProps, AvatarItem, IAnimatedAvatar };
