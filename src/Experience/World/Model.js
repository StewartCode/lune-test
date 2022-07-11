import * as THREE from 'three'
import Experience from '../Experience.js'
import { gsap } from 'gsap';

export default class Model
{
    constructor(group)
    {
        this.group = group;
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.axisHelper = new THREE.AxesHelper();
        this.scene.add(this.axisHelper);

        this.params = {};
        this.params.rotateX = 0.26;
        this.params.rotateY = 0.104;
        this.params.rotateZ = 1.6;
        this.params.scale = 0.7;
        this.params.height = -1;

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
        this.instance.scale.set(this.params.scale, this.params.scale, this.params.scale);
        this.instance.rotation.set(this.params.rotateX, this.params.rotateY, this.params.rotateZ);
        this.instance.position.z = this.params.height;
        this.instance.position.x = 0.2;

        this.group.add(this.instance);

        this.instance.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color('#EDEDED'),
                    metalness: 0.0,
                    roughness: 0,
                    clearcoat: 1,
                    clearcoatRoughness: 0.4,

                    // shininess: 350,
                    // specular: new THREE.Color('#EDEDED'),
                    emissive: new THREE.Color('black'),
                    normalMap: this.normal
                });
                child.material.side = THREE.DoubleSide;
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}

        console.log(this.animation);

        console.log(this.resource);
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        // this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        // this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // // Debug
        // if(this.debug.active)
        // {
        //     const debugObject = {
        //         playIdle: () => { this.animation.play('idle') },
        //         playWalking: () => { this.animation.play('walking') },
        //         playRunning: () => { this.animation.play('running') }
        //     }
        //     this.debugFolder.add(debugObject, 'playIdle')
        //     this.debugFolder.add(debugObject, 'playWalking')
        //     this.debugFolder.add(debugObject, 'playRunning')
        // }
    }

    animationSetup(bool)
    {
        this.tween1 = gsap.to(this.instance.position, {z: -0.15, duration: 8.0, paused: bool, delay: 0.5});
    }

    debugStuff()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('model')
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
    }

    update()
    {
        // this.animation.mixer.update(this.time.delta * 0.001)
    }
}