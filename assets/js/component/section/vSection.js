export default {
    template: `
        <div class="vSection" :style="rootStyle" :ref="el => box = el">
            
            <div :class="boxClassName" :style="boxStyle">

                <div 
                    class="vSection-item"
                    v-for="i in items"
                    :key="i.key"
                >
                </div>

            </div>

        </div>
    `,
    props: {
        params: Object,
    },
    setup(props){
        const {toRefs, ref, onMounted} = Vue

        const {params} = toRefs(props)

        const rootStyle = params.value.style
        const boxClassName = `vSection-box vSection-box-${params.value.position}`

        const size = 80
        const squareWidth = size * 3
        const squareHeight = size * 2

        const box = ref()
        const items = ref(Array.from({length: 0}, (_, key) => ({key})))
        const boxStyle = ref({
            gridTemplateColumns: 'none',
            gridTemplateRows: 'none'
        })

        const resize = () => {
            const {width, height} = box.value.getBoundingClientRect()

            const rw = Math.ceil(width / squareWidth)
            const pw = rw === 0 ? 1 : rw

            const rh = Math.ceil(height / squareHeight)
            const ph = rh === 0 ? 1 : rh
            const count = pw * ph

            boxStyle.value.gridTemplateColumns = `repeat(${pw}, ${squareWidth}px)`
            boxStyle.value.gridTemplateRows = `repeat(${ph}, ${squareHeight}px)`

            updateItems(count)
        }

        const updateItems = (count) => {
            const len = items.value.length

            if(len > count){
                for(let i = 0; i < len - count; i++) items.value.pop()
            }else{
                for(let i = 0; i < count - len; i++) items.value.push({key: len + i})
            }
        }
        
        onMounted(() => {
            resize()
            window.addEventListener('resize', () => resize())
        })

        return{
            rootStyle,
            boxStyle,
            items,
            box,
            boxClassName
        }
    }
}