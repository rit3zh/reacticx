// @ts-nocheck
import React, { memo, useEffect } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
  Vibration,
} from "react-native";
import {
  Canvas,
  Path,
  Skia,
  Image,
  useImage,
  RoundedRect,
  LinearGradient,
  vec,
  Group,
  Rect,
  Circle,
  BlurMask,
  DashPathEffect,
  Oval,
  SkImage,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
  useFrameCallback,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { MAX_DELTA, NUM_POINTS } from "./const";
// @ts-check
import type { ILanyard, ICardData, IPoint2D } from "./types";
import { adjustBrightness } from "./helper";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

export const Lanyard: React.FC<ILanyard> & React.FunctionComponent<ILanyard> =
  memo<ILanyard>(
    ({
      cardData = {},
      cardImageSource,
      gravity = 800,
      stiffness = 0.9,
      damping = 0.2,
      iterations = 10,
      ropeSegments = 10,
      ropeSegmentLength = 20,
      ropeThickness = 6,
      ropeColor = "#E8E8E8",
      ropePattern = "solid",
      cardWidth = 140,
      cardHeight = 200,
      cardBackgroundColor = "#1E1E2E",
      cardAccentColor = "#6366F1",
      anchorPosition,
      containerStyle = { width: 400, height: 600 } as StyleProp<ViewStyle>,
      onCardPress,
      onDragStart,
      onDragEnd,
      cardImageHeight,
      cardImageWidth,
    }: ILanyard): React.ReactElement & React.JSX.Element & React.ReactNode => {
      const { width: screenWidth, height: screenHeight } =
        useWindowDimensions();

      const numSegments = Math.max(1, Math.min(ropeSegments, NUM_POINTS - 1));

      const anchorX = anchorPosition?.x ?? screenWidth / 2;
      const anchorY = anchorPosition?.y ?? 80;

      const cardImage = useImage(
        typeof cardImageSource === "string"
          ? cardImageSource
          : (cardImageSource ?? null),
      );
      const x0 = useSharedValue<number>(anchorX);
      const y0 = useSharedValue<number>(anchorY);
      const px0 = useSharedValue<number>(anchorX);
      const py0 = useSharedValue<number>(anchorY);
      const x1 = useSharedValue<number>(anchorX);
      const y1 = useSharedValue<number>(anchorY + ropeSegmentLength);
      const px1 = useSharedValue<number>(anchorX);
      const py1 = useSharedValue<number>(anchorY + ropeSegmentLength);
      const x2 = useSharedValue<number>(anchorX);
      const y2 = useSharedValue<number>(anchorY + ropeSegmentLength * 2);
      const px2 = useSharedValue<number>(anchorX);
      const py2 = useSharedValue<number>(anchorY + ropeSegmentLength * 2);
      const x3 = useSharedValue<number>(anchorX);
      const y3 = useSharedValue<number>(anchorY + ropeSegmentLength * 3);
      const px3 = useSharedValue<number>(anchorX);
      const py3 = useSharedValue<number>(anchorY + ropeSegmentLength * 3);
      const x4 = useSharedValue<number>(anchorX);
      const y4 = useSharedValue<number>(anchorY + ropeSegmentLength * 4);
      const px4 = useSharedValue<number>(anchorX);
      const py4 = useSharedValue<number>(anchorY + ropeSegmentLength * 4);
      const x5 = useSharedValue<number>(anchorX);
      const y5 = useSharedValue<number>(anchorY + ropeSegmentLength * 5);
      const px5 = useSharedValue<number>(anchorX);
      const py5 = useSharedValue<number>(anchorY + ropeSegmentLength * 5);
      const x6 = useSharedValue<number>(anchorX);
      const y6 = useSharedValue<number>(anchorY + ropeSegmentLength * 6);
      const px6 = useSharedValue<number>(anchorX);
      const py6 = useSharedValue<number>(anchorY + ropeSegmentLength * 6);
      const x7 = useSharedValue<number>(anchorX);
      const y7 = useSharedValue<number>(anchorY + ropeSegmentLength * 7);
      const px7 = useSharedValue<number>(anchorX);
      const py7 = useSharedValue<number>(anchorY + ropeSegmentLength * 7);
      const x8 = useSharedValue<number>(anchorX);
      const y8 = useSharedValue<number>(anchorY + ropeSegmentLength * 8);
      const px8 = useSharedValue<number>(anchorX);
      const py8 = useSharedValue<number>(anchorY + ropeSegmentLength * 8);
      const x9 = useSharedValue<number>(anchorX);
      const y9 = useSharedValue<number>(anchorY + ropeSegmentLength * 9);
      const px9 = useSharedValue<number>(anchorX);
      const py9 = useSharedValue<number>(anchorY + ropeSegmentLength * 9);
      const x10 = useSharedValue<number>(anchorX);
      const y10 = useSharedValue<number>(anchorY + ropeSegmentLength * 10);
      const px10 = useSharedValue<number>(anchorX);
      const py10 = useSharedValue<number>(anchorY + ropeSegmentLength * 10);
      const cardCenterX = useSharedValue<number>(anchorX);
      const cardCenterY = useSharedValue<number>(
        anchorY + numSegments * ropeSegmentLength + cardHeight / 2,
      );
      const cardRotation = useSharedValue<number>(0);
      const cardScale = useSharedValue<number>(1);
      const isDragging = useSharedValue<boolean>(false);
      const dragStartX = useSharedValue<number>(0);
      const dragStartY = useSharedValue<number>(0);
      const lastTime = useSharedValue<number>(Date.now());
      const segmentCount = useSharedValue<number>(numSegments);
      useEffect(() => {
        segmentCount.value = withTiming(numSegments);
      }, [numSegments]);

      useEffect(() => {
        const positions = [
          { x: x0, y: y0, px: px0, py: py0 },
          { x: x1, y: y1, px: px1, py: py1 },
          { x: x2, y: y2, px: px2, py: py2 },
          { x: x3, y: y3, px: px3, py: py3 },
          { x: x4, y: y4, px: px4, py: py4 },
          { x: x5, y: y5, px: px5, py: py5 },
          { x: x6, y: y6, px: px6, py: py6 },
          { x: x7, y: y7, px: px7, py: py7 },
          { x: x8, y: y8, px: px8, py: py8 },
          { x: x9, y: y9, px: px9, py: py9 },
          { x: x10, y: y10, px: px10, py: py10 },
        ];

        for (let i = 0; i <= numSegments; i++) {
          const posY = anchorY + i * ropeSegmentLength;
          positions[i].x.value = anchorX;
          positions[i].y.value = posY;
          positions[i].px.value = anchorX;
          positions[i].py.value = posY;
        }

        cardCenterX.value = anchorX;
        cardCenterY.value =
          anchorY + numSegments * ropeSegmentLength + cardHeight / 2;
      }, [anchorX, anchorY, numSegments, ropeSegmentLength, cardHeight]);

      useFrameCallback((frameInfo) => {
        "worklet";

        const now = frameInfo.timestamp;
        let dt = (now - lastTime.value) / 1000;
        dt = Math.min(dt, MAX_DELTA);
        lastTime.value = now;

        if (dt <= 0) return;

        const segs = segmentCount.value;

        const xs = [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10];
        const ys = [y0, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10];
        const pxs = [px0, px1, px2, px3, px4, px5, px6, px7, px8, px9, px10];
        const pys = [py0, py1, py2, py3, py4, py5, py6, py7, py8, py9, py10];

        const cardAttachX = cardCenterX.value;
        const cardAttachY = cardCenterY.value - cardHeight / 2;
        if (!isDragging.value) {
          for (let i = 1; i < segs; i++) {
            const velX = (xs[i].value - pxs[i].value) * damping;
            const velY = (ys[i].value - pys[i].value) * damping;

            pxs[i].value = xs[i].value;
            pys[i].value = ys[i].value;

            xs[i].value += velX;
            ys[i].value += velY + gravity * dt * dt;
          }
        }
        xs[segs].value = cardAttachX;
        ys[segs].value = cardAttachY;
        pxs[segs].value = cardAttachX;
        pys[segs].value = cardAttachY;
        for (let iter = 0; iter < iterations; iter++) {
          for (let i = 0; i < segs; i++) {
            const dx = xs[i + 1].value - xs[i].value;
            const dy = ys[i + 1].value - ys[i].value;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 0.0001) continue;

            const diff = (ropeSegmentLength - dist) / dist;
            const offsetX = dx * diff * 0.5 * stiffness;
            const offsetY = dy * diff * 0.5 * stiffness;
            if (i > 0) {
              xs[i].value -= offsetX;
              ys[i].value -= offsetY;
            }

            if (i + 1 < segs) {
              xs[i + 1].value += offsetX;
              ys[i + 1].value += offsetY;
            }
          }
        }

        xs[segs].value = cardAttachX;
        ys[segs].value = cardAttachY;
        if (!isDragging.value) {
          const ropeEndX = xs[segs].value;
          const ropeEndY = ys[segs].value;
          cardCenterX.value = ropeEndX;
          cardCenterY.value = ropeEndY + cardHeight / 2;
          if (segs >= 1) {
            const prevX = xs[segs - 1].value;
            const prevY = ys[segs - 1].value;

            const dx = ropeEndX - prevX;
            const dy = ropeEndY - prevY;
            const targetRot = Math.atan2(dx, dy) * 0.9;
            cardRotation.value = cardRotation.value * 0.9 + targetRot * 0.1;
            const pullStrength = 1;
            const idealY = prevY + ropeSegmentLength;
            const idealX = prevX;

            cardCenterX.value =
              cardCenterX.value * (1 - pullStrength) + idealX * pullStrength;
            cardCenterY.value =
              cardCenterY.value * (1 - pullStrength) +
              (idealY + cardHeight / 2) * pullStrength;
          }
        }
      });

      const tapGesture = Gesture.Tap()
        .onStart((event) => {
          "worklet";
          const dx = Math.abs(event.x - cardCenterX.value);
          const dy = Math.abs(event.y - cardCenterY.value);

          if (dx < cardWidth / 2 && dy < cardHeight / 2) {
            cardScale.value = withSpring<number>(0.95, { damping: 15 });
          }
        })
        .onEnd((event) => {
          "worklet";
          cardScale.value = withSpring(1, { damping: 15 });

          const dx = Math.abs(event.x - cardCenterX.value);
          const dy = Math.abs(event.y - cardCenterY.value);

          if (dx < cardWidth / 2 && dy < cardHeight / 2 && onCardPress) {
            scheduleOnRN(onCardPress);
          }
        });

      const panGesture = Gesture.Pan()
        .onStart((event) => {
          "worklet";
          const dx = Math.abs(event.x - cardCenterX.value);
          const dy = Math.abs(event.y - cardCenterY.value);

          if (dx < cardWidth / 2 + 30 && dy < cardHeight / 2 + 30) {
            isDragging.value = true;
            dragStartX.value = event.x - cardCenterX.value;
            dragStartY.value = event.y - cardCenterY.value;
            cardScale.value = withSpring(1.02, { damping: 20 });

            if (onDragStart) {
              scheduleOnRN(onDragStart);
            }
          }
        })
        .onUpdate((event) => {
          "worklet";
          if (!isDragging.value) return;

          const newX = event.x - dragStartX.value;
          const newY = event.y - dragStartY.value;

          cardCenterX.value = Math.max(
            cardWidth / 2,
            Math.min(screenWidth - cardWidth / 2, newX),
          );
          cardCenterY.value = Math.max(
            anchorY + ropeSegmentLength + cardHeight / 2,
            Math.min(screenHeight - cardHeight / 2, newY),
          );

          cardRotation.value = event.velocityX * 0.00008;
          scheduleOnRN(impactAsync, ImpactFeedbackStyle.Soft);
        })
        .onEnd((event) => {
          "worklet";
          if (!isDragging.value) return;

          isDragging.value = false;
          cardScale.value = withSpring<number>(1);

          const segs = segmentCount.value;
          const xs = [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10];
          const ys = [y0, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10];
          const pxs = [px0, px1, px2, px3, px4, px5, px6, px7, px8, px9, px10];
          const pys = [py0, py1, py2, py3, py4, py5, py6, py7, py8, py9, py10];

          const velScale = 0.012;
          for (let i = Math.max(1, segs - 3); i < segs; i++) {
            pxs[i].value = xs[i].value - event.velocityX * velScale;
            pys[i].value = ys[i].value - event.velocityY * velScale;
          }

          cardRotation.value = withSpring<number>(0, {
            damping: 10,
            stiffness: 100,
          });

          if (onDragEnd) {
            scheduleOnRN<[], void>(onDragEnd);
          }
        });

      const gesture = Gesture.Simultaneous(tapGesture, panGesture);

      const ropePath = useDerivedValue<string>(() => {
        const segs = segmentCount.value;
        const xs = [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10];
        const ys = [y0, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10];

        const points: IPoint2D[] = [];
        for (let i = 0; i <= segs; i++) {
          points.push({ x: xs[i].value, y: ys[i].value });
        }

        if (points.length < 2) return "";
        if (points.length === 2) {
          return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
        }

        let path = `M ${points[0].x} ${points[0].y}`;
        const tension = 0.5;

        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[Math.max(0, i - 1)];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[Math.min(points.length - 1, i + 2)];

          const cp1x = p1.x + ((p2.x - p0.x) * tension) / 3;
          const cp1y = p1.y + ((p2.y - p0.y) * tension) / 3;
          const cp2x = p2.x - ((p3.x - p1.x) * tension) / 3;
          const cp2y = p2.y - ((p3.y - p1.y) * tension) / 3;

          path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }

        return path;
      });

      const cardTransform = useDerivedValue(() => [
        { translateX: cardCenterX.value },
        { translateY: cardCenterY.value },
        { rotate: cardRotation.value },
        { scale: cardScale.value },
      ]);

      return (
        <View style={[styles.container, containerStyle]}>
          <GestureDetector gesture={gesture}>
            <Canvas style={styles.canvas}>
              <Path
                path={ropePath}
                style="stroke"
                strokeWidth={ropeThickness + 4}
                strokeCap="round"
                strokeJoin="round"
                color="rgba(0,0,0,0.15)"
              >
                <BlurMask blur={4} style="normal" />
              </Path>

              <Path
                path={ropePath}
                style="stroke"
                strokeWidth={ropeThickness}
                strokeCap="round"
                strokeJoin="round"
                color={ropeColor}
              />

              {ropePattern === "striped" && (
                <Path
                  path={ropePath}
                  style="stroke"
                  strokeWidth={ropeThickness}
                  strokeCap="round"
                  strokeJoin="round"
                  color={cardAccentColor}
                >
                  <DashPathEffect intervals={[8, 8]} />
                </Path>
              )}

              <Group transform={cardTransform} origin={vec(0, 0)}>
                <IDCard
                  width={cardWidth}
                  height={cardHeight}
                  backgroundColor={cardBackgroundColor}
                  accentColor={cardAccentColor}
                  cardData={cardData}
                  cardImageHeight={cardImageHeight}
                  cardImageWidth={cardImageWidth}
                  cardImage={cardImage}
                />
              </Group>
              <Circle cx={anchorX} cy={anchorY} r={8} color="#333" />
              <Circle cx={anchorX} cy={anchorY} r={5} color="#666" />
              <Circle cx={anchorX} cy={anchorY} r={3} color="#999" />
            </Canvas>
          </GestureDetector>
        </View>
      );
    },
  );

