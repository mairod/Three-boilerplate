import ThreeController from './components/ThreeController'
import DebugController from './components/DebugController'
import * as TOOLS from './components/tools.class.js'

let Framerate = new TOOLS.FrameRateUI()

let Three = new ThreeController({
    container: document.querySelector('#container')
})

// start animating
animate();

function animate() {
    requestAnimationFrame(animate);

    // Updating components
    Three.update()
    Framerate.update()

}

// console.log("YO !");
