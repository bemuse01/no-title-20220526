export default {
    template: `
        <div id="grid-container">
            
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

            style.value.gridTemplateColumns = `repeat(${pw}, ${squareWidth}px)`
            style.value.gridTemplateRows = `repeat(${ph}, ${squareHeight}px)`
        }
        
        onMounted(() => {
            resize()
            window.addEventListener('resize', () => resize())
        })

        return{
            leftBox,
            style,
            items
        }
    }
}