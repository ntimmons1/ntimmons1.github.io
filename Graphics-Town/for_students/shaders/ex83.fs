/* Procedural shading example for Exercise 8-3 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform float num;

vec3 hash(vec2 p)
{
    vec3 x = vec3( dot(p,vec2(13,30)),
                   dot(p,vec2(27,18)),
                   dot(p,vec2(42,37))
                   );
    return fract(sin(x)*4400.0);
}

float getHue(vec2 x)
{
    vec2 flX = floor(x);
    vec2 frX = fract(x);

    float e = 1.0+63.0*pow(1.0,4.0);

    float va = 0.0;
    float wt = 0.0;
    for( int j=-2; j<=2; j++ )
        for( int i=-2; i<=2; i++ )
        {
            vec2 g = vec2(float(i),float(j) );
            vec3 o = hash( flX + g )*vec3(1.0,1.0,1.0);
            vec2 r = g - frX + o.xy;
            float d = dot(r,r);
            float ww = pow(1.0-smoothstep(0.0,1.4,sqrt(d)), e );
            va += o.z*ww;
            wt += ww;
        }
    return va/wt;
}

void main(void)
{
  vec2 p = 0.5 - 0.5*sin( v_uv );

  p = p*p*(3.0-2.0*p);
  p = p*p*(3.0-2.0*p);
  p = p*p*(3.0-2.0*p);

  float f = getHue( num*v_uv );

  gl_FragColor = vec4( f*.39, f*.26, f*.13, 1.0 );
}

