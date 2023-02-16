
import * as THREE from "three";
import { RedFormat } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


window.customElements.define('forest-demo', class extends HTMLElement {
    connectedCallback() {

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        camera.position.set(0, 0, 10);
        // 宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机投影矩阵
        camera.updateProjectionMatrix();

        // 加载背景
        const loader = new THREE.TextureLoader();
        const bgTexture = loader.load("/download.jpeg");
        // 背景折射映射
        bgTexture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = bgTexture;
        scene.environment = bgTexture;

        // 这是一个FPS的指示器
        // const stats = new Stats();
        // stats.showPanel(0);
        // // 加入到页面之中 
        // document.body.appendChild(stats.dom);


        //写地面
        const planeBufferGeometry = new THREE.PlaneBufferGeometry(100, 100);
        const plane = new THREE.Mesh(planeBufferGeometry, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
                plane.rotation.x = - Math.PI / 2;
                plane.name = "plane";
                scene.add(plane);
                scene.add(new THREE.GridHelper(100, 100));

        
          // 动画
        var animationMixer = new THREE.AnimationMixer(scene);
        // 时钟
        var clock = new THREE.Clock();


        // 添加环境光
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);

        // 加载模型
        const gltfLoader = new GLTFLoader();
        gltfLoader.load("/model/BrainStem/glTF/BrainStem.gltf", (gltf) => {
            console.log(gltf);
            const model = gltf.scene.children[0];
            // scene.add(new THREE.AmbientLight(0XFFFFFF, 2));

            model.material = new THREE.MeshLambertMaterial({envMap:bgTexture,refractionRatio:0.7, reflectivity:0.99})

            // model.scale.set(0.1, 0.1, 0.1);
            scene.add(model);

            // const animationClip = gltf.animations.find(animationClip => animationClip.name === "Walk");
            // console.log(animationClip)
            // const action = animationMixer.clipAction(animationClip);
            // action.play();
        })


        scene.add(camera);

        const cubeGenmetry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        // 根据几何体与材质创建物体
        const cube = new THREE.Mesh(cubeGenmetry, cubeMaterial);

        //添加到场景
        // scene.add(cube);

        //初始化渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // 设置尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 监听屏幕大小改变
        window.addEventListener("resize", () => {
            renderer.set(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth/ window.innerHeight;
            camera.updateProjectionMatrix();
        })

        // console.log(renderer)

        // 添加到canvas
        document.body.appendChild(renderer.domElement);

        // 使用渲染器，通过相机渲染
        renderer.render(scene, camera);

        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);

        // 设置控制器阻尼
        controls.enableDamping = true;

        function render() {
            // 更新控制器
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        render();


    }
})