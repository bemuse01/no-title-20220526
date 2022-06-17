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

                    <div 
                        class="bottom-circle"
                        v-for="circle in circles"
                        :key="circle.key"
                        :style="circle.style"
                    >
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

        const initCircles = () => {
            const {width} = circlesRef.value.getBoundingClientRect()
            const count = ~~(width / size)
            const w = width - count * gap
            const len = ~~(w / size)
            for(let i = 0; i < len; i++) circles.value.push({style: generateStyle(size, gap), key: i})
            console.log(width)
        }

        const updateCircles = () => {
            const {width} = circlesRef.value.getBoundingClientRect()
            const len = circles.value.length
            const w = width - len * gap
            const count = ~~(w / size)

            console.log(width)

            if(len > count){
                for(let i = 0; i < len - count; i++) circles.value.pop()
            }else{
                for(let i = 0; i < count - len; i++) circles.value.push({style: generateStyle(size, gap), key: len + i})
            }
            console.log(count)
        }

        const resize = () => {
            updateCircles()
        }

        onMounted(() => {
            initCircles()
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