import {Color} from '../../../lib/three.module.js'
import Circle from '../../objects/circle.js'
import Shader from '../shader/circleGraph.circle.shader.js'

export default class{
    constructor({group, size, openTime, box}){
        this.group = group
        this.size = size
        this.openTime = openTime
        this.box = box

        const {height} = this.box.getBoundingClientRect()

        // this.ratioW = width / this.size.el.w
        // this.width = this.size.obj.w * this.ratioW
        this.ratio = 0.8
        this.ratioR = height / this.size.el.h
        this.radius = (this.size.obj.h * this.ratioR * this.ratio) * 0.5
        this.lightOpacity = 0.35
        this.defaultOpacity = 0.15

        this.seg = 64

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.circle = new Circle({
            radius: this.radius,
            seg: this.seg,
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader:  Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    uColor: {value: new Color(MAIN_COLOR_HEX)},
                    uBound: {value: 0.5},
                    uLightOpacity: {value: this.lightOpacity},
                    uDefaultOpacity: {value: this.defaultOpacity}
                }
            }
        })

        this.group.add(this.circle.get())
    }


    // dispose
    dispose(){
        this.circle.dispose()
        this.group.clear()
    }
}