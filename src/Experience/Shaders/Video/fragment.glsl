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
    float alpha = (clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
    float alpha2 = (1.0 - clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
    float alpha3 = (clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    float alpha4 = (1.0 - clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    
    // // result                    //short               //long
    float resultAlpha = min( min(alpha, alpha2), min(alpha3, alpha4));

    // float strength = clamp(0.5, 0.7, resultAlpha)

    // // vec3 col = color;


    // vec3 colorResult = mix(uColorEnd, uColorStart, (vUv.y + sin(uTime)));

    // vec3 col = colorResult;

    // gl_FragColor=vec4(col, resultAlpha * opacity);
    vec4 t = texture2D(uTexture, vUv);
    t.a = resultAlpha ;
    gl_FragColor = t;
}