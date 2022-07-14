// precision highp float;

// uniform vec3 uColor;
// uniform sampler2D uTexture;
// uniform float UBlendStrength;
// uniform float UBlend;
// uniform float uTime;
// uniform float uEndRipple;

// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// uniform float u_time;
// uniform sampler2D u_noise;

// uniform float u_xscale;

varying vec2 vUv;
// varying float vElevation;

// #define MAX_STEPS 100
// #define MAX_DIST 100.0
// #define SURF_DIST 0.01

// #define PI 3.141592653589793238462643383279502884916939937510582

// float GetDist(vec3 p)
// {
//     vec4 s = vec4(0.0,1.0,6.0,1.0);

//     float sphereDist = length(p - s.xyz) - s.w;
//     float planeDist = p.y;

//     float d = min(sphereDist, planeDist);

//     return d;
// }

// float RayMarch(vec3 ro, vec3 rd)
// {
//     float dO = 0.0;

//     for(int i = 0; i < MAX_STEPS; ++i)
//     {
//         vec3 p = ro + (rd*dO);
//         float dS = GetDist(p);
//         dO += dS;
//         if(dO>MAX_DIST || dS<SURF_DIST) break;
//         break;
//     }
//     return dO;
// }

// float signedDistanceToCircle(vec3 p, vec3 center, float radius)
// {
//     return (length(center - p)) - radius;
// }

// float signedDistanceToBox(vec3 p, vec3 center, vec3 size)
// {
//     vec3 offset = abs(p - center) - size;
//     float unSignedDistance = max(length(offset), 0.0);
//     float distanceInsideBox = min(length(offset), 0.0);
//     return unSignedDistance + distanceInsideBox;
// }


// float length(vec3 v)
// {
//     return sqrt((v.x * v.x) + (v.y * v.y) + (v.z * v.z));
// }


// void main()
// {
//     // // 0 left 1 right
//     // float alpha = (clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
//     // // 1 left 0 right
//     // float alpha2 = (1.0 - clamp(vUv.x, 0.02, 1.0) - 0.02) * 0.999;
//     // // 0 bottom 1 top
//     // float alpha3 = (clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
//     // // 1 top 0 bottom
//     // float alpha4 = (1.0 - clamp(vUv.y, 0.02, 1.0) - 0.02) * 0.999;
    
//     // // // result                    //short               //long
//     // float resultAlpha = min( min(alpha, alpha2), min(alpha3, alpha4));
//     // vec2 directionVector = vec2(0.5, 0.5) - vUv;
//     // float magPreSquare = (directionVector.x * directionVector.x) + (directionVector.y * directionVector.y);
//     // float mag = magPreSquare / magPreSquare;
//     // float magFlipped = 1.0 - mag;
//     // float distance = distance(vec2(0.5, 0.5) ,vUv);
//     // distance *= UBlendStrength;
//     // float distanceFlipped = 1.0 - distance;
//     // float muliplier = 1.0;
//     // if (distanceFlipped > uEndRipple)
//     // {
//     //     muliplier = 0.0;
//     // }
//     // vec4 t = texture2D(uTexture, vUv);
//     // t.a = distanceFlipped - uOpacity;
//     // vec4 textureColor = texture2D(uTexture, vUv);
//     // textureColor.rgb *= vElevation * 2.0 + 0.65;
//     // textureColor.a = (distanceFlipped - UBlend) * muliplier;
//     // textureColor.a = muliplier;
//     // textureColor.a = 1.0;





//     // vec3 ro = vec3(0.0, 0.0, 20.0);
//     // vec3 rd = normalize(vec3(0, 0, -20.0));
//     // float d = RayMarch(ro, rd);
//     // vec3 color = vec3(d,d,d);
//     // gl_FragColor = vec4(color, 1.0);











    
//     // uv *= 2.;
//     float shade = 1. - abs(vUv.x);
//     shade = max(shade, 1. - abs(vUv.y));
//     shade = max(shade, 1. - abs(vUv.y + vUv.x));
//     shade = max(shade, 1. - abs(vUv.y - vUv.x));
//     // shade -= length(uv) * -shade;
//     shade -= clamp(length(vUv * .1), 0., 1.);
//     // shade = max(shade, length(uv));
// //     shade = 1. - abs(uv.x + uv.y);
// //     shade = min(shade, 1. - abs(uv.x - uv.y));
// //     shade = clamp(shade, 0., 1.);
// //     shade *= min(1. - abs(uv.x), 1. - abs(uv.y));
// //     shade = clamp(shade, 0., 1.);
// //     // shade *= shade * shade;
// //     shade = sqrt(shade);
// //     // shade -= 1./length(uv*2.);
// //     shade = smoothstep(.8, 1., 1. - abs(uv.x));
// //     shade = max(shade, smoothstep(.8, 1., 1. - abs(uv.y)));
    
