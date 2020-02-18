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
    vec3 color;
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y); 

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);

    vec2 fw = vec2(v_uv.x, v_uv.y);
    vec3 AvgColor = vec3(0.0,0.0,1.0);

    vec2 fuzz = fw * checks * 2.0;

    float fuzzMax = max(fuzz.s, fuzz.t);

    vec2 checkPos = fract(v_uv * 100.0);

    if (fuzzMax < 0.5)
    {
        vec2 p = smoothstep(vec2(0.5), fuzz + vec2(0.5), checkPos) +
                (1.0 - smoothstep(vec2(0.0), fuzz, checkPos));

        color = mix(light, dark, p.x * p.y + (1.0 - p.x) * (1.0 - p.y));

        color = mix(color, AvgColor, smoothstep(0.125, 0.5, fuzzMax));
    }
    else
    {
        color = AvgColor;
    }

    gl_FragColor = vec4(color, 1.0);
}