import EventEmitter from "./EventEmitter";
import * as THREE from 'three';
import { Vector3 } from "three";
import Helper from "./Helper";
import Experience from "../Experience";

export default class Mouse extends EventEmitter 
{
    constructor() 
    {
        super();
        this.app = new Experience();
        this.resources = this.app.resources;
        this.sizes = this.app.sizes;
        this.camera = this.app.camera;
        this.helper = new Helper();

        //cache
        this.position = 
        {
            x: 0,
            y: 0
        }
        this.positionTouch = 
        {
            x: 0,
            y: 0
        }
        this.vec1 = new THREE.Vector3();
        this.vec2 = new THREE.Vector3();
        this.vec3 = new THREE.Vector3();
        this.vec4 = new THREE.Vector3();
        this.positionInThreeSpace = new THREE.Vector3();
        this.positionInThreeSpaceTouch = new THREE.Vector3();
        this.positionOffTheLeftOfTheScreenInThreeSpace = new THREE.Vector3();
        this.positionOffTheBottomOfTheScreenInThreeSpace = new THREE.Vector3();
        this.gamePlanetPosition = new THREE.Vector3();
        this.distance1 = 0;
        this.distance2 = 0;
        this.distance3 = 0;
        this.distance4 = 0;

        this.start();
        
        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.runScreenResize()
        })
    }

    start() 
    {

        // this.mobileTestTouchElement = document.querySelector('.touch');
        // this.mobileTestTouchElement.innerHTML = 'pre update value ';

        window.addEventListener('mousemove', (e) => 
        {
            // console.log(this.sizes.width, this.sizes.height);
            // console.log(e.clientX, e.clientY);
            this.position.x = e.clientX;
            this.position.y = e.clientY;

            this.trigger('mouse-move');

            this.processing();
        })

        window.addEventListener('mousedown', () => {
            this.trigger('mouse-click');
        })

        window.addEventListener('mouseup', () => {
            this.trigger('mouse-up');
        })

        window.addEventListener('touchstart', (e) => {
            e.preventDefault;
            if(e.touches)
            {
                this.positionTouch.x = e.touches[0].clientX;
                this.positionTouch.y = e.touches[0].clientY;
            }
            this.trigger('touch-start');

            this.processingTouch();
        })

        window.addEventListener('touchmove', (e) => {
            e.preventDefault;
            if(e.touches)
            {
                this.positionTouch.x = e.touches[0].clientX;
                this.positionTouch.y = e.touches[0].clientY;
            }

            this.trigger('touch-move');

            this.processingTouch();
        })

        window.addEventListener('touchend', () => {

            this.trigger('touch-end');
        })
    }

    runScreenResize() 
    {
        this.checkOffTheScreenLeftPosition();
        this.checkOffTheScreenBottomPosition();
        this.getGamePlanetPosition();

        this.sizes.on('resize', () => {
            this.checkOffTheScreenLeftPosition();
            this.checkOffTheScreenBottomPosition();
            this.getGamePlanetPosition();
        })
    }

    createCube() 
    {
        return new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,1,1),
            new THREE.MeshBasicMaterial()
        )
    }

    getGamePlanetPosition()
    {
        const value = window.innerWidth * 0.25;

        this.vec4.set
        (
            (value / window.innerWidth) * 2 -1,
            1,
            0.5
        )
        this.vec4.unproject(this.camera.instance);
        this.vec4.sub(this.camera.instance.position).normalize();
        this.distance4 = - this.camera.instance.position.z / this.vec4.z;
        this.gamePlanetPosition.copy(this.camera.instance.position).add(this.vec4.multiplyScalar(this.distance4));
    }

    processing() 
    {
        const position = this.helper.getThreePositionFromScreenPosition(
            new Vector3(
                this.position.x,
                 this.position.y, 
                 0.5
                 ), 
                 this.camera
                 );

        this.positionInThreeSpace.copy(position);
    }

    processingTouch() 
    {
        const position = this.helper.getThreePositionFromScreenPosition(
            new Vector3(
                this.positionTouch.x,
                 this.positionTouch.y, 
                 0.5
                 ), 
                 this.camera
                 );

        this.positionInThreeSpace.copy(position);
    }

    checkOffTheScreenLeftPosition() 
    {
        this.vec2.set
        (
            -1,
            1,
            0.5
        )
        this.vec2.unproject(this.camera.instance);
        this.vec2.sub(this.camera.instance.position).normalize();
        this.distance2 = - this.camera.instance.position.z / this.vec2.z;
        this.positionOffTheLeftOfTheScreenInThreeSpace.copy(this.camera.instance.position).add(this.vec2.multiplyScalar(this.distance2));
    }

    checkOffTheScreenBottomPosition() 
    {
        this.vec3.set
        (
            0,
            -1,
            0.5,
        )
        this.vec3.unproject(this.camera.instance);
        this.vec3.sub(this.camera.instance.position).normalize();
        this.distance3 = - this.camera.instance.position.z / this.vec3.z;
        this.positionOffTheBottomOfTheScreenInThreeSpace.copy(this.camera.instance.position).add(this.vec3.multiplyScalar(this.distance3));
    }

    update()
    {
        // this.mobileTestTouchElement.innerHTML = this.positionTouch.x;
    }
}