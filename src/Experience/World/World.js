import * as THREE from 'three';
import { Vector3 } from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Milk from './Milk.js';
import MilkBase from './MIlkBase.js';
import Model from './Model'
import Video from './Video.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.mouse = this.experience.mouse;



        this.modelGroup = new THREE.Group();
        this.modelGroup.name = 'modelGroup';
        this.scene.add(this.modelGroup);
        this.modelGroup.rotation.x = Math.PI * 0.1;
        this.milkArray = [];
        this.count = 5;

        this.runMouseDetect();


        // Wait for resources
        this.resources.on('ready', () =>
        {
            // for (let i = 0; i < this.count; i++) {
            //     this.milkArray.push(new Milk());
            // }
            // Setup
            // this.floor = new Floor();
            this.model = new Model(this.modelGroup);
            this.milkBase = new MilkBase();
            this.milk = new Milk();
            this.environment = new Environment();
            // this.videoBackground = new Video(false, 10, 10);
            // this.video = new Video(true);

            document.addEventListener('click', () => {
                this.milk.setPosition(this.targetPositionVector3);
                this.milk.tween1.restart();
                this.milk.tween2.restart();
            })
        })
    }

    runMouseDetect() 
    {
        this.mouse.on('mouse-move', () => 
            {
                this.targetPositionVector3 = new THREE.Vector3(this.mouse.positionInThreeSpace.x, this.mouse.positionInThreeSpace.y, this.mouse.positionInThreeSpace.z);
            }
        )
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