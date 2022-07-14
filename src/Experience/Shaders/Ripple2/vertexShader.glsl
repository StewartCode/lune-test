uniform vec2 uFrequency;
uniform float uTime;
uniform float uSpeed;
uniform float uWaveHeight;
uniform float UBlendStrength;
uniform float uEndRipple;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vUv = uv;

    // gl_Position = vec4( position, 1.0 );
    // vUv = uv;
}

// void main()
// {
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // float dx = position.x;
    // float dy = position.y;
    // float freq = sqrt(dx*dx + dy*dy) * 5.0;
    // float angle = (-uTime * uSpeed + freq * 3.0) * 0.5;
    // float distance = distance(vec2(0.5, 0.5) ,uv);
    // float distanceFlipped = 1.0 - distance;
    // distance *= UBlendStrength;
    // float muliplier = 1.0;
    // if (distanceFlipped > uEndRipple)
    // {
    //     muliplier = 0.0;
    // }
    // float elevation = (sin(angle) * uWaveHeight);
    // modelPosition.z += elevation;
    


    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectedPosition = projectionMatrix * viewPosition;
    // gl_Position = projectedPosition;
    // vUv = uv;




    // vElevation = -elevation * muliplier;
// }