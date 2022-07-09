uniform vec2 uFrequency;
uniform float uTime;
uniform float uSpeed;
uniform float uWaveHeight;

varying vec2 vUv;
varying float vElevation;

void main()
{


    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float dx = modelPosition.x;
    float dy = modelPosition.y;

    float freq = sqrt(dx*dx + dy*dy);

    float angle = (-uTime * uSpeed + freq * 3.0) * 0.5;

    float elevation = sin(angle) * uWaveHeight;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;

}