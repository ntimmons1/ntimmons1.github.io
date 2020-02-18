/* Procedural shading example for Exercise 8-1 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
uniform vec3 color1;
uniform vec3 color2;
uniform float amount;
varying vec2 v_uv;
varying vec3 v_normal;
const vec3 lightDir = vec3(0,0,1);

void main() {
    float p = abs(fract(amount*v_uv.x)*2.0-1.0);
    vec3 col = mix(color1, color2, vec3(p));

    vec3 nhat = normalize(v_normal);
    float light = abs(dot(nhat, lightDir));

    gl_FragColor = vec4(col*light, 1);
}