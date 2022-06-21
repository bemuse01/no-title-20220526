import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/test.wave.shader.js'

export default class{
    constructor({group}){
        this.group = group

        this.iter = 2
        this.count = 160
        this.gap = 30
        this.w = 40
        this.hw = this.w / 2

        this.particles = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const particle = new Particle({
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    uPointSize: {value: 2.5},
                    uColor: {value: new THREE.Color(0x00ffd7)},
                    uOpacity: {value: 1.0}
                }
            }
        })

        const {position} = this.createAttributes({posY: 23})

        particle.setAttribute('position', new Float32Array(position), 3)

        this.group.add(particle.get())
    }
    createAttributes({posY = 0}){
        const position = []

        const w = this.gap + this.w
        const hw = w / 2
        const stepX = w / (this.count - 1)

        for(let i = 0; i < this.count; i++){
            const x = -hw + stepX * i
            const y = posY
            position.push(x, y, 0)
        }

        return {position}
    }
}