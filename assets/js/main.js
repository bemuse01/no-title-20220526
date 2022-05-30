import Store from './store/index.js'

import App from './class/app/app.js'

import ObjectContainer from './component/objectContainer.js'
import CanvasContainer from './component/canvasContainer.js'
import GridContainer from './component/gridContainer.js'

const vueApp = Vue.createApp({
    components: {
        'object-container': ObjectContainer,
        'canvas-container': CanvasContainer,
        'grid-container': GridContainer
    },
    setup(){
        const {onMounted} = Vue
        const store = Vuex.useStore()

        Vue.nextTick(() => {
            store.dispatch('setApp', new App())
        })

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