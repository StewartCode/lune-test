import * as THREE from 'three';
import Experience from "../Experience";

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


        // Resource
        this.resource = this.resources.items.why
        this.setModel();
    }


    setModel()
    {
        // this.normal = this.experience.resources.items.standardNormal;

        this.instance = this.resource.scene;
        this.instance.castShadow = true;
        this.instance.receiveShadow = false;
        this.instance.scale.set(this.params.scale, this.params.scale, this.params.scale);
        this.instance.rotation.set(this.params.rotateX, this.params.rotateY, this.params.rotateZ);
        this.instance.position.z = this.params.height;
        this.instance.position.x = 0.2;

        this.scene.add(this.instance);

        this.instance.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color('#EDEDED'),
                    metalness: this.params.metalness,
                    roughness: 0,
                    clearcoat: 1,
                    clearcoatRoughness: 0.4,
                    emissive: new THREE.Color('black'),
                    // normalMap: this.normal
                });
                child.material.side = THREE.DoubleSide;
            }
        })
    }
}