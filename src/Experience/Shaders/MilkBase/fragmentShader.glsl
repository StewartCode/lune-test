uniform vec3 uColor;
uniform sampler2D uTexture;
uniform float UBlendStrength;
uniform float UBlend;
uniform float uTime;
uniform float uEndRipple;

varying vec2 vUv;
varying float vElevation;

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


    distance *= UBlendStrength;

    float distanceFlipped = 1.0 - distance;

    // float muliplier = 1.0;

    // if (distanceFlipped > uEndRipple)
    // {
    //     muliplier = 0.0;
    // }

    // vec4 t = texture2D(uTexture, vUv);
    // t.a = distanceFlipped - uOpacity;



    // vec4 textureColor = texture2D(uTexture, vUv);
    vec4 textureColor = vec4(uColor, 1.0);

    // textureColor.rgb *= vElevation * 2.0 + 0.65;

    // textureColor.a = (distanceFlipped - UBlend) * muliplier;
    // textureColor.a = muliplier;
    // textureColor.a = 1.0;

    gl_FragColor = textureColor;
}

