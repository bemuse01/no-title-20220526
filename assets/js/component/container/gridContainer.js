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
            
            <div class="grid-left">
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
            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const size = 80
        const squareWidth = size * 3
        const squareHeight = size * 2

        const centerSectionStyle = ref({
            width: '60%',
            height: '60%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        })
        const topSectionStyle = ref({
            width: '80%',
            height: '20%',
            top: '0',
            left: '0'
        })
        const rightSectionStyle = ref({
            width: '20%',
            height: '80%',
            top: '0',
            right: '0'
        })
        const bottomSectionStyle = ref({
            width: '80%',
            height: '20%',
            right: '0',
            bottom: '0'
        })
        const leftSectionStyle = ref({
            width: '20%',
            height: '80%',
            left: '0',
            bottom: '0'
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
            resize()
            window.addEventListener('resize', () => resize())
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