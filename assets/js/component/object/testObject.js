import Test from '../../class/test/test.js'

export default {
    template: `
        <div class="test test-object" :ref="el => element = el">
            <canvas :ref="el => canvas = el"/>
        </div>
    `,
    props: {
        type: {
            default: 'Test',
            type: String
        }
    },
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const openTimeToMs = computed(() => store.getters['test/getOpenTime'] * 1000)
        const element = ref()
        const canvas = ref()
        const src = ''
        let object = null

        const createObject = () => {
            object = new Test({app: app.value, src, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value})
        }

        onMounted(() => {
            createObject()
        })

        return{
            element,
            canvas
        }
    }
}