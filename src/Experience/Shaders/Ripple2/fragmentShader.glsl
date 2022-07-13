uniform vec3 uColor;
uniform sampler2D uTexture;
uniform float UBlendStrength;
uniform float UBlend;
uniform float uTime;
uniform float uEndRipple;

varying vec2 vUv;
varying float vElevation;

#define MAX_STEPS 100
#define MAX_DIST 100.0
#define SURF_DIST 0.01

#define PI 3.141592653589793238462643383279502884916939937510582

float GetDist(vec3 p)
{
    vec4 s = vec4(0.0,1.0,6.0,1.0);

    float sphereDist = length(p - s.xyz) - s.w;
    float planeDist = p.y;

    float d = min(sphereDist, planeDist);

    return d;
}

float RayMarch(vec3 ro, vec3 rd)
{
    float dO = 0.0;

    for(int i = 0; i < MAX_STEPS; ++i)
    {
        vec3 p = ro + (rd*dO);
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || dS<SURF_DIST) break;
        break;
    }
    return dO;
}

float signedDistanceToCircle(vec3 p, vec3 center, float radius)
{
    return (length(center - p)) - radius;
}

float signedDistanceToBox(vec3 p, vec3 center, vec3 size)
{
    vec3 offset = abs(p - center) - size;
    float unSignedDistance = max(length(offset), 0.0);
    float distanceInsideBox = min(length(offset), 0.0);
    return unSignedDistance + distanceInsideBox;
}


float length(vec3 v)
{
    return sqrt((v.x * v.x) + (v.y * v.y) + (v.z * v.z));
}


void main()
{


    // // 0 left 1 right
    // float alpha = (clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
    // // 1 left 0 right
    // float alpha2 = (1.0 - clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
    // // 0 bottom 1 top
    // float alpha3 = (clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    // // 1 top 0 bottom
    // float alpha4 = (1.0 - clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    
    // // // result                    //short               //long
    // float resultAlpha = min( min(alpha, alpha2), min(alpha3, alpha4));

    // vec2 directionVector = vec2(0.5, 0.5) - vUv;
    // float magPreSquare = (directionVector.x * directionVector.x) + (directionVector.y * directionVector.y);
    // float mag = magPreSquare / magPreSquare;
    // float magFlipped = 1.0 - mag;

    // float distance = distance(vec2(0.5, 0.5) ,vUv);


    // distance *= UBlendStrength;

    // float distanceFlipped = 1.0 - distance;

    // float muliplier = 1.0;

    // if (distanceFlipped > uEndRipple)
    // {
    //     muliplier = 0.0;
    // }

    // vec4 t = texture2D(uTexture, vUv);
    // t.a = distanceFlipped - uOpacity;



    // vec4 textureColor = texture2D(uTexture, vUv);

    // textureColor.rgb *= vElevation * 2.0 + 0.65;

    // textureColor.a = (distanceFlipped - UBlend) * muliplier;
    // textureColor.a = muliplier;
    // textureColor.a = 1.0;

    vec3 ro = vec3(0.0, 0.0, 20.0);
    // vec3 rd = normalize(vec3(vUv.x, vUv.y, 1.0));
    vec3 rd = normalize(vec3(0, 0, -20.0));

    float d = RayMarch(ro, rd);

    vec3 color = vec3(d,d,d);

    gl_FragColor = vec4(color, 1.0);
}



// float radius = .5;

// void main()
// {
// 	float t = clamp(uTime / 6., 0., 1.);

// 	vec2 coords = vUv.st;
// 	vec2 dir = coords - vec2(.5);
	
// 	float dist = distance(coords, vec2(.5));
// 	vec2 offset = dir * (sin(dist * 80. - uTime*15.) + .5) / 30.;

// 	vec2 texCoord = coords + (offset * 0.1);
// 	vec4 diffuse = texture2D(uTexture, texCoord);

// 	vec4 mixin = texture2D(uTexture, texCoord);

//  	gl_FragColor = mixin * t + diffuse * (1. - t);
// }