import vColumns from '../../column/vColumns.js'
import vColumn from '../../column/vColumn.js'
import BarRangeBackBar from './barRangeBackBar.js'

export default {
    components: {
        'v-column': vColumn,
        'v-columns': vColumns,
        'barRange-back-bar': BarRangeBackBar
    },
    template: `
        <div class="barRange-back">

            <div class="barRange-back-box" :style="boxStyle">

                <v-columns class="barRange-back-columns" gap="12%">

                    <v-column
                        v-for="item in items"
                        :key="item.key"
                    >
                        <barRange-back-bar :idx="item.key" />
                    </v-column>

                </v-columns>

            </div>

        </div>
    `,
    setup(){
        const {ref} = Vue

        const len = 8

        const items = ref(Array.from({length: len}, (_, key) => ({key})))

        return{
            items,
        }
    }
}