import { Skia } from "@shopify/react-native-skia";

const discShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float2 resolution;
uniform float alpha;
uniform float stretchAmount;
uniform float2 stretchDir;

half4 main(float2 pos) {
  float2 uv = pos / resolution;
  float2 center = float2(0.5, 0.5);
  
  float2 toCenter = uv - center;
  float toCenterLen = length(toCenter);
  
  if (toCenterLen > 0.001) {
    float2 normalizedToCenter = toCenter / toCenterLen;
    float strength = dot(normalizedToCenter, stretchDir);
    float invAbsStrength = min(0.0, abs(strength) - 1.0);
    float cubicFactor = invAbsStrength * invAbsStrength * invAbsStrength + 1.0;
    float stretchFactor = stretchAmount * sign(strength) * abs(cubicFactor);
    uv = center + toCenter * (1.0 + stretchFactor * 0.5);
  }
  
  uv = clamp(uv, float2(0.0), float2(1.0));
  
  half4 color = image.eval(uv * resolution);
  
  float dist = length(pos / resolution - center);
  float edge = smoothstep(0.5, 0.47, dist);
  
  color.a *= edge * alpha;
  
  return color;
}
`)!;

export { discShader };
