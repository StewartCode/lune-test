uniform float uOpacity;
uniform vec3 uColor;
uniform sampler2D uTexture;
varying vec2 vUv;

// uniform vec3 uColorStart;
// uniform vec3 uColorEnd;
// uniform float uTime;


// vec4 permute(vec4 x)
// {
//     return mod(((x*34.0)+1.0)*x, 289.0);
// }

// vec2 fade(vec2 t)
// {
//     return t*t*t*(t*(t*6.0-15.0)+10.0);
// }


void main()
{
    // 0 left 1 right
    float alpha = (clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
    // 1 left 0 right
    float alpha2 = (1.0 - clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
    // 0 bottom 1 top
    float alpha3 = (clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    // 1 top 0 bottom
    float alpha4 = (1.0 - clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    
    // // result                    //short               //long
    float resultAlpha = min( min(alpha, alpha2), min(alpha3, alpha4));

    // vec2 directionVector = vec2(0.5, 0.5) - vUv;
    // float magPreSquare = (directionVector.x * directionVector.x) + (directionVector.y * directionVector.y);
    // float mag = magPreSquare / magPreSquare;
    // float magFlipped = 1.0 - mag;

    float distance = distance(vec2(0.5, 0.5) ,vUv);

    float distanceFlipped = 1.0 - distance;

    vec4 t = texture2D(uTexture, vUv);
    t.a = distanceFlipped - 0.5;
    gl_FragColor = t;
}