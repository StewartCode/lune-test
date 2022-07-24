import * as THREE from 'three'
import Experience from '../Experience.js';
import { gsap } from 'gsap';

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()

        // this.animationSetup(false);

        // this.setEnvironmentMap();

        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMapIntensity = 0.0;
                child.material.needsUpdate = true
            }
        })
        

        //light from 1.558

        /// light to  0.452

        // old y position 0.821
    }

    setSunLight()
    {
        // this.sunLight1 = new THREE.DirectionalLight('#EDEDED', 0.5);
        this.sunLight1 = new THREE.AmbientLight('#EDEDED', 3.24);

        // this.sunLight = new THREE.DirectionalLight('#EDEDED', 4);
        this.sunLight1.castShadow = true;
        // this.sunLight1.shadow.camera.far = 15;
        // this.sunLight1.shadow.mapSize.set(1024, 1024);
        // this.sunLight1.shadow.normalBias = 0.05;
        this.sunLight1.position.set(5.0, 5.0, 5.0);
        this.scene.add(this.sunLight1);


        this.sunLight2 = new THREE.DirectionalLight('#EDEDED', 4.592);
        // this.sunLight = new THREE.DirectionalLight('#EDEDED', 4);
        this.sunLight2.castShadow = true;
        this.sunLight2.shadow.camera.far = 15;
        this.sunLight2.shadow.mapSize.set(1024, 1024);
        this.sunLight2.shadow.normalBias = 0.05;
        this.sunLight2.position.set(5.0, -5.0, 5.0);
        this.scene.add(this.sunLight2);


        // this.sunLight3 = new THREE.DirectionalLight('#EDEDED', 0.5);
        // // this.sunLight = new THREE.DirectionalLight('#EDEDED', 4);
        // this.sunLight3.castShadow = true;
        // this.sunLight3.shadow.camera.far = 15;
        // this.sunLight3.shadow.mapSize.set(1024, 1024);
        // this.sunLight3.shadow.normalBias = 0.05;
        // this.sunLight3.position.set(-5.0, 5.0, 5.0);
        // this.scene.add(this.sunLight3);


        // this.sunLight4 = new THREE.DirectionalLight('#EDEDED', 0.5);
        // // this.sunLight = new THREE.DirectionalLight('#EDEDED', 4);
        // this.sunLight4.castShadow = true;
        // this.sunLight4.shadow.camera.far = 15;
        // this.sunLight4.shadow.mapSize.set(1024, 1024);
        // this.sunLight4.shadow.normalBias = 0.05;
        // this.sunLight4.position.set(-5.0, -5.0, 5.0);
        // this.scene.add(this.sunLight4);

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight1, 'intensity')
                .name('sunLightIntensity1')
                .min(0)
                .max(10)
                .step(0.001)

                this.debugFolder
                .add(this.sunLight2, 'intensity')
                .name('sunLightIntensity2')
                .min(0)
                .max(10)
                .step(0.001)

                // this.debugFolder
                // .add(this.sunLight3, 'intensity')
                // .name('sunLightIntensity3')
                // .min(0)
                // .max(10)
                // .step(0.001)

                // this.debugFolder
                // .add(this.sunLight4, 'intensity')
                // .name('sunLightIntensity4')
                // .min(0)
                // .max(10)
                // .step(0.001)
            
            this.debugFolder
                .add(this.sunLight1.position, 'x')
                .name('sunLightX')
                .min(- 15)
                .max(15)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight1.position, 'y')
                .name('sunLightY')
                .min(- 15)
                .max(15)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight1.position, 'z')
                .name('sunLightZ')
                .min(- 15)
                .max(15)
                .step(0.001)
        }

        // this.sunLight.position.x = 1.681;
        // this.sunLight.position.y = 100;
        // this.sunLight.position.z = 10;
    }

    setEnvironmentMap()
    {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.0;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.encoding = THREE.sRGBEncoding;
        
        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }

    animationSetup(bool)
    {
        this.tween1 = gsap.to(this.sunLight.position, {y: 0.452, duration: 4.0, paused: bool, delay: 4.0});
        this.tween1 = gsap.to(this.sunLight.position, {x: 0.5, duration: 4.0, paused: bool, delay: 4.0});
    }
}