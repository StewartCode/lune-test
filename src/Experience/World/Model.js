import * as THREE from 'three'
import Experience from '../Experience.js'
import { Elastic, gsap } from 'gsap';
import { animationSpeed, ease } from '../Utils/GlobalValues.js';

export default class Model
{
    constructor(group, milk)
    {
        this.group = group;
        this.milk = milk;
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // this.axisHelper = new THREE.AxesHelper();
        // this.scene.add(this.axisHelper);

        //cache
        this.playInReverse = false;


        this.params = {};
        this.params.rotateX = 0.26;
        this.params.rotateY = -0.05;
        this.params.rotateZ = 1.6;
        this.params.scale = 0.7;
        this.params.height = -1;
        this.params.metalness = 0.0;
        this.params.roughness = 0.35;

        this.debugStuff();

        // Resource
        this.resource = this.resources.items.why

        this.setModel();
        this.animationSetup(false);
    }

    setModel()
    {
        this.normal = this.experience.resources.items.standardNormal;

        this.instance = this.resource.scene;
        this.instance.castShadow = true;
        this.instance.receiveShadow = false;
        this.instance.scale.set(this.params.scale, this.params.scale, this.params.scale);
        this.instance.rotation.set(this.params.rotateX, this.params.rotateY, this.params.rotateZ);
        this.instance.position.z = this.params.height;
        this.instance.position.x = 0.2;

        setTimeout(() => {
            this.group.add(this.instance);
        }, 2200);

        this.instance.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = new THREE.MeshStandardMaterial({
                    transparent: true,
                    color: new THREE.Color('#EDEDED'),
                    metalness: 0.63,
                    roughness: 0,
                    emissive: new THREE.Color('black'),
                    side: THREE.DoubleSide
                });
            }
        })
    }

    animationSetup(bool)
    {
        this.timeline1 = gsap.timeline();
        this.tween1 = this.timeline1.fromTo(this.instance.position, 
            {
                ease,
                z: -1.0
            },
            {
                ease,
                z: -1.0, duration: 0.0, paused: bool, 
                delay: 5.0,
            })
            .to(this.instance.position, 
            {
                ease,
                z: -1.0, duration: 1.0, paused: bool, 
            })
            .to(this.instance.position, 
            {
                ease,
                z: -1.0, duration: 1.0, paused: bool, 
            })
            .to(this.instance.position, 
            {
                ease,
                z: 0.13, duration: 3.0, paused: bool, 
            })
        .to(this.instance.position, 
            {
                ease,
                z: 0.13, duration: 1.0, paused: bool, 
            })
            .to(this.instance.position, 
            {
                ease,
                z: -1.0, duration: 2.0, paused: bool, 
            })
            .to(this.instance.position, 
            {
                ease,
                z: -1.0, duration: 2.0, paused: bool, 
            })


        this.tween1.timeScale(animationSpeed);


        this.milk.on('restart-animation', () => {
            this.tween1.restart();
            console.log('model hit forwards on event');
        })

        this.milk.on('reverse-animation', () => {
            this.tween1.restart();
            console.log('model hit reverse on event');
        })
    }



    debugStuff()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('model');
        }

        if (this.debug.active) {
            this.debugFolder
                .add(this.params, "rotateX")
                .name("rotateX")
                .min(-Math.PI *2)
                .max(Math.PI *2)
                .step(0.01)
                .onChange(() => {
                        this.instance.rotation.x = this.params.rotateX;
                });
            }

        if (this.debug.active) {
            this.debugFolder
                .add(this.params, "rotateY")
                .name("rotateY")
                .min(-Math.PI *2)
                .max(Math.PI *2)
                .step(0.001)
                .onChange(() => {
                        this.instance.rotation.y = this.params.rotateY;
                });
            }

        if (this.debug.active) {
            this.debugFolder
                .add(this.params, "rotateZ")
                .name("rotateZ")
                .min(-Math.PI *2)
                .max(Math.PI *2)
                .step(0.1)
                .onChange(() => {
                        this.instance.rotation.z = this.params.rotateZ;
                });
            }


            if (this.debug.active) {
                this.debugFolder
                    .add(this.params, "scale")
                    .name("scale")
                    .min(0.1)
                    .max(4)
                    .step(0.1)
                    .onChange(() => {
                            this.instance.scale.x = this.params.scale;
                            this.instance.scale.y = this.params.scale;
                            this.instance.scale.z = this.params.scale;
                    });
                }

            if (this.debug.active) {
                this.debugFolder
                    .add(this.params, "height")
                    .name("height")
                    .min(-1)
                    .max(1)
                    .step(0.1)
                    .onChange(() => {
                            this.instance.position.z = this.params.height;
                    });
                }

                if (this.debug.active) {
                    this.debugFolder
                        .add(this.params, "metalness")
                        .name("metalness")
                        .min(0)
                        .max(2)
                        .step(0.01)
                        .onChange(() => {
                            this.scene.traverse((child) =>
                            {
                                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial)
                                {
                                    child.material.metalness = this.params.metalness;
                                    child.material.needsUpdate = true;
                                }
                            })
                        });
                    }

                
                if (this.debug.active) {
                    this.debugFolder
                        .add(this.params, "roughness")
                        .name("roughness")
                        .min(0)
                        .max(2)
                        .step(0.01)
                        .onChange(() => {
                            this.scene.traverse((child) =>
                            {
                                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial)
                                {
                                    child.material.roughness = this.params.roughness;
                                    child.material.needsUpdate = true;
                                }
                            })
                        });
                    }
    }

    update()
    {
        // this.animation.mixer.update(this.time.delta * 0.001)
    }
}