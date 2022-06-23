const getCount = ({width, height, s, sw, sh}) => {
    if(!s) return {pw: 1, ph: 1, squareWidth: width, squareHeight: height}

    const squareWidth = s * sw
    const squareHeight = s * sh

    const rw = Math.ceil(width / squareWidth)
    const pw = rw === 0 ? 1 : rw

    const rh = Math.ceil(height / squareHeight)
    const ph = rh === 0 ? 1 : rh

    return {pw, ph, squareWidth, squareHeight}
}

export default {
    template: `
        <div 
            class="vSection-box" 
            :ref="el => box = el" 
            :style="boxStyle"
        >
            <slot></slot>
        </div>
    `,
    props: {
        size: Number,
        position: String
    },
    setup(props){
        const {ref, toRefs, onMounted, computed} = Vue

        const {size, position} = toRefs(props)

        const s = computed(() => position.value === 'center' ? undefined : size.value)
        const sw = 3
        const sh = 2

        const box = ref()
        const boxStyle = ref({
            gridTemplateColumns: 'none',
            gridTemplateRows: 'none'
        })

        const resize = () => {
            const {width, height} = box.value.getBoundingClientRect()

            const {pw, ph, squareWidth, squareHeight} = getCount({width, height, s: s.value, sw, sh})
            
            boxStyle.value.gridTemplateColumns = `repeat(${pw}, ${squareWidth}px)`
            boxStyle.value.gridTemplateRows = `repeat(${ph}, ${squareHeight}px)`
            // boxStyle.value.gridTemplateColumns = `repeat(${pw}, 1fr)`
            // boxStyle.value.gridTemplateRows = `repeat(${ph}, 1fr)`
        }

        onMounted(() => {
            resize()
            window.addEventListener('resize', () => resize())
        })

        return{
            box,
            boxStyle
        }
    }
}