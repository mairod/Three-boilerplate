import * as THREE from 'three'
import when from 'when'
import Store from './store'
import Manifest from './manifest'

let defer = when.defer()

class Loader {
    constructor() { }

    load() {

        this.manager = new THREE.LoadingManager()

        
        // Store.textures.test = new THREE.TextureLoader(this.manager).load(Manifest.test)

        this.manager.onProgress = (item, loaded, total) => {
            var progress = Math.round((loaded / total) * 100)
            if (progress == 100) {
                setTimeout(() => {
                    this.close()
                }, 1000)
            }
        }

        return defer.promise
    }

    close() {

        defer.resolve()

    }
}

const singleton = new Loader()
export default singleton