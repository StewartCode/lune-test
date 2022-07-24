import * as THREE from 'three';
import { Vector3 } from 'three';
import Experience from '../Experience.js';
import Dot from './Dot.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Milk from './Milk.js';
import MilkBase from './MIlkBase.js';
import MilkBase2 from './MilkBase2.js';
import Model from './Model'
import TorusRipple from './TorusRipple.js';
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
        // this.modelGroup.rotation.z = Math.PI * -0.01;
        this.milkArray = [];
        this.count = 5;

        //cache
        this.dotArray = [];

        this.runMouseDetect();


        // Wait for resources
        this.resources.on('ready', () =>
        {
            // for (let i = 0; i < this.count; i++) {
            //     this.milkArray.push(new Milk());
            // }
            // Setup
            // this.floor = new Floor();
            this.environment = new Environment();
            this.milk = new Milk(this.environment);
            this.model = new Model(this.modelGroup, this.milk);
            this.milkBase = new MilkBase2(this.environment);
            this.torusRipple = new TorusRipple(this.milk);

            // this.dotMasterGroup = new THREE.Group();
            // this.dotMasterGroup.name = 'dotMasterGroup';
            // this.scene.add(this.dotMasterGroup);

            this.rotateAmount = (Math.PI * 2) / 40;
            let rotateTally = 0;

            for (let i = 0; i < 40; i++) {
                let group = new THREE.Group();
                this.scene.add(group);
                group.name = i;
                this.dotArray[i] = new Dot(this.milk, group, 0);
                this.dotArray[i].instance.position.x *= i;
                group.rotation.z = rotateTally;
                rotateTally += this.rotateAmount;
            }

            let rotateTally2 = 0;

            for (let i = 0; i < 40; i++) {
                let group = new THREE.Group();
                this.scene.add(group);
                group.name = i;
                this.dotArray[i] = new Dot(this.milk, group, 1.0);
                this.dotArray[i].instance.position.x *= i;
                group.rotation.z = rotateTally2;
                rotateTally2 += this.rotateAmount;
            }

            let rotateTally3 = 0;

            for (let i = 0; i < 40; i++) {
                let group = new THREE.Group();
                this.scene.add(group);
                group.name = i;
                this.dotArray[i] = new Dot(this.milk, group, 2.0);
                this.dotArray[i].instance.position.x *= i;
                group.rotation.z = rotateTally3;
                rotateTally3 += this.rotateAmount;
            }
            
            // this.videoBackground = new Video(false, 10, 10);
            // this.video = new Video(true);

            // document.addEventListener('click', () => {
            //     this.milk.setPosition(this.targetPositionVector3);
            //     this.milk.tween1.restart();
            //     this.milk.tween2.restart();
            // })
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
        if(this.milkBase)
        {
            this.milkBase.update()
        }  
        if(this.torusRipple)
        {
            this.torusRipple.update()
        }  
    }
}