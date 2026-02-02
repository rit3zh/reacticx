import {
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { LinearTransition } from "react-native-reanimated";

type AnimationVariant =
  | "fadeSlideUp"
  | "fadeSlideDown"
  | "scale"
  | "rotate"
  | "bounce"
  | "elastic";

interface IOtpInput {
  readonly otpCount?: number;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly otpInputStyle?: StyleProp<TextStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly focusedColor?: string;
  readonly inputWidth?: number;
  readonly inputHeight?: number;
  readonly inputBorderRadius?: number;
  readonly enableAutoFocus?: boolean;
  readonly editable?: boolean;
  readonly onInputFinished?: (code: string) => void;
  readonly onInputChange?: (codes: string) => void;
  readonly enteringAnimated?: typeof LinearTransition;
  readonly exitingAnimated?: typeof LinearTransition;
  readonly error?: boolean;
  readonly errorMessage?: string;
  readonly animationVariant?: AnimationVariant;
  readonly focusedBackgroundColor?: string;
  readonly unfocusedBackgroundColor?: string;
  readonly focusedBorderColor?: string;
  readonly unfocusedBorderColor?: string;
  readonly errorBackgroundColor?: string;
  readonly errorBorderColor?: string;
}

interface IOtpItem {
  index: number;
}

interface IOtpContext extends IOtpInput {
  inputRef: React.MutableRefObject<any[]>;
  otpValue: string[];
  onPress: () => void;
  onFocusNext: (value: string, index: number) => void;
  onFocusPrevious: (key: string, index: number) => void;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  setOtpValue: React.Dispatch<React.SetStateAction<string[]>>;
  focus: number;
  readonly autoFocus?: boolean;
  readonly currentIndex?: number;
  readonly rest?: TextInputProps;
}

export type { IOtpInput, IOtpContext, AnimationVariant, IOtpItem };
