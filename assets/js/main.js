import Store from './store/index.js'

import App from './class/app/app.js'

import ObjectContainer from './component/objectContainer.js'
import CanvasContainer from './component/canvasContainer.js'

const vueApp = Vue.createApp({
    components: {
        'object-container': ObjectContainer,
        'canvas-container': CanvasContainer
    },
    setup(){
        // const {onMounted} = Vue
        const store = Vuex.useStore()

        Vue.nextTick(() => {
            store.dispatch('setApp', new App())
        })
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')