// declare the varying variable that gets passed to the fragment shader
 varying vec2 v_uv;

 // get the texture from the program
 uniform sampler2D texture;
 varying vec3 v_normal;
const vec3 lightDir = vec3(0,0,1);

void main()
{

    vec3 nhat = normalize(v_normal);
    float light = abs(dot(nhat, lightDir));

    gl_FragColor = texture2D(texture, v_uv)*light;
}