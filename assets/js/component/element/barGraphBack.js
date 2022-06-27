import vRows from '../row/vRows.js'
import vRow from '../row/vRow.js'
import axisY from './axisY.js'
import BarGraphBackBars from './barGraphBackBars.js'

export default {
    components: {
        'v-rows': vRows,
        'v-row': vRow,
        'axisY': axisY,
        'barGraph-back-bars': BarGraphBackBars
    },
    template: `
        <div class="barGraph-back">

            <div class="barGraph-back-box">

                <v-rows class="barGraph-back-rows" gap="2%">

                    <v-row flex="none" width="12px">
                        <axisY :style="leftAxisStyle" width="80%" pointHeight="2px" :len="5" gap="23%" />
                    </v-row>

                    <v-row flex="1">
                        <barGraph-back-bars :style="barsStyle" />
                    </v-row>

                    <v-row flex="none" width="12px">
                        <axisY :style="rightAxisStyle" width="80%" pointHeight="2px" :len="5" gap="23%" justifyContent="flex-end" />
                    </v-row>
            
                </v-rows>
                    
            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const leftAxisStyle = ref({opacity: '0', animation: 'none'})
        const rightAxisStyle = ref({opacity: '0', animation: 'none'})
        const barsStyle = ref({opacity: '0', animation: 'none'})

        const open = () => {
            leftAxisStyle.value.animation = `blink2 0.06s ${openTime.value + Math.random()}s 2 forwards`
            rightAxisStyle.value.animation = `blink2 0.06s ${openTime.value + Math.random()}s 2 forwards`
            barsStyle.value.animation = `blink2 0.06s ${openTime.value + Math.random()}s 2 forwards`
        }

        onMounted(() => {
            open()
        })

        return{
            leftAxisStyle,
            rightAxisStyle,
            barsStyle
        }
    }
}