const generateStyle = (size, gap) => {
    return{
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `${gap}px`,
        animation: `blink ${Math.random() * 2 + 2}s infinite`
    }
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

                <div class="bottom-texts">
                </div>

                <div class="bottom-empty">
                </div>

            </div>
        
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const size = 5
        const gap = 1

        const root = ref()
        const circlesRef = ref()

        const circles = ref(Array.from({length: 0}, (_, key) => ({
            key,
            style: generateStyle(size, gap)
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

            console.log('w: ', w)
            console.log('width: ', width)
            console.log('count2: ', count2)
            console.log('len: ', len)
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
            circles
        }
    }
}