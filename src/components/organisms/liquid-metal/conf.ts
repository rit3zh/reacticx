const SHADER_SOURCE = `
uniform float2 uDimensions;
uniform float uTick;
uniform float4 uLight;
uniform float4 uDark;
uniform float uDensity;
uniform float uRate;
uniform float uSplit;
uniform float uTurbulence;
uniform float uCrispness;
uniform float uTilt;
uniform float uPulsate;
uniform float uHalo;

const float PI = 3.14159265;

float2 rotate(float2 p, float a) {
  return float2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

float hash(float2 p) {
  float3 p3 = fract(float3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(float2 p) {
  float2 i = floor(p);
  float2 f = fract(p);
  float2 u = f * f * (3.0 - 2.0 * f);
  
  float a = hash(i);
  float b = hash(i + float2(1.0, 0.0));
  float c = hash(i + float2(0.0, 1.0));
  float d = hash(i + float2(1.0, 1.0));
  
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(float2 p) {
  float v = 0.0;
  float a = 0.5;
  float2 shift = float2(100.0, 100.0);
  
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * a * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

float stripes(float2 uv, float t, float tilt, float density, float rate, float turbulence) {
  float2 ruv = rotate(uv - 0.5, tilt * PI / 180.0) + 0.5;
  
  float n = fbm(uv * 2.5 + t * 0.4) * turbulence;
  ruv += n * 0.12;
  
  float v = ruv.x + ruv.y * 0.6;
  v += n;
  v *= density;
  v -= t * rate;
  
  float s = fract(v);
  
  float l1 = smoothstep(0.0, 0.12, s) * (1.0 - smoothstep(0.12, 0.28, s));
  float l2 = smoothstep(0.28, 0.48, s) * (1.0 - smoothstep(0.48, 0.68, s));
  float l3 = smoothstep(0.68, 0.82, s) * (1.0 - smoothstep(0.82, 1.0, s));
  
  return l1 * 0.25 + l2 * 0.65 + l3 + (1.0 - l1 - l2 - l3) * 0.45;
}

half4 main(float2 coord) {
  float2 uv = coord / uDimensions;
  uv.y = 1.0 - uv.y;
  
  float t = uTick * 0.7;
  
  float pulse = 1.0 + sin(t * 1.8) * uPulsate * 0.05;
  float2 puv = (uv - 0.5) * pulse + 0.5;
  
  float pattern = stripes(puv, t, uTilt, uDensity, uRate, uTurbulence);
  
  float off = uSplit * 0.025;
  float patternR = stripes(puv + float2(off, 0.0), t, uTilt, uDensity, uRate, uTurbulence);
  float patternB = stripes(puv - float2(off, 0.0), t, uTilt, uDensity, uRate, uTurbulence);
  
  float3 colR = mix(uDark.rgb, uLight.rgb, patternR);
  float3 colG = mix(uDark.rgb, uLight.rgb, pattern);
  float3 colB = mix(uDark.rgb, uLight.rgb, patternB);
  
  float3 chrome = float3(colR.r, colG.g, colB.b);
  
  float shine = pow(max(pattern, 0.0), 2.8) * 0.55;
  chrome += shine;
  
  float edgeX = min(uv.x, 1.0 - uv.x);
  float edgeY = min(uv.y, 1.0 - uv.y);
  float edge = min(edgeX, edgeY);
  float rim = smoothstep(0.0, 0.08, edge) * (1.0 - smoothstep(0.08, 0.15, edge));
  chrome += uLight.rgb * rim * uHalo * 0.8;
  
  float grain = (hash(coord + t) - 0.5) / 96.0;
  chrome += grain;
  
  return half4(chrome, 1.0);
}
`;

const DEFAULTS = {
  WIDTH: 300,
  HEIGHT: 300,
  BORDER_RADIUS: 0,
  HIGHLIGHT: "#E8E8F8",
  SHADOW: "#1A1A2E",
  DENSITY: 5,
  RATE: 1,
  SPLIT: 0.35,
  TURBULENCE: 0.2,
  CRISPNESS: 0.6,
  TILT: 40,
  PULSATE: 0.1,
  HALO: 0.25,
} as const;

export { SHADER_SOURCE, DEFAULTS };
