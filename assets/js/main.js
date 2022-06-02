import Store from './store/index.js'

import App from './class/app/app.js'

import ObjectContainer from './component/container/objectContainer.js'
import GridContainer from './component/container/gridContainer.js'

const vueApp = Vue.createApp({
    components: {
        'object-container': ObjectContainer,
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