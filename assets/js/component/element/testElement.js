import Method from '../../method/method.js'

export default {
    template: `
        <div class="test test-element" :ref="el => root = el">
            <div class="test-search-box" :style="searchBoxStyle">
                
                <div class="search-box-line"></div>

                <div class="search-box-texts">

                    <div class="search-box-title">
                        <p>RESEQUENCE CODE</p>
                    </div>

                    <div class="search-box-text">
                        <div
                            v-for="item in items"
                            :key="item.key"
                        >
                            <p
                                v-for="num in item.numbers"
                                :key="num.key"
                            >{{num.text}}</p>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const root = ref()

        const items = ref(Array.from({length: 2}, (_, key) => ({
            key,
            numbers: Array.from({length: 3}, (_, idx) => ({
                key: idx,
                text: ~~(Math.random() * 100000)
            }))
        })))

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
            searchBoxStyle,
            items
        }
    }
}