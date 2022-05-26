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
        this.group.rotation.x = 65 * RADIAN
        this.group.rotation.y = -60 * RADIAN

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
            distZ: 5,
            seg: 64,
            materialOpt: {
                size: 1,
                color: 0x20ddff
            }
        }

        const innerCore = {
            groupName: 'innerCoreGroup',
            distZ: 2,
            rads: [0, 3].reverse().map(e => e + 8),
            seg: 48,
            materialOpt: {
                size: 1,
                color: 0xffffff
            }
        }

        const cylinder = {
            groupName: 'cylinderGroup',
            radius: 1.6,
            height: 4,
            seg: 32,
            distZ: 4,
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
        }

        this.createCore(outerCore, finalGroup)
        this.createCore(innerCore, finalGroup)
        this.createCylinder(cylinder, finalGroup)
        this.createFrame({}, finalGroup)

        finalGroup.rotation.x = rotX * RADIAN
        finalGroup.position.z = posZ

        this.group.add(finalGroup)
    }
    createCore({groupName, rads, distZ, seg, materialOpt}, finalGroup){
        const localGroup = new THREE.Group()
        localGroup.name = groupName

        const len = rads.length
        const stepZ = distZ / (len - 1)

        const posZs = Array.from({length: len}, (_, i) => stepZ * i) 

        rads.forEach((rad, idx) => {
            
            const posZ = posZs[idx]
            const position = [...new THREE.CircleGeometry(rad, seg).attributes.position.array].slice(3)

            const particle = new Particle({
                materialName: 'PointsMaterial',
                materialOpt
            })

            particle.setAttribute('position', new Float32Array(position), 3)

            particle.get().position.z = posZ

            localGroup.add(particle.get())

        })

        finalGroup.add(localGroup)
    }
    createCylinder({radius, height, seg, materialOpt, distZ}, finalGroup){
        const cylinder = new Cylinder({
            radius,
            height,
            seg,
            materialName: 'ShaderMaterial',
            materialOpt
        })

        cylinder.get().position.z = distZ
        cylinder.get().rotation.x = 90 * RADIAN

        finalGroup.add(cylinder.get())
    }
    createFrame({}, finalGroup){
        const localGroup = new THREE.Group()

        const frameLen = 1.75
        const radius = 17
        const count = 10
        const degree = 360 / count

        const curve = new THREE.SplineCurve([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(frameLen, 1),
            new THREE.Vector2(frameLen * 2, 6),
            new THREE.Vector2(frameLen * 3, 7)
        ])
        const points = curve.getPoints(20).map(e => [0, e.y, e.x]).flat()

        for(let i = 0; i < count; i++){
            const particle = new Particle({
                materialName: 'PointsMaterial',
                materialOpt: {
                    size: 1,
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.75
                }
            })
    
            particle.setAttribute('position', new Float32Array(points), 3)
    
            const deg = degree * i
            particle.get().position.x = Math.cos(deg * RADIAN) * radius
            particle.get().position.y = Math.sin(deg * RADIAN) * radius

            particle.get().rotation.z = (90 + deg) * RADIAN

            localGroup.add(particle.get())
        }

        localGroup.position.z = 5

        finalGroup.add(localGroup)
    }

    // animate
    animate(){
        // this.group.rotation.y += 0.01
        this.group.rotation.z += 0.01
    }
}