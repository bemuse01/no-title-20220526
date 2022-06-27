import * as THREE from '../../../lib/three.module.js'
import Shader from '../shader/lineGraph.lines2.shader.js'
import Line from '../../objects/line.js'

export default class{
    constructor({group, size, openTime}){
        this.group = group
        this.size = size
        this.openTime = openTime

        this.count = 4
        this.seg = 2
        this.ratio = 154 / 200
        this.height = this.size.obj.h * this.ratio
        this.wh = this.size.obj.w / 2
        this.ratioX = 0.8
        this.rangeX = this.wh * this.ratioX
        this.str = 2
        this.vel = 0.0002

        this.lines = []

        this.init()
    }

    
    // init
    init(){
        for(let i = 0; i < this.count; i++) this.create()
    }


    // create
    create(){
        const line = new Line({
            meshName: 'Line',
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    uStr: {value: Math.random() * this.str},
                    uRangeX: {value: this.rangeX},
                    uColor: {value: new THREE.Color(MAIN_COLOR_HEX)},
                    uTime: {value: 0},
                    uVel: {value: this.vel},
                    uOpacity: {value: Math.random() * 0.25 + 0.25}
                }
            }
        })

        const {position} = this.createAttributes()

        line.setAttribute('position', new Float32Array(position), 3)

        this.lines.push(line)

        this.group.add(line.get())
    }
    createAttributes(){
        const position = []

        const hh = this.height / 2
        const h = this.height / (this.seg - 1)

        for(let i = 0; i < this.seg; i++){
            const y = -hh + h * i
            position.push(0, y, 0)
        }

        return {position}
    }


    // resize
    resize(size){
        this.size = size
        this.wh = this.size.obj.w / 2
        this.rangeX = this.wh * this.ratioX

        this.lines.forEach(line => {
            line.setUniform('uRangeX', this.rangeX)
        })
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.lines.forEach(line => {
            line.setUniform('uTime', time)
        })
    }
}