import * as THREE from 'three';
import Experience from '../Experience';
import { gsap } from 'gsap';
import fragmentShader from '../Shaders/MilkBase/fragmentShader.glsl';
import vertexShader from '../Shaders/MilkBase/vertexShader.glsl';

export default class MilkBase2
{
    constructor(environment)
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;
        this.environment = environment;


        this.params = {};
        // this.params.waveHeight = 0.225;
        this.params.waveHeight = 0.1;
        this.params.frequency = 1.0;
        this.params.blendStrength = 10.0;
        this.params.speed = 0.0114;
        this.params.endRipple = 1.0;


        //cache
        this.objectOfTweens;



        this.start();
        // this.debugStuff();

        //paused
        // this.animationSetup(false);
        this.destroy();
    }
    start()
    {
        this.geometry = new THREE.PlaneBufferGeometry(16, 16, 64, 64);
        this.normal = this.experience.resources.items.normal;

        // const customVertexShader = document.getElementById('customVertexShader').textContent;
        // const customFragmentShader = document.getElementById('customFragmentShader').textContent;

        // this.texture = document.getElementById("texture1");


        // const texture = new THREE.Texture(this.texture);


        // const customUniform = new THREE.UniformsUtils.merge([
        //     THREE.ShaderLib.phong.uniforms,
        //     {
        //         uColor: { value: new THREE.Color('#EDEDED')},
        //         uTime: { value: this.time },
        //         uSpeed: { value: this.params.speed },
        //         uWaveHeight: { value: this.params.waveHeight },
        //         UBlendStrength: { value: this.params.blendStrength },
        //         UBlend: { value: this.params.blend },
        //         shininess: { value: 150.0 },
        //         uTexture: { value:  texture},
        //         uEndRipple: { value: this.params.endRipple }
        //     }
        // ])

        this.material = new THREE.ShaderMaterial({
            transparent: true,
            fragmentShader,
            vertexShader,
            side: THREE.FrontSide,
            uniforms: {
                uColor: { value: new THREE.Color('#EDEDED')},
                uTime: { value: this.time },
                uSpeed: { value: this.params.speed },
                uWaveHeight: { value: this.params.waveHeight },
                UBlendStrength: { value: this.params.blendStrength },
                UBlend: { value: this.params.blend },
                shininess: { value: 150.0 },
                uEndRipple: { value: this.params.endRipple }
            }
        });

        this.material2 = new THREE.MeshStandardMaterial({
            transparent: true,
            color: new THREE.Color('#EDEDED'),
            metalness: 0.63,
            roughness: 0,
            emissive: new THREE.Color('black'),
            side: THREE.DoubleSide
        })

        this.material3 = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#EDEDED')
        })

        this.instance = new THREE.Mesh(this.geometry, this.material2);
        this.instance.receiveShadow = false;

        this.instance.position.z = -0.001;

        this.scene.add(this.instance);
    }

    setPosition(vector3)
    {
        this.instance.position.x = vector3.x;
        this.instance.position.y = vector3.y;
        this.instance.position.z = vector3.z;
    }

    debugStuff()
    {

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("milk");
          }

            if (this.debug.active) {
                this.debugFolder
                    .add(this.params, "blend")
                    .name("blend")
                    .min(0)
                    .max(1)
                    .step(0.05)
                    .onChange(() => {

                        this.scene.traverse((child) =>
                        {
                            if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                            {
                                // child.material.uniforms.UBlend.value = this.params.blend;
                                child.material.needsUpdate = true;
                            }
                        })
                    });

                    this.debugFolder
                    .add(this.params, "blendStrength")
                    .name("blendStrength")
                    .min(0.1)
                    .max(5.0)
                    .step(0.1)
                    .onChange(() => {

                        this.scene.traverse((child) =>
                        {
                            if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                            {
                                child.material.uniforms.UBlendStrength.value = this.params.blendStrength;
                                child.material.needsUpdate = true;
                            }
                        })
                    });

                    this.debugFolder
                    .add(this.params, "speed")
                    .name("speed")
                    .min(0.001)
                    .max(0.2)
                    .step(0.0001)
                    .onChange(() => {

                        this.scene.traverse((child) =>
                        {
                            if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                            {
                                child.material.uniforms.uSpeed.value = this.params.speed;
                                child.material.needsUpdate = true;
                            }
                        })
                    });


                    this.debugFolder
                    .add(this.params, "waveHeight")
                    .name("waveHeight")
                    .min(0.1)
                    .max(10.0)
                    .step(0.1)
                    .onChange(() => {

                        this.scene.traverse((child) =>
                        {
                            if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                            {
                                child.material.uniforms.uWaveHeight.value = this.params.waveHeight;
                                child.material.needsUpdate = true;
                            }
                        })
                    });


                    this.debugFolder
                    .add(this.params, "endRipple")
                    .name("endRipple")
                    .min(0.85)
                    .max(1.0)
                    .step(0.0001)
                    .onChange(() => {

                        this.scene.traverse((child) =>
                        {
                            if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                            {
                                child.material.uniforms.uEndRipple.value = this.params.endRipple;
                                child.material.needsUpdate = true;
                            }
                        })
                    });
                }
    }

    animationSetup(bool)
    {
        this.tween1 = gsap.to(this.material.uniforms.UBlendStrength, {value: 0.4, duration: 1.0, paused: bool});
        this.tween2 = gsap.to(this.material.uniforms.uEndRipple, {value: 0.85, duration: 3.0, delay: 0.1, paused: bool});
    }


    update()
    {
        this.t = this.experience.time.elapsed;
        this.material.uniforms.uTime.value = this.t;

        // if(this.material.uniforms.UBlendStrength.value > 0.1)
        // {
        //     this.material.uniforms.UBlendStrength.value -= (this.t * 0.0001);
        // }
        // if(this.material.uniforms.uEndRipple.value > 0.85)
        // {
        //     this.material.uniforms.uEndRipple.value -= (this.t * 0.000001);
        // }
    }

    destroy()
    {

    }
}