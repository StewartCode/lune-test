uniform vec2 uFrequency;
uniform float uTime;
uniform float uSpeed;
uniform float uWaveHeight;
uniform float UBlendStrength;

varying vec2 vUv;
varying float vElevation;

void main()
{


    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float dx = position.x;
    float dy = position.y;

    float freq = sqrt(dx*dx + dy*dy) * 5.0;

    float angle = (-uTime * uSpeed + freq * 3.0) * 0.5;

    float distance = distance(vec2(0.5, 0.5) ,uv);
    float distanceFlipped = 1.0 - distance;

    distance *= UBlendStrength;

    float elevation = (sin(angle) * uWaveHeight);

    modelPosition.z += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = -elevation;

}

// simple vertex shader

// void main()
// {
// 	gl_Position    = gl_ModelViewProjectionMatrix * gl_Vertex;
// 	gl_FrontColor  = gl_Color;
// 	gl_TexCoord[0] = gl_MultiTexCoord0;

//     vUv = uv;
// }