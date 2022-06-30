import Plane from '../../objects/plane.js'
import {MathUtils} from '../../../lib/three.module.js'

export default class{
    constructor({group, size, openTime, box}){
        this.group = group
        this.size = size
        this.openTime = openTime
        this.box = box

        const {width, height} = this.box.getBoundingClientRect()

        this.ratioW = width / this.size.el.w
        this.width = this.size.obj.w * this.ratioW
        this.ratioH = height / this.size.el.h
        this.height = this.size.obj.h * this.ratioH

        this.seg = 10
        this.opacity = 0.4
        this.ease = [0.645, 0.045, 0.355, 1.000] 
        this.easing = BezierEasing(...this.ease)
        this.timer = 3000 + ~~(Math.random() * 3000)

        this.next = []

        this.init()
    }


    // init
    init(){
        this.create()
        this.interval()
        setTimeout(() => this.open(), this.openTime + ~~(Math.random() * 1000))
    }


    // create
    create(){
        this.plane = new Plane({
            width: this.width,
            widthSeg: this.seg,
            height: this.height,
            heightSeg: 1,
            materialName: 'MeshBasicMaterial',
            materialOpt: {
                color: MAIN_COLOR_HEX,
                transparent: true,
                opacity: 0
            }
        })

        const count = this.plane.getGeometry().attributes.position.count

        this.next = Array.from({length: count}, (_, idx) => this.createNextPoint(count, idx))

        this.group.add(this.plane.get())
    }
    createNextPoint(count, idx){
        const hh = this.height / 2
            
        const y = MathUtils.randFloat(hh * 0.1, hh)

        if(idx < count / 2) return y
        else return -y
    }


    // resize
    resize(size){
        this.size = size

        const {width, height} = this.box.getBoundingClientRect()

        this.ratioW = width / this.size.el.w
        this.width = this.size.obj.w * this.ratioW
        this.ratioH = height / this.size.el.h
        this.height = this.size.obj.h * this.ratioH
    }


    // open
    open(){
        this.createOpenTween()
    }


    // interval
    interval(){
        this.createTween()

        setTimeout(() => this.interval(), this.timer)
    }


    // tween
    createTween(){
        const position = this.plane.getGeometry().attributes.position
        const array = position.array
        const count = position.count

        const start = {process: 0}
        const end = {process: 1}

        const tw = new TWEEN.Tween(start)
        .to(end, 800)
        .easing(this.easing)
        .onComplete(() => this.onCompleteTween(count))
        .onUpdate(() => this.onUpdateTween(position, array, count, start))
        .start()
    }
    onCompleteTween(count){
        this.next = Array.from({length: count}, (_, idx) => this.createNextPoint(count, idx))
    }
    onUpdateTween(position, array, count, {process}){
        for(let i = 0; i < count; i++){
            const idx = i * 3

            const cy = array[idx + 1]
            const ny = this.next[i]
            const y = MathUtils.lerp(cy, ny, process)

            array[idx + 1] = y
        }

        position.needsUpdate = true
    }

    createOpenTween(){
        const start = {opacity: 0}
        const end = {opacity: this.opacity}

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .onUpdate(() => this.onUpdateOpenTween(start))
        .start()
    }
    onUpdateOpenTween({opacity}){
        this.plane.getMaterial().opacity = opacity
    }
}