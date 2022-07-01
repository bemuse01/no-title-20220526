// import {Color} from '../../../lib/three.module.js'
// import Circle from '../../objects/circle.js'
// import Shader from '../shader/circleGraph.circle.shader.js'

const CircleGraphCircleBuild = class{
    constructor({group, size, openTime, box, num}){
        this.group = group
        this.size = size
        this.openTime = openTime
        this.box = box
        this.num = num

        const {height} = this.box.getBoundingClientRect()

        // this.ratioW = width / this.size.el.w
        // this.width = this.size.obj.w * this.ratioW
        this.ratio = 0.85
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
        setTimeout(() => this.open(), this.openTime)
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
                    uColor: {value: new THREE.Color(MAIN_COLOR_HEX)},
                    uBound: {value: 0.5},
                    uLightOpacity: {value: this.lightOpacity},
                    uDefaultOpacity: {value: this.defaultOpacity},
                    uOpacity: {value: 0}
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


    // animate
    animate(){
        this.circle.setUniform('uBound', this.num.value / 100)
    }


    // open 
    open(){
        this.createTween()
    }
    createTween(){
        const start = {opacity: 0}
        const end = {opacity: 1}

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .onUpdate(() => this.onUpdateTween(start))
        .delay(Math.random() * 1000)
        .start()
    }
    onUpdateTween({opacity}){
        this.circle.setUniform('uOpacity', opacity)
    }
}