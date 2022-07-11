import * as THREE from "three";
import Experience from "./Experience.js";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import  { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;

    this.params = {};
    this.params.color = "#000000";

    this.setInstance();

    //cache
    this.postProcessing = {};
    this.effectController = {
        focus: 10.0,
        // aperture: 0,
        aperture: 0.22,
        maxblur: 0.01,
        // maxblur: 0
        bloom: 0.14,
        film: 0.24,
        scanlines: 1024,
        scanlinesIntensity: 0.0
    }

    this.postProcessingSetup();
    this.matChanger();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("renderer");
    }

    this.debugStuff();

  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 4.0;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.instance.setClearColor('#C9CBCC')
    // this.instance.setClearColor("black");
    // this.instance.setClearColor('#ffffff')
    this.instance.setClearColor(this.params.color);
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  postProcessingSetup()
  {


    let RenderTargetClass = null

    if(this.instance.getPixelRatio() === 1 && this.instance.capabilities.isWebGL2)
    {
        RenderTargetClass = THREE.WebGLMultisampleRenderTarget
        // console.log('Using WebGLMultisampleRenderTarget')
    }
    else
    {
        RenderTargetClass = THREE.WebGLRenderTarget
        // console.log('Using WebGLRenderTarget')
    }



    const renderTarget = new RenderTargetClass(
        this.sizes.width,
        this.sizes.height,
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat
        }
    )




    this.effectComposer = new EffectComposer(this.instance, renderTarget)
    this.effectComposer.setSize(this.sizes.width, this.sizes.height)
    this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    const renderPass = new RenderPass(this.scene, this.camera.instance);

    this.effectComposer.addPass(renderPass);

    const bokehPass = new BokehPass(this.scene, this.camera.instance, {
        focus: 74.0,
        aperture: 1,
        maxblur: 0.008,

        width: this.sizes.width,
        height: this.sizes.height
    })
    // console.log(bokehPass);

    const filmPass = new FilmPass(this.effectController.film,0,0,0);
    const bloomPass = new UnrealBloomPass(0.5, this.effectController.bloom, 0, 0);
    this.effectComposer.addPass(bloomPass);

    this.effectComposer.addPass(filmPass);

    // this.effectComposer.addPass(bokehPass);

    this.postProcessing.boken = bokehPass;
    this.postProcessing.bloom = bloomPass;
    this.postProcessing.film = filmPass;


    const sMAAPass = new SMAAPass();
    this.effectComposer.addPass(sMAAPass);

    // this.displacementPass = new ShaderPass(this.overlayMaterial)
    // this.displacementPass.material.uniforms.uTime.value = this.app.time.elapsed;
    // this.effectComposer.addPass(displacementPass)

    // const dotPass = new DotScreenPass();
    // this.effectComposer.addPass(dotPass);

    // console.log(this.instance.info);
  }


  debugStuff()
  {
    // Debug
    if (this.debug.active) {
      this.debugFolder
        .addColor(this.params, "color")
        .name("color")
        .onChange(() => {
            this.instance.setClearColor(this.params.color);
        });
    }

    if(this.debug.active)
    {
        this.debugFolder = this.debug.ui.addFolder('effects');
        // this.debugFolder.close();

        this.debugFolder.add(this.effectController, 'focus', 0, 1000.0, 1).onChange(this.matChanger());
        this.debugFolder.add(this.effectController, 'aperture', -1.0, 1.0, 0.001).onChange(this.matChanger());
        this.debugFolder.add(this.effectController, 'maxblur', 0, 0.1, 0.001).onChange(this.matChanger());

        this.debugFolder.add(this.effectController, 'bloom', 0, 5.0, 0.01).onChange(this.matChanger());
        this.debugFolder.add(this.effectController, 'film', 0, 1.0, 0.01).onChange(this.matChanger());
        this.debugFolder.add(this.effectController, 'scanlines', 0, 1024, 1.0).onChange(this.matChanger());
        this.debugFolder.add(this.effectController, 'scanlinesIntensity', 0, 10, 0.01).onChange(this.matChanger());
    }
  }

  matChanger()
  {
      // console.log(this.postProcessing);
      if(this.postProcessing.boken.uniforms['focus'].value)
      {
        console.log('hit1');

          return () => {
              // this.postProcessing.boken.uniforms['focus'].value = this.effectController.focus;
              // this.postProcessing.boken.uniforms['aperture'].value = this.effectController.aperture * 0.0001;
              // this.postProcessing.boken.uniforms['maxblur'].value = this.effectController.maxblur;

              this.postProcessing.bloom.strength = this.effectController.bloom;
              this.postProcessing.film.uniforms['nIntensity'].value = this.effectController.film;
              this.postProcessing.film.uniforms['sCount'].value = this.effectController.scanlines;
              this.postProcessing.film.uniforms['sIntensity'].value = this.effectController.scanlinesIntensity;
          }
      }

  }


  update() {
    // this.instance.render(this.scene, this.camera.instance);

    this.effectComposer.render();

  }
}
