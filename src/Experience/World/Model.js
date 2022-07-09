import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Model
{
    constructor(group)
    {
        this.group = group;
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('model')
        }

        // Resource
        this.resource = this.resources.items.why

        this.setModel()
        // this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.group.add(this.model);

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color('#EDEDED'),
                    shininess: 350,
                    specular: new THREE.Color('#EDEDED'),
                    emissive: new THREE.Color('black')
                });
                child.material.side = THREE.DoubleSide;
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}

        console.log(this.animation);

        console.log(this.resource);
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        // this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        // this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // // Debug
        // if(this.debug.active)
        // {
        //     const debugObject = {
        //         playIdle: () => { this.animation.play('idle') },
        //         playWalking: () => { this.animation.play('walking') },
        //         playRunning: () => { this.animation.play('running') }
        //     }
        //     this.debugFolder.add(debugObject, 'playIdle')
        //     this.debugFolder.add(debugObject, 'playWalking')
        //     this.debugFolder.add(debugObject, 'playRunning')
        // }
    }

    update()
    {
        // this.animation.mixer.update(this.time.delta * 0.001)
    }
}