export default {
    template: `
        <div class="barGraph-back-bars">

            <div class="barGraph-back-bars-box">

                <div
                    class="barGraph-back-bar-box"
                    v-for="bar in bars"
                    :key="bar.key"
                >
                    <div class="barGraph-back-bar-track"></div>
                    <div class="barGraph-back-bar" :style="bar.style"></div>
                </div>

            </div>
        
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue 

        const len = 21

        const bars = ref(Array.from({length: len}, (_, key) => ({
            key,
            style: {
                transition: `transform 0.6s ${key * 0.1}s`,
                transform: 'scaleY(0)'
            }
        })))


        const update = () => {
            bars.value.forEach(bar => {
                const height = Math.random() * 1

                if(Math.random() > 0.5) bar.style.transform = `scaleY(${height})`
            })
        }

        const interval = () => {
            update()

            setTimeout(interval, 3000)
        }

        onMounted(() => {
            interval()
        })

        return{
            bars
        }
    }
}