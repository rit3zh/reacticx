export const SHADER_SOURCE = `
uniform float u_time;
uniform float u_ratio;
uniform float u_patternScale;
uniform float u_refraction;
uniform float u_edge;
uniform float u_patternBlur;
uniform float u_liquid;
uniform shader u_image;
uniform vec2 u_resolution;

const float PI = 3.14159265358979323846;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float getColorChannel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {
    float ch = c2;
    float blur = u_patternBlur + extra_blur;
    
    ch = mix(ch, c1, smoothstep(0.0, blur, stripe_p));
    float border = w[0];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));
    
    b = smoothstep(0.2, 0.8, b);
    border = w[0] + 0.4 * (1.0 - b) * w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));
    
    border = w[0] + 0.5 * (1.0 - b) * w[1];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));
    
    border = w[0] + w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));
    
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
    float gradient = mix(c1, c2, smoothstep(0.0, 1.0, gradient_t));
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));
    
    return ch;
}

vec4 main(vec2 pos) {
    vec2 uv = pos / u_resolution;
    
    vec4 imgSample = u_image.eval(pos);
    

    float maskAlpha = imgSample.a;
    
    float luminance = (imgSample.r + imgSample.g + imgSample.b) / 3.0;
    
    float maskValue = maskAlpha * (1.0 - abs(luminance - 0.5) * 2.0);
    
    if (maskAlpha > 0.5 && luminance < 0.5) {
        maskValue = maskAlpha * (1.0 - luminance);
    }
    else if (maskAlpha > 0.5 && luminance > 0.5) {
        maskValue = maskAlpha * luminance;
    }
    
    if (maskValue < 0.01) {
        return vec4(0.0, 0.0, 0.0, 0.0);
    }
    
    uv.x *= u_ratio;
    
    float diagonal = uv.x - uv.y;
    float t = 0.001 * u_time;
    
    vec3 color1 = vec3(0.98, 0.98, 1.0);
    vec3 color2 = vec3(0.1, 0.1, 0.1 + 0.1 * smoothstep(0.7, 1.3, uv.x + uv.y));
    
    float edge = 1.0 - maskValue;
    
    vec2 grad_uv = uv - 0.5;
    float dist = length(grad_uv + vec2(0.0, 0.2 * diagonal));
    grad_uv = rotate(grad_uv, (0.25 - 0.2 * diagonal) * PI);
    
    float bulge = pow(1.8 * dist, 1.2);
    bulge = 1.0 - bulge;
    bulge *= pow(uv.y, 0.3);
    
    float cycle_width = u_patternScale;
    float thin_strip_1_ratio = 0.12 / cycle_width * (1.0 - 0.4 * bulge);
    float thin_strip_2_ratio = 0.07 / cycle_width * (1.0 + 0.4 * bulge);
    float wide_strip_ratio = 1.0 - thin_strip_1_ratio - thin_strip_2_ratio;
    
    float opacity = 1.0 - smoothstep(0.9 - 0.5 * u_edge, 1.0 - 0.5 * u_edge, edge);
    
    float noise = snoise(uv - t);
    edge += (1.0 - edge) * u_liquid * noise;
    
    float refr = 1.0 - bulge;
    refr = clamp(refr, 0.0, 1.0);
    
    float dir = grad_uv.x + diagonal;
    dir -= 2.0 * noise * diagonal * (smoothstep(0.0, 1.0, edge) * smoothstep(1.0, 0.0, edge));
    
    bulge *= clamp(pow(uv.y, 0.1), 0.3, 1.0);
    dir *= (0.1 + (1.1 - edge) * bulge);
    dir *= smoothstep(1.0, 0.7, edge);
    dir += 0.18 * (smoothstep(0.1, 0.2, uv.y) * smoothstep(0.4, 0.2, uv.y));
    dir += 0.03 * (smoothstep(0.1, 0.2, 1.0 - uv.y) * smoothstep(0.4, 0.2, 1.0 - uv.y));
    dir *= (0.5 + 0.5 * pow(uv.y, 2.0));
    dir *= cycle_width;
    dir -= t;
    
    float refr_r = refr + 0.03 * bulge * noise;
    float refr_b = 1.3 * refr;
    refr_r += 5.0 * (smoothstep(-0.1, 0.2, uv.y) * smoothstep(0.5, 0.1, uv.y)) * 
              (smoothstep(0.4, 0.6, bulge) * smoothstep(1.0, 0.4, bulge));
    refr_r -= diagonal;
    refr_b += (smoothstep(0.0, 0.4, uv.y) * smoothstep(0.8, 0.1, uv.y)) * 
              (smoothstep(0.4, 0.6, bulge) * smoothstep(0.8, 0.4, bulge));
    refr_b -= 0.2 * edge;
    refr_r *= u_refraction;
    refr_b *= u_refraction;
    
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
    w[1] -= 0.02 * smoothstep(0.0, 1.0, edge + bulge);
    
    float stripe_r = mod(dir + refr_r, 1.0);
    float r = getColorChannel(color1.r, color2.r, stripe_r, w, 0.02 + 0.03 * u_refraction * bulge, bulge);
    
    float stripe_g = mod(dir, 1.0);
    float g = getColorChannel(color1.g, color2.g, stripe_g, w, 0.01 / max(0.01, 1.0 - diagonal), bulge);
    
    float stripe_b = mod(dir - refr_b, 1.0);
    float b = getColorChannel(color1.b, color2.b, stripe_b, w, 0.01, bulge);
    
    vec3 color = vec3(r, g, b) * opacity;
    
    float finalAlpha = maskAlpha * opacity;
    
    return vec4(color, finalAlpha);
}
`;
