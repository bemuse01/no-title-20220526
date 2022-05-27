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
        this.dirs = Array.from({length: this.count}, () => ({x: 1, y: 1}))

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
                size: 0.35,
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
                opacity: 0.03,
                color: 0x00ffd7,
                depthWrite: false,
                depthTest: false,
            }
        })

        this.line.setAttribute('position', new Float32Array(this.count * this.count * 3), 3)

        this.group.add(this.line.get())
    }


    // animate
    animate(){
        // let lineIdx = 0
        const time = window.performance.now()
        const pPosition = this.particle.getAttribute('position')
        const dir = this.dirs

        for(let i = 0; i < this.count; i++){
            const idx = i * 3

            const rx = SIMPLEX.noise2D(i * 0.1, time * 0.001) * dir[i].x
            const ry = SIMPLEX.noise2D(i * 0.1, time * 0.00125) * dir[i].y
            
            this.position[idx + 0] += rx * 0.1
            this.position[idx + 1] += ry * 0.1

            if(this.wh < this.position[idx + 0] || -this.wh > this.position[idx + 0]) dir[i].x *= -1
            if(this.hh < this.position[idx + 1] || -this.hh > this.position[idx + 1]) dir[i].y *= -1

            // for(let j = i + 1; j < this.count; j++){
            //     const idx2 = j * 3

            //     const x2 = this.position[idx2 + 0]
            //     const y2 = this.position[idx2 + 1]
            //     const z2 = this.position[idx2 + 2]

            //     if(Math.random() > 0.5) continue

            //     position.push(x, y, z)
            //     position.push(x2, y2, z2)
            // }
        }

        pPosition.needsUpdate = true

    }
}