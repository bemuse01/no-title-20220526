import App from '../../class/app/app.js'

const canvasContainer = {
    template: `
        <div id="canvas-container">
            <canvas id="canvas" :ref="el => canvas = el"/>
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const canvas = ref()

        onMounted(() => {
            store.dispatch('setApp', new App(canvas.value))
        })

        return{
            canvas
        }
    }
}