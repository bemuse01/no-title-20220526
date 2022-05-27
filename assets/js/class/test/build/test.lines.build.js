import Particle from '../../objects/particle.js'
import Line from '../../objects/line.js'

export default class{
    constructor({group}){
        this.group = group

        this.count = 50
        this.w = 110
        this.h = 38
        this.wh = this.w / 2
        this.hh = this.h / 2

        this.position = new Float32Array(this.count * 3)

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.createPosition()
        this.createParticle()
        this.createLine()
    }
    createPosition(){
        for(let i = 0; i < this.count; i++){
            const idx = i * 3

            const x = Math.random() * this.w - this.wh
            const y = Math.random() * this.h - this.hh

            this.position[idx + 0] = x
            this.position[idx + 1] = y
            this.position[idx + 2] = 0
        }
    }
    createParticle(){
        this.particle = new Particle({
            materialName: 'PointsMaterial',
            materialOpt: {
                transparent: true,
                opacity: 1,
                color: 0x00ffd7,
                size: 0.6,
                depthWrite: false,
                depthTest: false,
            }
        })
        
        this.particle.setAttribute('position', this.position, 3)

        this.group.add(this.particle.get())
    }
    createLine(){
        this.line = new Line({
            meshName: 'LineSegments',
            materialName: 'LineBasicMaterial',
            materialOpt: {
                transparent: true,
                opacity: 0.25,
                color: 0x00ffd7,
                depthWrite: false,
                depthTest: false,
            }
        })

        this.line.setAttribute('position', this.position, 3)

        this.group.add(this.line.get())
    }
}