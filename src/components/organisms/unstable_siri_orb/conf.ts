export const SHADER_SOURCE: string = `
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 primaryColor;
uniform vec3 secondaryColor;
uniform float noiseIntensity;
uniform float glowIntensity;
uniform float saturation;
uniform float brightness;
uniform float rotationSpeed;
uniform float noiseScale;
uniform float coreIntensity;
uniform float edgeSoftness;

const float TAU = 6.28318530718;

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

float fbm(vec2 p, int octaves) {
  float s = 0.0;
  float m = 0.0;
  float a = 0.5;
  
  for (int i = 0; i < 4; i++) {
    if (i >= octaves) break;
    s += a * noise(p);
    m += a;
    a *= 0.5;
    p *= 2.0;
  }
  return s / m;
}

vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

vec4 main(vec2 fragCoord) {
  float min_res = min(iResolution.x, iResolution.y);
  vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min_res * 1.5;
  float t = iTime;

  float l = dot(uv, uv);
  
  float edgeOuter = 1.0 + edgeSoftness;
  float edgeInner = 1.0 - edgeSoftness;
  float sm = smoothstep(edgeOuter, edgeInner, l);
  
  if (sm <= 0.0) {
    return vec4(0.0, 0.0, 0.0, 0.0);
  }
  float d = sm * l * l * l * 2.0;
  vec3 norm = normalize(vec3(uv.x, uv.y, 0.7 - d));
  
  float nx = fbm(uv * 2.0 * noiseIntensity + t * 0.4 + 25.69, 4);
  float ny = fbm(uv * 2.0 * noiseIntensity + t * 0.4 + 86.31, 4);
  float n = fbm(uv * noiseScale + 2.0 * vec2(nx, ny), 3);
  
  vec3 col = vec3(n * 0.5 + 0.25);
  float a = atan(uv.y, uv.x) / TAU + t * 0.1 * rotationSpeed;
  
  // Use custom colors in palette
  vec3 palA = mix(vec3(0.3), primaryColor * 0.5, 0.5);
  vec3 palD = mix(vec3(0.0, 0.8, 0.8), secondaryColor, 0.7);
  col *= pal(a, palA, vec3(0.5, 0.5, 0.5), vec3(1.0), palD);
  col *= saturation;
  
  vec3 cd = abs(col);
  vec3 c = col * d;
  c += (c * 0.5 + vec3(1.0) - luma(c)) * vec3(max(0.0, pow(dot(norm, vec3(0.0, 0.0, -1.0)), 5.0) * 3.0));
  
  float g = glowIntensity * smoothstep(0.6, 1.0, fbm(norm.xy * 3.0 / (1.0 + norm.z), 2)) * d;
  c += g;
  
  col = c + col * pow((1.0 - smoothstep(1.0, 0.98, l) - pow(max(0.0, length(uv) - 1.0), 0.2)) * 2.0, 4.0);
  
  float f = fbm(normalize(uv) * 2.0 + t, 2) + 0.1;
  uv *= f + 0.1;
  uv *= 0.5;
  l = dot(uv, uv);
  
  vec3 ins = normalize(cd) + 0.1;
  float ind = 0.2 + pow(smoothstep(0.0, 1.5, sqrt(l)) * 48.0, 0.25);
  ind *= ind * ind * ind;
  ind = 1.0 / ind;
  ins *= ind;
  
  col += ins * ins * sm * smoothstep(0.7, 1.0, ind) * coreIntensity * 2.0;
  col += abs(norm) * (1.0 - d) * sm * 0.25;
  
  col *= brightness;
  
  return vec4(col, sm);
}
`;