interface IDCardProps {
  width: number;
  height: number;
  backgroundColor: string;
  accentColor: string;
  cardData: ICardData;
  cardImage: SkImage | null;
  cardImageHeight?: number;
  cardImageWidth?: number;
}

const IDCard: React.FC<IDCardProps> & React.FunctionComponent<IDCardProps> = ({
  width,
  height,
  backgroundColor,
  accentColor,
  cardImage,
  cardImageWidth,
  cardImageHeight,
}: IDCardProps): React.ReactElement & React.JSX.Element & React.ReactNode => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <Group>
      <RoundedRect
        x={-halfWidth + 2}
        y={-halfHeight + 2}
        width={width}
        height={height}
        r={12}
        color="rgba(0,0,0,0.3)"
      >
        <BlurMask blur={8} style="normal" />
      </RoundedRect>

      <RoundedRect
        x={-halfWidth}
        y={-halfHeight}
        width={width}
        height={height}
        r={12}
      >
        <LinearGradient
          start={vec(-halfWidth, -halfHeight)}
          end={vec(halfWidth, halfHeight)}
          colors={[
            backgroundColor,
            adjustBrightness<string, number>(backgroundColor, -15),
          ]}
        />
      </RoundedRect>
      <RoundedRect
        x={-halfWidth}
        y={-halfHeight}
        width={width}
        height={12}
        r={12}
        color={accentColor}
      />
      <Rect
        x={-halfWidth}
        y={-halfHeight + 6}
        width={width}
        height={6}
        color={accentColor}
      />

      {cardImage ? (
        <Group
          clip={Skia.Path.Make().addRRect(
            Skia.RRectXY(
              Skia.XYWHRect(
                -35,
                -halfHeight + 30,
                cardImageWidth ?? 70,
                cardImageHeight ?? 70,
              ),
              35,
              35,
            ),
          )}
        >
          <Image
            image={cardImage}
            x={-35}
            y={-halfHeight + 30}
            width={cardImageWidth ?? 70}
            height={cardImageHeight ?? 70}
            fit="cover"
          />
        </Group>
      ) : (
        <Group>
          <Circle
            cx={0}
            cy={-halfHeight + 65}
            r={35}
            color={adjustBrightness<string, number>(backgroundColor, 20)}
          />
          <Circle
            cx={0}
            cy={-halfHeight + 55}
            r={12}
            color={adjustBrightness<string, number>(backgroundColor, 40)}
          />
          <Oval
            x={-18}
            y={-halfHeight + 65}
            width={36}
            height={25}
            color={adjustBrightness<string, number>(backgroundColor, 40)}
          />
        </Group>
      )}

      <RoundedRect
        x={-40}
        y={-halfHeight + 115}
        width={80}
        height={12}
        r={6}
        color={adjustBrightness<string, number>(backgroundColor, 30)}
      />
      <RoundedRect
        x={-30}
        y={-halfHeight + 135}
        width={60}
        height={8}
        r={4}
        color={adjustBrightness<string, number>(backgroundColor, 20)}
      />
      {/* <RoundedRect
        x={-halfWidth + 10}
        y={halfHeight - 40}
        width={width - 20}
        height={30}
        r={4}
        color={adjustBrightness<string, number>(backgroundColor, 10)}
      />
      <Rect
        x={halfWidth - 40}
        y={halfHeight - 35}
        width={25}
        height={25}
        color={adjustBrightness<string, number>(backgroundColor, 25)}
      /> */}

      <RoundedRect
        x={-halfWidth}
        y={-halfHeight}
        width={width}
        height={height}
        r={12}
        style="stroke"
        strokeWidth={1}
        color="rgba(255,255,255,0.1)"
      />

      <RoundedRect
        x={-12}
        y={-halfHeight - 8}
        width={24}
        height={16}
        r={4}
        color="#A0A0A0"
      />
      <RoundedRect
        x={-10}
        y={-halfHeight - 6}
        width={20}
        height={6}
        r={3}
        color="#C8C8C8"
      />
    </Group>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: { flex: 1 },
});

export default memo<React.FunctionComponent<ILanyard> & React.FC<ILanyard>>(
  Lanyard,
);
