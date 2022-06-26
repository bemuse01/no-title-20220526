const generateStyle = (size, gap) => {
    return{
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `${gap}px`,
        transform: 'translateZ(0)',
        animation: `blink ${Math.random() * 2 + 2}s infinite`
    }
}
const genRand = (max) => {
    return ~~(Math.random() * max)
}

export default {
    template: `
        <div class="test-child test-bottom">

            <div class="bottom-box">

                <div class="bottom-circles" :ref="el => circlesRef = el">

                    <div class="bottom-circles-box" :style="circlesBoxStyle">

                        <div 
                            class="bottom-circle"
                            v-for="circle in circles"
                            :key="circle.key"
                            :style="circle.style"
                        >
                        </div>
                        
                    </div>

                </div>

                <div 
                    class="bottom-child-texts bottom-texts"
                    v-for="text in texts"
                    :key="text.key"
                    :style="text.rootStyle"
                >
                
                    <div class="bottom-version" v-if="text.key === 4">
                        <div><span>VER OS 01</span></div>
                        <div><span>TUE 06 21</span></div>
                        <div><span>2022</span></div>
                    </div>
                            
                    <div class="bottom-texts-box" :style="text.boxStyle">

                        <div
                            class="bottom-text bottom-text"
                            v-for="row in text.rows"
                            :key="row.key"
                            :style="text.itemStyle"
                        >
                            <span
                                v-for="col in row.cols"
                                :key="col.key"
                                :style="text.textStyle"
                            >{{col.text}}
                            </span>
                        </div>

                    </div>

                </div>

        

            </div>
        
        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const size = 5
        const gap = 1.5

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const circlesBoxStyle = ref({opacity: '0', animation: 'none'})

        const root = ref()
        const circlesRef = ref()

        const circles = ref(Array.from({length: 0}, (_, key) => ({
            key,
            style: generateStyle(size, gap)
        })))

        const texts = ref([
            {
                key: 1,
                rootStyle: {opacity: '0', animation: 'none'},
                boxStyle: {width: '90%', gap: '3%'},
                rows: Array.from({length: 3}, (_, key) => ({
                    key,
                    cols: Array.from({length: 5}, (_, idx) => ({
                        key: idx,
                        text: key !== 0 && idx === 4 ? '' : genRand(10000)
                    }))
                }))
            },
            {
                key: 2,
                rootStyle: {marginLeft: '6%', opacity: '0', animation: 'none'},
                itemStyle: {gap: '25%'},
                rows: Array.from({length: 2}, (_, key) => ({
                    key,
                    cols: Array.from({length: 3}, (_, idx) => ({
                        key: idx,
                        text: idx === 2 ? `${genRand(100000)}/${genRand(10000)}` : genRand(100)
                    }))
                }))
            },
            {
                key: 3,
                rootStyle: {marginLeft: '4%', flex: '1', opacity: '0', animation: 'none'},
                itemStyle: {gap: '15%'},
                textStyle: {display: 'inline-block'},
                rows: Array.from({length: 2}, (_, key) => ({
                    key,
                    cols: Array.from({length: 3}, (_, idx) => ({
                        key: idx,
                        text: genRand(1000)
                    }))
                }))
            },
            {
                key: 4,
                rootStyle: {flex: '0.45', opacity: '0', animation: 'none'},
                rows: [
                    {
                        key: 0,
                        cols: [{key: 0, text: 'WAVEFORM_DATA'}]
                    },
                    {
                        key: 1,
                        cols: Array.from({length: 2}, (_, idx) => ({
                            key: idx,
                            text: genRand(100)
                        }))
                    }
                ]
            }
        ])

        const updateCircles = () => {
            const {width} = circlesRef.value.getBoundingClientRect()
            const count1 = Math.ceil(width / size)
            const w = width - count1 * gap

            const len = circles.value.length
            const count2 = Math.ceil(w / size)

            if(len > count2){
                for(let i = 0; i < len - count2; i++) circles.value.pop()
            }else{
                for(let i = 0; i < count2 - len; i++) circles.value.push({style: generateStyle(size, gap), key: len + i})
            }
        }

        const resize = () => {
            updateCircles()
        }

        const open = () => {
            circlesBoxStyle.value.animation = `blink2 0.08s ${openTime.value + Math.random()}s 2 forwards`

            texts.value.forEach(text => {
                text.rootStyle.animation = `blink2 0.08s ${openTime.value + Math.random()}s 2 forwards`
            })
        }

        onMounted(() => {
            updateCircles()
            open()
            window.addEventListener('resize', resize)
        })

        return{
            root,
            circlesRef,
            circles,
            texts,
            circlesBoxStyle
        }
    }
}