import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/test.wave.shader.js'

export default class{
    constructor({group}){
        this.group = group

        this.iter = 2
        this.count = 160
        this.gap = 50
        this.w = 40
        this.hw = this.w / 2
        this.offsetX = -8
        this.opacity = 0.25

        this.particles = []

        this.init()
    }


    // init
    init(){
        const params = [
            {posY: 25},
            {posY: -25}
        ]

        params.forEach(param => {
            this.create(param)
        })
    }


    // create
    create({posY}){
        const particle = new Particle({
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    uPointSize: {value: 2.5},
                    uColor: {value: new THREE.Color(0x00ffd7)},
                    uOpacity: {value: this.opacity},
                    uTime: {value: 0}
                }
            }
        })

        const {position} = this.createAttributes({posY})

        particle.setAttribute('position', new Float32Array(position), 3)

        this.particles.push(particle)

        this.group.add(particle.get())
    }
    createAttributes({posY = 0}){
        const position = []

        const w = this.gap + this.w
        const hw = w / 2
        const stepX = w / (this.count - 1)

        for(let i = 0; i < this.count; i++){
            const x = this.offsetX + -hw + stepX * i
            const y = posY
            position.push(x, y, 0)
        }

        return {position}
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.particles.forEach(particle => {
            particle.setUniform('uTime', time)
        })
    }
}