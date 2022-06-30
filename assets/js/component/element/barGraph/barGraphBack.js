import vRows from '../../row/vRows.js'
import vRow from '../../row/vRow.js'
import axisY from '../public/axisY.js'
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

                <v-rows class="barGraph-back-rows" gap="4%">

                    <v-row flex="none" width="12px">
                        <axisY width="80%" pointHeight="2px" :len="5" gap="23%" />
                    </v-row>

                    <v-row flex="1">
                        <barGraph-back-bars />
                    </v-row>

                    <v-row flex="none" width="12px">
                        <axisY width="80%" pointHeight="2px" :len="5" gap="23%" justifyContent="flex-end" />
                    </v-row>
            
                </v-rows>
                    
            </div>

        </div>
    `
}