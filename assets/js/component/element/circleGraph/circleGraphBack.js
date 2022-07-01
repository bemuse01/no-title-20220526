// import vRows from '../../row/vRows.js'
// import vRow from '../../row/vRow.js'
// import vColumns from '../../column/vColumns.js'
// import vColumn from '../../column/vColumn.js'
// import AxisY from '../public/axisY.js'
// import AxisX from '../public/axisX.js'

const CircleGraphBack = {
    components: {
        'v-rows': vRows,
        'v-row': vRow,
        'v-columns': vColumns,
        'v-column': vColumn,
        'axisY': AxisY,
        'axisX': AxisX
    },
    template: `
        <div class="circleGraph-back">
            
            <div class="circleGraph-back-box">

                <v-rows gap="5%">

                    <v-row flex="0.2">

                        <v-columns gap="10%">

                            <v-column flex="none" height="3px">
                                <axisX :len="2" height="100%" gap="20%" />
                            </v-column>

                            <v-column flex="1">
                                <axisY :len="7" width="60%" pointHeight="1px" gap="16%"/>
                            </v-column>

                            <v-column flex="none" height="3px">
                                <axisX :len="2" height="100%" gap="25%" />
                            </v-column>

                        </v-columns>

                    </v-row>

                    <v-row flex="1">
                        <div class="circleGraph-back-circle"></div>
                    </v-row>

                    <v-row flex="0.2">

                        <v-columns gap="10%">

                            <v-column flex="none" height="3px">
                                <axisX :len="2" height="100%" gap="20%" />
                            </v-column>

                            <v-column flex="1">
                                <axisY :len="7" width="60%" pointHeight="1px" justifyContent="flex-end" gap="16%"/>
                            </v-column>

                            <v-column flex="none" height="3px">
                                <axisX :len="2" height="100%" gap="20%" />
                            </v-column>

                        </v-columns>

                    </v-row>

                </v-rows>

            </div>

        </div>
    `
}