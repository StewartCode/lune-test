import * as THREE from 'three';
import Experience from '../Experience';
import { gsap } from 'gsap';

export default class TorusRipple
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        this.params = {};
        this.params.radius = 0.1;
        this.params.tube = 0.1;
        this.params.height = -1;


        this.start();

        this.debugStuff();
    }

    start()
    {
        this.instance = this.createTorus(this.params.radius, this.params.tube);

        this.scene.add(this.instance);

    }

    createTorus(r, t)
    {
        this.geometry = new THREE.TorusBufferGeometry(r, t, 16, 100, Math.PI * 2);

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
            // metalness: 0.63,
            // roughness: 0,
            // emissive: new THREE.Color('black'),
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
                this.destroyTorus();
                this.instance = this.createTorus(this.params.radius, this.params.tube);
                this.scene.add(this.instance);
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

    destroyTorus()
    {
        this.scene.remove(this.instance);
        this.instance.material.dispose();
        this.instance.geometry.dispose();
    }
}