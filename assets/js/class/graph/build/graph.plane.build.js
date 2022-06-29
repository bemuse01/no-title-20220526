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

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){

    }
}