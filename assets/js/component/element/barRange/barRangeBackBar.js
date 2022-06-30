import vRows from '../../row/vRows.js'
import vRow from '../../row/vRow.js'

export default {
    components: {
        'v-rows': vRows,
        'v-row': vRow
    },
    template: `
        <div class="barRange-back-bar-box">

            <v-rows class="barRange-back-bar" gap="6%">

                <v-row flex="0.15">
                    <div class="barRange-back-bar-piece" :style="headStyle"></div>
                </v-row>

                <v-row class="barRange-back-bar-body" flex="1">
                    <div class="barRange-back-bar-piece barRange-back-bar-track"></div>
                    <div class="barRange-back-bar-piece barRange-back-bar-range" :style="rangeStyle"></div>
                </v-row>

                <v-row flex="0.15">
                    <div class="barRange-back-bar-piece" :style="tailStyle"></div>
                </v-row>

            </v-rows>

        </div>
    `,
    props: {
        idx: Number
    },
    setup(props){
        const {ref, onMounted} = Vue

        const idx = props.idx

        const headStyle = ref({opacity: Math.random() * 0.9 + 0.1})
        const tailStyle = ref({opacity: Math.random() * 0.9 + 0.1})
        const rangeStyle = ref({
            transition: `transform 0.6s ${idx * 0.1}s`,
            transform: `scaleX(${Math.random()})`,
            transformOrigin: `${Math.random() * 100}%`
        })

        const update = () => {
            if(Math.random() > 0.5) return
            rangeStyle.value.transform = `scaleX(${Math.random()})`
        }

        const interval = () => {
            update()
            setTimeout(interval, 3000 + ~~(Math.random() * 3000))
        }

        onMounted(() => {
            interval()
        })

        return{
            headStyle,
            tailStyle,
            rangeStyle
        }
    }
}