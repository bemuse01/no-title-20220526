import Method from '../../method/method.js'

export default {
    template: `
        <div class="test-search" :ref="el => root = el">

            <div class="search-box" :style="searchBoxStyle">
                            
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
                                :style="child.style"
                            >{{child.text}}</p>
                        </div>

                        <div class="search-horizon-bars">
                            <div
                                v-for="bar in bars"
                                :key="bar.key"
                                :style="bar.style1"
                                class="search-horizon-bar"
                            ><div :style="bar.style2"></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const root = ref()

        const numbers = ref(Array.from({length: 2}, (_, key) => ({
            key,
            childs: Array.from({length: 4}, (_, idx) => ({
                key: idx,
                text: ~~(Math.random() * (100000 - 20000 * idx)),
                style: {
                    color: idx === 0 || idx === 3 ? MAIN_COLOR_CSS_HEX : 'white'
                }
            }))
        })))
        const bars = ref(Array.from({length: 3}, (_, key) => ({
            key,
            style1: {
                transform: `scaleX(${Math.random() * 0.5 + 0.5})`
            },
            style2: {
                opacity: `${0.5 * key}`,
                background: MAIN_COLOR_CSS_HEX,
            }
        })))

        const searchBoxStyle = ref({
            opacity: '0',
            transform: 'none',
            animation: 'none'
        })

        const generateRandNum = () => {
            numbers.value.forEach(({childs}) => {
                childs.forEach((child, idx) => {
                    child.text = ~~(Math.random() * (100000 - 30000 * idx))
                })
            })

            setTimeout(generateRandNum, 500)
        }

        const scaleBar = (time) => {
            bars.value.forEach((bar, i) => {
                const r = SIMPLEX.noise2D(i * 0.5, time * 0.0005)
                const p = Method.normalize(r, 0.1, 1, -1, 1)

                bar.style1.transform = `scaleX(${p}) translateZ(0)`
            })
        }

        const moveSearchBox = (width, time) => {
            const r = SIMPLEX.noise2D(0.1, time * 0.000075)
            const p = Method.normalize(r, width * 0.1, width * 0.9, -1, 1)

            searchBoxStyle.value.transform = `translate(${p}px, 0) translateZ(0)`
        }

        const animate = () => {
            const {width} = root.value.getBoundingClientRect()
            const time = window.performance.now()

            moveSearchBox(width, time)
            scaleBar(time)
            requestAnimationFrame(animate)
        }

        const open = () => {
            searchBoxStyle.value.animation = `blink2 0.06s ${openTime.value}s 2 forwards`
        }

        onMounted(() => {
            animate()
            generateRandNum()
            open()
        })

        return{
            root,
            searchBoxStyle,
            numbers,
            bars
        }
    }
}