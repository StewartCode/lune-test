import * as THREE from 'three';
import Experience from '../Experience';
import fragmentShader from '../../Experience/Shaders/Ripple/fragmentShader.glsl';
import vertexShader from '../../Experience/Shaders/Ripple/vertexShader.glsl';

export default class Milk 
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.start();
    }

    start()
    {
        this.geometry = new THREE.PlaneBufferGeometry(10,10, 64, 64);
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            fragmentShader,
            vertexShader,
            uniforms: {
                uColor: { value: new THREE.Color('#EDEDED')},
                uTime: { value: this.time },
                uSpeed: { value: 0.0075 },
                uWaveHeight: { value: 0.2 },
                UBlendStrength: { value: 0.5 }
            }
        });

        this.instance = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.instance);
    }

    update()
    {
        this.time = this.experience.time.elapsed;
        this.material.uniforms.uTime.value = this.time;
    }
}