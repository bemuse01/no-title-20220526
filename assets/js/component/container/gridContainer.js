import vSection from '../section/vSection.js' 

export default {
    components: {
        'v-section': vSection
    },
    template: `
        <div id="grid-container">

            <!--<v-section :style="centerSectionStyle" />-->
            <v-section :params="topSection" />
            <v-section :params="rightSection" />
            <v-section :params="bottomSection" />
            <v-section :params="leftSection" />
            
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

        const centerSection = ref({
            style: {gridArea: 'center'},
            position: 'center'
        })
        const topSection = ref({
            style: {gridArea: 'top'},
            position: 'top'
        })
        const rightSection = ref({
            style: {gridArea: 'right'},
            position: 'right'
        })
        const bottomSection = ref({
            style: {gridArea: 'bottom'},
            position: 'bottom'
        })
        const leftSection = ref({
            style: {gridArea: 'left'},
            position: 'left'
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
            centerSection,
            leftSection,
            topSection,
            rightSection,
            bottomSection
        }
    }
}