import Line from '../../objects/line.js'

export default class{
    constructor({group, openTime}){
        this.group = group
        this.openTime = openTime

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const line = new Line({
            meshName: 'Line',
            materialName: 'LineBasicMaterial',
            materialOpt: {
                color: MAIN_COLOR_HEX
            }
        })

        const {position} = this.createAttributes()

        line.setAttribute('position', new Float32Array(position), 3)

        this.group.add(line.get())
    }
    createAttributes(){
        const position = []

        position.push(-10, 0, 0)
        position.push(10, 0, 0)

        return {position}
    }
}