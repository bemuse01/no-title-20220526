export default {
    template: `
        <div class="test-child test-vertNums" :style="rootStyle">

            <div class="vertNums-box" :style="boxStyle">
            
                <div
                    class="vertNums-text"
                    v-for="num in numbers"
                    :key="num.key"
                    :style="num.style"
                ><span>{{num.text}}</span>
                </div>
            
            </div>

        </div>
    `,
    props: {
        rootStyle: Object
    },
    setup(props){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const rootStyle = props.rootStyle

        const len = 7
        const top = 100 / (len - 1)

        const store = useStore()
        
        const openTime = computed(() => store.getters['test/getOpenTime'])

        const boxStyle = ref({
            opacity: '0',
            animation: 'none'
        })

        const numbers = ref(Array.from({length: len}, (_, key) => ({
            key,
            text: ~~(Math.random() * 100000),
            style: {
                color: MAIN_COLOR_CSS_HEX,
                top: `${top * key}%`,
                transform: `translate(0, -${top * key}%)`
            }
        })))

        const generateRandNum = () => {
            numbers.value.forEach(number => {
                number.text = ~~(Math.random() * 100000)
            })

            setTimeout(generateRandNum, 1000)
        }

        const open = () => {
            boxStyle.value.animation = `blink2 0.08s ${openTime.value + Math.random()}s 2 forwards`
        } 

        onMounted(() => {
            generateRandNum()
            open()
        })

        return{
            numbers,
            rootStyle,
            boxStyle
        }
    }
}