import vSection from '../section/vSection.js' 

export default {
    components: {
        'v-section': vSection
    },
    template: `
        <div id="grid-container">

            <v-section :style="centerSectionStyle" />
            <v-section :style="topSectionStyle" />
            <v-section :style="rightSectionStyle" />
            <v-section :style="bottomSectionStyle" />
            <v-section :style="leftSectionStyle" />
            
            <!--<div class="grid-left">
                <div class="left-box" 
                    :ref="el => leftBox = el" 
                    :style="style"
                >
                    <div
                        v-for="item in items"
                        :key="item.key"
                    >
                    </div>
                </div>
            </div>-->

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const size = 80
        const squareWidth = size * 3
        const squareHeight = size * 2

        const centerSectionStyle = ref({
            gridArea: 'center'
        })
        const topSectionStyle = ref({
            gridArea: 'top'
        })
        const rightSectionStyle = ref({
            gridArea: 'right'
        })
        const bottomSectionStyle = ref({
            gridArea: 'bottom'
        })
        const leftSectionStyle = ref({
            gridArea: 'left'
        })

        const items = ref(Array.from({length: 8}, (_, key) => ({key})))
        const leftBox = ref()
        const style = ref({
            gridTemplateColumns: 'none',
            gridTemplateRows: 'none'
        })

        const resize = () => {
            const {width, height} = leftBox.value.getBoundingClientRect()

            const rw = Math.ceil(width / squareWidth)
            const pw = rw === 0 ? 1 : rw

            const rh = Math.ceil(height / squareHeight)
            const ph = rh === 0 ? 1 : rh
            const count = pw * ph

            style.value.gridTemplateColumns = `repeat(${pw}, ${squareWidth}px)`
            style.value.gridTemplateRows = `repeat(${ph}, ${squareHeight}px)`

            updateItems(count)
        }

        const updateItems = (count) => {
            const len = items.value.length

            if(len > count){
                items.value.splice(count, count)
            }else{
                for(let i = 0; i < count - len; i++) items.value.push({key: len + i})
            }
        }
        
        onMounted(() => {
            // resize()
            // window.addEventListener('resize', () => resize())
        })

        return{
            leftBox,
            style,
            items,
            centerSectionStyle,
            leftSectionStyle,
            topSectionStyle,
            rightSectionStyle,
            bottomSectionStyle
        }
    }
}