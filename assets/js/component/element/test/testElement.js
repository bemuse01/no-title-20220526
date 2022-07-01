// import TestSearch from './testSearch.js'
// import TestVertNums from './testVertNums.js'
// import TestTop from './testTop.js'
// import TestBottom from './testBottom.js'
// import vRow from '../../row/vRow.js'
// import vRows from '../../row/vRows.js'

const TestElement = {
    components: {
        'test-search': TestSearch,
        'test-vertNums': TestVertNums,
        'test-top': TestTop,
        'test-bottom': TestBottom,
        'v-row': vRow,
        'v-rows': vRows
    },
    template: `
        <div class="test test-element">

            <test-search />

            <v-rows class="test-rows">

                <v-row class="test-row" :style="leftColumnStyle">
                    <test-vertNums />
                </v-row>
                
                <v-row class="test-row">
                    <test-top />
                    <test-bottom />
                </v-row>

                <v-row class="test-row" :style="rightColumnStyle">
                    <test-vertNums />
                </v-row>

            </v-rows>

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