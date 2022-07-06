import * as THREE from "three";
import Experience from "../Experience";
import fragmentShader from "../Shaders/Video/fragment.glsl";
import vertexShader from "../Shaders/Video/vertex.glsl";

export default class Video {
  constructor(playVideo) {
    this.playVideo = playVideo;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.params = {};
    this.params.blend = 0.0;
    this.params.videoSize = 10;
    this.params.scale = 1;
    this.params.addLight = 0.19;
    this.params.blendStrength = 2.1;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("video");
    }

    this.start();
  }

  start() {
    this.video = document.getElementById("video");

    const texture = new THREE.VideoTexture(this.video);
    texture.needsUpdate;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    texture.crossOrigin = "anonymous";

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uOpacity: { value: this.params.blend },
        uTexture: { value: texture },
        uAddLight: { value: this.params.addLight },
        UBlendStrength: { value: this.params.blendStrength }
      },
      fragmentShader,
      vertexShader,
    });

    if (this.playVideo) {
      this.object = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(this.params.videoSize, this.params.videoSize),
        this.material
      );
    }

    this.scene.add(this.object);

    const button = document.getElementById("button");

    button.addEventListener("click", () => {
      button.style.display = "none";
      this.video.play();
    });

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.params, "blend")
        .name("blend")
        .min(0)
        .max(1)
        .step(0.05)
        .onChange(() => {

            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                {
                    child.material.uniforms.uOpacity.value = this.params.blend;
                    child.material.needsUpdate = true;
                }
            })
        });

        this.debugFolder
        .add(this.params, "scale")
        .name("scale")
        .min(0.1)
        .max(2)
        .step(0.05)
        .onChange(() => {

            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneBufferGeometry)
                {
                    child.scale.x = this.params.scale;
                    child.scale.y = this.params.scale;
                }
            })
        });

        this.debugFolder
        .add(this.params, "addLight")
        .name("addLight")
        .min(0.0)
        .max(1.0)
        .step(0.005)
        .onChange(() => {

            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                {
                    child.material.uniforms.uAddLight.value = this.params.addLight;
                    child.material.needsUpdate = true;
                }
            })
        });

        this.debugFolder
        .add(this.params, "blendStrength")
        .name("blendStrength")
        .min(0.1)
        .max(3)
        .step(0.1)
        .onChange(() => {

            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial)
                {
                    child.material.uniforms.UBlendStrength.value = this.params.blendStrength;
                    child.material.needsUpdate = true;
                }
            })
        });
    }
  }
}
