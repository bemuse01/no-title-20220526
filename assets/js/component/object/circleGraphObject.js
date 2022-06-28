import CircleGraph from '../../class/circleGraph/circleGraph.js'

export default {
    template: `
        <div class="object circleGraph circleGraph-object" >
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
        const box = '.circleGraph-back-circle'

        let object = null

        const createObject = () => {
            object = new CircleGraph({app: app.value, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value, box})
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