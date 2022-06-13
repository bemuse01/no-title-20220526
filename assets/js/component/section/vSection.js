const getCount = ({width, height, size, sw, sh}) => {
    if(!size) return {count: 1, pw: 1, ph: 1, squareHeight: width, squareHeight: height}

    const squareWidth = size * sw
    const squareHeight = size * sh

    const rw = Math.ceil(width / squareWidth)
    const pw = rw === 0 ? 1 : rw

    const rh = Math.ceil(height / squareHeight)
    const ph = rh === 0 ? 1 : rh
    const count = pw * ph

    return {count, pw, ph, squareWidth, squareHeight}
}

export default {
    template: `
        <div class="vSection" :style="sectionStyle" :ref="el => box = el">
            
            <!--<div :class="boxClassName" :style="boxStyle">

                <div
                    class="vSection-item"
                    v-for="i in items"
                    :key="i.key"
                >
                </div>

            </div>-->
            <slot></slot>

        </div>
    `,
    props: {
        sectionStyle: Object,
    },
    setup(props){
        const {toRefs, ref, onMounted} = Vue

        const {sectionStyle} = toRefs(props)

        // const rootStyle = sectionStyle.value
        // const boxClassName = `vSection-box vSection-box-${params.value.position}`

        // const size = params.value.size
        // const sw = 3
        // const sh = 2

        // const box = ref()
        // const items = ref(Array.from({length: 0}, (_, key) => ({key})))
        // const boxStyle = ref({
        //     gridTemplateColumns: 'none',
        //     gridTemplateRows: 'none'
        // })

        // const resize = () => {
        //     const {width, height} = box.value.getBoundingClientRect()

        //     const {count, pw, ph, squareWidth, squareHeight} = getCount({width, height, size, sw, sh})
            
        //     boxStyle.value.gridTemplateColumns = `repeat(${pw}, ${squareWidth}px)`
        //     boxStyle.value.gridTemplateRows = `repeat(${ph}, ${squareHeight}px)`

        //     updateItems(count)
        // }

        // const updateItems = (count) => {
        //     const len = items.value.length

        //     if(len > count){
        //         for(let i = 0; i < len - count; i++) items.value.pop()
        //     }else{
        //         for(let i = 0; i < count - len; i++) items.value.push({key: len + i})
        //     }
        // }
        
        // onMounted(() => {
        //     resize()
        //     window.addEventListener('resize', () => resize())
        // })

        return{
            sectionStyle,
            // boxStyle,
            // items,
            // box,
            // boxClassName
        }
    }
}