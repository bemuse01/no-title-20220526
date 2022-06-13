import Test from '../../class/test/test.js'

export default {
    template: `
        <div class="vSection-item object-item" :ref="el => element = el">
            <canvas :ref="el => canvas = el"/>
        </div>
    `,
    props: {
        type: {
            default: 'Test',
            type: String
        }
    },
    setup(props){
        const {ref, onMounted, computed, watch, nextTick} = Vue
        const {useStore} = Vuex

        const type = props.type
        
        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const element = ref()
        const canvas = ref()
        const src = ''
        let object = null

        const selectObject = () => {
            switch(type){
                case 'Test':
                    object = new Test({app: app.value, src, element: element.value, canvas: canvas.value})
                    break
                default:
                    break
            }
        }

        onMounted(() => {
            selectObject()
        })

        return{
            element,
            canvas
        }
    }
}