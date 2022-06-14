import Method from '../../method/method.js'

export default {
    template: `
        <div class="test test-element" :ref="el => root = el">
            <div class="test-search-box" :style="searchBoxStyle">
                <div class="test-search-box-line"></div>
                <div class="test-search-box-texts">
                    <p>RESEQUENCE CODE</p>
                    <p>123 456</p>
                    <p>123 456</p>
                    <p>123 456</p>
                </div>
            </div>
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const root = ref()

        const searchBoxStyle = ref({
            transform: 'none'
        })

        const moveSearchBox = (width, time) => {
            const r = SIMPLEX.noise2D(0.1, time * 0.000075)
            const p = Method.normalize(r, width * 0.1, width * 0.9, -1, 1)

            searchBoxStyle.value.transform = `translate(${p}px, 0)`
        }

        const animate = () => {
            const {width} = root.value.getBoundingClientRect()
            const time = window.performance.now()

            moveSearchBox(width, time)
            requestAnimationFrame(animate)
        }

        onMounted(() => {
            animate()
        })

        return{
            root,
            searchBoxStyle
        }
    }
}