// import vColumns from '../../column/vColumns.js'
// import vColumn from '../../column/vColumn.js'
// import vRows from '../../row/vRows.js'
// import vRow from '../../row/vRow.js'
// import axisX from '../public/axisX.js'
// import axisY from '../public/axisY.js'
// import lineGraphBackLines from './lineGraphBackLines.js'

const LineGraphBack = {
    components: {
        'v-column': vColumn,
        'v-columns': vColumns,
        'v-row': vRow,
        'v-rows': vRows,
        'axisX': AxisX,
        'axisY': AxisY,
        'lineGraph-back-lines': LineGraphBackLines
    },
    template: `
        <div class="lineGraph-back">

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
    `
}