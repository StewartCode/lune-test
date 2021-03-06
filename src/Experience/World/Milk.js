import * as THREE from 'three';
import EventEmitter from '../Utils/EventEmitter';
import Experience from '../Experience';
import fragmentShader from '../../Experience/Shaders/Ripple/fragmentShader.glsl';
import vertexShader from '../../Experience/Shaders/Ripple/vertexShader.glsl';
import { gsap } from 'gsap';

export default class Milk extends EventEmitter
{
    constructor(environment)
    {

        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;
        this.environment = environment;


        this.params = {};
        this.params.blend = 3.0;
        // this.params.waveHeight = 0.225;
        this.params.waveHeight = 0.0;
        this.params.frequency = 1.0;
        this.params.blendStrength = 10.0;
        this.params.speed = 0.0114;
        this.params.endRipple = 1.0;

        this.start();
        this.debugStuff();

        //paused
        this.animationSetup(false);
        this.destroy();
    }

    start()
    {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 128, 128);

        // const customVertexShader = document.getElementById('customVertexShaderPhong').textContent;
        // const customFragmentShader = document.getElementById('customFragmentShaderPhong').textContent;

        const customVertexShader = document.getElementById('customVertexShaderPhysical').textContent;
        const customFragmentShader = document.getElementById('customFragmentShaderPhysical').textContent;

        this.texture = document.getElementById("texture1");


        const texture = new THREE.Texture(this.texture);


        const customUniform = new THREE.UniformsUtils.merge([
            // THREE.ShaderLib.phong.uniforms,
            THREE.ShaderLib.physical.uniforms,
            {
                uColor: { value: new THREE.Color('#EDEDED')},
                uTime: { value: this.time },
                uSpeed: { value: this.params.speed },
                uWaveHeight: { value: this.params.waveHeight },
                UBlendStrength: { value: this.params.blendStrength },
                UBlend: { value: this.params.blend },
                shininess: { value: 75.0 },
                uTexture: { value:  texture},
                uEndRipple: { value: this.params.endRipple }
            }
        ])

        this.material = new THREE.ShaderMaterial({
            transparent: true,
            vertexShader: customVertexShader,
            fragmentShader: customFragmentShader,
            uniforms: customUniform,
            lights: true,
            side: THREE.FrontSide,
        });

        this.material2 = new THREE.MeshPhysicalMaterial({
            transparent: true,
            color: new THREE.Color('#EDEDED'),
            metalness: 0.0,
            roughness: 0.35,
            clearcoat: 1,
            clearcoatRoughness: 0.4,
            emissive: new THREE.Color('black'),
            side: THREE.DoubleSide
        })

        this.instance = new THREE.Mesh(this.geometry, this.material2);

        // this.instance.material.uniforms.envMap.value = this.environment.environmentMap.texture;

        // console.log(this.instance);

        // this.scene.add(this.instance);
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
                    .max(3)
                    .step(0.05)
                    .onChange(() => {

                        this.scene.traverse((child) =>
                        {
                            if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                            {
                                child.material.uniforms.UBlend.value = this.params.blend;
                                child.material.needsUpdate = true;
                            }
                        })
                    });

                    this.debugFolder
                    .add(this.params, "blendStrength")
                    .name("blendStrength")
                    .min(0.0)
                    .max(10.0)
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
                    .min(0.0)
                    .max(5.0)
                    .step(0.01)
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
                    .min(0.0)
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
        // this.tween1 = gsap.fromTo(this.material.uniforms.UBlendStrength, 
        //     {value: 10.0, delay: 0.0, paused: bool},
        //     {value: 5.5, duration: 8.0, delay: 2.5, paused: bool, repeat: -1},
        //     );
        // this.tween2 = gsap.fromTo(this.material.uniforms.uEndRipple, 
        //     {value: 0.915, delay: 0.0, paused: bool},
        //     {value: 0.0, duration: 8.0, delay: 3.0, paused: bool, repeat: -1, onComplete: () => { console.log('completed animation'); }},
        //     );


        this.tween1 = gsap.fromTo(this.material.uniforms.UBlend, 
                {
                    value: 3.0, 
                },
                {
                    value: 0, 
                    duration: 13.0, 
                    delay: 0.0, paused: bool, 
                    onComplete: this.reverse, 
                    onCompleteParams: [this], 
                    onReverseComplete: this.forwards, 
                    onReverseCompleteParams: [this]
                },
            );

        this.tween2 = gsap.fromTo(this.material.uniforms.uEndRipple, 
                {
                    value: 1.0
                },
                {
                    value: 0.6804, 
                    duration: 12.0, 
                    delay: 1.0, 
                    paused: bool
                },
            );
    }

    reverse(t)
    {
        t.tween1.reverse();
        t.tween2.reverse();
        t.setTriggerEndOfForwards();
    }

    forwards(t)
    {
        t.tween1.restart();
        t.tween2.restart();
        t.setTriggerEndOfReverse();
    }

    setTriggerEndOfReverse()
    {
        this.trigger('restart-animation');
    }

    setTriggerEndOfForwards()
    {
        this.trigger('reverse-animation');
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