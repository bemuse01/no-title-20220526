import * as THREE from '../../../lib/three.module.js'
import Circle from '../../objects/circle.js'
import Shader from '../shader/logo.circle.shader.js'

export default class{
    constructor({group, size}){
        this.group = group
        this.size = size

        this.param = {
            color: 0xffffff,
            radius: this.size.obj.h / 2,
            seg: 64
        }
        
        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.object = new Circle({
            radius: this.param.radius,
            seg: this.param.seg,
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
            }
        })

        this.group.add(this.object.get())
    }
}