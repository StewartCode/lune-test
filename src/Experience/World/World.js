import * as THREE from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Milk from './Milk.js';
import Model from './Model'
import Video from './Video.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.modelGroup = new THREE.Group();
        this.modelGroup.name = 'modelGroup';
        this.scene.add(this.modelGroup);
        this.modelGroup.rotation.x = Math.PI * 0.1;

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.floor = new Floor();
            // this.model = new Model(this.modelGroup);
            this.milk = new Milk();
            this.environment = new Environment();
            // this.videoBackground = new Video(false, 10, 10);
            // this.video = new Video(true);
        })
    }

    update()
    {
        if(this.model)
        {
            this.model.update()
        }
        if(this.milk)
        {
            this.milk.update()
        }   
    }
}