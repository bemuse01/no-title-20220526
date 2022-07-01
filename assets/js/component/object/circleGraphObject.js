// import CircleGraph from '../../class/circleGraph/circleGraph.js'

const CircleGraphObject = {
    template: `
        <div class="object circleGraph circleGraph-object" :style="rootStyle">
            <div :ref="el => element = el"></div>
            <div class="circleGraph-num"><span>{{intNum}}</span></div>
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, onUnmounted} = Vue
        const {useStore} = Vuex

        const rootStyle = ref({opacity: '0', animation: 'none'})

        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const openTime = computed(() => store.getters['test/getOpenTime'])
        const openTimeToMs = computed(() => openTime.value * 1000)
        const element = ref()
        const canvas = ref()
        const box = '.circleGraph-back-circle'

        const ease = [0.645, 0.045, 0.355, 1.000] 
        const easing = BezierEasing(...ease)
    
        const max = 100
        const startNum = ref(0)
        const endNum = ref(~~(Math.random() * max))
        const intNum = computed(() => ~~startNum.value)

        let object = null

        const createObject = () => {
            object = new CircleGraph({app: app.value, element: element.value, canvas: canvas.value, openTime: openTimeToMs.value, box, num: startNum})
        }

        const initTween = () => {
            createTween()
        }

        const createTween = () => {
            const start = {num: startNum.value}
            const end = {num: endNum.value}

            const tw = new TWEEN.Tween(start)
            .to(end, 800)
            .easing(easing)
            .onUpdate(() => onUpdateTween(start))
            .onComplete(() => onCompleteTween())
            .start()
        }
        
        const onUpdateTween = ({num}) => {
            startNum.value = num
        }

        const onCompleteTween = () => {
            endNum.value = ~~(Math.random() * max)
        }

        const interval = () => {
            initTween()

            setTimeout(interval, 3000 + ~~(Math.random() * 3000))
        }

        const open = () => {
            rootStyle.value.animation = `blink2 0.06s ${openTime.value + Math.random()}s 2 forwards`
        }

        onMounted(() => {
            createObject()
            interval()
            open()
        })

        onUnmounted(() => {
            object.dispose()
        })

        return{
            element,
            canvas,
            intNum,
            rootStyle
        }
    }
}