import * as THREE from 'three';
import Experience from '../Experience';
import { gsap } from 'gsap';
import { ease, animationSpeed } from '../Utils/GlobalValues';

export default class Dot
{
    constructor(milk, group, delay)
    {
        this.milk = milk;
        this.group = group;
        this.delay = delay;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.start()
        this.animation(false);
    }

    start()
    {
        this.instance = this.createSphere();
        this.group.add(this.instance);
        // this.group.rotation.z = this.rotateAmount;
    }

    createSphere()
    {
        const geometry = new THREE.SphereBufferGeometry(0.1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            transparent: true,
            color: new THREE.Color('#EDEDED'),
            metalness: 0.63,
            roughness: 0,
            emissive: new THREE.Color('black'),
            side: THREE.DoubleSide
        });
        return new THREE.Mesh(geometry, material);
    }

    animation(bool)
    {
        this.timeline1 = gsap.timeline();
        this.tween1 = this.timeline1.fromTo(this.instance.position, 
            {
                ease,
                y: 0.0,
                z: 0.0,
            },
            {
                ease,
                y: 3.0, 
                duration: 3.0, 
                paused: bool,
                z: 0.0,
                delay: this.delay
            })
            .to(this.instance.position, 
            {
                ease,
                y: 3.0, 
                duration: 2.0, 
                paused: bool,
                z: -40.0
            })
            .to(this.instance.position, 
            {
                ease,
                y: 3.0, 
                duration: 2.0, 
                paused: bool, 
                z: -40.0
            })


            this.timeline1 = gsap.timeline();

            console.log(this.instance);

            this.tween2 = this.timeline1.fromTo(this.instance.material, 
            {
                ease,
                opacity: 0.0,
            },
            {
                ease,
                opacity: 1.0,
                delay: this.delay,
                duration: 2.0, 
                paused: bool,
            })
            .to(this.instance.material, 
            {
                ease,
                opacity: 0.0,
                duration: 1.0, 
                paused: bool,
            })
            .to(this.instance.material, 
            {
                ease,
                opacity: 1.0,
                duration: 8.0, 
                paused: bool, 
            })

            this.tween1.timeScale(animationSpeed);
            this.tween2.timeScale(animationSpeed);


            this.milk.on('restart-animation', () => {
                this.tween1.restart();
                this.tween2.restart();
                console.log('dot hit forwards on event');
            })
    
            this.milk.on('reverse-animation', () => {
                this.tween1.restart();
                this.tween2.restart();
                console.log('dot hit reverse on event');
            })
    }
}