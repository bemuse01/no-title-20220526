import vColumns from '../../column/vColumns.js'
import vColumn from '../../column/vColumn.js'

export default {
    components: {
        'v-column': vColumn,
        'v-columns': vColumns
    },
    template: `
        <div class="barRange-back">

            <div class="barRange-back-box">

                <v-columns class="barRange-back-columns" gap="5%">

                    <v-column
                        v-for="item in items"
                        :key="item.key"
                    >
                    </v-column>

                </v-columns>

            </div>

        </div>
    `,
    setup(){
        const {ref} = Vue

        const len = 7
        
        const items = ref(Array.from({length: len}, (_, key) => ({key})))

        return{
            items
        }
    }
}