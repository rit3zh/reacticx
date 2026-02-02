import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH * 0.5;
const MEDIUM_IMAGE = IMAGE_WIDTH * 0.5;
const SMALL_IMAGE = MEDIUM_IMAGE * 0.8;

export { IMAGE_WIDTH, SMALL_IMAGE, MEDIUM_IMAGE, SCREEN_WIDTH };
