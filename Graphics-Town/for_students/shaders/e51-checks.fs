/* a simple procedural texture for exercise 5-1 */
/* the student should change this to implement a checkerboard */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    float dc = .5;

    vec2 center = -1.0 + 2.0 * v_uv;
    vec2 uv = floor(center.xy * checks);
    if(mod(uv.x + uv.y, 2.0) > 0.5){
        gl_FragColor = vec4(light, 1.0);
    }else{
        gl_FragColor = vec4(dark, 1.0);
    }
}
