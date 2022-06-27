import LineGraph from '../../class/lineGraph/lineGraph.js'

export default {
    template: `
        <div class="object lineGraph lineGraph-object" >
            <div :ref="el => element = el"></div>
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, onUnmounted} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const openTimeToMs = computed(() => store.getters['test/getOpenTime'] * 1000)
        const element = ref()
        const canvas = ref()

        let object = null

        const createObject = () => {
            object = new LineGraph({app: app.value, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value})
        }

        onMounted(() => {
            createObject()
        })

        onUnmounted(() => {
            object.dispose()
        })

        return{
            element,
            canvas
        }
    }
}