// import * as THREE from '../../lib/three.module.js'

// import CircleGraphParam from './CircleGraphParam/circleGraph.CircleGraphParam.js'
// import Method from '../../method/method.js'

// import Circle from './build/circleGraph.circle.build.js'
// import Ring from './build/circleGraph.ring.build.js'

const CircleGraph = class{
    constructor({app, element, openTime, box, num}){
        this.renderer = app.renderer
        this.element = element
        this.openTime = openTime
        this.box = document.querySelector(box)
        this.num = num

        this.modules = {
            Circle,
            Ring
        }
        this.group = {}
        this.comp = {}
        this.build = new THREE.Group()
        
        this.init()
    }


    // init
    init(){
        this.initGroup()
        this.initRenderObject()
        this.create()

        this.animate()
                
        this.resizeEvent = () => {
            this.resize()
        }

        window.addEventListener('resize', this.resizeEvent)
    }
    initGroup(){
        for(const module in this.modules){
            this.group[module] = new THREE.Group()
            this.comp[module] = null
        }
    }
    initRenderObject(){
        const {width, height} = this.element.getBoundingClientRect()
        const w = width * RATIO
        const h = height * RATIO

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(CircleGraphParam.fov, w / h, CircleGraphParam.near, CircleGraphParam.far)
        this.camera.position.z = CircleGraphParam.pos
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: Method.getVisibleWidth(this.camera, 0),
                h: Method.getVisibleHeight(this.camera, 0)
            }
        }
    }


    // create
    create(){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, size: this.size, name: module, src: this.src, openTime: this.openTime, box: this.box, num: this.num})
        }

        for(const group in this.group) this.build.add(this.group[group])
        
        this.scene.add(this.build)
    }


    // 
    // expand(){
    //     this.build.scale.set(CircleGraphParam.scale, CircleGraphParam.scale, CircleGraphParam.scale)
    // }


    // remove
    dispose(){
        cancelAnimationFrame(this.animation)
        window.removeEventListener('resize', this.resizeEvent)

        this.build.clear()
        this.scene.clear()

        this.build = null
        this.scene = null

        for(const comp in this.comp){
            this.comp[comp].dispose()
        }

        this.comp = null
        this.group = null

        // this.renderer.renderLists.dispose()
        // this.renderer.info.programs.forEach(program => program.destroy())
        // this.renderer.info.programs.length = 0
        // console.log(this.renderer.info.programs)
    }


    // animate
    animate(){
        this.render()
        this.animateObject()

        this.animation = requestAnimationFrame(() => this.animate())
    }
    render(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = this.renderer.domElement.clientHeight - rect.bottom

        this.renderer.setScissor(left, bottom, width, height)
        this.renderer.setViewport(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)
    }
    animateObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].animate) continue
            this.comp[comp].animate()
        }
    }


    // resize
    resize(){
        this.resizeRenderObject()
        this.resizeObject()
    }
    resizeRenderObject(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.size.el.w = width
        this.size.el.h = height
        this.size.obj.w = Method.getVisibleWidth(this.camera, 0)
        this.size.obj.h = Method.getVisibleHeight(this.camera, 0)
    }
    resizeObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].resize) continue
            this.comp[comp].resize(this.size)
        }
    }
}