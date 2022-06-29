import vColumns from '../../column/vColumns.js'
import vColumn from '../../column/vColumn.js'
import vRows from '../../row/vRows.js'
import vRow from '../../row/vRow.js'
import AxisX from '../public/axisX.js'
import AxisY from '../public/axisY.js'

export default {
    components: {
        'v-columns': vColumns,
        'v-column': vColumn,
        'v-rows': vRows,
        'v-row': vRow,
        'axisX': AxisX,
        'axisY': AxisY
    },
    template: `
        <div class="graph-back">

            <div class="graph-back-box">
            
                <v-columns gap="5%">
                
                    <v-column flex="none" height="3px">

                        <v-rows>
                            
                            <v-row flex="0.3">
                                <axisX :len="2" gap="25%" height="100%" />
                            </v-row>

                            <v-row flex="1"></v-row>

                            <v-row flex="0.3">
                                <axisX :len="2" gap="25%" height="100%" />
                            </v-row>

                        </v-rows>

                    </v-column>

                    <v-column flex="1">

                        <v-rows gap="3%">

                            <v-row flex="none" width="6px">
                                <axisY :len="9" gap="12%" width="100%" />
                            </v-row>

                            <v-row flex="1">
                                <axisY class="graph-back-child" :len="9" gap="12%" width="100%" />
                            </v-row>

                            <v-row flex="none" width="6px">
                                <axisY :len="9" gap="12%" width="100%" />
                            </v-row>

                        </v-rows>

                    </v-column>
                    
                    <v-column flex="none" height="3px">

                        <v-rows>
                                    
                            <v-row flex="0.3">
                                <axisX :len="2" gap="25%" height="100%" />
                            </v-row>

                            <v-row flex="1"></v-row>

                            <v-row flex="0.3">
                                <axisX :len="2" gap="25%" height="100%" />
                            </v-row>

                        </v-rows>        

                    </v-column>

                </v-columns>

            </div>

        </div>
    `
}