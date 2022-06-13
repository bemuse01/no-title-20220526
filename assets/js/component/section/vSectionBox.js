const getCount = ({width, height, size, sw, sh}) => {
    if(!size) return {pw: 1, ph: 1, squareWidth: width, squareHeight: height}

    const squareWidth = size * sw
    const squareHeight = size * sh

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
        params: Object
    },
    setup(props){
        const {ref, toRefs, onMounted} = Vue

        const {params} = toRefs(props)

        const size = params.value.size
        const sw = 3
        const sh = 2

        const box = ref()
        const boxStyle = ref({
            gridTemplateColumns: 'none',
            gridTemplateRows: 'none'
        })

        const resize = () => {
            const {width, height} = box.value.getBoundingClientRect()

            const {pw, ph, squareWidth, squareHeight} = getCount({width, height, size, sw, sh})
            
            boxStyle.value.gridTemplateColumns = `repeat(${pw}, ${squareWidth}px)`
            boxStyle.value.gridTemplateRows = `repeat(${ph}, ${squareHeight}px)`
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