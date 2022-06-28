import vRows from '../../row/vRows.js'
import vRow from '../../row/vRow.js'

export default {
    components: {
        'v-rows': vRows,
        'v-row': vRow
    },
    template: `
        <div class="circleGraph-back">
            
            <div class="circleGraph-back-box">

                <v-rows gap="5%">

                    <v-row flex="0.2">

                        

                    </v-row>

                    <v-row flex="1">
                    </v-row>

                    <v-row flex="0.2">
                    </v-row>

                </v-rows>

            </div>

        </div>
    `
}