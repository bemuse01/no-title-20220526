import TestSearch from './testSearch.js'
import TestVertNums from './testVertNums.js'
import TestBottom from './testBottom.js'

export default {
    components: {
        'test-search': TestSearch,
        'test-vertNums': TestVertNums,
        'test-bottom': TestBottom
    },
    template: `
        <div class="test test-element">

            <test-search />
            <test-vertNums :rootStyle="leftVertNumsStyle" />
            <test-vertNums :rootStyle="rightVertNumsStyle" />
            <test-bottom />

        </div>
    `,
    setup(){
        const {ref} = Vue

        const leftVertNumsStyle = ref({left: '0'})
        const rightVertNumsStyle = ref({right: '0'})
        
        return{
            leftVertNumsStyle,
            rightVertNumsStyle
        }
    }
}