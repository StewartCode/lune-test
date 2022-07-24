import * as THREE from 'three';
import Experience from '../Experience';
import { gsap } from 'gsap';
import { animationSpeed, ease } from '../Utils/GlobalValues';

export default class TorusRipple
{
    constructor(milk)
    {
        this.experience = new Experience();
        this.milk = milk;
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        this.params = {};
        this.params.radius = 8.04;
                // to         this.params.radius = 40;
        this.params.tube = 14.43;
        //from this.params.height = -1;
        this.params.height = -0.804;
        // to         this.params.height = -0.804;


        this.start();

        this.debugStuff();

        this.animationSetup(false);

    }

    start()
    {
        this.instance = this.createTorus(this.params.radius, this.params.tube);

        this.scene.add(this.instance);

    }

    createTorus(r, t)
    {
        this.geometry = new THREE.TorusBufferGeometry(r, t, 3, 100, Math.PI * 2);

        this.material = new THREE.MeshStandardMaterial({
            transparent: true,
            color: new THREE.Color('#EDEDED'),
            metalness: 0.63,
            roughness: 0.0,
            emissive: new THREE.Color('black'),
            side: THREE.DoubleSide
        })

        this.material2 = new THREE.MeshMatcapMaterial({
            transparent: true,
            color: new THREE.Color('#EDEDED'),
            side: THREE.DoubleSide
        })

        this.instance = new THREE.Mesh(this.geometry, this.material);
        this.instance.geometry.dynamic = true;
        this.instance.geometry.verticesNeedUpdate = true;
        this.instance.receiveShadow = false;

        this.instance.scale.set(0.1, 0.1, 0.1);

        this.instance.position.z = this.params.height;

        return this.instance;

    }

    animationSetup(bool)
    {
        this.timeline1 = gsap.timeline();
        this.timeline2 = gsap.timeline();
        this.tween1 = this.timeline1.fromTo(this.params, 
            {
                ease,
                height: -2.0
            },
            {
                height: -2.0, duration: 1.0, paused: bool, 
                delay: 0.5,
            })
            .to(this.params,
            {
                ease,
                height: -2, duration: 2.5, paused: bool,  
            })
            .to(this.params,
            {
                ease,
                height: 0.1, duration: 2.5, paused: bool, 
            })
            .to(this.params,
            {
                ease,
                height: -0.5, duration: 1.0, paused: bool, 
            })

            .to(this.params,
            {
                ease,
                height: -1.0, duration: 1.0, paused: bool, 
            })

            .to(this.params,
            {
                ease,
                height: -2.0, duration: 3.5, paused: bool, 
            })


        this.tween2 = this.timeline2.fromTo(this.params,
            {
                ease,
                radius: 8.04
            },
            {
                ease,
                radius: 8.04, duration: 1.0, paused: bool, 
                delay: 1.0,
            })
            .to(this.params,
            {
                ease,
                radius: 8.04, duration: 3.0, paused: bool, 
            })
            .to(this.params,
            {
                ease,
                radius: 8.04, duration: -0.5, paused: bool, 
            })
            .to(this.params,
            {
                ease,
                radius: 30.0, duration: 5.5, paused: bool, 
            })
            .to(this.params,
            {
                ease,
                radius: 8.04, duration: 1.0, paused: bool, 
            })

        this.tween1.timeScale(animationSpeed);
        this.tween2.timeScale(animationSpeed);

        this.milk.on('restart-animation', () => {
            this.tween1.restart();
            this.tween2.restart();
            console.log('torus hit forwards on event');
        })

        this.milk.on('reverse-animation', () => {
            this.tween1.restart();
            this.tween2.restart();
            console.log('torus hit reverse on event');
        })
    }

    // reverse(t)
    // {
    //     t.tween1.reverse();
    //     t.tween2.reverse();
    //     t.setTriggerEndOfForwards();

    //     console.log('milk hit reverse');
    // }

    // forwards(t)
    // {
    //     t.tween1.restart();
    //     t.tween2.restart();
    //     t.setTriggerEndOfReverse();

    //     console.log('milk hit forwards');
    // }

    debugStuff()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('torus');

            this.debugFolder
            .add(this.params, "radius")
            .name("radius")
            .min(0)
            .max(40)
            .step(0.01)
            .onChange(() => {
                this.destroyTorus();
                this.instance = this.createTorus(this.params.radius, this.params.tube);
                this.scene.add(this.instance);
            });

            this.debugFolder
            .add(this.params, "tube")
            .name("tube")
            .min(0)
            .max(40)
            .step(0.01)
            .onChange(() => {
                this.torusUpdateForAnimation();
            });

            this.debugFolder
            .add(this.params, "height")
            .name("height")
            .min(-1)
            .max(0.1)
            .step(0.001)
            .onChange(() => {
                    this.instance.position.z = this.params.height;
            });
        }
    }

    torusUpdateForAnimation()
    {
        this.destroyTorus();
        this.instance = this.createTorus(this.params.radius, this.params.tube);
        this.instance.position.z = this.params.height;
        this.scene.add(this.instance);
    }

    destroyTorus()
    {
        this.scene.remove(this.instance);
        this.instance.material.dispose();
        this.instance.geometry.dispose();
    }

    update()
    {
        this.torusUpdateForAnimation();
    }
}