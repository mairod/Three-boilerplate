import ThreeController from './components/ThreeController'
import DebugController from './components/DebugController'
import * as TOOLS from './components/tools.class.js'
import Loader from './utils/loader'

const Framerate = DebugController.active ? new TOOLS.FrameRateUI() : null;


let scene
function letsGo (){
    scene = new ThreeController({
        container: document.querySelector('#container')
    })
    animate()
}


// Un comment this if you need to load some textures
// Loader.load().then(letsGo.bind(this))

// Comment this if you need to load some textures
letsGo()

// start animating
function animate() {
    requestAnimationFrame(animate);

    // Updating components
    scene.update()

    if(Framerate)
      Framerate.update()
}