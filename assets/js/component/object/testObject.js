import Test from '../../class/test/test.js'

export default {
    template: `
        <div class="object test test-object" >
            <div :ref="el => element = el" ></div>
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
        let object = null

        const createObject = () => {
            object = new Test({app: app.value, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value})
        }

        onMounted(() => {
            createObject()
        })

        return{
            element,
        }
    }
}