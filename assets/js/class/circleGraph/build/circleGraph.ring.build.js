import Ring from '../../objects/ring.js'

export default class{
    constructor({group, size, openTime, box}){
        this.group = group
        this.size = size
        this.openTime = openTime
        this.box = box

        const {height} = this.box.getBoundingClientRect()

        this.ratioR = height / this.size.el.h

        this.ratio1 = 0.95
        this.ratio2 = 1

        this.radius1 = (this.size.obj.h * this.ratioR * this.ratio1) * 0.5
        this.radius2 = (this.size.obj.h * this.ratioR * this.ratio2) * 0.5
        
        this.seg = 64
        this.opacity = 0.15

        this.init()
    }


    // init
    init(){
        this.create()
        setTimeout(() => this.open(), this.openTime)
    }


    // create
    create(){
        this.ring = new Ring({
            innerRadius: this.radius1,
            outerRadius: this.radius2,
            seg: this.seg,
            materialName: 'MeshBasicMaterial',
            materialOpt: {
                opacity: 0,
                transparent: true,
                color: MAIN_COLOR_HEX
            }
        })

        console.log('work')

        this.group.add(this.ring.get())
    }


    // dispose
    dispose(){
        this.ring.dispose()
        this.group.clear()
    }


    // open
    open(){
        this.createTween()
    }
    createTween(){
        const start = {opacity: 0}
        const end = {opacity: this.opacity}

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .onUpdate(() => this.onUpdateTween(start))
        .delay(Math.random() * 1000)
        .start()
    }
    onUpdateTween({opacity}){
        this.ring.getMaterial().opacity = opacity
    }
}