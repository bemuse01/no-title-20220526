export default {
    template: `
        <div class="test-child test-bottom" :ref="el => root = el">

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

        const root = ref()
        const circlesRef = ref()

        const circles = ref(Array.from({length: 0}, (_, key) => ({
            key,
            style: {
                width: `${size}px`,
                height: `${size}px`
            }
        })))

        const updateCircles = () => {
            const {width} = circlesRef.value.getBoundingClientRect()
            const len = circles.value.length
            const count = ~~(width / size)

            console.log(len)
            console.log(count)

            const item = {style: {
                width: `${size}px`,
                height: `${size}px`
            }}
            
            if(len > count){
                for(let i = 0; i < len - count; i++) circles.value.pop()
            }else{
                for(let i = 0; i < count - len; i++) circles.value.push({...item, key: len + i})
            }
        }

        const resize = () => {
            updateCircles()
        }

        onMounted(() => {
            updateCircles()
            // window.addEventListener('resize', resize)
        })

        return{
            root,
            circlesRef,
            circles
        }
    }
}