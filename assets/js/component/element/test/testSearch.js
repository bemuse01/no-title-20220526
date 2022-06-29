import Method from '../../../method/method.js'

export default {
    template: `
        <div class="test-search" :ref="el => root = el" :style="rootStyle">

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
                animation: `scaling 3s ${Math.random()}s infinite`
            },
            style2: {
                opacity: `${0.5 * key}`,
                background: MAIN_COLOR_CSS_HEX,
            }
        })))

        const rootStyle = ref({
            opacity: '0',
            animation: 'none',
        })
        const searchBoxStyle = ref({
            animation: 'translating2 20s infinite ease-in-out',
        })

        const generateRandNum = () => {
            numbers.value.forEach(({childs}) => {
                childs.forEach((child, idx) => {
                    child.text = ~~(Math.random() * (100000 - 30000 * idx))
                })
            })

            setTimeout(generateRandNum, 1000)
        }

        const open = () => {
            rootStyle.value.animation = `blink2 0.06s ${openTime.value}s 2 forwards`
        }

        onMounted(() => {
            generateRandNum()
            open()
        })

        return{
            root,
            rootStyle,
            searchBoxStyle,
            numbers,
            bars
        }
    }
}