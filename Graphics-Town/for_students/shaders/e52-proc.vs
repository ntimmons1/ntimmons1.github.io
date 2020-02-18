/*
 * Simple Shader for exercise 5-2
 * Simplest vertex shader, except that we add the UV coordinate
 * All we do is pass this to the fragment shader
 *
 * You should not need to change this fragment shader for exercise 5-2,
 * but you can if you want to.
 */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
