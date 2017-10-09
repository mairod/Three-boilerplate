import ThreeController from './components/ThreeController'
import DebugController from './components/DebugController'
import * as TOOLS from './components/tools.class.js'

const Framerate = DebugController.active ? new TOOLS.FrameRateUI() : null;

const Three = new ThreeController({
    container: document.querySelector('#container')
})

// start animating
animate();

function animate() {
    requestAnimationFrame(animate);

    // Updating components
    Three.update()

    if(Framerate)
      Framerate.update()
}

// console.log("YO !");
