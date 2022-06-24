import * as THREE from '../../../lib/three.module.js'
import Line from '../../objects/line.js'
import Shader from '../shader/lineGraph.lines.shader.js'

export default class{
    constructor({group, openTime}){
        this.group = group
        this.openTime = openTime

        this.count = 4
        this.seg = 64
        this.width = 140
        this.rangeY = 20
        this.str = 0.05

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
                    uRangeY: {value: this.rangeY},
                    uColor: {value: new THREE.Color(MAIN_COLOR_HEX)},
                    uTime: {value: 0}
                }
            }
        })

        const {position, seed} = this.createAttributes()

        line.setAttribute('position', new Float32Array(position), 3)
        line.setAttribute('seed', new Float32Array(seed), 2)

        this.lines.push(line)

        this.group.add(line.get())
    }
    createAttributes(){
        const position = []
        const seed = []

        const wh = this.width / 2
        const step = this.width / (this.seg - 1)

        for(let i = 0; i < this.seg; i++){
            const x = -wh + step * i
            position.push(x, 0, 0)
            seed.push(x, i)
        }

        return {position, seed}
    }

    
    // dispose
    dispose(){
        this.lines.forEach(line => {
            line.dispose()
        })
        
        this.group.clear()
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.lines.forEach(line => {
            line.setUniform('uTime', time)
        })
    }
}