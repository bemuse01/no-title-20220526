import Test from '../class/test/test.js'

export default {
    template: `
        <div class="object-child test" :ref="el => element = el">
            <canvas :ref="el => canvas = el"/>
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, watch} = Vue
        const {useStore} = Vuex
        
        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const element = ref()
        const canvas = ref()
        const src = ''
        let test = null

        onMounted(() => {
            watch(app, cur => {
                if(cur){
                    test = new Test({app: cur, src, element: element.value, canvas: canvas.value})
                }
            })
        })

        return{
            element,
            canvas
        }
    }
}