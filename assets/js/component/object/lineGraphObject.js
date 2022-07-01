// import LineGraph from '../../class/lineGraph/lineGraph.js'

const LineGraphObject = {
    template: `
        <div class="object lineGraph lineGraph-object" >
            <div :ref="el => element = el"></div>
        </div>
    `,
    props: {
        uuid: String,
        parent: Object,
    },
    setup(props){
        const {ref, onMounted, computed, onUnmounted, watch, watchEffect} = Vue
        const {useStore} = Vuex

        const uuid = props.uuid
        // const parent = props.parent

        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const openTimeToMs = computed(() => store.getters['test/getOpenTime'] * 1000)
        const element = ref()
        const canvas = ref()
        const box = `.${uuid} .lineGraph-back-lines`

        let object = null

        const createObject = () => {
            object = new LineGraph({app: app.value, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value, box})
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