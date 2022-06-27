import vColumns from '../column/vColumns.js'
import vColumn from '../column/vColumn.js'
import vRows from '../row/vRows.js'
import vRow from '../row/vRow.js'
import axisX from './axisX.js'
import axisY from './axisY.js'
import lineGraphBackLines from './lineGraphBackLines.js'

export default {
    components: {
        'v-column': vColumn,
        'v-columns': vColumns,
        'v-row': vRow,
        'v-rows': vRows,
        'axisX': axisX,
        'axisY': axisY,
        'lineGraph-back-lines': lineGraphBackLines
    },
    template: `
        <div class="lineGraph-back" :style="rootStyle">

            <div class="lineGraph-back-box">

                <v-columns class="lineGraph-back-columns">

                    <v-column flex="none" height="12px">
                        <axisX :len="4" gap="25%" />
                    </v-column>

                    <v-column flex="1">

                        <v-rows class="lineGraph-back-rows">

                            <v-row flex="none" width="12px">
                                <axisY :len="10" gap="10%" />
                            </v-row>

                            <v-row flex="1">
                                <lineGraph-back-lines />
                            </v-row>

                            <v-row flex="none" width="12px">
                                <axisY :len="10" gap="10%" justifyContent="flex-end" />
                            </v-row>

                        </v-rows>
                        
                    </v-column>

                    <v-column flex="none" height="10px">
                        <axisX :len="3" gap="40%" alignItems="flex-end" />
                    </v-column>

                </v-columns>

            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const rootStyle = ref({opacity: '0', animation: 'none'})

        const open = () => {
            rootStyle.value.animation = `blink2 0.06s ${openTime.value + Math.random()}s 2 forwards`
        }

        onMounted(() => {
            open()
        })

        return{
            rootStyle
        }
    }
}