import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Cylinder from '../../objects/cylinder.js'
import Shader from '../shader/test.core.shader.js'

export default class{
    constructor({group}){
        this.group = group

        this.param = {
            scale: 3
        }

        // this.group.scale.set(this.param.scale, this.param.scale, this.param.scale)

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.topGroup = new THREE.Group()
        this.botGroup = new THREE.Group()

        this.createObjects(this.topGroup)
        this.createObjects(this.botGroup, -0.8, 180)
    }
    createObjects(finalGroup, posZ = 0.8, rotX = 0){
        const outerCore = {
            groupName: 'outerCoreGroup',
            rads: [-1, 0, 1, 2, 3, 3, 2].reverse().map(e => e + 12),
            distY: 5,
            seg: 64,
            materialOpt: {
                size: 1,
                color: 0x20ddff
            }
        }

        const innerCore = {
            groupName: 'innerCoreGroup',
            distY: 2,
            rads: [0, 3].reverse().map(e => e + 8),
            seg: 48,
            materialOpt: {
                size: 1,
                color: 0xffffff
            }
        }

        this.createCore(outerCore, finalGroup)
        this.createCore(innerCore, finalGroup)
        this.createCylinder({}, finalGroup)

        finalGroup.rotation.x = rotX * RADIAN
        finalGroup.position.z = posZ

        this.group.add(finalGroup)
    }
    createCore({groupName, rads, distY, seg, materialOpt}, finalGroup){
        const localGroup = new THREE.Group()
        localGroup.name = groupName

        const len = rads.length
        const stepY = distY / (len - 1)

        const posYs = Array.from({length: len}, (_, i) => stepY * i) 

        rads.forEach((rad, idx) => {
            
            const posY = posYs[idx]
            const position = [...new THREE.CircleGeometry(rad, seg).attributes.position.array].slice(3)

            const particle = new Particle({
                materialName: 'PointsMaterial',
                materialOpt
            })

            particle.setAttribute('position', new Float32Array(position), 3)

            particle.get().position.z = posY

            localGroup.add(particle.get())

        })

        finalGroup.add(localGroup)
    }
    createCylinder({}, finalGroup){
        const cylinder = new Cylinder({
            radius: 2,
            height: 4,
            seg: 32,
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.cylinder.vertex,
                fragmentShader: Shader.cylinder.fragment,
                transparent: true,
                uniforms: {
                    uColor1: {value: new THREE.Color(0xffffff)},
                    uColor2: {value: new THREE.Color(0x20ddff)},
                    uOpacity: {value: 1},
                }
            }
        })

        cylinder.get().position.z = 4
        cylinder.get().rotation.x = 90 * RADIAN

        finalGroup.add(cylinder.get())
    }

    // animate
    animate(){
        this.group.rotation.y += 0.01
        this.group.rotation.z += 0.01
    }
}