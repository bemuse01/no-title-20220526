import Graph from '../../class/graph/graph.js'

const GraphObject = {
    template: `
        <div class="object graph graph-object" >
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
        const box = '.graph-back-child'

        let object = null

        const createObject = () => {
            object = new Graph({app: app.value, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value, box})
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