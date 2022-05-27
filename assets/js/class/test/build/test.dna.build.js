import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/test.dna.shader.js'
import Method from '../../../method/method.js'

export default class{
    constructor({group}){
        this.group = group

        this.group.rotation.z = -90 * RADIAN

        this.bones = []
        this.nucleos = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.rightGroup = new THREE.Group()
        this.leftGroup = new THREE.Group()

        this.createObjects(this.rightGroup)
        this.createObjects(this.leftGroup, 180)
    }
    createObjects(finalGroup, rotX = 0){
        this.createBone(finalGroup)
        this.createNucleo(finalGroup)

        finalGroup.rotation.x = rotX * RADIAN

        this.group.add(finalGroup)
    }
    // bone
    createBone(finalGroup){
        const degree = 8
        const count = 30
        const maxY = 50
        const stepY = maxY / (count - 1)
        const radius = 10

        const particle = new Particle({
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.bone.vertex,
                fragmentShader: Shader.bone.fragment,
                transparent: true,
                uniforms: {
                    uColor: {value: new THREE.Color(0xffffff)},
                    uPointSize: {value: 16.0},
                    uTime: {value: 0}
                }
            }
        })

        const {position, size} = this.createBoneAttributes({degree, count, stepY, radius})

        particle.setAttribute('position', new Float32Array(position), 3)
        particle.setAttribute('aPointSize', new Float32Array(size), 1)

        this.bones.push(particle)

        finalGroup.add(particle.get())
    }
    createBoneAttributes({degree, count, stepY, radius}){
        const position = []
        const size = []

        for(let i = 0; i < count; i++){
            const deg = i * degree % 360
            const x = Math.cos(deg * RADIAN) * radius
            const y = stepY * i
            const z = Math.sin(deg * RADIAN) * radius

            const deg2 = (180 + i * degree) % 360
            const x2 = Math.cos(deg2 * RADIAN) * radius
            const y2 = stepY * i
            const z2 = Math.sin(deg2 * RADIAN) * radius
            
            position.push(x, y, z)
            position.push(x2, y2, z2)

            const s = THREE.Math.randFloat(6, 20)

            size.push(s, s)
        }

        return {position, size}
    }
    // nucleo
    createNucleo(finalGroup){
        const stepIdx = 2
        const bonePosArr = this.bones[0].getAttribute('position').array
        const len = ~~((bonePosArr.length / 2) / stepIdx)
        const pCount = 20
        const stepP = 1 / (pCount - 1)

        const particle = new Particle({
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.nucleo.vertex,
                fragmentShader: Shader.nucleo.fragment,
                transparent: true,
                uniforms: {
                    uColor: {value: new THREE.Color(0xffffff)},
                    uPointSize: {value: 4.0},
                    uTime: {value: 0}
                }
            }
        })

        const {position} = this.createNucleoAttributes({stepIdx, bonePosArr, len, pCount, stepP})

        particle.setAttribute('position', new Float32Array(position), 3)

        this.nucleos.push(particle)

        finalGroup.add(particle.get())
    }
    createNucleoAttributes({stepIdx, bonePosArr, len, pCount, stepP}){
        const position = []

        for(let i = 0; i < len; i++){
            const idx = i * 3 * 2 * stepIdx

            const x1 = bonePosArr[idx + 0]
            const y1 = bonePosArr[idx + 1]
            const z1 = bonePosArr[idx + 2]

            const x2 = bonePosArr[idx + 3]
            const y2 = bonePosArr[idx + 4]
            const z2 = bonePosArr[idx + 5]

            const p1 = new THREE.Vector3(x1, y1, z1)
            const p2 = new THREE.Vector3(x2, y2, z2)

            for(let j = 0; j < pCount; j++){
                const np = new THREE.Vector3().lerpVectors(p1, p2, j * stepP)
                position.push(np.x, np.y, np.z)
            }
        }

        return {position}
    }


    // animate
    animate(){
        this.group.rotation.x += 0.015
        const time = window.performance.now()

        this.updateBones(time)
        this.updateNucleos(time)
    }
    updateBones(time){
        this.bones.forEach(bone => {
            const aPointSize = bone.getAttribute('aPointSize')
            const psizeArr = aPointSize.array

            bone.setUniform('uTime', time)

            for(let i = 0; i < psizeArr.length; i++){
                const r = SIMPLEX.noise2D(i * 0.1, time * 0.002)
                const n = Method.normalize(r, 6, 20, -1, 1)
                psizeArr[i] = n
            }

            aPointSize.needsUpdate = true
        })
    }
    updateNucleos(time){
        this.nucleos.forEach(nucleo => {
            nucleo.setUniform('uTime', time)
        })
    }
}