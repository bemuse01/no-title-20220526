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
                            v-for="num in numbers"
                            :key="num.key"
                        >
                            <p
                                v-for="child in num.childs"
                                :key="child.key"
                            >{{child.text}}</p>
                        </div>

                        <div class="horizon-bars">
                            <div
                                v-for="bar in bars"
                                :key="bar.key"
                                :style="bar.style1"
                            ><div :style="bar.style2"></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const root = ref()

        const numbers = ref(Array.from({length: 2}, (_, key) => ({
            key,
            childs: Array.from({length: 3}, (_, idx) => ({
                key: idx,
                text: ~~(Math.random() * 100000)
            }))
        })))
        const bars = ref(Array.from({length: 3}, (_, key) => ({
            key,
            style1: {
                transform: `scaleX(${Math.random() * 0.5 + 0.5})`
            },
            style2: {
                opacity: `${0.5 * key}`,
                background: '#00ffd7',
            }
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
            numbers,
            bars
        }
    }
}