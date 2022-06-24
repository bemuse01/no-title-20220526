import vColumns from '../column/vColumns.js'
import vColumn from '../column/vColumn.js'
import vRows from '../row/vRows.js'
import vRow from '../row/vRow.js'
import lineGraphBackAxisX from './lineGraphBackAxisX.js'

export default {
    components: {
        'v-column': vColumn,
        'v-columns': vColumns,
        'v-row': vRow,
        'v-rows': vRows,
        'lineGraph-back-axisX' :lineGraphBackAxisX
    },
    template: `
        <div class="lineGraph-back">

            <div class="lineGraph-back-box">

                <v-columns class="lineGraph-back-column">

                    <v-column class="lineGraph-back-head lineGraph-back-side" flex="none" height="1px">
                        <lineGraph-back-axisX :len="3" gap="40%"/>
                    </v-column>

                    <v-column class="lineGraph-back-body" flex="1">
                        
                    </v-column>

                    <v-column class="lineGraph-back-footer lineGraph-back-side" flex="none" height="1px">
                        <lineGraph-back-axisX :len="15" gap="5%"/>
                    </v-column>

                </v-columns>

            </div>

        </div>
    `,
    setup(){

    }
}