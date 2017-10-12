import * as TOOLS from './tools.class.js'
import * as THREE from 'three'
import Store from '../utils/store'
import DebugController from './DebugController'

class ThreeController {

    constructor(options) {

        this.options        = options
        this.container      = this.options.container
        this.width          = this.container.offsetWidth
        this.height         = this.container.offsetHeight
        this.camera         = new Object()
        this.assets         = new Object()
        this.scene          = new THREE.Scene()
        this.mouse          = new THREE.Vector2(0, 0)
        this.direction      = new THREE.Vector2(0, 0)
        this.cameraPosition = new THREE.Vector2(0, 0)
        this.cameraEasing   = { x: 100, y: 10 }
        this.time           = 0

        this.store = Store

        this.config = {
            rotationSpeed: { value: 1, range: [0, 10] }
        }
        
        DebugController.register("config", this.config, "THREE controller")

        this.init_environement()
        this.init_camera()
        this.init_event()
        this.init_dummy()
        this.update()

    }

    init_loader() {

        this.manager = new THREE.LoadingManager();
        this.manager.onProgress = function (item, loaded, total) {
            var progress = Math.round((loaded / total) * 100)
            if (progress == 100) {
                setTimeout(function () {

                }, 1000);
            }
        }

    }

    init_camera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.z = 200;
    }

    init_environement() {

        // this.scene.fog = new THREE.FogExp2(0xeaeaea, 0.0020)

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)

        // this.renderer.shadowMap.enabled = true
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // this.renderer.shadowMapWidth = 1024
        // this.renderer.shadowMapHeight = 1024
        // this.renderer.sortObjects = false

        this.container.appendChild(this.renderer.domElement)
    }

    init_event() {
        var that = this
        window.addEventListener('resize', function () {
            that.width = window.innerWidth
            that.height = window.innerHeight
            that.camera.aspect = that.width / that.height;
            that.camera.updateProjectionMatrix();
            that.renderer.setSize(that.width, that.height);
        }, false)

        window.addEventListener("mousemove", function (event) {
            that.mouse.x = (event.clientX / that.width - .5) * 2
            that.mouse.y = (event.clientY / that.height - .5) * 2
        })

    }

    init_dummy(){
        this.dummmy = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 10, 10, 1), new THREE.MeshNormalMaterial())
        this.scene.add(this.dummmy)
    }

    update() {

        if (this.dummmy != undefined) {
            this.dummmy.rotation.y += .01 * this.config.rotationSpeed.value
        }

        // camera
        this.direction.subVectors(this.mouse, this.cameraPosition)
        this.direction.multiplyScalar(.06)
        this.cameraPosition.addVectors(this.cameraPosition, this.direction)
        this.camera.position.x = this.cameraPosition.x * this.cameraEasing.x * -1
        this.camera.position.y = -this.cameraPosition.y * this.cameraEasing.y * -1
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

        this.renderer.render(this.scene, this.camera);
    }


}

export default ThreeController