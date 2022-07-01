const TestTopCode = {
    template: `
        <div class="top-code">

            <div class="top-code-box" :style="boxStyle">

                <div class="code-bg code-head"></div>
                
                <div class="code-bg code-body">
                    <slot></slot>
                </div>

            </div>

        </div>
    `,
    props: {
        width: String
    },
    setup(props){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const width = props.width
        
        const boxStyle = ref({
            width,
            opacity: '0',
            animation: 'none'
        })

        const open = () => {
            boxStyle.value.animation = `blink2 0.08s ${openTime.value + Math.random()}s 2 forwards`
        }

        onMounted(() => {
            open()
        })

        return{
            boxStyle
        }
    }
}