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
        this.geometry = new THREE.PlaneBufferGeometry(10,10, 128, 128);

        const customVertexShader = document.getElementById('customVertexShader').textContent;
        const customFragmentShader = document.getElementById('customFragmentShader').textContent;


        const customUniform = new THREE.UniformsUtils.merge([
            THREE.ShaderLib.phong.uniforms,
            {
                uColor: { value: new THREE.Color('#EDEDED')},
                uTime: { value: this.time },
                uSpeed: { value: 0.0075 },
                uWaveHeight: { value: 2.1 },
                UBlendStrength: { value: 0.5 },
                shininess: { value: 150.0 }
            }
        ])

        this.material = new THREE.ShaderMaterial({
            transparent: true,
            fragmentShader,
            vertexShader,
            uniforms: customUniform,
            lights: true,
            side: THREE.DoubleSide,
        });

        this.material2 = new THREE.MeshPhongMaterial({
            transparent: true
        })

        console.log(this.material);

        this.instance = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.instance);
    }

    update()
    {
        this.time = this.experience.time.elapsed;
        this.material.uniforms.uTime.value = this.time;
    }
}