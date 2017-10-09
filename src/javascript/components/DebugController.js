import Store from '../utils/store'

let ControlKit = require('controlkit')
let controlKit = new ControlKit()

class DebugController {
    constructor(){
        this.active = this.queryDebug()
        this.active ? this.init() : null
        this.types = ["config"]
    }

    queryDebug(){
        let url = window.location.href;
        let name = 'dev'
        name = name.replace(/[\[\]]/g, "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if(results)
            return decodeURIComponent(results[2].replace(/\+/g, " ")) === 'true'
        return false
    }

    init(){
        console.log('yo')
        this.panel = controlKit.addPanel({
            label: 'debug GUI'
        })
    }

    register(type, object, id){
        if (this.types.indexOf(type) === -1) {
            console.error('Type of params not valid')
            return
        }
        this["add_" + type](object, id)
    }

    add_config(object, id){
        if(this.active) {
            let group = this.panel.addGroup({label : "config " + id})
            for (var key in object) {
                if (!object.hasOwnProperty(key)) continue
                let sub = object[key]
                group.addSlider(sub, 'value', 'range', { label: key})
            }
        }
    }
}

const Export = new DebugController()
export default Export