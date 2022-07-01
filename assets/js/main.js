// import Store from './store/index.js'

// import GridContainer from './component/container/gridContainer.js'
// import CanvasContainer from './component/container/canvasContainer.js'

const vueApp = Vue.createApp({
    components: {
        'grid-container': GridContainer,
        'canvas-container': CanvasContainer
    },
    setup(){
        const {onMounted} = Vue

        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }

        onMounted(() => {
            animate()
        })
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')