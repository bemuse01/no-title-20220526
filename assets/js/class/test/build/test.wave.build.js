// import * as THREE from '../../../lib/three.module.js'
// import Particle from '../../objects/particle.js'
// import Shader from '../shader/test.wave.shader.js'

const TestWaveBuild = class{
    constructor({group, openTime}){
        this.group = group
        this.openTime = openTime

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

        setTimeout(() => this.open(), this.openTime)
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
                    uOpacity: {value: 0},
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


    // open
    open(){
        this.createTween()
    }
    createTween(){
        const start = {opacity: 0}
        const end = {opacity: 1 * this.opacity}

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .onUpdate(() => this.onUpdateTween(start))
        .start()
    }
    onUpdateTween({opacity}){
        this.particles.forEach(particle => particle.setUniform('uOpacity', opacity))
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.particles.forEach(particle => {
            particle.setUniform('uTime', time)
        })
    }
}