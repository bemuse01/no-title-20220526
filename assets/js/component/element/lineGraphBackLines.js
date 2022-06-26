import Method from '../../method/method.js'

export default {
    template: `
        <div class="lineGraph-back-lines" :ref="el => root = el">

            <div
                class="lineGraph-back-line"
                v-for="item in items"
                :key="item.key"
                :style="item.style"
            >
            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue

        const root = ref()
        const rand = Math.random() * 0.5 + 0.5
        const len = 4

        const items = ref(Array.from({length: len}, (_, key) => ({
            key,
            style: {
                backgroundColor: MAIN_COLOR_CSS_HEX,
                opacity: `${Math.random() * 0.7 + 0.3}`,
                transform: 'translate(0, 0)'
                // animation: `translating ${Math.random() * 6 + 6}s ${Math.random()}s infinite linear`
            }
        })))

        const update = () => {
            const {width} = root.value.getBoundingClientRect()
            const time = window.performance.now()

            items.value.forEach((item, idx) => {
                const r = SIMPLEX.noise2D(idx * rand, time * 0.00025)
                const n = Method.normalize(r, 0, width, -1, 1)

                item.style.transform = `translate(${n}px, 0) translateZ(0)`
            })
        }

        const animate = () => {
            update()
            requestAnimationFrame(animate)
        }

        onMounted(() => {
            // animate()
        })

        return{
            root,
            items
        }
    }
}