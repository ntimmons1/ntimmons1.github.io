uniform sampler2D bT;
uniform float bS;
uniform sampler2D nT;
uniform float nS;
uniform float alpha;
uniform float time;

varying vec2 v_uv;
void main() 
{
	vec2 uvTimeShift = v_uv + vec2( -1.0, 1.0 ) * time * bS;	
	vec4 noiseGeneratorTimeShift = texture2D( nT, uvTimeShift );
	vec2 uvNoiseTimeShift = v_uv + nS * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b );
	vec4 baseColor = texture2D( bT, uvNoiseTimeShift );

	baseColor.a = alpha;
	gl_FragColor = baseColor;
}  