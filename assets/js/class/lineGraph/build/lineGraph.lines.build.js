// import * as THREE from '../../../lib/three.module.js'
// import Line from '../../objects/line.js'
// import Shader from '../shader/lineGraph.lines.LineGraphLinesShader.js'

const LineGraphLinesBuild = class{
    constructor({group, size, openTime, box}){
        this.size = size
        this.group = group
        this.openTime = openTime
        this.box = box

        const {width} = this.box.getBoundingClientRect()
        
        this.ratioW = width / this.size.el.w
        this.width = this.size.obj.w * this.ratioW

        this.count = 4
        this.seg = 64
        this.rangeY = 20
        this.str = 0.05

        this.lines = []

        this.init()
    }


    // init
    init(){
        for(let i = 0; i < this.count; i++) this.create()
        setTimeout(() => this.open(), this.openTime)
    }


    // create
    create(){
        const line = new Line({
            meshName: 'Line',
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: LineGraphLinesShader.vertex,
                fragmentShader: LineGraphLinesShader.fragment,
                transparent: true,
                uniforms: {
                    uStr: {value: Math.random() * this.str},
                    uRangeY: {value: this.rangeY},
                    uColor: {value: new THREE.Color(MAIN_COLOR_HEX)},
                    uTime: {value: 0},
                    uOpacity: {value: 0}
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
    createPosition(){
        const position = []

        const wh = this.width / 2
        const step = this.width / (this.seg - 1)

        for(let i = 0; i < this.seg; i++){
            const x = -wh + step * i
            position.push(x, 0, 0)
        }

        return position
    }

    
    // dispose
    dispose(){
        this.lines.forEach(line => {
            line.dispose()
        })
        
        this.group.clear()
    }



    // resize
    resize(size){
        this.size = size

        const {width} = this.box.getBoundingClientRect()
        
        this.ratioW = width / this.size.el.w
        this.width = this.size.obj.w * this.ratioW

        const pos = this.createPosition()

        this.lines.forEach(line => {
            const position = line.getGeometry().attributes.position
            const array = position.array
            const count = position.count

            for(let i = 0; i < count; i++){
                const idx = i * 3
                array[idx] = pos[idx]
            }

            position.needsUpdate = true
        })
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
        this.lines.forEach(line => line.setUniform('uOpacity', opacity))
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.lines.forEach(line => {
            line.setUniform('uTime', time)
        })
    }
}