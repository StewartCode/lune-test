import * as THREE from 'three';
import Experience from "../Experience";
import fragmentShader from '../Shaders/Video/fragment.glsl';
import vertexShader from '../Shaders/Video/vertex.glsl';

export default class Video 
{
    constructor(playVideo, width, height)
    {
        this.width = width;
        this.height = height;
        this.playVideo = playVideo;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.start();
    }

    start() 
    {
        this.video = document.getElementById('video');

        console.log(this.video);

        const texture = new THREE.VideoTexture(this.video);
        texture.needsUpdate;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        texture.crossOrigin = 'anonymous';

        if(this.playVideo)
        {
            this.object = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(this.width, this.height),
                new THREE.ShaderMaterial({
                    transparent: true,
                    uniforms: {
                        uOpacity: { value: 1.0 },
                        uColor: { value: new THREE.Vector3(0,1,1)},
                        uTexture: { value: texture }
                    },
                    fragmentShader,
                    vertexShader,
                })
            )
        }
        else
        {
            this.object = new THREE.Mesh(
                new THREE.PlaneGeometry(10,10),
                new THREE.MeshBasicMaterial({
                    map: texture
                })
            )
        }

        this.scene.add(this.object);
        // if(this.playVideo == true)
        // {
            setTimeout(() => {
                this.video.play();
            }, 2000);
        // }
    }
}