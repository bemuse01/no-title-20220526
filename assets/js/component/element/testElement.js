import TestSearch from './testSearch.js'
import TestVertNums from './testVertNums.js'
import TestBottom from './testBottom.js'
import vColumn from '../column/vColumn.js'
import vColumns from '../column/vColumns.js'

export default {
    components: {
        'test-search': TestSearch,
        'test-vertNums': TestVertNums,
        'test-bottom': TestBottom,
        'v-column': vColumn,
        'v-columns': vColumns
    },
    template: `
        <div class="test test-element">

            <test-search />

            <v-columns class="test-columns">

                <v-column class="test-column" :style="leftColumnStyle">
                    <test-vertNums />
                </v-column>
                
                <v-column class="test-column">
                    <test-bottom />
                </v-column>

                <v-column class="test-column" :style="rightColumnStyle">
                    <test-vertNums />
                </v-column>

            </v-columns>

        </div>
    `,
    setup(){
        const {ref} = Vue

        const leftColumnStyle = ref({flex: '0.03'})
        const rightColumnStyle = ref({flex: '0.03'})
        
        return{
            leftColumnStyle,
            rightColumnStyle
        }
    }
}