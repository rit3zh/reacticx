import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SPHERE_RADIUS_BASE = 2;
const DISC_BASE_SCALE = 0.25;
const CAMERA_Z_BASE = 3;
const PROJECTION_SCALE = 150;

export {
  screenWidth,
  screenHeight,
  SPHERE_RADIUS_BASE,
  DISC_BASE_SCALE,
  CAMERA_Z_BASE,
  PROJECTION_SCALE,
};
