const generateStyle = (size, gap) => {
    return{
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `${gap}px`,
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

                    <div class="bottom-circles-box">

                        <div 
                            class="bottom-circle"
                            v-for="circle in circles"
                            :key="circle.key"
                            :style="circle.style"
                        >
                        </div>
                        
                    </div>

                </div>

                <div class="bottom-child-texts bottom-texts">
                    
                    <div class="bottom-texts-box">

                        <div
                            v-for="text in texts"
                            :key="text.key"
                            class="bottom-text"
                        >
                            <p
                                v-for="child in text.childs"
                                :key="child.key"
                            >{{child.text}}
                            </p>
                        </div>

                    </div>

                </div>

                <div class="bottom-child-texts bottom-texts2">
                    
                    <div class="bottom-texts2-box">

                        <div
                            v-for="text in texts2"
                            :key="text.key"
                            class="bottom-text bottom-text2"
                        >
                            <p
                                v-for="child in text.childs"
                                :key="child.key"
                            >{{child.text}}
                            </p>
                        </div>

                    </div>

                </div>

                <div class="bottom-child-texts bottom-texts3">
                        
                    <div class="bottom-texts3-box">

                        <div
                            v-for="text in texts3"
                            :key="text.key"
                            class="bottom-text bottom-text3"
                        >
                            <p
                                v-for="child in text.childs"
                                :key="child.key"
                            >{{child.text}}
                            </p>
                        </div>

                    </div>

                </div>

                <div class="bottom-empty">
                </div>

            </div>
        
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const size = 5
        const gap = 1.5

        const root = ref()
        const circlesRef = ref()

        const circles = ref(Array.from({length: 0}, (_, key) => ({
            key,
            style: generateStyle(size, gap)
        })))
        const texts = ref(Array.from({length: 3}, (_, key) => ({
            key,
            childs: Array.from({length: 5}, (_, idx) => ({
                key: idx,
                text: key !== 0 && idx === 4 ? '' : genRand(10000)
            }))
        })))
        const texts2 = ref(Array.from({length: 2}, (_, key) => ({
            key,
            childs: Array.from({length: 3}, (_, idx) => ({
                key: idx,
                text: idx === 2 ? `${genRand(100000)}/${genRand(10000)}` : genRand(100)
            }))
        })))
        const texts3 = ref(Array.from({length: 2}, (_, key) => ({
            key,
            childs: Array.from({length: 3}, (_, idx) => ({
                key: idx,
                text: genRand(1000)
            }))
        })))

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

        onMounted(() => {
            updateCircles()
            window.addEventListener('resize', resize)
        })

        return{
            root,
            circlesRef,
            circles,
            texts,
            texts2,
            texts3
        }
    }
}