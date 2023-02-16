
import * as THREE from "three";
import { RedFormat } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'



window.customElements.define('forest-demo', class extends HTMLElement {
    connectedCallback() {

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        camera.position.set(0, 0, 10);
        scene.add(camera);

        const cubeGenmetry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        // 根据几何体与材质创建物体
        const cube = new THREE.Mesh(cubeGenmetry, cubeMaterial);

        //添加到场景
        scene.add(cube);

        //初始化渲染器
        const renderer = new THREE.WebGLRenderer();
        // 设置尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        // console.log(renderer)

        // 添加到canvas
        document.body.appendChild(renderer.domElement);

        // 使用渲染器，通过相机渲染
        renderer.render(scene, camera);

        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);


        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        render();


    }
})