//     vec3 colour = vec3(smoothstep(0.0, 1.0, shade));
//     // colour = vec3(shade);

//     gl_FragColor = vec4(colour,1.0);
// }



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








    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_sliceDepth;
    uniform bool u_3d;
    uniform bool u_2d;
    uniform bool u_animatedDomains;
    uniform vec3 u_cameraPosition;
  
    const int octaves = 3;
    // Epsilon value
    const float eps = 0.005;
  
    // movement variables
    vec3 movement = vec3(.0);

    // Gloable variables for the raymarching algorithm.
    const int maxIterations = 2048;
    const int maxIterationsShad = 16;
    const float stepScale = 0.5;
    const float stopThreshold = 0.001;
  
  
  mat4 rotationMatrix(vec3 axis, float angle)
  {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;

      return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                  0.0,                                0.0,                                0.0,                                1.0);
  }
  
  float sdSphere( vec3 p, float s )
  {
    return length(p)-s;
  }
  
  // smooth min
  // reference: http://iquilezles.org/www/articles/smin/smin.htm
  float smin(float a, float b, float k) {
      float res = exp(-k*a) + exp(-k*b);
      return -log(res)/k;
  }
  
  vec3 random3( vec3 p ) {
      return fract(sin(vec3(dot(p,vec3(127.1,311.7,319.8)),dot(p,vec3(269.5,183.3, 415.2)),dot(p,vec3(362.9,201.5,134.7))))*43758.5453);
  }
  vec2 random2( vec2 p ) {
      return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
  }
  
  float bumps(in vec3 p, float phase, float size, vec3 frequency) {
    return size * sin(p.x * frequency.x + phase) * cos(p.y * frequency.y + phase) * cos(p.z * frequency.z + phase);
  }
  
  float fractalBumps(in vec3 p, float phase, float size, vec3 frequency, float multiplier) {
    // const float octaves = 2.;
    float _bumps = bumps(p, phase, size, frequency);
    for(int i = 1; i < octaves; i++) {
      float f = float(i);
      _bumps += bumps(p, phase + f * 10., size * multiplier * 1./f, frequency * f);
    }
    
    // vec2 b = vec2(_bumps, _bumps);
    // return sign(length(b))*_bumps;
    
    // return pow(10., _bumps);
    
    return _bumps;
  }
  
  // The world!
  float world_sdf(in vec3 p) {
    float t = u_time * .3;
    float t1 = u_time * 3.;
    
    if(!u_animatedDomains) {
      t = 1.;
      t1 = 1.;
    }
    
    mat2 rotation = mat2(cos(t), -sin(t), sin(t), cos(t));
    p.xz *= -rotation;
    
    float gradient = max(0., (p.y + .3));
    
    // float bumps = fractalBumps(p, t1, .5 * gradient, vec3(16.), 1.8);
    float bumps = 0.0;
    
    float gum = length(p) - .5 + bumps * .2;
    float ground = p.y + .5;
    
    return min(gum, ground);
  }
  
  // Fuck yeah, normals!
  vec3 calculate_normal(in vec3 p)
  {
    const vec3 small_step = vec3(0.0001, 0.0, 0.0);
    
    float gradient_x = world_sdf(vec3(p.x + eps, p.y, p.z)) - world_sdf(vec3(p.x - eps, p.y, p.z));
    float gradient_y = world_sdf(vec3(p.x, p.y + eps, p.z)) - world_sdf(vec3(p.x, p.y - eps, p.z));
    float gradient_z = world_sdf(vec3(p.x, p.y, p.z  + eps)) - world_sdf(vec3(p.x, p.y, p.z - eps));
    
    vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

    return normalize(normal);
  }

  // Raymarching.
  float rayMarching( vec3 origin, vec3 dir, float start, float end, inout float field, float endDist, bool slice ) {
    
    if ( slice )  {
      float rayDepth = endDist;
      return world_sdf(origin + dir * rayDepth);
    }
    
    float sceneDist = 1e4;
    float rayDepth = start;
    for ( int i = 0; i < maxIterations; i++ ) {
      sceneDist = world_sdf( origin + dir * rayDepth ); // Distance from the point along the ray to the nearest surface point in the scene.

      if (( sceneDist < stopThreshold ) || (rayDepth >= end)) {        
        break;
      }
      // We haven't hit anything, so increase the depth by a scaled factor of the minimum scene distance.
      rayDepth += sceneDist * stepScale;
    }
  
    if ( sceneDist >= stopThreshold ) rayDepth = end;
    else rayDepth += sceneDist;
      
    // We've used up our maximum iterations. Return the maximum distance.
    return rayDepth;
  }
  

  // Shadows
  // Reference at: http://www.iquilezles.org/www/articles/rmshadows/rmshadows.htm
  float softShadow(vec3 ro, vec3 lightPos, float start, float k){
    
      vec3 rd = lightPos - ro;
      float end = length(rd);

      float shade = 1.0;

      float dist = start;
      float stepDist = start;

      for (int i=0; i<maxIterationsShad; i++){
          float h = world_sdf(ro + rd*dist);
          shade = min(shade, k*h/dist);
          
          dist += min(h, stepDist*2.); // The best of both worlds... I think. 
          
          if (h<0.001 || dist > end) break; 
      }

      return min(max(shade, 0.) + 0.3, 1.0); 
  }

  // Based on original by IQ - optimized to remove a divide
  float calculateAO(vec3 p, vec3 n)
  {
     const float AO_SAMPLES = 5.0;
     float r = 0.0;
     float w = 1.0;
     for (float i=1.0; i<=AO_SAMPLES; i++)
     {
        float d0 = i * 0.15; // 1.0/AO_SAMPLES
        r += w * (d0 - world_sdf(p + n * d0));
        w *= 0.5;
     }
     return 1.0-clamp(r,0.0,1.0);
  }
  
  /**
   * Lighting
   * This stuff is way way better than the model I was using.
   * Courtesy Shane Warne
   * Reference: http://raymarching.com/
   * -------------------------------------
   * */
  
  // Lighting.
  vec3 lighting( vec3 sp, vec3 camPos, int reflectionPass, float dist, float field, vec3 rd) {
    
    // Start with black.
    vec3 sceneColor = vec3(0.0);

    vec3 objColor = vec3(1.0, .5, .5);

    // Obtain the surface normal at the scene position "sp."
    vec3 surfNormal = calculate_normal(sp);

    // Lighting.

    // lp - Light position. Keeping it in the vacinity of the camera, but away from the objects in the scene.
    vec3 lp = vec3(0., 0.0, -1.0) + movement;
    // ld - Light direction.
    vec3 ld = lp-sp;
    // lcolor - Light color.
    vec3 lcolor = vec3(1.,0.97,0.92) * .8;
    
     // Light falloff (attenuation).
    float len = length( ld ); // Distance from the light to the surface point.
    ld /= len; // Normalizing the light-to-surface, aka light-direction, vector.
    // float lightAtten = min( 1.0 / ( 0.15*len*len ), 1.0 ); // Removed light attenuation for this because I want the fade to white
    
    float sceneLen = length(camPos - sp); // Distance of the camera to the surface point
    float sceneAtten = min( 1.0 / ( 0.015*sceneLen*sceneLen ), 1.0 ); // Keeps things between 0 and 1.   

    // Obtain the reflected vector at the scene position "sp."
    vec3 ref = reflect(-ld, surfNormal);
    
    float ao = 1.0; // Ambient occlusion.
    // ao = calculateAO(sp, surfNormal); // Ambient occlusion.

    float ambient = .5; //The object's ambient property.
    float specularPower = 200.; // The power of the specularity. Higher numbers can give the object a harder, shinier look.
    float diffuse = max( 0.0, dot(surfNormal, ld) ); //The object's diffuse value.
    float specular = max( 0.0, dot( ref, normalize(camPos-sp)) ); //The object's specular value.
    specular = pow(specular, specularPower); // Ramping up the specular value to the specular power for a bit of shininess.
    	
    // Bringing all the lighting components togethr to color the screen pixel.
    sceneColor += (objColor*(diffuse*0.8+ambient)+specular*0.5)*lcolor*1.3;
    sceneColor = mix(sceneColor, vec3(1.), 1.-sceneAtten*sceneAtten); // fog
    
    // float shadow = softShadow(sp, lp, .1, 1.);
    // sceneColor *= shadow + .8;
    
    return sceneColor;

  }
  
  vec3 colour_slice(float dist) {
    
    vec3 colour = vec3(.3, .4, .9);

    if(dist < 0.) {
      colour = vec3(.9, .4, .3);
    }

    float distance_wave = mod(dist * 20., 1.);

    colour = mix(colour, vec3(1.), smoothstep(.0, .02, distance_wave) * smoothstep(.1, .08, distance_wave) * .5);
    
    return colour;
  }

    void main() {
      
      // Setting up our screen coordinates.
      vec2 uv = vec2((vUv.x - 0.5) * 1.0, (vUv.y - 0.5) * 1.0);
      
      // This just gives us a touch of fisheye
      // uv *= 1. + dot(uv, uv) * 0.4;
      
      // movement
      
      // The sin in here is to make it look like a walk.
      vec3 lookAt = vec3(0.0, 0.0, 0.0);  // This is the point you look towards, or at, if you prefer.
    //   vec3 camera_position = vec3(0.0, 0.0, 10.0); // This is the point you look from, or camera you look at the scene through. Whichever way you wish to look at it.
      vec3 camera_position = u_cameraPosition;
      
    //   lookAt += movement;
      // lookAt.z += sin(u_time / 10.) * .5;
      // lookAt.x += cos(u_time / 10.) * .5;
    //   camera_position += movement;
      
      vec3 forward = normalize(lookAt-camera_position); // Forward vector.
      vec3 right = normalize(vec3(forward.z, 0., -forward.x )); // Right vector... or is it left? Either way, so long as the correct-facing up-vector is produced.
      vec3 up = normalize(cross(forward,right)); // Cross product the two vectors above to get the up vector.

      // FOV - Field of view.
      float FOV = 1.0;

      // ro - Ray origin.
      vec3 ro = camera_position; 
      // rd - Ray direction.
      vec3 rd = normalize(forward + FOV*uv.x*right + FOV*uv.y*up);
      
      // Ray marching.
      const float clipNear = 0.0;
      const float clipFar = 16.0;
      float measure = u_sliceDepth;
      const float min_measure = .4;
      const float stepsize = .01;
      float field = 0.;
      // float dist = rayMarching(ro, rd, clipNear, clipFar, field, measure, true );
      vec3 colour = vec3(0.);
      vec3 colour3d = vec3(0.);
      
      if(u_2d) {
        float dist = rayMarching(ro, rd, clipNear, clipFar, field, u_sliceDepth, true );
        colour = colour_slice(dist);
      }
      if(u_3d) {
        // Ray marching.
        float field = 0.;
        float dist = rayMarching(ro, rd, clipNear, clipFar, field, 0., false );
        if ( dist >= clipFar ) {
          colour3d = vec3(1.0);
        } else {
          // sp - Surface position. If we've made it this far, we've hit something.
          vec3 sp = ro + rd*dist;

          // Light the pixel that corresponds to the surface position. The last entry indicates that it's not a reflection pass
          // which we're not up to yet.
          colour3d = lighting( sp, camera_position, 0, dist, field, rd);
        }
      }
      
      if(length(colour) > 0. && length(colour3d) > 0.) {
        colour = mix(colour, colour3d, .5);
      } else if(length(colour3d) > 0.) {
        colour = colour3d;
      }
      
      // colour = colour_slice(dist);
      
      gl_FragColor = vec4(colour, 1.);
    }