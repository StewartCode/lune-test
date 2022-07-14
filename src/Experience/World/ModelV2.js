import * as THREE from 'three';
import Experience from "../Experience";
import fragmentShader from '../../Experience/Shaders/Ripple2/fragmentShader.glsl';
import vertexShader from '../../Experience/Shaders/Ripple2/vertexShader.glsl';
// import Raymarcher from 'three-raymarcher';

export default class ModelV2 
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;


        this.params = {};
        this.params.rotateX = 0.26;
        this.params.rotateY = 0.104;
        this.params.rotateZ = 1.6;
        this.params.scale = 0.7;
        this.params.height = -1;
        this.params.metalness = 0.65;
        // this.params.blend = 3.0;
        // this.params.waveHeight = 1.5;
        // this.params.frequency = 1.0;
        // this.params.blendStrength = 10.0;
        // this.params.speed = 0.0114;
        // this.params.endRipple = 1.0;
        this.params.sliceDepth = 5.0;
        this.params.cameraPositionX = 0.0;
        this.params.cameraPositionY = 0.0;
        this.params.cameraPositionZ = 10.0;
        this.params.sdfMod = 0.0;


        // Resource
        this.resource = this.resources.items.why
        this.setModel();
        this.debugStuff();
    }


    setModel()
    {
        // this.normal = this.experience.resources.items.standardNormal;

        this.instance = this.resource.scene;
        console.log(this.instance);
        this.instance.castShadow = true;
        this.instance.receiveShadow = false;
        this.instance.scale.set(this.params.scale, this.params.scale, this.params.scale);
        this.instance.rotation.set(this.params.rotateX, this.params.rotateY, this.params.rotateZ);
        // this.instance.position.z = this.params.height;

        this.scene.add(this.instance);

        this.instance.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = new THREE.ShaderMaterial({
                    transparent: true,
                    vertexShader,
                    fragmentShader,
                    uniforms: 
                    {
                        uColor: { value: new THREE.Color('#EDEDED')},
                        u_time: { value: this.time },
                        u_sliceDepth: { value: this.params.sliceDepth },
                        u_3d: { value: true },
                        u_2d: { value: false },
                        u_animatedDomains: { value: false },
                        u_cameraPosition: { value: new THREE.Vector3(this.params.cameraPositionX, this.params.cameraPositionY, this.params.cameraPositionZ) },
                        USdfMod: { value: this.params.sdfMod }
                        // uSpeed: { value: this.params.speed },
                        // uWaveHeight: { value: this.params.waveHeight },
                        // UBlendStrength: { value: this.params.blendStrength },
                        // UBlend: { value: this.params.blend },
                        // shininess: { value: 75.0 },
                        // uEndRipple: { value: this.params.endRipple }
                    },
                });
                child.material.side = THREE.DoubleSide;
            }
        })
    }

    debugStuff()
    {

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("ModelV2");
          }

        this.debugFolder
        .add(this.params, "sdfMod")
        .name("sdfMod")
        .min(-10.0)
        .max(10.0)
        .step(0.01)
        .onChange(() => {

            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                {
                    child.material.uniforms.USdfMod.value = this.params.sdfMod;
                    child.material.needsUpdate = true;
                }
            })
        });
    }
}